// root module of the application

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ], // loads .env file and we cna use config mod in other places
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
