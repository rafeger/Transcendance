import { useState } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarStatus = 'online' | 'offline';

const sizes: Record<AvatarSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-16 text-xl',
};

const statusSizes: Record<AvatarSize, string> = {
  sm: 'size-2.5',
  md: 'size-3',
  lg: 'size-4',
};

const statusLabels: Record<AvatarStatus, string> = {
  online: 'en ligne',
  offline: 'hors ligne',
};

interface AvatarProps {
  /** Nom de l'utilisateur : sert au texte alternatif et aux initiales. */
  name: string;
  /** URL de la photo. Absente ou cassée → initiales. */
  src?: string | null;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

/** « Raphaël Feger » → « RF », « raph » → « R ». */
function getInitials(name: string) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  return initials || '?';
}

export function Avatar({
  name,
  src,
  size = 'md',
  status,
  className = '',
}: AvatarProps) {
  // Mémorise l'URL qui a échoué : si src change, on réessaie la nouvelle.
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && src !== failedSrc;
  const label = status ? `${name} (${statusLabels[status]})` : name;

  return (
    <span
      role="img"
      aria-label={label}
      className={`relative inline-flex shrink-0 ${className}`}
    >
      {showImage ? (
        <img
          src={src ?? undefined}
          alt=""
          onError={() => setFailedSrc(src ?? null)}
          className={`${sizes[size]} rounded-full object-cover`}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`${sizes[size]} inline-flex items-center justify-center rounded-full bg-primary font-semibold text-white select-none`}
        >
          {getInitials(name)}
        </span>
      )}

      {status && (
        <span
          aria-hidden="true"
          className={`absolute right-0 bottom-0 ${statusSizes[size]} rounded-full ring-2 ring-bg ${
            status === 'online' ? 'bg-success' : 'bg-muted'
          }`}
        />
      )}
    </span>
  );
}