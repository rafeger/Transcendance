import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // loads .env file and we cna use config mod in other places
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
