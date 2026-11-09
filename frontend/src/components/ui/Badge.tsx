import type { HTMLAttributes } from 'react';

type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const tones: Record<BadgeVariant, { box: string; dot: string }> = {
  neutral: { box: 'border-muted/40 bg-muted/10', dot: 'bg-muted' },
  primary: { box: 'border-primary/40 bg-primary/10', dot: 'bg-primary' },
  success: { box: 'border-success/40 bg-success/10', dot: 'bg-success' },
  warning: { box: 'border-warning/40 bg-warning/10', dot: 'bg-warning' },
  danger: { box: 'border-error/40 bg-error/10', dot: 'bg-error' },
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Pastille colorée devant le texte. */
  dot?: boolean;
}

export function Badge({
  variant = 'neutral',
  dot = true,
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={
        `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 ` +
        `text-xs font-medium text-fg ${tones[variant].box} ${className}`
      }
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`size-1.5 rounded-full ${tones[variant].dot}`}
        />
      )}
      {children}
    </span>
  );
}