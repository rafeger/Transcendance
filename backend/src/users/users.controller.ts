import {
  Controller,
  Delete,
  FileTypeValidator,
  ParseFilePipe,
  Put,
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
import { UsersService } from './users.service.js';
import type { UploadedAvatar } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** PUT /api/users/me/avatar — multipart/form-data, champ « avatar ». */
  @Put('me/avatar')
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
}