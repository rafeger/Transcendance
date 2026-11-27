// Moteur d'une partie (GAME_SPEC v2, §1.2 à §1.6 et §2.3).
//
// Une instance = une partie en cours dans un salon. Elle ne connaît ni
// socket.io, ni Nest, ni la base de données :
//   - elle reçoit les joueurs et les questions déjà tirées ;
//   - elle émet ses messages via `emit` (la gateway les diffusera au salon) ;
//   - elle lit l'heure via une Clock injectée (testable sans attendre).
// C'est elle qui fait autorité : timer, acceptation des réponses, points.

import { systemClock, type Clock, type TimerHandle } from './clock.js';
import {
  ANSWER_GRACE_MS,
  COUNTDOWN_MS,
  POINTS_BASE,
  QUESTION_DURATION_MS,
  REVEAL_DURATION_MS,
  type Ack,
  type AnswerResult,
  type ChoiceId,
  type Choice,
  type Difficulty,
  type GamePhase,
  type QuestionType,
  type RankingLine,
  type ServerToClientEvents,
} from './protocol.js';

/** Question tirée en base, avec sa bonne réponse (ne quitte jamais le serveur). */
export interface SessionQuestion {
  text: string;
  /** Nom de la catégorie, pour l'affichage. */
  category: string;
  difficulty: Difficulty;
  type: QuestionType;
  choices: Choice[];
  correctChoiceId: ChoiceId;
}

/** Événements que le moteur envoie (tous à destination du salon). */
export type SessionEvent =
  | 'game:countdown'
  | 'question:new'
  | 'question:progress'
  | 'question:reveal'
  | 'game:over';

export type SessionEmit = <E extends SessionEvent>(
  event: E,
  payload: Parameters<ServerToClientEvents[E]>[0],
) => void;

/** Résultat final, transmis à `onFinished` (pour l'enregistrement en base). */
export interface SessionResult {
  gameId: number;
  ranking: RankingLine[];
  winnerId: number | null;
  /** true si la partie s'est arrêtée avant la dernière question (forfaits). */
  endedEarly: boolean;
}

export interface SessionOptions {
  gameId: number;
  /** userIds dans l'ordre d'arrivée du salon. */
  players: number[];
  questions: SessionQuestion[];
  emit: SessionEmit;
  /** Appelé une fois, à la fin de la partie. */
  onFinished?: (result: SessionResult) => void;
  /** Le joueur a-t-il au moins un onglet connecté ? (défaut : oui) */
  isConnected?: (userId: number) => boolean;
  clock?: Clock;
}

interface PlayerState {
  userId: number;
  score: number;
  correctCount: number;
  /** Somme des temps de réponse des bonnes réponses (départage). */
  totalCorrectMs: number;
  forfeit: boolean;
}

interface Submission {
  choiceId: ChoiceId;
  receivedAt: number;
}

/**
 * Points d'une bonne réponse (§1.3) :
 * round(base × (0.5 + 0.5 × temps_restant / temps_total)), temps_restant borné.
 */
export function computePoints(
  difficulty: Difficulty,
  remainingMs: number,
  durationMs: number = QUESTION_DURATION_MS,
): number {
  const remaining = Math.min(Math.max(remainingMs, 0), durationMs);
  return Math.round(
    POINTS_BASE[difficulty] * (0.5 + (0.5 * remaining) / durationMs),
  );
}

type RankInput = Omit<RankingLine, 'rank'>;

/** Ordre du classement (§1.3) : forfaits derniers, score ↓, bonnes réponses ↓, temps ↑. */
function compareLines(a: RankInput, b: RankInput): number {
  return (
    Number(a.forfeit) - Number(b.forfeit) ||
    b.score - a.score ||
    b.correctCount - a.correctCount ||
    a.totalCorrectMs - b.totalCorrectMs
  );
}

/**
 * Classe les joueurs. Égalité parfaite = même rang, et le rang suivant est
 * sauté (1, 1, 3). Le vainqueur est seul au rang 1, sinon `null` (match nul).
 */
