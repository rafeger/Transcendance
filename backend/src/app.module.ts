// root module of the application

import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { HealthModule } from './health/health.module.js';
import { EventsModule } from './events/events.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { QuestionsModule } from './questions/questions.module.js';//temporaire le temps de créer le moteur de partie

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    // PrismaModule needs ConfigModule so order matters
    PrismaModule,
    HealthModule,
    EventsModule,
    AuthModule,
<<<<<<< Updated upstream
    UsersModule
=======
    UsersModule,
    QuestionsModule,
>>>>>>> Stashed changes
  ], // loads .env file and we cna use config mod in other places
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
