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
import { AVATAR_DIR, AVATAR_EXTENSIONS, toAvatarUrl } from './avatar.utils.js';

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
    await writeFile(join(AVATAR_DIR, fileName), file.buffer, { flag: 'wx' });
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar: fileName },
      });
    } catch (error) {
      await this.deleteFile(fileName);
      throw error;
    }
    await this.deleteFile(previous);
    return { avatarUrl: toAvatarUrl(fileName) };
  }

  async resetAvatar(userId: number) {
    const previous = await this.getAvatar(userId);
    await this.prisma.user.update({
      where: { id: userId },
      data: { avatar: null },
    });
    await this.deleteFile(previous);
    return { avatarUrl: toAvatarUrl(null) };
  }

  private async getAvatar(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.avatar;
  }

  /** Supprime un ancien avatar. Un échec ne doit pas faire échouer la requête. */
  private async deleteFile(fileName: string | null) {
    if (!fileName) {
      return;
    }
    try {
      await unlink(join(AVATAR_DIR, basename(fileName)));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger.warn(`Could not delete avatar ${fileName}: ${String(error)}`);
      }
    }
  }
}