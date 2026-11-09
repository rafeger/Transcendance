import { LoaderCircle } from 'lucide-react';

type SpinnerSize = 'sm' | 'md' | 'lg';

const sizes: Record<SpinnerSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-10',
};

interface SpinnerProps {
  size?: SpinnerSize;
  /** Texte lu par les lecteurs d'écran (et affiché si showLabel). */
  label?: string;
  /** Affiche le label à côté de l'icône au lieu de le cacher. */
  showLabel?: boolean;
  /**
   * À utiliser quand un parent annonce déjà le chargement
   * (ex. Button avec aria-busy) : le spinner devient purement visuel.
   */
  decorative?: boolean;
  className?: string;
}

export function Spinner({
  size = 'md',
  label = 'Chargement…',
  showLabel = false,
  decorative = false,
  className = '',
}: SpinnerProps) {
  const icon = (
    <LoaderCircle
      aria-hidden="true"
      className={`${sizes[size]} shrink-0 animate-spin motion-reduce:[animation-duration:2s]`}
    />
  );

  if (decorative) {
    return <span className={`inline-flex ${className}`}>{icon}</span>;
  }

  return (
    <span
      role="status"
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {icon}
      <span className={showLabel ? 'text-sm' : 'sr-only'}>{label}</span>
    </span>
  );
}
