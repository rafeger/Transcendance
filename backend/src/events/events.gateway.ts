import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { ValidationPipe, UsePipes, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketRegistryService } from './socket-registry.services.js';
import { ChatMessageDto } from './chat-message.dto.js';
import {
  MAX_MESSAGE_BYTES,
  socketAuthMiddleware,
  userIdOf,
} from './socket-auth.js';

@WebSocketGateway({
  cors: {
    origin: ['https://localhost:8443', 'http://localhost:5173'], // ajouter 'https://adress_du_site.com',
    credentials: true,
  },
  // Au-delà, socket.io coupe la connexion (défaut : 1 Mo).
  maxHttpBufferSize: MAX_MESSAGE_BYTES,
})
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => new WsException(errors),
  }),
)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly registry: SocketRegistryService,
  ) {}

  // Appelé une fois au démarrage : branche l'authentification sur le handshake.
  // Ce middleware vaut pour tout le namespace par défaut, donc aussi pour les
  // futures gateways qui l'utilisent : elles ne doivent pas en ajouter un autre.
  afterInit(server: Server): void {
    server.use(
      socketAuthMiddleware(this.jwtService, (socketId, reason) =>
        this.logger.warn(`Connection refused (${reason}) : ${socketId}`),
      ),
    );
  }

  // Le middleware a déjà validé le JWT : ici le socket est forcément authentifié.
  handleConnection(client: Socket): void {
    const userId = userIdOf(client);
    this.registry.add(userId, client);
    this.logger.log(
      `Connected : user=${userId} socket=${client.id} (${this.registry.count(userId)} socket(s))`,
    );
  }

  handleDisconnect(client: Socket): void {
    const userId: unknown = client.data?.userId;
    if (typeof userId !== 'number') return; // refusé par le middleware
    this.registry.remove(userId, client);
    this.logger.log(
      `Disconnected : user=${userId} socket=${client.id} (${this.registry.count(userId)} socket(s) left)`,
    );
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(
    @MessageBody() dto: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const userId = userIdOf(client);
    this.logger.log(`Message from user=${userId} : "${dto.content}"`);
    this.server.emit('chatMessage', {
      from: userId,
      content: dto.content,
      at: new Date().toISOString(),
    });
  }
}
