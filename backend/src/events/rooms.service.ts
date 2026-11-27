import { Injectable, Logger } from '@nestjs/common';
import { randomInt } from 'node:crypto';
import {
  DEFAULT_SETTINGS,
  MIN_PLAYERS,
  type CreateRoomPayload,
  type ErrorCode,
  type PlayerProfile,
  type RoomSettings,
  type RoomState,
  type RoomSummary,
} from '../game/protocol.js';

// Types et constantes déplacés dans game/protocol.ts (contrat partagé avec
// le front) ; ré-exportés ici pour ne rien casser chez ceux qui les importent.
export { MAX_PLAYERS, MIN_PLAYERS } from '../game/protocol.js';
export type {
  PlayerProfile,
  RoomPlayer,
  RoomState,
  RoomSummary,
} from '../game/protocol.js';

const CODE_LENGTH = 6;
// for ui reasons,  left 0 and O and I and 1 out to make sure that
// everyone cna read -- revoir avec equi[e]
// no await here or it's not atomic!!!!
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// just to create for answering user requseting room 
// want to create list of rules for rooms (room code to room w name ,host players, max playas)
// roomOfUser - smth for user id and code of room they are 


export type RoomErrorCode = Extract<
  ErrorCode,
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'ALREADY_IN_ROOM'
  | 'INVALID_STATE'
  | 'NOT_HOST'
  | 'NOT_ENOUGH_PLAYERS'
>;

export class RoomError extends Error {
  constructor(readonly code: RoomErrorCode) {
    super(code);
  }
}

export type CreateRoomInput = CreateRoomPayload;

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);
  private readonly rooms = new Map<string, RoomState>(); 
  // code --->>> room
  private readonly roomOfUser = new Map<number, string>(); 
  // userId --->>>>> code

  create(profile: PlayerProfile, input: CreateRoomInput): RoomState {
    if (this.roomOfUser.has(profile.userId)) {
      throw new RoomError('ALREADY_IN_ROOM');
    }

    const room: RoomState = {
      code: this.newCode(),
      name: input.name,
      isPublic: input.isPublic,
      state: 'LOBBY',
      hostId: profile.userId,
      maxPlayers: input.maxPlayers,
      settings: { ...DEFAULT_SETTINGS },
      players: [{ ...profile, ready: false }],
    };
    this.rooms.set(room.code, room);
    this.roomOfUser.set(profile.userId, room.code);

    this.logger.log(`Room ${room.code} created by user=${profile.userId}`);
    return this.copy(room);
  }

  join(profile: PlayerProfile, rawCode: string): RoomState {
    const code = rawCode.trim().toUpperCase();
    const current = this.roomOfUser.get(profile.userId);

    if (current === code) {
      return this.copy(this.rooms.get(code)!);
    }
    if (current) {
      throw new RoomError('ALREADY_IN_ROOM');
    }

    const room = this.rooms.get(code);
    if (!room) throw new RoomError('ROOM_NOT_FOUND');
    if (room.state !== 'LOBBY') throw new RoomError('INVALID_STATE');
    if (room.players.length >= room.maxPlayers) {
      throw new RoomError('ROOM_FULL');
    }

    room.players.push({ ...profile, ready: false });
    this.roomOfUser.set(profile.userId, code);

    this.logger.log(`User=${profile.userId} joined room ${code}`);
    return this.copy(room);
  }

  // return the room after leaving; null if user had no room
  // deleted is T if user was last guy there 
  leave(userId: number): { room: RoomState; deleted: boolean } | null {
    const code = this.roomOfUser.get(userId);
    if (!code) return null;
    const room = this.rooms.get(code)!;

    room.players = room.players.filter((p) => p.userId !== userId);
    this.roomOfUser.delete(userId);

    if (room.players.length === 0) {
      this.rooms.delete(code);
      this.logger.log(`Room ${code} deleted (empty)`);
      return { room: this.copy(room), deleted: true };
    }

    if (room.hostId === userId) {
      room.hostId = room.players[0].userId; // earliest arrival
      this.logger.log(`Room ${code}: host transferred to user=${room.hostId}`);
    }
    return { room: this.copy(room), deleted: false };
  }

  setReady(userId: number, ready: boolean): RoomState {
    const room = this.findRoomOf(userId);
    if (!room || room.state !== 'LOBBY') throw new RoomError('INVALID_STATE');

    const player = room.players.find((p) => p.userId === userId)!;
    player.ready = ready;
    return this.copy(room);
  }

  // room:settings - host only, in the lobby. Everyone (host included) is set
  // back to "not ready": they must agree to the new settings.
  updateSettings(userId: number, settings: RoomSettings): RoomState {
    const room = this.findRoomOf(userId);
    if (!room || room.state !== 'LOBBY') throw new RoomError('INVALID_STATE');
    if (room.hostId !== userId) throw new RoomError('NOT_HOST');

    room.settings = { ...settings };
    for (const player of room.players) player.ready = false;
    this.logger.log(
      `Room ${room.code}: settings ${JSON.stringify(room.settings)}`,
    );
    return this.copy(room);
  }

  // room:start - host only, at least MIN_PLAYERS, everyone ready.
  // The room is locked at once (PLAYING): nobody can join or change
  // their ready state while the game is being prepared.
  start(userId: number): RoomState {
    const room = this.findRoomOf(userId);
    if (!room || room.state !== 'LOBBY') throw new RoomError('INVALID_STATE');
    if (room.hostId !== userId) throw new RoomError('NOT_HOST');
    if (
      room.players.length < MIN_PLAYERS ||
      room.players.some((p) => !p.ready)
    ) {
      throw new RoomError('NOT_ENOUGH_PLAYERS');
    }

    room.state = 'PLAYING';
    this.logger.log(`Room ${room.code} started`);
    return this.copy(room);
  }

  // end of a game (FINISHED) - the players stay in the room
  finish(code: string): RoomState | null {
    const room = this.rooms.get(code);
    if (!room || room.state !== 'PLAYING') return null;
    room.state = 'FINISHED';
    return this.copy(room);
  }

  // back to the LOBBY, everyone "not ready": failed start (not enough
  // questions...) or rematch. null if the room no longer exists.
  reopen(code: string): RoomState | null {
    const room = this.rooms.get(code);
    if (!room) return null;
    room.state = 'LOBBY';
    for (const player of room.players) player.ready = false;
    return this.copy(room);
  }

  getRoomOf(userId: number): RoomState | null {
    const room = this.findRoomOf(userId);
    return room ? this.copy(room) : null;
  }

  listPublic(): RoomSummary[] {
    return [...this.rooms.values()]
      .filter((room) => room.isPublic && room.state === 'LOBBY')
      .map((room) => ({
        code: room.code,
        name: room.name,
        hostName: room.players.find((p) => p.userId === room.hostId)!
          .displayName,
        playerCount: room.players.length,
        maxPlayers: room.maxPlayers,
      }));
  }

  private findRoomOf(userId: number): RoomState | undefined {
    const code = this.roomOfUser.get(userId);
    return code ? this.rooms.get(code) : undefined;
  }

  private newCode(): string {
    let code: string;
    do {
      code = '';
      for (let i = 0; i < CODE_LENGTH; i++) {
        code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
      }
    } while (this.rooms.has(code));
    return code;
  }

  // Callers get a copy, so nothing outside this service can mutate a room.
  private copy(room: RoomState): RoomState {
    return {
      ...room,
      settings: { ...room.settings },
      players: room.players.map((p) => ({ ...p })),
    };
  }
}
