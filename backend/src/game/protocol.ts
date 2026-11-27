// Protocole temps réel de QuizArena (GAME_SPEC.md v2, §1.1 et §2).
//
// C'est le contrat entre le backend et le front : noms des événements
// socket.io, forme de leurs payloads, codes d'erreur et constantes de jeu.
// Le front en gardera une copie (frontend/src/types/game.ts, commit 10) :
// toute modification ici doit y être reportée, et dans GAME_SPEC.md.
//
// Ce fichier ne contient que des types et des constantes : aucune logique.

// ---------------------------------------------------------------------------
// Constantes de jeu (GAME_SPEC §1.1)
// ---------------------------------------------------------------------------

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 6;

export const QUESTION_COUNTS = [5, 10, 15] as const;
export const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

/** Durée d'une question. */
export const QUESTION_DURATION_MS = 15_000;
/** Tolérance de latence : une réponse est acceptée jusqu'à deadline + 300 ms. */
export const ANSWER_GRACE_MS = 300;
/** Durée de la révélation entre deux questions. */
export const REVEAL_DURATION_MS = 4_000;
/** Compte à rebours avant la première question. */
export const COUNTDOWN_MS = 3_000;
/** Délai pour revenir dans le LOBBY après une déconnexion (F5, onglet fermé). */
export const LOBBY_GRACE_MS = 5_000;
/** Délai pour revenir pendant une partie avant d'être déclaré forfait. */
export const GAME_GRACE_MS = 15_000;

export type QuestionCount = (typeof QUESTION_COUNTS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];
export type QuestionType = 'multiple' | 'boolean';
export type ChoiceId = 'a' | 'b' | 'c' | 'd';

/** Points d'une bonne réponse instantanée, selon la difficulté (§1.3). */
export const POINTS_BASE: Readonly<Record<Difficulty, number>> = {
  easy: 100,
  medium: 200,
  hard: 300,
};

/** Réglages choisis par l'hôte dans le LOBBY. `null` = Mix. */
export interface RoomSettings {
  questionCount: QuestionCount;
  /** `opentdbId` de la catégorie, ou null pour toutes les catégories. */
  category: number | null;
  difficulty: Difficulty | null;
}

export const DEFAULT_SETTINGS: Readonly<RoomSettings> = {
  questionCount: 5,
  category: null,
  difficulty: null,
};

// ---------------------------------------------------------------------------
// Accusés de réception et erreurs (GAME_SPEC §2.2 et §2.7)
// ---------------------------------------------------------------------------

