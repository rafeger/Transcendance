#!/usr/bin/env bash
# Résout les conflits du merge entre main et la branche 24 (API profil).
# À lancer depuis la racine du repo, PENDANT le merge (après « git merge »).
set -euo pipefail

[ -f Makefile ] && [ -d backend ] && [ -d frontend ] || { echo "❌ Lance ce script depuis la racine du repo."; exit 1; }
git rev-parse -q --verify MERGE_HEAD >/dev/null || { echo "❌ Aucun merge en cours : lance d'abord le git merge."; exit 1; }

# Quel côté est main ? Branche partie de la 24 + « git merge origin/main » → main = theirs.
# Branche partie de main + « git merge origin/24-... »              → main = ours.
if [ "$(git rev-parse MERGE_HEAD)" = "$(git rev-parse origin/main)" ]; then MAIN_SIDE=--theirs; else MAIN_SIDE=--ours; fi
echo "→ version de main prise avec $MAIN_SIDE"

# 1. Fichiers où la version de main est la bonne (contient le fix #85/#87 d'Auth.tsx)
git checkout "$MAIN_SIDE" -- backend/src/app.module.ts frontend/src/App.tsx frontend/src/pages/Auth.tsx

# 2. Faute de frappe de la 24 dans le schéma + avatarUrl jamais null
sed -i 's/^model Answer {i$/model Answer {/' backend/prisma/schema.prisma
sed -i 's/^    avatarUrl:      string | null;$/    avatarUrl:      string; \/\/ jamais null : avatar par défaut/' backend/src/users/users.dto.ts

# 3. Fichiers fusionnés (24 + #25)
cat > backend/src/users/users.module.ts <<'__END_OF_FILE__'
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
__END_OF_FILE__

cat > backend/src/users/users.controller.ts <<'__END_OF_FILE__'
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import type { Request } from 'express';
import type { JwtPayload } from '../auth/jwt-auth.guard.js';
import { AVATAR_MAX_BYTES, AVATAR_MIME_TYPES } from './avatar.utils.js';
import {
  PaginateUsersDto,
  PrivateUserDto,
  PublicUserDto,
  SearchUserQueryDto,
  UpdateProfileDto,
} from './users.dto.js';
import { UsersService } from './users.service.js';
import type { UploadedAvatar } from './users.service.js';

// Toutes les routes sont protégées par le JwtAuthGuard global (app.module.ts).
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** GET /api/users/me — profil complet de l'utilisateur connecté. */
  @Get('me')
  getMe(@Req() req: Request & { user: JwtPayload }): Promise<PrivateUserDto> {
    return this.usersService.getMe(req.user.sub);
  }

  /** PATCH /api/users/me — modifie le pseudo et/ou la bio. */
  @Patch('me')
  updateMe(
    @Req() req: Request & { user: JwtPayload },
    @Body() dto: UpdateProfileDto,
  ): Promise<PrivateUserDto> {
    return this.usersService.updateMe(req.user.sub, dto);
  }

  /** POST /api/users/me/avatar — multipart/form-data, champ « avatar ». */
  @Post('me/avatar')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @UseInterceptors(
    FileInterceptor('avatar', {
      // Au-delà de fileSize, multer coupe la lecture et Nest répond 413.
      limits: { fileSize: AVATAR_MAX_BYTES, files: 1, fields: 0 },
    }),
  )
  uploadAvatar(
    @Req() req: Request & { user: JwtPayload },
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // Lit les premiers octets du fichier : le Content-Type et le nom
          // envoyés par le client ne sont pas pris en compte.
          new FileTypeValidator({
            fileType: AVATAR_MIME_TYPES,
            overrideMimeType: true,
            errorMessage: 'Avatar must be a PNG, JPEG or WebP image',
          }),
        ],
      }),
    )
    file: UploadedAvatar,
  ) {
    return this.usersService.updateAvatar(req.user.sub, file);
  }

  /** DELETE /api/users/me/avatar — revient à l'avatar par défaut. */
  @Delete('me/avatar')
  resetAvatar(@Req() req: Request & { user: JwtPayload }) {
    return this.usersService.resetAvatar(req.user.sub);
  }

  /** GET /api/users?search=&page=&limit= — recherche paginée par pseudo. */
  @Get()
  searchUsers(@Query() query: SearchUserQueryDto): Promise<PaginateUsersDto> {
    return this.usersService.searchUsers(query);
  }

  /** GET /api/users/:username — profil public (déclaré après « me »). */
  @Get(':username')
  getPublicProfile(
    @Param('username') userName: string,
  ): Promise<PublicUserDto> {
    return this.usersService.getPublicProfile(userName);
  }
}
__END_OF_FILE__