export function rankPlayers(lines: RankInput[]): {
  ranking: RankingLine[];
  winnerId: number | null;
} {
  const sorted = [...lines].sort(compareLines);
  const ranking: RankingLine[] = [];
  sorted.forEach((line, i) => {
    const previous = ranking[i - 1];
    const tied = previous !== undefined && compareLines(previous, line) === 0;
    ranking.push({ ...line, rank: tied ? previous.rank : i + 1 });
  });
  const first = ranking.filter((line) => line.rank === 1 && !line.forfeit);
  return { ranking, winnerId: first.length === 1 ? first[0].userId : null };
}

export class GameSession {
  readonly gameId: number;

  private phase: GamePhase | 'WAITING' = 'WAITING';
  private index = -1;
  private questionStartedAt = 0;
  private deadline = 0;
  private timer: TimerHandle | null = null;
  private submissions = new Map<number, Submission>();
  private readonly players: PlayerState[];
  private readonly questions: SessionQuestion[];
  private readonly emit: SessionEmit;
  private readonly onFinished?: (result: SessionResult) => void;
  private readonly isConnected: (userId: number) => boolean;
  private readonly clock: Clock;

  constructor(options: SessionOptions) {
    if (options.players.length === 0 || options.questions.length === 0) {
      throw new Error('A game needs at least one player and one question');
    }
    this.gameId = options.gameId;
    this.players = options.players.map((userId) => ({
      userId,
      score: 0,
      correctCount: 0,
      totalCorrectMs: 0,
      forfeit: false,
    }));
    this.questions = options.questions;
    this.emit = options.emit;
    this.onFinished = options.onFinished;
    this.isConnected = options.isConnected ?? (() => true);
    this.clock = options.clock ?? systemClock;
  }

  get currentPhase(): GamePhase | 'WAITING' {
    return this.phase;
  }

  get currentIndex(): number {
    return this.index;
  }

  /** Lance le compte à rebours ; la première question suit 3 s plus tard. */
  start(): void {
    if (this.phase !== 'WAITING') return;
    const now = this.clock.now();
    this.phase = 'COUNTDOWN';
    this.emit('game:countdown', { ts: now, startsAt: now + COUNTDOWN_MS });
    this.schedule(COUNTDOWN_MS, () => this.nextQuestion());
  }

  /** answer:submit — une seule réponse par joueur et par question. */
  submitAnswer(userId: number, questionIndex: number, choiceId: string): Ack {
    const now = this.clock.now();
    const player = this.player(userId);
    if (!player || player.forfeit) return { ok: false, code: 'INVALID_STATE' };
    // la question vient de se fermer (révélation en cours) : trop tard
    if (this.phase === 'REVEAL' && questionIndex === this.index) {
      return { ok: false, code: 'TOO_LATE' };
    }
    if (this.phase !== 'QUESTION') return { ok: false, code: 'INVALID_STATE' };
    if (questionIndex !== this.index)
      return { ok: false, code: 'WRONG_QUESTION' };
    if (this.submissions.has(userId))
      return { ok: false, code: 'ALREADY_ANSWERED' };
    if (now > this.deadline + ANSWER_GRACE_MS)
      return { ok: false, code: 'TOO_LATE' };
    const question = this.questions[this.index];
    if (!question.choices.some((c) => c.id === choiceId)) {
      return { ok: false, code: 'INVALID_CHOICE' };
    }

    this.submissions.set(userId, {
      choiceId: choiceId as ChoiceId,
      receivedAt: now,
    });
    // qui a répondu, jamais quoi (§1.6)
    this.emit('question:progress', {
      ts: now,
      index: this.index,
      answered: [...this.submissions.keys()],
    });
    this.closeQuestionIfEveryoneAnswered();
    return { ok: true };
  }

  /** Un joueur s'est (dé)connecté : il ne bloque plus la question en cours. */
  presenceChanged(): void {
    this.closeQuestionIfEveryoneAnswered();
  }

  /**
   * Forfait (room:leave en partie, ou plus de 15 s sans revenir).
   * S'il ne reste qu'un joueur, la partie s'arrête et il gagne.
   */
  forfeit(userId: number): void {
    const player = this.player(userId);
    if (!player || player.forfeit || this.phase === 'FINISHED') return;
    player.forfeit = true;
    this.submissions.delete(userId);

    if (this.activePlayers().length <= 1) {
      this.finish(true);
      return;
    }
    this.closeQuestionIfEveryoneAnswered();
  }

