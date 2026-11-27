import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import type { ValidationError } from 'class-validator';
import {
  ERROR_CODES,
  type AckError,
  type ErrorCode,
} from '../game/protocol.js';
import { RoomError } from './rooms.service.js';

// Quand le client a passé un callback (emitWithAck), une erreur levée par un
// handler lui revient DANS l'accusé de réception : { ok: false, code }.
// Sans ce filtre, Nest émet un événement 'exception' et n'appelle jamais le
// callback : le front attendait jusqu'à son timeout.
// Sans callback (simple emit), on garde le comportement de Nest.
@Catch()
export class WsAckExceptionFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(WsAckExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    // Arguments d'un handler socket.io dans Nest : [socket, data, ack, pattern]
    const ack: unknown = host.getArgByIndex(2);
    if (typeof ack !== 'function') {
      super.catch(exception, host);
      return;
    }
    const res = toAckError(exception);
    if (res.code === 'INTERNAL_ERROR') {
      this.logger.error(
        'Unexpected error in a socket handler',
        exception instanceof Error ? exception.stack : String(exception),
      );
    }
    (ack as (res: AckError) => void)(res);
  }
}

/** Traduit une erreur de handler en accusé de réception d'erreur. */
export function toAckError(exception: unknown): AckError {
  if (exception instanceof RoomError) {
    return { ok: false, code: exception.code };
  }
  if (exception instanceof WsException) {
    const error = exception.getError();
    // ValidationPipe (exceptionFactory) : tableau de ValidationError
    if (Array.isArray(error)) {
      return {
        ok: false,
        code: 'BAD_MESSAGE',
        details: validationMessages(error as ValidationError[]),
      };
    }
    if (typeof error === 'string' && isErrorCode(error)) {
      return { ok: false, code: error };
    }
  }
  return { ok: false, code: 'INTERNAL_ERROR' };
}

function isErrorCode(value: string): value is ErrorCode {
  return (ERROR_CODES as readonly string[]).includes(value);
}

// "maxPlayers must not be greater than 6", "property hack should not exist"…
function validationMessages(errors: ValidationError[]): string[] {
  return errors.flatMap((e) => [
    ...Object.values(e.constraints ?? {}),
    ...validationMessages(e.children ?? []),
  ]);
}