cat > backend/src/users/users.service.ts <<'__END_OF_FILE__'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  AVATAR_DIR,
  AVATAR_EXTENSIONS,
  AVATAR_URL_PREFIX,
  DEFAULT_AVATAR_URL,
  uploadedAvatarUrl,
  withAvatarUrl,
} from './avatar.utils.js';
import type {
  PaginateUsersDto,
  PrivateUserDto,
  PublicUserDto,
  SearchUserQueryDto,
  UpdateProfileDto,
} from './users.dto.js';

/** Fichier tel que FileInterceptor le fournit (multer, stockage en mémoire). */
export interface UploadedAvatar {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

/** Champs visibles par tout le monde. */
const PUBLIC_USER_SELECT = {
  id: true,
  userName: true,
  bio: true,
  createdAt: true,
  avatarUrl: true,
  totalScore: true,
  gamesPlayed: true,
} as const;

/** Champs visibles uniquement par l'utilisateur lui-même. */
const PRIVATE_USER_SELECT = { ...PUBLIC_USER_SELECT, email: true } as const;

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await mkdir(AVATAR_DIR, { recursive: true });
  }

  // ---------- Profil ----------

  async getMe(userId: number): Promise<PrivateUserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: PRIVATE_USER_SELECT,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return withAvatarUrl(user);
  }

  async updateMe(
    userId: number,
    dto: UpdateProfileDto,
  ): Promise<PrivateUserDto> {
    try {
      if (dto.userName) {
        const existingUser = await this.prisma.user.findFirst({
          where: { userName: { equals: dto.userName, mode: 'insensitive' } },
        });
        if (existingUser && existingUser.id !== userId) {
          throw new ConflictException('This username is already taken');
        }
      }
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          ...(dto.userName !== undefined && { userName: dto.userName }),
          ...(dto.bio !== undefined && { bio: dto.bio }),
        },
        select: PRIVATE_USER_SELECT,
      });
      return withAvatarUrl(user);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('This username is already taken');
      }
      throw e;
    }
  }

  async searchUsers(query: SearchUserQueryDto): Promise<PaginateUsersDto> {
    const { search, page, limit } = query;
    const where: Prisma.UserWhereInput = search
      ? { userName: { contains: search, mode: 'insensitive' } }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: PUBLIC_USER_SELECT,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { userName: 'asc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map(withAvatarUrl),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getPublicProfile(userName: string): Promise<PublicUserDto> {
    const user = await this.prisma.user.findFirst({
      where: { userName: { equals: userName, mode: 'insensitive' } },
      select: PUBLIC_USER_SELECT,
    });
    if (!user) {
      throw new NotFoundException(`User ${userName} not found`);
    }
    return withAvatarUrl(user);
  }

  // ---------- Avatar ----------

  async updateAvatar(userId: number, file: UploadedAvatar) {
    // mimetype a été remplacé par le type détecté sur les octets (voir le contrôleur).
    const extension = AVATAR_EXTENSIONS[file.mimetype];
    if (!extension) {
      throw new BadRequestException('Unsupported image type');
    }
    const previous = await this.getAvatarUrl(userId);

    // Nom aléatoire : rien ne vient du client (ni nom, ni extension).
    const fileName = `${randomUUID()}.${extension}`;
    const avatarUrl = uploadedAvatarUrl(fileName);
    await writeFile(join(AVATAR_DIR, fileName), file.buffer, { flag: 'wx' });
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatarUrl },
      });
    } catch (error) {
      await this.deleteFile(avatarUrl);
      throw error;
    }
    await this.deleteFile(previous);
    return { avatarUrl };
  }

  async resetAvatar(userId: number) {
    const previous = await this.getAvatarUrl(userId);
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: null },
    });
    await this.deleteFile(previous);
    return { avatarUrl: DEFAULT_AVATAR_URL };
  }

  private async getAvatarUrl(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatarUrl: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.avatarUrl;
  }

  /** Supprime un ancien avatar. Un échec ne doit pas faire échouer la requête. */
  private async deleteFile(avatarUrl: string | null) {
    // On ne supprime que nos propres fichiers (pas une URL externe éventuelle).
    if (!avatarUrl?.startsWith(`${AVATAR_URL_PREFIX}/`)) {
      return;
    }
    const fileName = basename(avatarUrl);
    try {
      await unlink(join(AVATAR_DIR, fileName));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger.warn(`Could not delete avatar ${fileName}: ${String(error)}`);
      }
    }
  }
}
__END_OF_FILE__

