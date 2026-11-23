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
