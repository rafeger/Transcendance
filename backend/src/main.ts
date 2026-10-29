// creates entry file of the application - the server
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'MyQuiz',
      json: true,
      logLevels: ['log', 'warn', 'error', 'fatal'],
    }),
  });
  // add in the /api prefix
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
