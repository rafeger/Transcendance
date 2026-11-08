import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator.js';

export interface JwtPayload { //JwtPayload : le type, qui décrit le contenu de ton jeton (sub et role, ce que tu as mis dans signAsync).
  sub: number;
  role: 'PLAYER' | 'ADMIN';
}

@Injectable()
export class JwtAuthGuard implements CanActivate { //c'est le contrat d'un guard dans NestJS. La classe doit avoir une méthode canActivate qui répond oui (la requête passe) ou non (elle est refusée).
  constructor(private readonly jwt: JwtService, private readonly reflector: Reflector) {} //Reflector est l'outil de NestJS qui lit les étiquettes posées par SetMetadata. Il regarde la méthode (getHandler()) puis la classe (getClass()), donc @Public() fonctionne posé sur une seule route ou sur tout un contrôleur. S'il trouve l'étiquette, la route est publique : on laisse passer sans rien vérifier.

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request & { user?: JwtPayload }>();//n guard peut servir pour du HTTP, des WebSockets…, d'où ce passage par context, qui donne accès à la requête HTTP.
    const token: string | undefined = req.cookies?.access_token; //le cookie, lu grâce à cookie-parser. Le ?. évite de planter si cookies n'existe pas.Pas de jeton → 401.
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
        //rea.user on accroche le contenu du jeton à la requête. Les contrôleurs pourront lire req.user.sub pour savoir qui fait la requête, sans interroger la base. C'est ce dont GET /me aura besoin.
      req.user = await this.jwt.verifyAsync<JwtPayload>(token); // il vérifie la signature (avec le secret, et seulement l'algorithme HS256, grâce à la configuration du module) et la date d'expiration. Si l'une des deux est mauvaise, il lève une erreur, que l'on transforme en 401.
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
