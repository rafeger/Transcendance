import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ValidationPipe, UsePipes, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketRegistryService } from './socket-registry.services.js';
import { ChatMessageDto } from './chat-message.dto.js';

export interface AuthPayload {
  sub: string;
}

@WebSocketGateway({
  cors: {
    origin: ['https://localhost:8443', 'http://localhost:5173'], // ajouter 'https://adress_du_site.com',
    credentials: true,
  },
})
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => new WsException(errors),
  }),
)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly registry: SocketRegistryService,
    //private readonly gameService: GameService,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const token = this.extractJwtFromCookie(client);
    if (!token) {
      this.logger.warn(`Connection refused (no JWT cookie) : ${client.id}`);
      client.disconnect(true);
      return;
    }

    let payload: AuthPayload;
    try {
      payload = await this.jwtService.verifyAsync<AuthPayload>(token);
    } catch {
      this.logger.warn(
        `Connection refused (invalid/expired JWT) : ${client.id}`,
      );
      client.disconnect(true);
      return;
    }

    const userId = payload.sub;
    client.data.userId = userId;

    this.registry.add(userId, client);

    this.logger.log(`Connected : user=${userId} socket=${client.id} 
                (${this.registry.count(userId)} socket(s))`);

    //renvoie état complet uniquement au joueur qui se reconnecte
   // client.emit('room_list', this.gameService.getAllRooms());

    // Vérifie si le joueur fait déjà partie d'une room
    //const activeRoom = this.gameService.findRoomByUser(userId);
    //if (activeRoom) {
    //  client.join(activeRoom.code);
    //  this.gameService.setPlayerConnected(activeRoom.code, userId,true);
//
    //  // Préviens les autres joueurs de la room que le joueur est revenu
    //  client.to(activeRoom.code).emit('room_updated', activeRoom);
    //}

    this.server.emit('room', client.id + ' joined');
  }

  private extractJwtFromCookie(client: Socket): string | null {
    const cookieHeader: string | undefined = client.handshake.headers?.cookie;
    this.logger.debug(`Cookie header reçu : ${cookieHeader}`); //debug
    if (!cookieHeader) {
      return null;
    }

    const cookies = Object.fromEntries(
      cookieHeader.split(';').map((part) => {
        const idx = part.indexOf('=');
        return [part.slice(0, idx).trim(), part.slice(idx + 1)];
      }),
    );
    return cookies['access_token'] ?? null;
  }

  handleDisconnect(client: Socket): void {
    const userId: string = client.data?.userId;
    if (userId) {
      this.registry.remove(userId, client);
      this.logger.log(`Disconnected : user =${userId} socket=${client.id} 
                (${this.registry.count(userId)} socket(s) left))`);
    } else {
      this.logger.log(`Socket not Authentified closed : ${client.id}`);
    }

    //if (this.registry.count(userId) === 0){
    //  const activeRoom = this.gameService.findRoomByUser(userId);
    //  if (activeRoom) {
    //    this.gameService.setPlayerConnected(activeRoom.room, userId, false);
    //    this.server.to(activeRoom.code).emit('game_state', activeRoom);
    //  }
    //}
    this.server.emit('room', client.id + ' left');
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @MessageBody() dto: ChatMessageDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.logger.log(
      `Message from user=${client.data.userId} : "${dto.content}"`,
    );
    this.server.emit('chatMessage', {
      from: client.data.userId,
      content: dto.content,
      at: new Date().toISOString(),
    });
  }

  //@SubscribeMessage('customName')
  //handleMessage(client: Socket, message: any): void {
  //    this.server.emit('room',`[${client.id}] -> ${message}`);
  //}

  // @SubscribeMessage('events')
  // handleEvents(
  //    @MessageBody() data: unknown,
  //    @ConnectedSocket() client: Socket,
  // ): WsResponse<unknown> {
  //    id === messageBody.id
  // console.log('Message recu de React: ', data);
  // this.logger.log(`Message recu de React : ${JSON.stringify(data)}`);
  //
  //    const event = 'events';
  //    return { event: 'events', data };
  // }

  //@SubscribeMessage('events')
  //onEvents(@MessageBody() data: unknown): Observable<WsResponse<number>> {
  //    const event = 'events';
  //    const response = [1, 2, 3];
  //
  //    return from(response).pipe(
  //        map(data => ({ event, data})),
  //    );
  //}
}
