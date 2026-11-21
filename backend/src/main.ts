// creates entry file of the application - the server
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import type { NestExpressApplication } from '@nestjs/platform-express';
import type { ServerResponse } from 'node:http';
import {
  AVATAR_DIR,
  AVATAR_URL_PREFIX,
  DEFAULT_AVATAR_DIR,
} from './users/avatar.utils.js';

// En-têtes des images servies : le navigateur ne doit jamais les interpréter
// comme autre chose qu'une image (pas de HTML, pas de script).
function setAvatarHeaders(res: ServerResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'MyQuiz',
      json: true,
      logLevels: ['log', 'warn', 'error', 'fatal'],
    }),
  });
  app.set('trust proxy', 1);
  app.use(cookieParser()); // le guard (jwt-auth.guard.ts) qui lit le cookie. Le contrôleur, lui, le pose, avec res.cookie(), qui n'a pas besoin de cookie-parser.
  app.setGlobalPrefix('api');

  // Avatars envoyés : nom aléatoire jamais réutilisé → cache navigateur d'un an.
  app.useStaticAssets(AVATAR_DIR, {
    prefix: AVATAR_URL_PREFIX,
    index: false,
    redirect: false,
    immutable: true,
    maxAge: '365d',
    setHeaders: setAvatarHeaders,
  });
  // Si le fichier n'est pas dans uploads/, on cherche l'avatar par défaut.
  app.useStaticAssets(DEFAULT_AVATAR_DIR, {
    prefix: AVATAR_URL_PREFIX,
    index: false,
    redirect: false,
    maxAge: '1d',
    setHeaders: setAvatarHeaders,
  });

  const config = app.get(ConfigService);
  // console.log('Port from config:', config.get('PORT'));
  // console.log('PORT from process.env: ', process.env.PORT);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(config.getOrThrow('PORT'));
}
await bootstrap();