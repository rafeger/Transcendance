// Horloge et minuteries injectables.
//
// Le moteur ne lit jamais Date.now() ni setTimeout directement : il passe
// par une Clock. En production c'est l'horloge système ; dans les tests,
// vitest la remplace (vi.useFakeTimers) pour avancer le temps à la main,
// sans attendre 15 s par question.

export type TimerHandle = ReturnType<typeof setTimeout>;

export interface Clock {
  /** Heure actuelle en epoch ms (la même que `ts` dans les messages). */
  now(): number;
  setTimeout(fn: () => void, delayMs: number): TimerHandle;
  clearTimeout(handle: TimerHandle): void;
}

export const systemClock: Clock = {
  now: () => Date.now(),
  setTimeout: (fn, delayMs) => setTimeout(fn, delayMs),
  clearTimeout: (handle) => clearTimeout(handle),
};
