import { Injectable, Logger } from '@nestjs/common';
import { randomInt } from 'node:crypto';

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 8;
const CODE_LENGTH = 6;
// for ui reasons,  left 0 and O and I and 1 out to make sure that
// everyone cna read -- revoir avec equi[e]
// no await here or it's not atomic!!!!
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

// just to create for answering user requseting room 
// want to create list of rules for rooms (room code to room w name ,host players, max playas)
// roomOfUser - smth for user id and code of room they are 


export type RoomErrorCode =
  | 'ROOM_NOT_FOUND'
  | 'ROOM_FULL'
  | 'ALREADY_IN_ROOM'
  | 'INVALID_STATE';

export class RoomError extends Error {
  constructor(readonly code: RoomErrorCode) {
    super(code);
  }
}

export interface PlayerProfile {
  userId: number;
  displayName: string;
  avatarUrl: string | null;
}

export interface RoomPlayer extends PlayerProfile {
  ready: boolean;
}

export interface RoomState {
  code: string;
  name: string;
  isPublic: boolean;
  state: 'LOBBY' | 'PLAYING';
  hostId: number;
  maxPlayers: number;
  players: RoomPlayer[];
  // order of join, first host
}

export interface RoomSummary {
  code: string;
  name: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
}

export interface CreateRoomInput {
  name: string;
  maxPlayers: number;
  isPublic: boolean;
}

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
    return { ...room, players: room.players.map((p) => ({ ...p })) };
  }
}
