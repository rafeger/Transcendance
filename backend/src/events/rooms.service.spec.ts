// command: npx vitest run src/events/rooms.service.spec.ts
// unlike app.controllers, room needs no other service(no prisma bc then need await and then
// cant be atomic; also rooms live in mem) so no testing module


// ex: for one test: npx vitest run src/events/rooms.service.spec.ts -t "last seat"

import { RoomsService } from './rooms.service.js';
// seeded fake
const alice = { userId: 1, displayName: 'alice', avatarUrl: null };
const bob = { userId: 2, displayName: 'bob', avatarUrl: null };
const carol = { userId: 3, displayName: 'carol', avatarUrl: null };
const dave = { userId: 4, displayName: 'dave', avatarUrl: null };

describe('RoomsService', () => {
  let rooms: RoomsService;

  beforeEach(() => {
    rooms = new RoomsService();
  });

  function newRoom(maxPlayers = 4, isPublic = true) {
    return rooms.create(alice, { name: 'Quiz', maxPlayers, isPublic });
  }

  describe('create', () => {
    it('makes the creator the host and the only player', () => {
      // prep

      // ACT
      const room = rooms.create(alice, {
        name: 'Quiz',
        maxPlayers: 4,
        isPublic: true,
      });
      // CHECK
      expect(room.hostId).toBe(alice.userId);
      expect(room.players).toHaveLength(1);
      expect(room.players[0].userId).toBe(alice.userId);
      expect(room.players[0].ready).toBe(false);
      expect(room.state).toBe('LOBBY');
      expect(room.code).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('refuses to create a second room while already in one', () => {
      newRoom();

      expect(() => newRoom()).toThrow('ALREADY_IN_ROOM');
    });

    it('gives each room a different code', () => {
      const first = newRoom();
      const second = rooms.create(bob, {
        name: 'Other',
        maxPlayers: 4,
        isPublic: true,
      });

      expect(first.code).not.toBe(second.code);
    });
  });

  describe('join', () => {
    it('adds the player at the end of the list, host unchanged', () => {
      const room = newRoom();

      const joined = rooms.join(bob, room.code);

      expect(joined.players.map((p) => p.userId)).toEqual([
        alice.userId,
        bob.userId,
      ]);
      expect(joined.hostId).toBe(alice.userId);
    });

    it('accepts the code in lower case and with spaces', () => {
      const room = newRoom();

      const joined = rooms.join(bob, `  ${room.code.toLowerCase()} `);

      expect(joined.code).toBe(room.code);
    });

    it('refuses an unknown code', () => {
      expect(() => rooms.join(bob, 'ZZZZZZ')).toThrow('ROOM_NOT_FOUND');
    });

    it('refuses a player who is already in another room', () => {
      newRoom();
      const other = rooms.create(bob, {
        name: 'Other',
        maxPlayers: 4,
        isPublic: true,
      });

      expect(() => rooms.join(alice, other.code)).toThrow('ALREADY_IN_ROOM');
    });

    it('does not add a player twice when they join their own room again (second tab)', () => {
      const room = newRoom();
      rooms.join(bob, room.code);

      const again = rooms.join(bob, room.code);

      expect(again.players).toHaveLength(2);
    });

    it('gives the last seat to only one of two players', () => {
      const room = newRoom(3);
      rooms.join(bob, room.code); // 1 sear

      rooms.join(carol, room.code);

      expect(() => rooms.join(dave, room.code)).toThrow('ROOM_FULL');
      expect(rooms.getRoomOf(alice.userId)!.players).toHaveLength(3);
      // The refused player is in no room, so they can still create their own.
      expect(rooms.getRoomOf(dave.userId)).toBeNull();
    });
  });

  describe('leave', () => {
    it('gives the host role to the earliest player when the host leaves', () => {
      // prpe
      const room = newRoom();
      rooms.join(bob, room.code);
      rooms.join(carol, room.code);

      // act
      const result = rooms.leave(alice.userId);
      //check
      expect(result!.deleted).toBe(false);
      expect(result!.room.hostId).toBe(bob.userId); 
      expect(result!.room.players.map((p) => p.userId)).toEqual([
        bob.userId,
        carol.userId,
      ]);
    });

    it('keeps the same host when another player leaves', () => {
      const room = newRoom();
      rooms.join(bob, room.code);

      const result = rooms.leave(bob.userId);

      expect(result!.room.hostId).toBe(alice.userId);
      expect(result!.room.players).toHaveLength(1);
    });

    it('deletes the room when the last player leaves', () => {
      const room = newRoom();

      const result = rooms.leave(alice.userId);

      expect(result!.deleted).toBe(true);
      expect(() => rooms.join(bob, room.code)).toThrow('ROOM_NOT_FOUND');
    });

    it('frees the player, who can then join another room', () => {
      const first = newRoom();
      rooms.join(bob, first.code);
      const second = rooms.create(carol, {
        name: 'Other',
        maxPlayers: 4,
        isPublic: true,
      });

      rooms.leave(bob.userId);

      expect(() => rooms.join(bob, second.code)).not.toThrow();
    });

    it('returns null when the player is in no room', () => {
      expect(rooms.leave(bob.userId)).toBeNull();
    });
  });

  describe('setReady', () => {
    it('changes only that player', () => {
      const room = newRoom();
      rooms.join(bob, room.code);

      const after = rooms.setReady(bob.userId, true);

      const readyOf = (userId: number) =>
        after.players.find((p) => p.userId === userId)!.ready;
      expect(readyOf(bob.userId)).toBe(true);
      expect(readyOf(alice.userId)).toBe(false);
    });

    it('can switch back to not ready', () => {
      newRoom();
      rooms.setReady(alice.userId, true);

      const after = rooms.setReady(alice.userId, false);

      expect(after.players[0].ready).toBe(false);
    });

    it('refuses a player who is in no room', () => {
      expect(() => rooms.setReady(bob.userId, true)).toThrow('INVALID_STATE');
    });
  });

  describe('getRoomOf', () => {
    it("returns the player's room, or null", () => {
      const room = newRoom();

      expect(rooms.getRoomOf(alice.userId)!.code).toBe(room.code);
      expect(rooms.getRoomOf(bob.userId)).toBeNull();
    });
  });

  describe('listPublic', () => {
    it('lists public rooms with their host and player count', () => {
      const room = newRoom(6);
      rooms.join(bob, room.code);

      expect(rooms.listPublic()).toEqual([
        {
          code: room.code,
          name: 'Quiz',
          hostName: 'alice',
          playerCount: 2,
          maxPlayers: 6,
        },
      ]);
    });

    it('does not list private rooms', () => {
      newRoom(4, false);

      expect(rooms.listPublic()).toEqual([]);
    });

    it('shows the new host after a host transfer', () => {
      const room = newRoom();
      rooms.join(bob, room.code);

      rooms.leave(alice.userId);

      expect(rooms.listPublic()[0].hostName).toBe('bob');
    });
  });

  it('cannot be changed from outside', () => {
    const room = newRoom();

    room.players.push({ ...bob, ready: true });
    room.hostId = bob.userId;

    const real = rooms.getRoomOf(alice.userId)!;
    expect(real.players).toHaveLength(1);
    expect(real.hostId).toBe(alice.userId);
  });
});
