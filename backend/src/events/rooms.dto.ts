// what is my browser allowed to send for each room message
// npx vitest run src/events/rooms.service.spec.ts ==> for this one
// for: npm test

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  DIFFICULTIES,
  MAX_PLAYERS,
  MIN_PLAYERS,
  QUESTION_COUNTS,
  type Difficulty,
  type QuestionCount,
  type RoomSettings,
} from '../game/protocol.js';

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

// room:settings
// The 3 fields are required; category / difficulty may be null (= Mix).
// ValidateIf: the checks below a field only run when it is not null, so
// `null` passes, but a missing field (undefined) is still refused.
export class RoomSettingsDto implements RoomSettings {
  @IsIn(QUESTION_COUNTS)
  questionCount!: QuestionCount;

  @ValidateIf((o: RoomSettingsDto) => o.category !== null)
  @IsInt()
  @Min(1)
  category!: number | null;

  @ValidateIf((o: RoomSettingsDto) => o.difficulty !== null)
  @IsIn(DIFFICULTIES)
  difficulty!: Difficulty | null;
}