  /** Arrête les minuteries sans rien émettre (salon supprimé). */
  dispose(): void {
    this.clearTimer();
    this.phase = 'FINISHED';
  }

  // -------------------------------------------------------------------------

  private nextQuestion(): void {
    this.index += 1;
    if (this.index >= this.questions.length) {
      this.finish(false);
      return;
    }
    const question = this.questions[this.index];
    const now = this.clock.now();
    this.phase = 'QUESTION';
    this.submissions = new Map();
    this.questionStartedAt = now;
    this.deadline = now + QUESTION_DURATION_MS;

    // construit champ par champ : la bonne réponse ne part jamais (§1.6)
    this.emit('question:new', {
      ts: now,
      index: this.index,
      total: this.questions.length,
      category: question.category,
      difficulty: question.difficulty,
      type: question.type,
      text: question.text,
      choices: question.choices.map((c) => ({ id: c.id, text: c.text })),
      deadline: this.deadline,
      durationMs: QUESTION_DURATION_MS,
    });
    // les réponses restent acceptées jusqu'à deadline + tolérance (§1.1)
    this.schedule(QUESTION_DURATION_MS + ANSWER_GRACE_MS, () => this.reveal());
  }

  private closeQuestionIfEveryoneAnswered(): void {
    if (this.phase !== 'QUESTION') return;
    const waitingFor = this.activePlayers().filter(
      (p) => this.isConnected(p.userId) && !this.submissions.has(p.userId),
    );
    if (waitingFor.length === 0) this.reveal();
  }

  private reveal(): void {
    if (this.phase !== 'QUESTION') return;
    this.clearTimer();
    const now = this.clock.now();
    const question = this.questions[this.index];
    this.phase = 'REVEAL';

    const results: AnswerResult[] = this.players.map((player) => {
      const sub = this.submissions.get(player.userId);
      if (!sub) {
        return {
          userId: player.userId,
          choiceId: null,
          correct: false,
          points: 0,
          responseMs: null,
        };
      }
      const responseMs = sub.receivedAt - this.questionStartedAt;
      const correct = sub.choiceId === question.correctChoiceId;
      const points = correct
        ? computePoints(question.difficulty, this.deadline - sub.receivedAt)
        : 0;
      if (correct) {
        player.score += points;
        player.correctCount += 1;
        player.totalCorrectMs += responseMs;
      }
      return {
        userId: player.userId,
        choiceId: sub.choiceId,
        correct,
        points,
        responseMs,
      };
    });

    const nextAt = now + REVEAL_DURATION_MS;
    this.emit('question:reveal', {
      ts: now,
      index: this.index,
      correctChoiceId: question.correctChoiceId,
      results,
      scores: this.players.map((p) => ({ userId: p.userId, score: p.score })),
      nextAt,
    });
    this.schedule(REVEAL_DURATION_MS, () => this.nextQuestion());
  }

  private finish(endedEarly: boolean): void {
    if (this.phase === 'FINISHED') return;
    this.clearTimer();
    this.phase = 'FINISHED';
    const { ranking, winnerId } = rankPlayers(
      this.players.map(
        ({ userId, score, correctCount, totalCorrectMs, forfeit }) => ({
          userId,
          score,
          correctCount,
          totalCorrectMs,
          forfeit,
        }),
      ),
    );
    this.emit('game:over', {
      ts: this.clock.now(),
      ranking,
      winnerId,
      gameId: this.gameId,
    });
    this.onFinished?.({ gameId: this.gameId, ranking, winnerId, endedEarly });
  }

  private activePlayers(): PlayerState[] {
    return this.players.filter((p) => !p.forfeit);
  }

  private player(userId: number): PlayerState | undefined {
    return this.players.find((p) => p.userId === userId);
  }

  private schedule(delayMs: number, fn: () => void): void {
    this.clearTimer();
    this.timer = this.clock.setTimeout(() => {
      this.timer = null;
      fn();
    }, delayMs);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      this.clock.clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
