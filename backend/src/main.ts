import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add in the /api prefix
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);
  // 'PORT' need to define through configservice
  await app.listen(config.getOrThrow<number>('PORT'));
  // Read port directly from env bypassing config system
  // await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
