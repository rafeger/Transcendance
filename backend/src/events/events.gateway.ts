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
import type { JwtPayload } from '../auth/jwt-auth.guard.js';
import {
  RoomsService,
  RoomError,
  type PlayerProfile,
  type RoomErrorCode,
  type RoomState,
} from './rooms.service.js';
import { CreateRoomDto, JoinRoomDto, ReadyDto } from './rooms.dto.js';
import { UsersService } from '../users/users.service.js';
import { withAvatarUrl } from '../users/avatar.utils.js';

type Ack<T extends object = object> =
  ({ ok: true } & T) | { ok: false; code: RoomErrorCode };

// socket.io room name that groups every socket of a room's players 
const roomChannel = (code: string) => `room:${code}`;
const LOBBY_CHANNEL = 'lobby';
// closed tab grace period - if we are triying to reconnect 
const LEAVE_GRACE_MS = 5_000;
type Timer = ReturnType<typeof setTimeout>;

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

  async handleConnection(client: Socket): Promise<void> {
    const token = this.extractJwtFromCookie(client);
    if (!token) {
      this.logger.warn(`Connection refused (no JWT cookie) : ${client.id}`);
      client.disconnect(true);
      return;
    }
// payload is part of the login token that carries information; it carries user's id for us
// created in auth.service.ts -- > signAsync
// token is put in access_cookie 

    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      this.logger.warn(
        `Connection refused (invalid/expired JWT) : ${client.id}`,
      );
      client.disconnect(true);
      return;
    }

    const userId = payload.sub;
    let profile: PlayerProfile;
    try {
      // we load here and not when we join because reading database
      // requires an await 
      // here, hamless bc nobody is taking sear;
      // inside join, would break the last seat rule
      // gateway gives to RoomsService ready-made
      const user = withAvatarUrl(await this.users.getMe(userId));
      profile = {
        userId,
        displayName: user.userName,
        avatarUrl: user.avatarUrl,
      };
    } catch {
      this.logger.warn(`Connection refused (user ${userId} not found)`);
      client.disconnect(true);
      return;
    }

    client.data.userId = userId;
    client.data.profile = profile;

    this.registry.add(userId, client);
    client.join(LOBBY_CHANNEL);
    // cameback in time 
    this.cancelLeaveTimer(userId);

    // already in a room (a second tab, or a refresh) - all sockets must GET IT
    const current = this.rooms.getRoomOf(userId);
    if (current) client.join(roomChannel(current.code));

    this.logger.log(`Connected : user=${userId} socket=${client.id}
                (${this.registry.count(userId)} socket(s))`);

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
    const userId: number | undefined = client.data?.userId;
    if (userId) {
      this.registry.remove(userId, client);
      this.logger.log(`Disconnected : user =${userId} socket=${client.id}
                (${this.registry.count(userId)} socket(s) left))`);
      if (this.registry.count(userId) === 0 && this.rooms.getRoomOf(userId)) {
        this.startLeaveTimer(userId);
      }
    } else {
      this.logger.log(`Socket not Authentified closed : ${client.id}`);
    }
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

//     ROOMS:
// each handler -- function but called for you when something happens
// RoomsService (the rules) --> tell the room's players changes (room:state)
// -> answer the browser that asked (the ack).

// read all pub rooms + user current one 
  @SubscribeMessage('session:sync') // label
  handleSessionSync(@ConnectedSocket() client: Socket) {
    // handler - the function that runs 
    const userId: number = client.data.userId;
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
    const profile: PlayerProfile = client.data.profile;
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
    const profile: PlayerProfile = client.data.profile;
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
    const userId: number = client.data.userId;
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
    const userId: number = client.data.userId;
    return this.answer(() => {
      const room = this.rooms.setReady(userId, dto.ready);
      this.emitRoomState(room);
      return {};
    });
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
      socket.join(roomChannel(code));
    }
  }
  private leaveChannel(userId: number, code: string): void {
    for (const socket of this.registry.getSockets(userId)) {
      socket.leave(roomChannel(code));
    }
  }
  // sends message to all sockets of one
  private emitToUser(userId: number, event: string, data: object): void {
    for (const socket of this.registry.getSockets(userId)) {
      socket.emit(event, data);
    }
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
