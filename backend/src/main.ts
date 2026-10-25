// creates entry file of the application - the server
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add in the /api prefix
  app.setGlobalPrefix('api');


  const config = app.get(ConfigService);
  console.log('Port from config:', config.get('PORT'));
  console.log('PORT from process.env: ', process.env.PORT);
   // 'PORT' need to define through configservice
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }));
  await app.listen(config.getOrThrow('PORT'));
  // Read port directly from env bypassing config system
  // await app.listen(process.env.PORT ?? 8443);
}
await bootstrap();

