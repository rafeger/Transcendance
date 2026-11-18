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

/** Nom de fichier en base → URL publique (avatar par défaut si null). */
export function toAvatarUrl(avatar: string | null): string {
  return avatar ? `${AVATAR_URL_PREFIX}/${avatar}` : DEFAULT_AVATAR_URL;
}

/** Remplace le champ `avatar` (stocké en base) par `avatarUrl` (exposé par l'API). */
export function withAvatarUrl<T extends { avatar: string | null }>({
  avatar,
  ...user
}: T) {
  return { ...user, avatarUrl: toAvatarUrl(avatar) };
}