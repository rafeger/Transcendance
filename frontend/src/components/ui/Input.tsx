import { useId, type ComponentProps } from 'react';
import { CircleAlert } from 'lucide-react';

interface InputProps extends ComponentProps<'input'> {
  /** Texte du <label>, obligatoire : un champ doit toujours avoir un nom. */
  label: string;
  /** Message d'aide affiché sous le champ (ex. « 8 caractères minimum »). */
  hint?: string;
  /** Message d'erreur : passe le champ en rouge et le relie au champ. */
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  id,
  required,
  disabled,
  className = '',
  'aria-describedby': describedByProp,
  ...props
}: InputProps) {
  // useId génère un identifiant unique et stable, ex. « _r_1_ ».
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  // Liste des éléments qui décrivent le champ, séparés par des espaces.
  const describedBy =
    [describedByProp, hint && hintId, error && errorId]
      .filter(Boolean)
      .join(' ') || undefined;

  const borderColor = error ? 'border-error' : 'border-muted';
  const outlineColor = error
    ? 'focus-visible:outline-error'
    : 'focus-visible:outline-primary';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error">
            {' '}
            *
          </span>
        )}
      </label>

      <input
        {...props}
        id={inputId}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={
          `h-10 rounded-control border bg-surface px-3 text-sm text-fg ` +
          `placeholder:text-muted transition-colors ` +
          `focus-visible:outline-2 focus-visible:outline-offset-2 ` +
          `disabled:cursor-not-allowed disabled:opacity-50 ` +
          `${borderColor} ${outlineColor}`
        }
      />

      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-sm text-error"
        >
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}