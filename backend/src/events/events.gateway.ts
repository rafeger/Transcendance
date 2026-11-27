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
import { ValidationPipe, UsePipes, UseFilters, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SocketRegistryService } from './socket-registry.services.js';
import { ChatMessageDto } from './chat-message.dto.js';
import {
  MAX_MESSAGE_BYTES,
  WS_UNAUTHORIZED,
  profileOf,
  socketAuthMiddleware,
  userIdOf,
} from './socket-auth.js';
import { RoomsService, RoomError } from './rooms.service.js';
import {
  CreateRoomDto,
  JoinRoomDto,
  ReadyDto,
  RoomSettingsDto,
} from './rooms.dto.js';
import { WsAckExceptionFilter } from './ws-ack-exception.filter.js';
import { UsersService } from '../users/users.service.js';
import {
  LOBBY_GRACE_MS,
  type Ack,
  type PlayerProfile,
  type RoomState,
} from '../game/protocol.js';

// socket.io room name that groups every socket of a room's players
const roomChannel = (code: string) => `room:${code}`;
const LOBBY_CHANNEL = 'lobby';
// closed tab grace period - if we are triying to reconnect
const LEAVE_GRACE_MS = LOBBY_GRACE_MS;
type Timer = ReturnType<typeof setTimeout>;

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
// errors (invalid payload, RoomError...) come back in the ack: { ok: false, code }
@UseFilters(new WsAckExceptionFilter())
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  // userId >> the timer that will remove them from their room
  private readonly leaveTimers = new Map<number, Timer>();

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly registry: SocketRegistryService,
    private readonly rooms: RoomsService,
    private readonly users: UsersService,
  ) {}

  // Appelé une fois au démarrage. Deux middlewares, exécutés dans l'ordre
  // pendant le handshake, AVANT handleConnection :
  //   1. le JWT du cookie est vérifié  -> socket.data.userId
  //   2. le profil est chargé en base  -> socket.data.profile
  // Un refus envoie `connect_error` (message UNAUTHORIZED) au front.
  // Ils valent pour tout le namespace par défaut, donc aussi pour les futures
  // gateways qui l'utilisent : elles ne doivent pas en ajouter d'autres.
  afterInit(server: Server): void {
    server.use(
      socketAuthMiddleware(this.jwtService, (socketId, reason) =>
        this.logger.warn(`Connection refused (${reason}) : ${socketId}`),
      ),
    );
    server.use((socket, next) => {
      const userId = userIdOf(socket);
      // the profile is loaded here and not in room:join because reading the
      // database requires an await: inside join, it would break the last
      // seat rule. RoomsService gets it ready-made.
      this.loadProfile(userId).then(
        (profile) => {
          socket.data.profile = profile;
          next();
        },
        () => {
          this.logger.warn(`Connection refused (user ${userId} not found)`);
          next(new Error(WS_UNAUTHORIZED));
        },
      );
    });
  }

  // Les middlewares ont validé le JWT et chargé le profil : ici le socket
  // est forcément authentifié.
  handleConnection(client: Socket): void {
    const userId = userIdOf(client);

    this.registry.add(userId, client);
    void client.join(LOBBY_CHANNEL);
    // came back in time
    this.cancelLeaveTimer(userId);

    // already in a room (a second tab, or a refresh) - all sockets must GET IT
    const current = this.rooms.getRoomOf(userId);
    if (current) void client.join(roomChannel(current.code));

    this.logger.log(
      `Connected : user=${userId} socket=${client.id} (${this.registry.count(userId)} socket(s))`,
    );
  }

  handleDisconnect(client: Socket): void {
    const userId: unknown = client.data?.userId;
    if (typeof userId !== 'number') return; // refusé par un middleware
    this.registry.remove(userId, client);
    this.logger.log(
      `Disconnected : user=${userId} socket=${client.id} (${this.registry.count(userId)} socket(s) left)`,
    );
    if (this.registry.count(userId) === 0 && this.rooms.getRoomOf(userId)) {
      this.startLeaveTimer(userId);
    }
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

  //     ROOMS:
  // each handler -- function but called for you when something happens
  // RoomsService (the rules) --> tell the room's players changes (room:state)
  // -> answer the browser that asked (the ack).

  // read all pub rooms + user current one
  @SubscribeMessage('session:sync') // label
  handleSessionSync(@ConnectedSocket() client: Socket) {
    // handler - the function that runs
    const userId = userIdOf(client);
    return this.answer(() => ({
      rooms: this.rooms.listPublic(),
      currentRoom: this.rooms.getRoomOf(userId),
    }));
  }

  @SubscribeMessage('room:create')
  handleCreateRoom(
    @MessageBody() dto: CreateRoomDto,
    // puts the message's content here
    @ConnectedSocket() client: Socket,
    // put the socket that sent it
  ): Ack<{ room: RoomState }> {
    const profile = profileOf(client);
    return this.answer(() => {
      const room = this.rooms.create(profile, dto);
      this.joinChannel(profile.userId, room.code);
      this.emitRoomState(room);
      if (room.isPublic) this.emitLobbyRooms(); // a new room in the list
      return { room };
    });
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @MessageBody() dto: JoinRoomDto,
    @ConnectedSocket() client: Socket,
  ): Ack<{ room: RoomState }> {
    const profile = profileOf(client);
    return this.answer(() => {
      const room = this.rooms.join(profile, dto.roomCode);
      this.joinChannel(profile.userId, room.code);
      this.emitRoomState(room);
      if (room.isPublic) this.emitLobbyRooms(); // player count changed
      return { room };
    });
  }

  @SubscribeMessage('room:leave')
  handleLeaveRoom(@ConnectedSocket() client: Socket): Ack {
    const userId = userIdOf(client);
    return this.answer(() => {
      this.removeFromRoom(userId);
      return {};
    });
  }

  @SubscribeMessage('room:ready')
  handleReady(
    @MessageBody() dto: ReadyDto,
    @ConnectedSocket() client: Socket,
  ): Ack {
    const userId = userIdOf(client);
    return this.answer(() => {
      const room = this.rooms.setReady(userId, dto.ready);
      this.emitRoomState(room);
      return {};
    });
  }

  // host only, in the LOBBY; everyone goes back to "not ready"
  // (the check of the available questions comes with the questions service)
  @SubscribeMessage('room:settings')
  handleSettings(
    @MessageBody() dto: RoomSettingsDto,
    @ConnectedSocket() client: Socket,
  ): Ack {
    const userId = userIdOf(client);
    return this.answer(() => {
      const room = this.rooms.updateSettings(userId, {
        questionCount: dto.questionCount,
        category: dto.category,
        difficulty: dto.difficulty,
      });
      this.emitRoomState(room);
      return {};
    });
  }

  // name + avatar shown in the room (withAvatarUrl is already applied by getMe)
  private async loadProfile(userId: number): Promise<PlayerProfile> {
    const user = await this.users.getMe(userId);
    return {
      userId,
      displayName: user.userName,
      avatarUrl: user.avatarUrl,
    };
  }

  // you run 'action'; room-err (ex . ROOM_FULL) -> {ok: false, code}.
  private answer<T extends object>(action: () => T): Ack<T> {
    try {
      return { ok: true, ...action() };
    } catch (e) {
      if (e instanceof RoomError) return { ok: false, code: e.code };
      throw e;
    }
  }

  private startLeaveTimer(userId: number): void {
    this.cancelLeaveTimer(userId);
    const timer = setTimeout(() => {
      this.leaveTimers.delete(userId);
      this.logger.log(`User=${userId} did not come back: leaving their room`);
      this.removeFromRoom(userId);
    }, LEAVE_GRACE_MS);
    this.leaveTimers.set(userId, timer);
  }

  private cancelLeaveTimer(userId: number): void {
    const timer = this.leaveTimers.get(userId);
    if (timer) {
      clearTimeout(timer);
      this.leaveTimers.delete(userId);
    }
  }

  // everything "leaving a room" means (room:leave)
  private removeFromRoom(userId: number): void {
    const result = this.rooms.leave(userId);
    if (!result) return; // was in no room

    this.leaveChannel(userId, result.room.code);
    // tell all the user's tabs, so they don't keep
    this.emitToUser(userId, 'room:closed', { code: result.room.code });
    // tell players restants (new host, one player fewer)
    if (!result.deleted) this.emitRoomState(result.room);
    // count, host name, or the room is gone from the list
    if (result.room.isPublic) this.emitLobbyRooms();
  }

  // send the full room to every socket of every player inside
  private emitRoomState(room: RoomState): void {
    this.server.to(roomChannel(room.code)).emit('room:state', room);
  }

  // sends whole list of lobbies
  private emitLobbyRooms(): void {
    this.server.to(LOBBY_CHANNEL).emit('lobby:rooms', this.rooms.listPublic());
  }

  // all the user's sockets (everytabs), not just the one that sent the msg
  private joinChannel(userId: number, code: string): void {
    for (const socket of this.registry.getSockets(userId)) {
      void socket.join(roomChannel(code));
    }
  }

  private leaveChannel(userId: number, code: string): void {
    for (const socket of this.registry.getSockets(userId)) {
      void socket.leave(roomChannel(code));
    }
  }

  // sends message to all sockets of one
  private emitToUser(userId: number, event: string, data: object): void {
    for (const socket of this.registry.getSockets(userId)) {
      socket.emit(event, data);
    }
  }
}
