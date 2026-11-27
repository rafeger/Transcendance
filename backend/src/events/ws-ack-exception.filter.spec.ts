import type { ArgumentsHost } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import type { ValidationError } from 'class-validator';
import { toAckError, WsAckExceptionFilter } from './ws-ack-exception.filter.js';
import { RoomError } from './rooms.service.js';

// Faux ArgumentsHost : Nest passe [socket, data, ack, pattern] aux handlers socket.io
function fakeHost(ack?: unknown, emit = vi.fn()): ArgumentsHost {
  const args = [{ emit }, {}, ack, 'room:join'];
  return {
    getArgByIndex: (i: number) => args[i],
    getArgs: () => args,
    switchToWs: () => ({
      getClient: () => args[0],
      getData: () => args[1],
      getPattern: () => args[3],
    }),
    getType: () => 'ws',
  } as unknown as ArgumentsHost;
}

describe('toAckError', () => {
  it('RoomError → son code', () => {
    expect(toAckError(new RoomError('ROOM_FULL'))).toEqual({
      ok: false,
      code: 'ROOM_FULL',
    });
  });

  it('erreurs de validation → BAD_MESSAGE avec le détail', () => {
    const errors = [
      {
        property: 'maxPlayers',
        constraints: { max: 'maxPlayers must not be greater than 6' },
      },
      {
        property: 'hack',
        constraints: { whitelistValidation: 'property hack should not exist' },
      },
    ] as ValidationError[];
    expect(toAckError(new WsException(errors))).toEqual({
      ok: false,
      code: 'BAD_MESSAGE',
      details: [
        'maxPlayers must not be greater than 6',
        'property hack should not exist',
      ],
    });
  });

  it('WsException avec un code connu → ce code', () => {
    expect(toAckError(new WsException('UNAUTHORIZED'))).toEqual({
      ok: false,
      code: 'UNAUTHORIZED',
    });
  });

  it('erreur inattendue → INTERNAL_ERROR, sans détail interne', () => {
    expect(toAckError(new Error('db down: password=…'))).toEqual({
      ok: false,
      code: 'INTERNAL_ERROR',
    });
    expect(toAckError(new WsException('texte libre'))).toEqual({
      ok: false,
      code: 'INTERNAL_ERROR',
    });
  });
});

describe('WsAckExceptionFilter', () => {
  it("répond dans l'accusé de réception quand le client en a passé un", () => {
    const ack = vi.fn();
    const emit = vi.fn();
    new WsAckExceptionFilter().catch(
      new RoomError('ROOM_NOT_FOUND'),
      fakeHost(ack, emit),
    );
    expect(ack).toHaveBeenCalledWith({ ok: false, code: 'ROOM_NOT_FOUND' });
    expect(emit).not.toHaveBeenCalled();
  });

  it("sans accusé de réception, garde l'événement 'exception' de Nest", () => {
    const emit = vi.fn();
    new WsAckExceptionFilter().catch(
      new WsException('UNAUTHORIZED'),
      fakeHost(undefined, emit),
    );
    expect(emit).toHaveBeenCalledWith(
      'exception',
      expect.objectContaining({ message: 'UNAUTHORIZED' }),
    );
  });
});
