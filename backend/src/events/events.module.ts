import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway.js';
import { SocketRegistryService } from './socket-registry.services.js';
import { RoomsService } from './rooms.service.js';
import { UsersModule } from '../users/users.module.js';

// JwtService vient de AuthModule (JwtModule.registerAsync avec global: true) :
// pas besoin de réimporter JwtModule ici.
@Module({
  // need user module -> user service to get user name + avatar
  imports: [UsersModule],
  providers: [EventsGateway, SocketRegistryService, RoomsService],
  // utilisés par le module du jeu (#21)
  exports: [SocketRegistryService, RoomsService],
})
export class EventsModule {}
