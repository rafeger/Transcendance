// creates entry file of the application - the server
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'MyQuiz',
      json: true,
      logLevels: ['log', 'warn', 'error', 'fatal'],
    }),
  });
  app.use(cookieParser());// le guard (jwt-auth.guard.ts) qui lit le cookie. Le contrôleur, lui, le pose, avec res.cookie(), qui n'a pas besoin de cookie-parser.
  app.setGlobalPrefix('api');

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