export const ERROR_CODES = [
  'BAD_MESSAGE',
  'UNAUTHORIZED',
  'INVALID_STATE',
  'NOT_HOST',
  'ROOM_NOT_FOUND',
  'ROOM_FULL',
  'ALREADY_IN_ROOM',
  'NOT_ENOUGH_PLAYERS',
  'QUESTIONS_UNAVAILABLE',
  'ALREADY_ANSWERED',
  'WRONG_QUESTION',
  'TOO_LATE',
  'INVALID_CHOICE',
  'RATE_LIMITED',
  'INTERNAL_ERROR',
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export interface AckError {
  ok: false;
  code: ErrorCode;
  /** BAD_MESSAGE : ce qui ne va pas dans le payload (pour déboguer le front). */
  details?: string[];
  /** QUESTIONS_UNAVAILABLE : nombre de questions disponibles pour ces réglages. */
  available?: number;
}

/** Réponse du serveur dans le callback d'un emit (emitWithAck côté front). */
export type Ack<T extends object = object> = ({ ok: true } & T) | AckError;

// ---------------------------------------------------------------------------
// Salons (GAME_SPEC §2.4 et §2.5)
// ---------------------------------------------------------------------------

export type RoomStatus = 'LOBBY' | 'PLAYING' | 'FINISHED';

export interface PlayerProfile {
  userId: number;
  displayName: string;
  avatarUrl: string | null;
}

export interface RoomPlayer extends PlayerProfile {
  ready: boolean;
}

export interface RoomState {
  code: string;
  name: string;
  isPublic: boolean;
  state: RoomStatus;
  hostId: number;
  maxPlayers: number;
  settings: RoomSettings;
  /** Ordre d'arrivée : le premier est l'hôte d'origine. */
  players: RoomPlayer[];
}

export interface RoomSummary {
  code: string;
  name: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
}

export interface CreateRoomPayload {
  name: string;
  maxPlayers: number;
  isPublic: boolean;
}

export interface JoinRoomPayload {
  roomCode: string;
}

export interface ReadyPayload {
  ready: boolean;
}

export type SettingsPayload = RoomSettings;

export interface SessionSyncResult {
  rooms: RoomSummary[];
  currentRoom: RoomState | null;
}

// ---------------------------------------------------------------------------
// Partie (GAME_SPEC §2.5) — envoyés à partir du commit 9
// Chaque message de jeu porte `ts`, l'heure du serveur (epoch ms, §2.6).
// ---------------------------------------------------------------------------

export type GamePhase = 'COUNTDOWN' | 'QUESTION' | 'REVEAL' | 'FINISHED';

export interface ServerStamp {
  ts: number;
}

export interface Choice {
  id: ChoiceId;
  text: string;
}

export interface CountdownPayload extends ServerStamp {
  startsAt: number;
}

/** Question telle qu'envoyée aux joueurs : jamais la bonne réponse. */
export interface QuestionPayload extends ServerStamp {
  index: number;
  total: number;
  /** Nom de la catégorie, pour l'affichage. */
  category: string;
  difficulty: Difficulty;
  type: QuestionType;
  /** Texte brut : à afficher comme texte, jamais via dangerouslySetInnerHTML. */
  text: string;
  choices: Choice[];
  deadline: number;
  durationMs: number;
}

export interface AnswerPayload {
  questionIndex: number;
  choiceId: ChoiceId;
}

export interface ProgressPayload extends ServerStamp {
  index: number;
  answered: number[];
}

export interface AnswerResult {
  userId: number;
  choiceId: ChoiceId | null;
  correct: boolean;
  points: number;
  responseMs: number | null;
}

export interface ScoreLine {
  userId: number;
  score: number;
}

export interface RevealPayload extends ServerStamp {
  index: number;
  correctChoiceId: ChoiceId;
  results: AnswerResult[];
  scores: ScoreLine[];
  nextAt: number;
}

export interface RankingLine {
  userId: number;
  score: number;
  correctCount: number;
  totalCorrectMs: number;
  forfeit: boolean;
  /** 1 = vainqueur. */
  rank: number;
}

export interface GameOverPayload extends ServerStamp {
  ranking: RankingLine[];
  winnerId: number | null;
  gameId: number;
}

export interface PlayerEventPayload extends ServerStamp {
  userId: number;
}

export interface PlayerDisconnectedPayload extends PlayerEventPayload {
  graceUntil: number;
}

// ---------------------------------------------------------------------------
// Carte des événements, pour typer socket.io des deux côtés :
//   front : io() as Socket<ServerToClientEvents, ClientToServerEvents>
// ---------------------------------------------------------------------------

type AckFn<T extends object = object> = (res: Ack<T>) => void;

export interface ClientToServerEvents {
  'session:sync': (ack: AckFn<SessionSyncResult>) => void;
  'room:create': (
    payload: CreateRoomPayload,
    ack: AckFn<{ room: RoomState }>,
  ) => void;
  'room:join': (
    payload: JoinRoomPayload,
    ack: AckFn<{ room: RoomState }>,
  ) => void;
  'room:leave': (ack: AckFn) => void;
  'room:ready': (payload: ReadyPayload, ack: AckFn) => void;
  'room:settings': (payload: SettingsPayload, ack: AckFn) => void;
  'room:start': (ack: AckFn) => void;
  'answer:submit': (payload: AnswerPayload, ack: AckFn) => void;
  'room:rematch': (ack: AckFn) => void;
}

export interface ServerToClientEvents {
  'room:state': (room: RoomState) => void;
  'lobby:rooms': (rooms: RoomSummary[]) => void;
  'room:closed': (payload: { code: string }) => void;
  'game:countdown': (payload: CountdownPayload) => void;
  'question:new': (payload: QuestionPayload) => void;
  'question:progress': (payload: ProgressPayload) => void;
  'question:reveal': (payload: RevealPayload) => void;
  'game:over': (payload: GameOverPayload) => void;
  'player:disconnected': (payload: PlayerDisconnectedPayload) => void;
  'player:reconnected': (payload: PlayerEventPayload) => void;
  'player:forfeit': (payload: PlayerEventPayload) => void;
}