cat > frontend/src/pages/Profile.tsx <<'__END_OF_FILE__'
import React, { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext';
import { Input, Button, useToast, Card } from "../components/ui";
import { profileSchema, type ProfileFormData } from "../schemas/profile";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarUploader } from '../components/profile/AvatarUploader';
import { useAuth } from '../contexts/useAuth';

type Profile = {
    username:   string; 
    bio:        string;
};

function Profile() {
    const { user, updateUser } = useAuth();
    const [profile, setProfile] = useState<Profile>({
        //firstName: "",
        //lastName: "",
        username: "",
        bio: "",
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: profile,
    });

    const { showToast } = useToast();
    const { isDark } = useTheme();

    
    const [isEdit, setEdit] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");

    // Charge profil depuis backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/users/me', {
                    method: 'GET',
                    credentials: 'include', //to save jwt in the front 
                });
                if (response.ok) {
                    const userData = await response.json();
                    const user = userData.user || userData;

                    const formattedProfile: Profile = {
                        username: user.userName || "",
                        bio: user.bio || "",
                    };

                    setProfile(formattedProfile);
                    reset(formattedProfile); //pre remplit formulaire
                }
            }
            catch (error){
                console.error("Error during thue update of the profile: ", error);

            }
        };

        fetchProfile();
    }, [reset]);


      const onSubmit = async (data: ProfileFormData) => {
        try {
            const payload = {
                userName: data.username,
                bio: data.bio,
            };

            const response = await fetch('/api/users/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                credentials: 'include', //to save jwt in the front 
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            // si username déjà pris : error
            if (!response.ok) {
                showToast({
                    title: "Error",
                    message: result.message || "Failed to update profile !",
                    variant: "error",
                });
                return;
            }
            
            const updatedUser = result.user || result;
            // garde le Header et le reste de l'app à jour (nouveau pseudo)
            updateUser({ userName: updatedUser.userName });
            setProfile({

                ...profile,
                username: updatedUser.userName || data.username,
                bio: updatedUser.bio ?? data.bio,
            });
            setEdit(false);
            
            showToast({
                title: "Success",
                message: "Your profile has been updated!",
                variant: "success",
            });
        }
        catch {
            showToast({
                title: "Network Error",
                message: "Unable to reach server",
                variant: "error",
            });
        }
    };

    function handleEdit() {
        reset(profile);
        setEdit(true);
    }

    function handleCancel() {
        reset(profile);
        setEdit(false);
    }

    function handleFriend(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!friendUsername.trim()) return ;
        console.log("You send a friend request to: ", friendUsername);
        setFriendUsername("");
        setAddFriend(false);
    }

    return (
        <main className={`min-h-screen px-4 py-16 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
            {user && (
                <div className="mb-8 space-y-3">
                    <h2 className="text-xl font-bold">{profile.username || user.userName}</h2>
                    <AvatarUploader
                        userName={user.userName}
                        avatarUrl={user.avatarUrl}
                        onChange={(avatarUrl) => updateUser({ avatarUrl })}
                    />
                </div>
            )}

            <div className="mt-4">
                <Button type="button" variant="primary" size="md" 
                onClick={() => setAddFriend(!addFriend)}>Add a friend</Button>

                {addFriend && (
                    <form onSubmit={handleFriend} 
                    className="mt-4 flex gap-2">
                        <input type="text" value={friendUsername}
                        onChange={(e) => setFriendUsername(e.target.value)}
                        placeholder="Enter an username..."
                        className="min-w-0 rounded-lg border border-white/20
                        bg-slate-800 p-2" />

                        <Button type="submit" variant="primary" size="md">Send</Button>
                    </form>
                )}
            </div>

            <section className="mt-8">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-2xl font-bold">Informations</h2>
                    {!isEdit && (
                        <Button type="button" onClick={handleEdit}
                        variant="primary" size="md">Modify Profile</Button>
                    )}
                </div>

                {isEdit ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        {//<Input label="First Name" {... register('firstName')}
                        //error={errors.firstName?.message} />

                        //<Input label="Last Name" {... register('lastName')}
                        //error={errors.lastName?.message} />
                        }

                        <Input label="Username" {... register('username')}
                        error={errors.username?.message} />

                        <Input label="Biography (optional)" {... register('bio')}
                        error={errors.bio?.message} />

                        <Button type="submit" variant="secondary"
                        size="md" className="mr-2">Submit</Button>

                        <Button type="button" onClick={handleCancel}
                        variant="danger" size="md">Cancel</Button>
                    </form>
                ) : (
                    <div className="mt-6 space-y-4 p-2">
                        {//<p>First Name: {profile.firstName || "No information"}</p>
                        //<p>Last Name: {profile.lastName || "No information"}</p>
                }
                        <p>Username: {profile.username || "No information"}</p>
                        <p>Biography: {profile.bio || "No information"}</p>
                    </div>
                )}
            </section>

            <section className="mt-10">
                <div className="flex items-center justify-between border-b border-white/20 pb-2">
                    <h2 className="text-2xl font-bold">Stats</h2>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-4">
                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Games played</h3>
                    </Card>

                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Games won</h3>
                    </Card>

                    <Card as="article" padding="sm">
                        <h3 className="text-xl text-muted">Win rate</h3>
                    </Card>
                </div>
            </section>
        </main>
    );
}

export default Profile;
__END_OF_FILE__

cat > frontend/src/main.tsx <<'__END_OF_FILE__'
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { AuthProvider } from './contexts/AuthContextValue.tsx';
import App from './App.tsx';
import './index.css';
import { RoomProvider } from './contexts/RoomContextValue.tsx';
import { ToastProvider } from './components/ui/ToastProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AuthProvider>
            <RoomProvider>
              <App />
            </RoomProvider>
          </AuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
__END_OF_FILE__

# 4. Marque tout comme résolu (schemas/profile.ts de la 24 est conservé)
git add backend frontend

# 5. Vérifications
if grep -rn '^<<<<<<<\|^>>>>>>>' backend/src backend/prisma frontend/src; then echo "❌ Il reste des marqueurs de conflit."; exit 1; fi
if git diff --name-only --diff-filter=U | grep -q .; then echo "❌ Fichiers encore en conflit :"; git diff --name-only --diff-filter=U; exit 1; fi
echo "✅ Conflits résolus. Termine avec : git commit --no-edit"