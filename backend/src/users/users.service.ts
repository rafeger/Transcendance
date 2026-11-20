import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  AVATAR_DIR,
  AVATAR_EXTENSIONS,
  AVATAR_URL_PREFIX,
  DEFAULT_AVATAR_URL,
  uploadedAvatarUrl,
} from './avatar.utils.js';

/** Fichier tel que FileInterceptor le fournit (multer, stockage en mémoire). */
export interface UploadedAvatar {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await mkdir(AVATAR_DIR, { recursive: true });
  }

  async updateAvatar(userId: number, file: UploadedAvatar) {
    // mimetype a été remplacé par le type détecté sur les octets (voir le contrôleur).
    const extension = AVATAR_EXTENSIONS[file.mimetype];
    if (!extension) {
      throw new BadRequestException('Unsupported image type');
    }
    const previous = await this.getAvatar(userId);

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
    const previous = await this.getAvatar(userId);
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatarUrl: null },
    });
    await this.deleteFile(previous);
    return { avatarUrl: DEFAULT_AVATAR_URL };
  }

  private async getAvatar(userId: number) {
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