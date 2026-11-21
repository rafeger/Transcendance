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
