export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-semibold ' +
  'transition-colors select-none enabled:cursor-pointer ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  secondary: 'border border-border bg-surface text-fg hover:bg-fg/5',
  ghost: 'text-muted hover:bg-fg/5 hover:text-fg',
  danger: 'bg-danger text-white hover:bg-danger-hover',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Renvoie les classes d'un bouton.
 * Utilisable seul pour donner l'apparence d'un bouton à un <Link> :
 *   <Link to="/quiz" className={buttonStyles({ size: 'lg' })}>Jouer</Link>
 */
export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className = '',
}: ButtonStyleOptions = {}) {
  return [base, variants[variant], sizes[size], className].join(' ');
}