import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketRegistryService } from './socket-registry.services.js';
import { RoomsService } from './rooms.service.js';

@Module({
  //imports: [
  //  JwtModule.registerAsync({
  //    imports: [ConfigModule],
  //    inject: [ConfigService],
  //    useFactory: (config: ConfigService) => ({
  //      secret: config.getOrThrow('JWT_SECRET'),
  //    }),
  //  }),
  //],
  providers: [EventsGateway, SocketRegistryService, RoomsService],
})
export class EventsModule {}
