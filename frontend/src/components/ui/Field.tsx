import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';
import type { FieldState } from './useField';

interface FieldProps {
  field: FieldState;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Mise en page commune : label, champ (children), aide, erreur. */
export function Field({
  field,
  label,
  hint,
  error,
  required,
  className = '',
  children,
}: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={field.controlId} className="text-sm font-medium text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="text-error"> *</span>
        )}
      </label>

      {children}

      {hint && (
        <p id={field.hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p
          id={field.errorId}
          className="flex items-center gap-1.5 text-sm text-error"
        >
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}