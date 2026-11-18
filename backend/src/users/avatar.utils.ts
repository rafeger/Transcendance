import { join } from 'node:path';

/** Dossier où sont écrits les avatars envoyés (monté sur un volume en conteneur). */
export const AVATAR_DIR = join(process.cwd(), 'uploads', 'avatars');

/** Dossier versionné dans Git qui contient l'avatar par défaut. */
export const DEFAULT_AVATAR_DIR = join(process.cwd(), 'assets', 'avatars');

/** Préfixe public des avatars (Nginx et Vite transmettent /api/* au backend). */
export const AVATAR_URL_PREFIX = '/api/avatars';

export const DEFAULT_AVATAR_URL = `${AVATAR_URL_PREFIX}/default.svg`;

/** Taille maximale d'un avatar envoyé : 2 Mo. */
export const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

/** Types acceptés, vérifiés sur les octets du fichier (magic numbers). */
export const AVATAR_MIME_TYPES = /^image\/(png|jpeg|webp)$/;

/** Extension écrite sur le disque selon le type réellement détecté. */
export const AVATAR_EXTENSIONS: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

/** URL publique d'un avatar envoyé, telle qu'on la stocke dans User.avatarUrl. */
export function uploadedAvatarUrl(fileName: string): string {
  return `${AVATAR_URL_PREFIX}/${fileName}`;
}

/** User.avatarUrl null (pas d'avatar envoyé) → URL de l'avatar par défaut. */
export function withAvatarUrl<T extends { avatarUrl: string | null }>(user: T) {
  return { ...user, avatarUrl: user.avatarUrl ?? DEFAULT_AVATAR_URL };
}