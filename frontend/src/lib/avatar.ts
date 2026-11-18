/** Doit rester identique à DEFAULT_AVATAR_URL du backend (users/avatar.utils.ts). */
export const DEFAULT_AVATAR_URL = '/api/avatars/default.svg';

/** Côté (en pixels) de l'avatar envoyé au serveur. */
const AVATAR_SIZE = 256;

/**
 * Recadre l'image au centre en carré, la réduit à 256 × 256 et la réencode.
 * Réencoder via un <canvas> retire aussi les métadonnées (EXIF, position GPS…).
 * Rejette la promesse si le fichier n'est pas une image lisible.
 */
export async function toAvatarBlob(file: File): Promise<Blob> {
  const image = await createImageBitmap(file);
  const side = Math.min(image.width, image.height);

  const canvas = document.createElement('canvas');
  canvas.width = AVATAR_SIZE;
  canvas.height = AVATAR_SIZE;
  const context = canvas.getContext('2d');
  if (!context) {
    image.close();
    throw new Error('Canvas not supported');
  }
  context.drawImage(
    image,
    (image.width - side) / 2, // zone source : le plus grand carré centré
    (image.height - side) / 2,
    side,
    side,
    0, // zone destination : tout le canvas
    0,
    AVATAR_SIZE,
    AVATAR_SIZE,
  );
  image.close();

  // WebP si le navigateur sait l'encoder, sinon il renvoie du PNG (accepté aussi).
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Encoding failed'))),
      'image/webp',
      0.9,
    );
  });
}