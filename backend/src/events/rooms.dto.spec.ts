// Validation des payloads (ce que fait le ValidationPipe de la gateway).
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CreateRoomDto, RoomSettingsDto } from './rooms.dto.js';

// mêmes options que le ValidationPipe de EventsGateway
function errorsOf<T extends object>(
  cls: new () => T,
  payload: object,
): string[] {
  const errors = validateSync(plainToInstance(cls, payload), {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  return errors.map((e) => e.property);
}

describe('RoomSettingsDto', () => {
  it('accepte des réglages complets, et null pour Mix', () => {
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 10,
        category: 9,
        difficulty: 'hard',
      }),
    ).toEqual([]);
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 5,
        category: null,
        difficulty: null,
      }),
    ).toEqual([]);
  });

  it('refuse un champ manquant (undefined ≠ null)', () => {
    expect(
      errorsOf(RoomSettingsDto, { questionCount: 5, category: null }),
    ).toEqual(['difficulty']);
  });

  it('refuse un nombre de questions hors de 5 / 10 / 15', () => {
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 7,
        category: null,
        difficulty: null,
      }),
    ).toEqual(['questionCount']);
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: '10',
        category: null,
        difficulty: null,
      }),
    ).toEqual(['questionCount']);
  });

  it('refuse une difficulté inconnue ou en majuscules', () => {
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 5,
        category: null,
        difficulty: 'EASY',
      }),
    ).toEqual(['difficulty']);
  });

  it('refuse une catégorie qui n’est pas un entier positif', () => {
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 5,
        category: '9',
        difficulty: null,
      }),
    ).toEqual(['category']);
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 5,
        category: 0,
        difficulty: null,
      }),
    ).toEqual(['category']);
  });

  it('refuse un champ en trop', () => {
    expect(
      errorsOf(RoomSettingsDto, {
        questionCount: 5,
        category: null,
        difficulty: null,
        type: 'boolean',
      }),
    ).toEqual(['type']);
  });
});

describe('CreateRoomDto', () => {
  it('limite le salon à 6 joueurs (GAME_SPEC v2)', () => {
    expect(
      errorsOf(CreateRoomDto, { name: 'Quiz', maxPlayers: 6, isPublic: true }),
    ).toEqual([]);
    expect(
      errorsOf(CreateRoomDto, { name: 'Quiz', maxPlayers: 7, isPublic: true }),
    ).toEqual(['maxPlayers']);
  });
});
