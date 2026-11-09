import { useId } from 'react';

interface UseFieldOptions {
  id?: string;
  hint?: string;
  error?: string;
  /** aria-describedby éventuellement passé par l'appelant, à conserver. */
  describedBy?: string;
}

/**
 * Calcule les identifiants et les attributs ARIA d'un champ de formulaire.
 * Partagé par Input et Select pour ne pas dupliquer cette logique.
 */
export function useField({ id, hint, error, describedBy }: UseFieldOptions) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;

  const ariaDescribedBy =
    [describedBy, hint && hintId, error && errorId]
      .filter(Boolean)
      .join(' ') || undefined;

  return {
    controlId,
    hintId,
    errorId,
    /** À étaler sur le <input> ou le <select> : {...field.controlProps} */
    controlProps: {
      id: controlId,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': ariaDescribedBy,
    },
  };
}

export type FieldState = ReturnType<typeof useField>;

/** Classes communes aux champs (Input, Select). */
export function controlStyles(hasError: boolean) {
  return [
    'h-10 w-full rounded-control border bg-surface px-3 text-sm text-fg',
    'placeholder:text-muted transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    hasError
      ? 'border-error focus-visible:outline-error'
      : 'border-muted focus-visible:outline-primary',
  ].join(' ');
}