// Authentification des sockets : le JWT est lu dans le cookie httpOnly
// `access_token` au moment du handshake, avant que la connexion soit acceptée.

import type { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import type { JwtPayload } from '../auth/jwt-auth.guard.js';

/** Message d'erreur reçu par le front dans `connect_error` (err.message). */
export const WS_UNAUTHORIZED = 'UNAUTHORIZED';

/** Taille max d'un message client (GAME_SPEC §2.2) : 4 Ko. */
export const MAX_MESSAGE_BYTES = 4096;

/** Lit un cookie dans l'en-tête `Cookie` brut ; null s'il est absent. */
export function readCookie(
  header: string | undefined,
  name: string,
): string | null {
  if (!header) return null;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() !== name) continue;
    const value = part.slice(idx + 1).trim();
    try {
      return decodeURIComponent(value);
    } catch {
      return value; // encodage invalide : on garde la valeur brute
    }
  }
  return null;
}

/**
 * Middleware socket.io : refuse la connexion sans JWT valide.
 * Il tourne AVANT `handleConnection` : aucun message ne peut arriver
 * tant que `socket.data.userId` n'est pas posé.
 */
export function socketAuthMiddleware(
  jwt: JwtService,
  onRefused: (socketId: string, reason: string) => void,
) {
  return (socket: Socket, next: (err?: Error) => void): void => {
    const token = readCookie(socket.handshake.headers.cookie, 'access_token');
    if (!token) {
      onRefused(socket.id, 'no JWT cookie');
      next(new Error(WS_UNAUTHORIZED));
      return;
    }
    jwt.verifyAsync<JwtPayload>(token).then(
      (payload) => {
        if (!Number.isInteger(payload.sub) || payload.sub <= 0) {
          onRefused(socket.id, 'invalid JWT payload');
          next(new Error(WS_UNAUTHORIZED));
          return;
        }
        socket.data.userId = payload.sub;
        next();
      },
      () => {
        onRefused(socket.id, 'invalid/expired JWT');
        next(new Error(WS_UNAUTHORIZED));
      },
    );
  };
}

/** userId posé par le middleware ; lève si le socket n'est pas authentifié. */
export function userIdOf(socket: Socket): number {
  const userId: unknown = socket.data?.userId;
  if (typeof userId !== 'number') {
    throw new WsException(WS_UNAUTHORIZED);
  }
  return userId;
}
