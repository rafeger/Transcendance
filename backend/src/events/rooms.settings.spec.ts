// Réglages, lancement et fin de partie côté salon (commit 6 de #21).
// Les tests de création / join / leave / ready sont dans rooms.service.spec.ts.
import { RoomsService } from './rooms.service.js';
import { DEFAULT_SETTINGS, type RoomSettings } from '../game/protocol.js';

const alice = { userId: 1, displayName: 'alice', avatarUrl: null };
const bob = { userId: 2, displayName: 'bob', avatarUrl: null };
const carol = { userId: 3, displayName: 'carol', avatarUrl: null };

const HARD_10: RoomSettings = {
  questionCount: 10,
  category: 9,
  difficulty: 'hard',
};

describe('RoomsService — réglages et lancement', () => {
  let rooms: RoomsService;
  let code: string;

  // alice (hôte) et bob dans un salon public de 4
  beforeEach(() => {
    rooms = new RoomsService();
    code = rooms.create(alice, {
      name: 'Quiz',
      maxPlayers: 4,
      isPublic: true,
    }).code;
    rooms.join(bob, code);
  });

  function everyoneReady() {
    rooms.setReady(alice.userId, true);
    rooms.setReady(bob.userId, true);
  }

  describe('create', () => {
    it('donne les réglages par défaut (5 questions, Mix)', () => {
      expect(rooms.getRoomOf(alice.userId)?.settings).toEqual(DEFAULT_SETTINGS);
    });
  });

  describe('updateSettings', () => {
    it('change les réglages et remet tout le monde « non prêt »', () => {
      everyoneReady();
      const room = rooms.updateSettings(alice.userId, HARD_10);
      expect(room.settings).toEqual(HARD_10);
      expect(room.players.every((p) => !p.ready)).toBe(true);
    });

    it("refuse un joueur qui n'est pas l'hôte", () => {
      expect(() => rooms.updateSettings(bob.userId, HARD_10)).toThrow(
        'NOT_HOST',
      );
    });

    it("refuse un joueur qui n'est dans aucun salon", () => {
      expect(() => rooms.updateSettings(carol.userId, HARD_10)).toThrow(
        'INVALID_STATE',
      );
    });

    it('refuse pendant une partie', () => {
      everyoneReady();
      rooms.start(alice.userId);
      expect(() => rooms.updateSettings(alice.userId, HARD_10)).toThrow(
        'INVALID_STATE',
      );
    });

    it("ne garde pas de lien avec l'objet passé ni avec la copie renvoyée", () => {
      const settings = { ...HARD_10 };
      const room = rooms.updateSettings(alice.userId, settings);
      settings.questionCount = 15;
      room.settings.difficulty = 'easy';
      expect(rooms.getRoomOf(alice.userId)?.settings).toEqual(HARD_10);
    });
  });

  describe('start', () => {
    it("lance si l'hôte le demande, au moins 2 joueurs, tous prêts", () => {
      everyoneReady();
      expect(rooms.start(alice.userId).state).toBe('PLAYING');
    });

    it("refuse un joueur qui n'est pas l'hôte", () => {
      everyoneReady();
      expect(() => rooms.start(bob.userId)).toThrow('NOT_HOST');
    });

    it("refuse si quelqu'un n'est pas prêt (hôte compris)", () => {
      rooms.setReady(bob.userId, true);
      expect(() => rooms.start(alice.userId)).toThrow('NOT_ENOUGH_PLAYERS');
    });

    it("refuse s'il n'y a qu'un joueur", () => {
      rooms.leave(bob.userId);
      rooms.setReady(alice.userId, true);
      expect(() => rooms.start(alice.userId)).toThrow('NOT_ENOUGH_PLAYERS');
    });

    it('verrouille le salon : plus de join, plus de ready, hors de la liste publique', () => {
      everyoneReady();
      rooms.start(alice.userId);
      expect(() => rooms.join(carol, code)).toThrow('INVALID_STATE');
      expect(() => rooms.setReady(bob.userId, false)).toThrow('INVALID_STATE');
      expect(rooms.listPublic()).toHaveLength(0);
    });

    it('ne lance pas deux fois', () => {
      everyoneReady();
      rooms.start(alice.userId);
      expect(() => rooms.start(alice.userId)).toThrow('INVALID_STATE');
    });
  });

  describe('finish / reopen', () => {
    it('passe la partie en FINISHED, puis le salon revient au LOBBY, tous « non prêt »', () => {
      everyoneReady();
      rooms.start(alice.userId);
      expect(rooms.finish(code)?.state).toBe('FINISHED');
      const room = rooms.reopen(code);
      expect(room?.state).toBe('LOBBY');
      expect(room?.players.map((p) => p.ready)).toEqual([false, false]);
      expect(rooms.listPublic()).toHaveLength(1);
    });

    it("finish ne fait rien hors d'une partie", () => {
      expect(rooms.finish(code)).toBeNull();
      expect(rooms.getRoomOf(alice.userId)?.state).toBe('LOBBY');
    });

    it("renvoie null pour un salon qui n'existe plus", () => {
      expect(rooms.finish('NOPE00')).toBeNull();
      expect(rooms.reopen('NOPE00')).toBeNull();
    });
  });
});
