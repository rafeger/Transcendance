// command: npx vitest run src/events/rooms.service.spec.ts
// unlike app.controllers, room needs no other service(no prisma bc then need await and then 
// cant be atomic; also rooms live in mem) so no testing module

import { RoomsService } from './rooms.service.js';
const alice = { userId: 1, displayName: 'alice', avatarUrl: null };

describe('RoomsService', () => {
  let rooms: RoomsService;

  beforeEach(() => {
    rooms = new RoomsService();
  });

  describe('create', () => {
    it('makes the creator the host and the only player', () => {
      // prpe

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
  });
});


// it('gives the host role to the earliest player when the host leaves', () => {
//   // 1. PREPARE: build the situation
//   const rooms = new RoomsService();
//   const room = rooms.create(alice, { name: 'Quiz', maxPlayers: 4, isPublic: true });
//   rooms.join(bob, room.code);
//   rooms.join(carol, room.code);

//   // 2. ACT: do the one thing you're testing
//   const result = rooms.leave(alice.userId);

//   // 3. CHECK: is the result what the rule says?
//   expect(result!.room.hostId).toBe(bob.userId);   // Bob arrived first after Alice
// });