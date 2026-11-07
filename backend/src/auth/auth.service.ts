import { ConflictException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './auth.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const passHash = await argon2.hash(dto.password, { type: argon2.argon2id });
    try {
      return await this.prisma.user.create({
        data: { email: dto.email.trim().toLowerCase(), userName: dto.userName, passHash },
        select: { id: true, email: true, userName: true, role: true, createdAt: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Registration failed');
      }
      throw e;
    }
  }
}

