import { useId } from 'react';

type ProgressVariant = 'primary' | 'success' | 'warning' | 'danger';

const bars: Record<ProgressVariant, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

interface ProgressBarProps {
  value: number;
  max?: number;
  /** Nom de la barre (obligatoire, lu par les lecteurs d'écran). */
  label: string;
  /** Affiche le label et la valeur au-dessus de la barre. */
  showLabel?: boolean;
  /** Valeur lisible, ex. « Question 3 sur 10 » (sinon un pourcentage). */
  valueText?: string;
  variant?: ProgressVariant;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = false,
  valueText,
  variant = 'primary',
  className = '',
}: ProgressBarProps) {
  const labelId = useId();
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = max > 0 ? (clamped / max) * 100 : 0;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span id={labelId} className="font-medium text-fg">
            {label}
          </span>
          <span className="text-muted">
            {valueText ?? `${Math.round(percent)} %`}
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-labelledby={showLabel ? labelId : undefined}
        aria-label={showLabel ? undefined : label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={clamped}
        aria-valuetext={valueText}
        className="h-2 w-full overflow-hidden rounded-full bg-fg/10"
      >
        <div
          className={`h-full rounded-full ${bars[variant]} transition-[width] duration-300 motion-reduce:transition-none`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
