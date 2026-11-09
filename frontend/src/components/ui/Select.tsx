import type { ComponentProps } from 'react';
import { ChevronDown } from 'lucide-react';
import { Field } from './Field';
import { controlStyles, useField } from './useField';

interface SelectProps extends ComponentProps<'select'> {
  label: string;
  hint?: string;
  error?: string;
  /** Première option grisée (ex. « Choisir une catégorie »), valeur "". */
  placeholder?: string;
}

export function Select({
  label,
  hint,
  error,
  placeholder,
  id,
  required,
  className,
  children,
  'aria-describedby': describedBy,
  ...props
}: SelectProps) {
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
      <div className="relative">
        <select
          {...props}
          {...field.controlProps}
          required={required}
          className={`${controlStyles(!!error)} appearance-none pr-10 enabled:cursor-pointer`}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        />
      </div>
    </Field>
  );
}