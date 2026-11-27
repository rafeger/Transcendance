// Tests du moteur de partie. vi.useFakeTimers() remplace Date.now() et
// setTimeout : on avance le temps avec vi.advanceTimersByTime(ms) au lieu
// d'attendre 15 s par question.
import {
  GameSession,
  computePoints,
  rankPlayers,
  type SessionEmit,
  type SessionQuestion,
  type SessionResult,
} from './game-session.js';
import {
  ANSWER_GRACE_MS,
  COUNTDOWN_MS,
  QUESTION_DURATION_MS,
  REVEAL_DURATION_MS,
  type GameOverPayload,
  type ProgressPayload,
  type QuestionPayload,
  type RevealPayload,
} from './protocol.js';

const ALICE = 1;
const BOB = 2;
const CAROL = 3;
const T0 = new Date('2026-11-27T12:00:00Z').getTime();

const capitals: SessionQuestion = {
  text: 'Capital of France?',
  category: 'Geography',
  difficulty: 'easy',
  type: 'multiple',
  choices: [
    { id: 'a', text: 'Lyon' },
    { id: 'b', text: 'Paris' },
    { id: 'c', text: 'Nice' },
    { id: 'd', text: 'Lille' },
  ],
  correctChoiceId: 'b',
};

const trueFalse: SessionQuestion = {
  text: 'The Sun is a star.',
  category: 'Science & Nature',
  difficulty: 'hard',
  type: 'boolean',
  choices: [
    { id: 'a', text: 'True' },
    { id: 'b', text: 'False' },
  ],
  correctChoiceId: 'a',
};

interface Sent {
  event: string;
  payload: unknown;
}

function setup(
  options: {
    players?: number[];
    questions?: SessionQuestion[];
    connected?: Set<number>;
  } = {},
) {
  const sent: Sent[] = [];
  const results: SessionResult[] = [];
  const emit: SessionEmit = (event, payload) => sent.push({ event, payload });
  const connected = options.connected;
  const session = new GameSession({
    gameId: 42,
    players: options.players ?? [ALICE, BOB],
    questions: options.questions ?? [capitals, trueFalse],
    emit,
    onFinished: (r) => results.push(r),
    isConnected: connected ? (id) => connected.has(id) : undefined,
  });
  const last = <T>(event: string): T =>
    sent.filter((s) => s.event === event).at(-1)?.payload as T;
  const count = (event: string) => sent.filter((s) => s.event === event).length;
  return { session, sent, results, last, count };
}

