import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto, LoginDto } from './auth.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
  private readonly dummyHash = argon2.hash('fauxpassHash+pour+simuler_lememetempsdereponse', { type: argon2.argon2id });

  async register(dto: RegisterDto) {
    const passHash = await argon2.hash(dto.password, { type: argon2.argon2id });
    try {
      return await this.prisma.user.create({
        data: { email: dto.email.trim().toLowerCase(), userName: dto.userName, passHash },
        select: { id: true, email: true, userName: true, createdAt: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Registration failed');
      }
      throw e;
    }
  }
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.trim().toLowerCase() },
    });
    const hash = user?.passHash ?? (await this.dummyHash);
    const isPasswordValid = await argon2.verify(hash, dto.password);
    if (!user || !isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  return this.jwt.signAsync({ sub: user.id });
  }
  
  async me(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, userName: true, createdAt: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

