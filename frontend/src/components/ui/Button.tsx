import type { ComponentProps } from 'react';
import { Spinner } from './Spinner';
import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from './buttonStyles';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Affiche un spinner et désactive le bouton pendant une action async. */
  loading?: boolean;
}

export function Button({
  variant,
  size,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles({ variant, size, className })}
    >
      {loading && <Spinner size="sm" decorative />}
      {children}
    </button>
  );
}
