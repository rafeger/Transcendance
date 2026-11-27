import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway.js';
import { SocketRegistryService } from './socket-registry.services.js';

// JwtService vient de AuthModule (JwtModule.registerAsync avec global: true) :
// pas besoin de réimporter JwtModule ici.
@Module({
  providers: [EventsGateway, SocketRegistryService],
  exports: [SocketRegistryService],
})
export class EventsModule {}
