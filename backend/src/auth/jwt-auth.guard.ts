import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator.js';

export interface JwtPayload { //JwtPayload : le type, qui décrit le contenu de ton jeton 
  sub: number;
}

@Injectable()
export class JwtAuthGuard implements CanActivate { 
  constructor(private readonly jwt: JwtService, private readonly reflector: Reflector) {} 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const token: string | undefined = req.cookies?.access_token; 
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      req.user = await this.jwt.verifyAsync<JwtPayload>(token); 
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
