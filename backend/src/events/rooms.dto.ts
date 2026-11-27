// what is my browser allowed to send for each room message
// npx vitest run src/events/rooms.service.spec.ts ==> for this one
// for: npm test

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { MAX_PLAYERS, MIN_PLAYERS } from './rooms.service.js';

// room:create
export class CreateRoomDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty({ message: 'The room name can not be empty' })
  @MaxLength(30, { message: 'Room name too long' })
  name!: string;

  @IsInt()
  @Min(MIN_PLAYERS)
  @Max(MAX_PLAYERS)
  maxPlayers!: number;

  @IsBoolean()
  isPublic!: boolean;
}

// room:join
// check only the struct
// remember upper the code and ROOM_NOT_FOUND if !room.
export class JoinRoomDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  roomCode!: string;
}

// room:ready
export class ReadyDto {
  @IsBoolean()
  ready!: boolean;
}