/** Démarre et avance jusqu'à la première question. */
function startToFirstQuestion(game: ReturnType<typeof setup>) {
  game.session.start();
  vi.advanceTimersByTime(COUNTDOWN_MS);
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(T0);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('computePoints', () => {
  it('donne la base pour une réponse instantanée, la moitié à la dernière seconde', () => {
    expect(computePoints('easy', QUESTION_DURATION_MS)).toBe(100);
    expect(computePoints('medium', QUESTION_DURATION_MS)).toBe(200);
    expect(computePoints('hard', QUESTION_DURATION_MS)).toBe(300);
    expect(computePoints('easy', 0)).toBe(50);
    expect(computePoints('hard', 0)).toBe(150);
  });

  it('arrondit, et borne le temps restant (tolérance, horloge)', () => {
    expect(computePoints('easy', 7_500)).toBe(75);
    expect(computePoints('easy', 1)).toBe(50);
    expect(computePoints('easy', -300)).toBe(50); // dans la tolérance de 300 ms
    expect(computePoints('easy', 99_000)).toBe(100);
  });
});

describe('rankPlayers', () => {
  const line = (
    userId: number,
    score: number,
    correctCount = 0,
    totalCorrectMs = 0,
    forfeit = false,
  ) => ({
    userId,
    score,
    correctCount,
    totalCorrectMs,
    forfeit,
  });

  it('classe par score, puis bonnes réponses, puis temps', () => {
    const { ranking, winnerId } = rankPlayers([
      line(1, 150, 2, 9000),
      line(2, 150, 2, 4000), // même score et même nombre : plus rapide
      line(3, 150, 1, 1000),
      line(4, 300, 1, 1000),
    ]);
    expect(ranking.map((r) => [r.userId, r.rank])).toEqual([
      [4, 1],
      [2, 2],
      [1, 3],
      [3, 4],
    ]);
    expect(winnerId).toBe(4);
  });

  it('égalité parfaite : même rang, rang suivant sauté, pas de vainqueur', () => {
    const { ranking, winnerId } = rankPlayers([
      line(1, 100, 1, 500),
      line(2, 100, 1, 500),
      line(3, 0),
    ]);
    expect(ranking.map((r) => r.rank)).toEqual([1, 1, 3]);
    expect(winnerId).toBeNull();
  });

  it('met les forfaits derniers, même avec plus de points', () => {
    const { ranking, winnerId } = rankPlayers([
      line(1, 900, 3, 100, true),
      line(2, 10, 1, 100),
    ]);
    expect(ranking.map((r) => r.userId)).toEqual([2, 1]);
    expect(winnerId).toBe(2);
  });
});

describe('GameSession', () => {
  describe('déroulement', () => {
    it('envoie le compte à rebours, puis la première question 3 s après', () => {
      const game = setup();
      game.session.start();
      expect(game.last('game:countdown')).toEqual({
        ts: T0,
        startsAt: T0 + COUNTDOWN_MS,
      });
      expect(game.count('question:new')).toBe(0);

      vi.advanceTimersByTime(COUNTDOWN_MS);
      const q = game.last<QuestionPayload>('question:new');
      expect(q).toMatchObject({
        ts: T0 + COUNTDOWN_MS,
        index: 0,
        total: 2,
        category: 'Geography',
        difficulty: 'easy',
        type: 'multiple',
        text: 'Capital of France?',
        deadline: T0 + COUNTDOWN_MS + QUESTION_DURATION_MS,
        durationMs: QUESTION_DURATION_MS,
      });
      expect(q.choices).toHaveLength(4);
      expect(game.session.currentPhase).toBe('QUESTION');
    });

    it("n'envoie jamais la bonne réponse dans question:new", () => {
      const game = setup();
      startToFirstQuestion(game);
      const q = game.last<QuestionPayload>('question:new');
      expect(JSON.stringify(q)).not.toContain('correct');
      expect(Object.keys(q.choices[0])).toEqual(['id', 'text']);
    });

    it('ne démarre pas deux fois', () => {
      const game = setup();
      game.session.start();
      game.session.start();
      expect(game.count('game:countdown')).toBe(1);
    });

    it('enchaîne : timeout → révélation 4 s → question suivante → fin', () => {
      const game = setup();
      startToFirstQuestion(game);

      vi.advanceTimersByTime(QUESTION_DURATION_MS + ANSWER_GRACE_MS);
      expect(game.session.currentPhase).toBe('REVEAL');
      const reveal = game.last<RevealPayload>('question:reveal');
      expect(reveal.index).toBe(0);
      expect(reveal.nextAt).toBe(reveal.ts + REVEAL_DURATION_MS);

      vi.advanceTimersByTime(REVEAL_DURATION_MS);
      expect(game.last<QuestionPayload>('question:new').index).toBe(1);

      vi.advanceTimersByTime(
        QUESTION_DURATION_MS + ANSWER_GRACE_MS + REVEAL_DURATION_MS,
      );
      expect(game.session.currentPhase).toBe('FINISHED');
      expect(game.count('game:over')).toBe(1);
      expect(game.results).toHaveLength(1);
      expect(game.results[0].endedEarly).toBe(false);
    });
  });

  describe('réponses', () => {
    it('accepte une réponse, prévient le salon de QUI a répondu (pas quoi)', () => {
      const game = setup();
      startToFirstQuestion(game);
      expect(game.session.submitAnswer(BOB, 0, 'c')).toEqual({ ok: true });
      const progress = game.last<ProgressPayload>('question:progress');
      expect(progress).toEqual({
        ts: expect.any(Number),
        index: 0,
        answered: [BOB],
      });
    });

    it('refuse une 2e réponse, une mauvaise question, un choix inexistant', () => {
      const game = setup();
      startToFirstQuestion(game);
      game.session.submitAnswer(ALICE, 0, 'b');
      expect(game.session.submitAnswer(ALICE, 0, 'a')).toEqual({
        ok: false,
        code: 'ALREADY_ANSWERED',
      });
      expect(game.session.submitAnswer(BOB, 1, 'a')).toEqual({
        ok: false,
        code: 'WRONG_QUESTION',
      });
      expect(game.session.submitAnswer(BOB, 0, 'e')).toEqual({
        ok: false,
        code: 'INVALID_CHOICE',
      });
    });

    it('refuse c et d sur une question Vrai / Faux', () => {
      const game = setup({ questions: [trueFalse] });
      startToFirstQuestion(game);
      expect(game.session.submitAnswer(ALICE, 0, 'c')).toEqual({
        ok: false,
        code: 'INVALID_CHOICE',
      });
      expect(game.session.submitAnswer(ALICE, 0, 'a')).toEqual({ ok: true });
    });

    it('refuse un joueur hors de la partie, et toute réponse pendant le compte à rebours', () => {
      const game = setup();
      game.session.start();
      expect(game.session.submitAnswer(ALICE, 0, 'b')).toEqual({
        ok: false,
        code: 'INVALID_STATE',
      });
      vi.advanceTimersByTime(COUNTDOWN_MS);
      expect(game.session.submitAnswer(CAROL, 0, 'b')).toEqual({
        ok: false,
        code: 'INVALID_STATE',
      });
    });

    it('accepte dans la tolérance de 300 ms, puis répond TOO_LATE', () => {
      const game = setup();
      startToFirstQuestion(game);
      vi.advanceTimersByTime(QUESTION_DURATION_MS + 200); // après la deadline, dans la tolérance
      expect(game.session.submitAnswer(ALICE, 0, 'b')).toEqual({ ok: true });

      vi.advanceTimersByTime(100); // la question se ferme : révélation
      expect(game.session.submitAnswer(BOB, 0, 'b')).toEqual({
        ok: false,
        code: 'TOO_LATE',
      });
      // réponse tardive mais juste : le minimum de points
      const reveal = game.last<RevealPayload>('question:reveal');
      expect(reveal.results.find((r) => r.userId === ALICE)?.points).toBe(50);
    });

    it('ferme la question dès que tout le monde a répondu', () => {
      const game = setup();
      startToFirstQuestion(game);
      game.session.submitAnswer(ALICE, 0, 'b');
      expect(game.count('question:reveal')).toBe(0);
      game.session.submitAnswer(BOB, 0, 'a');
      expect(game.count('question:reveal')).toBe(1);
      expect(game.last<RevealPayload>('question:reveal').ts).toBe(
        T0 + COUNTDOWN_MS,
      );
    });
  });

  describe('révélation et points', () => {
    it('donne correct / points / temps de réponse, et cumule les scores', () => {
      const game = setup();
      startToFirstQuestion(game);
      vi.advanceTimersByTime(3_000);
      game.session.submitAnswer(ALICE, 0, 'b'); // juste, à 3 s : 12 s restantes
      vi.advanceTimersByTime(1_000);
      game.session.submitAnswer(BOB, 0, 'a'); // faux

      const reveal = game.last<RevealPayload>('question:reveal');
      expect(reveal.correctChoiceId).toBe('b');
      expect(reveal.results).toEqual([
        {
          userId: ALICE,
          choiceId: 'b',
          correct: true,
          points: 90,
          responseMs: 3_000,
        },
        {
          userId: BOB,
          choiceId: 'a',
          correct: false,
          points: 0,
          responseMs: 4_000,
        },
      ]);
      expect(reveal.scores).toEqual([
        { userId: ALICE, score: 90 },
        { userId: BOB, score: 0 },
      ]);

      // question 2 (hard) : bob répond juste instantanément
      vi.advanceTimersByTime(REVEAL_DURATION_MS);
      game.session.submitAnswer(BOB, 1, 'a');
      vi.advanceTimersByTime(QUESTION_DURATION_MS + ANSWER_GRACE_MS);
      const second = game.last<RevealPayload>('question:reveal');
      expect(second.results[0]).toEqual({
        userId: ALICE,
        choiceId: null,
        correct: false,
        points: 0,
        responseMs: null,
      });
      expect(second.scores).toEqual([
        { userId: ALICE, score: 90 },
        { userId: BOB, score: 300 },
      ]);
    });

    it('termine avec le classement complet et le vainqueur', () => {
      const game = setup();
      startToFirstQuestion(game);
      game.session.submitAnswer(ALICE, 0, 'b');
      game.session.submitAnswer(BOB, 0, 'b');
      vi.advanceTimersByTime(REVEAL_DURATION_MS);
      vi.advanceTimersByTime(1_000);
      game.session.submitAnswer(ALICE, 1, 'b');
      game.session.submitAnswer(BOB, 1, 'a');
      vi.advanceTimersByTime(REVEAL_DURATION_MS);

      const over = game.last<GameOverPayload>('game:over');
      expect(over.gameId).toBe(42);
      expect(over.winnerId).toBe(BOB);
      expect(over.ranking).toEqual([
        {
          userId: BOB,
          score: 100 + 290,
          correctCount: 2,
          totalCorrectMs: 1_000,
          forfeit: false,
          rank: 1,
        },
        {
          userId: ALICE,
          score: 100,
          correctCount: 1,
          totalCorrectMs: 0,
          forfeit: false,
          rank: 2,
        },
      ]);
      expect(game.results[0]).toMatchObject({
        gameId: 42,
        winnerId: BOB,
        endedEarly: false,
      });
    });
  });

  describe('joueurs déconnectés et forfaits', () => {
    it("n'attend pas un joueur déconnecté pour fermer la question", () => {
      const connected = new Set([ALICE, BOB]);
      const game = setup({ connected });
      startToFirstQuestion(game);
      connected.delete(BOB);
      game.session.presenceChanged();
      expect(game.count('question:reveal')).toBe(0); // alice n'a pas répondu
      game.session.submitAnswer(ALICE, 0, 'b');
      expect(game.count('question:reveal')).toBe(1);
    });

    it('un forfait est classé dernier et ne peut plus répondre', () => {
      const game = setup({ players: [ALICE, BOB, CAROL] });
      startToFirstQuestion(game);
      game.session.submitAnswer(CAROL, 0, 'b');
      game.session.forfeit(CAROL);
      expect(game.session.submitAnswer(CAROL, 1, 'a')).toEqual({
        ok: false,
        code: 'INVALID_STATE',
      });
      game.session.submitAnswer(ALICE, 0, 'a');
      game.session.submitAnswer(BOB, 0, 'a');
      expect(game.count('question:reveal')).toBe(1); // carol n'est plus attendue
    });

    it("s'arrête quand il ne reste qu'un joueur : il gagne", () => {
      const game = setup();
      startToFirstQuestion(game);
      game.session.forfeit(BOB);
      expect(game.session.currentPhase).toBe('FINISHED');
      const over = game.last<GameOverPayload>('game:over');
      expect(over.winnerId).toBe(ALICE);
      expect(over.ranking.map((r) => [r.userId, r.forfeit])).toEqual([
        [ALICE, false],
        [BOB, true],
      ]);
      expect(game.results[0].endedEarly).toBe(true);
      vi.advanceTimersByTime(60_000);
      expect(game.count('question:new')).toBe(1); // plus rien ne part
    });
  });

  it('dispose() arrête tout sans rien émettre', () => {
    const game = setup();
    startToFirstQuestion(game);
    const before = game.sent.length;
    game.session.dispose();
    vi.advanceTimersByTime(120_000);
    expect(game.sent).toHaveLength(before);
    expect(game.results).toHaveLength(0);
  });
});
