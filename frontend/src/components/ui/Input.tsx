import type { ComponentProps } from 'react';
import { Field } from './Field';
import { controlStyles, useField } from './useField';

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
  className,
  'aria-describedby': describedBy,
  ...props
}: InputProps) {
  const field = useField({ id, hint, error, describedBy });

  return (
    <Field
      field={field}
      label={label}
      hint={hint}
      error={error}
      required={required}
      className={className}
    >
      <input
        {...props}
        {...field.controlProps}
        required={required}
        className={controlStyles(!!error)}
      />
    </Field>
  );
}
