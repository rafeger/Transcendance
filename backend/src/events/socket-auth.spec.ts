import type { JwtService } from '@nestjs/jwt';
import type { Socket } from 'socket.io';
import {
  profileOf,
  readCookie,
  socketAuthMiddleware,
  userIdOf,
  WS_UNAUTHORIZED,
} from './socket-auth.js';

// Faux socket : seulement les champs lus par le middleware.
function fakeSocket(cookie?: string): Socket {
  return {
    id: 'sock-1',
    handshake: { headers: cookie ? { cookie } : {} },
    data: {},
  } as unknown as Socket;
}

// Faux JwtService : verifyAsync résout ou rejette selon le test.
function fakeJwt(verify: (token: string) => Promise<unknown>): JwtService {
  return { verifyAsync: verify } as unknown as JwtService;
}

// Lance le middleware et attend l'appel à next().
function run(jwt: JwtService, socket: Socket): Promise<Error | undefined> {
  return new Promise((resolve) => {
    socketAuthMiddleware(jwt, () => {})(socket, resolve);
  });
}

describe('readCookie', () => {
  it('trouve le cookie parmi plusieurs', () => {
    expect(
      readCookie('theme=dark; access_token=abc.def; x=1', 'access_token'),
    ).toBe('abc.def');
  });

  it('renvoie null si absent ou sans en-tête', () => {
    expect(readCookie('theme=dark', 'access_token')).toBeNull();
    expect(readCookie(undefined, 'access_token')).toBeNull();
  });

  it('garde les = dans la valeur et décode les %', () => {
    expect(readCookie('access_token=a%3Db=c', 'access_token')).toBe('a=b=c');
  });

  it('ne confond pas un nom qui en contient un autre', () => {
    expect(readCookie('my_access_token=bad', 'access_token')).toBeNull();
  });
});

describe('socketAuthMiddleware', () => {
  it('refuse sans cookie', async () => {
    const jwt = fakeJwt(() => Promise.resolve({ sub: 1 }));
    const err = await run(jwt, fakeSocket());
    expect(err?.message).toBe(WS_UNAUTHORIZED);
  });

  it('refuse un JWT invalide ou expiré', async () => {
    const jwt = fakeJwt(() => Promise.reject(new Error('jwt expired')));
    const err = await run(jwt, fakeSocket('access_token=old'));
    expect(err?.message).toBe(WS_UNAUTHORIZED);
  });

  it('refuse un sub qui n’est pas un id entier', async () => {
    const jwt = fakeJwt(() => Promise.resolve({ sub: '12' }));
    const err = await run(jwt, fakeSocket('access_token=tok'));
    expect(err?.message).toBe(WS_UNAUTHORIZED);
  });

  it('accepte un JWT valide et pose data.userId (nombre)', async () => {
    const jwt = fakeJwt((token) =>
      token === 'good'
        ? Promise.resolve({ sub: 42 })
        : Promise.reject(new Error()),
    );
    const socket = fakeSocket('access_token=good');
    const err = await run(jwt, socket);
    expect(err).toBeUndefined();
    expect(userIdOf(socket)).toBe(42);
  });
});

describe('userIdOf', () => {
  it('lève si le socket n’est pas authentifié', () => {
    expect(() => userIdOf(fakeSocket())).toThrow();
  });
});

describe('profileOf', () => {
  it('renvoie le profil posé pour ce userId', () => {
    const socket = fakeSocket();
    socket.data.userId = 3;
    socket.data.profile = { userId: 3, displayName: 'ana', avatarUrl: null };
    expect(profileOf(socket).displayName).toBe('ana');
  });

  it('lève si le profil manque ou appartient à un autre userId', () => {
    const socket = fakeSocket();
    socket.data.userId = 3;
    expect(() => profileOf(socket)).toThrow();
    socket.data.profile = { userId: 4, displayName: 'x', avatarUrl: null };
    expect(() => profileOf(socket)).toThrow();
  });
});
