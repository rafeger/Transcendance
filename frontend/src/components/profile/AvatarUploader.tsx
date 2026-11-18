import { useRef, useState, type ChangeEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button } from '../ui';
import { apiFetch } from '../../lib/api';
import { DEFAULT_AVATAR_URL, toAvatarBlob } from '../../lib/avatar';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

/** Limite sur la photo choisie, avant réduction (le serveur accepte 2 Mo après). */
const MAX_SOURCE_BYTES = 10 * 1024 * 1024;

type AvatarResponse = { avatarUrl: string };

interface AvatarUploaderProps {
  userName: string;
  avatarUrl: string;
  /** Appelé avec la nouvelle URL après un envoi ou une suppression réussis. */
  onChange: (avatarUrl: string) => void;
}

export function AvatarUploader({
  userName,
  avatarUrl,
  onChange,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const upload = useMutation({
    mutationFn: async (file: File) => {
      const blob = await toAvatarBlob(file).catch(() => {
        throw new Error('Impossible de lire cette image.');
      });
      const formData = new FormData();
      const fileName = blob.type === 'image/webp' ? 'avatar.webp' : 'avatar.png';
      formData.append('avatar', blob, fileName);
      return apiFetch<AvatarResponse>('/users/me/avatar', {
        method: 'PUT',
        body: formData,
      });
    },
    onSuccess: (data) => onChange(data.avatarUrl),
    onError: (err) => setError(err.message),
  });

  const remove = useMutation({
    mutationFn: () =>
      apiFetch<AvatarResponse>('/users/me/avatar', { method: 'DELETE' }),
    onSuccess: (data) => onChange(data.avatarUrl),
    onError: (err) => setError(err.message),
  });

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ''; // permet de rechoisir le même fichier ensuite
    if (!file) return;

    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Formats acceptés : PNG, JPEG ou WebP.');
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setError('Image trop lourde (10 Mo maximum).');
      return;
    }
    upload.mutate(file);
  }

  function handleRemove() {
    setError(null);
    remove.mutate();
  }

  const busy = upload.isPending || remove.isPending;
  const isDefault = avatarUrl === DEFAULT_AVATAR_URL;

  return (
    <div className="flex items-center gap-4">
      <Avatar name={userName} src={avatarUrl} size="lg" />

      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            loading={upload.isPending}
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            Changer l'avatar
          </Button>
          {!isDefault && (
            <Button
              size="sm"
              variant="secondary"
              loading={remove.isPending}
              disabled={busy}
              onClick={handleRemove}
            >
              Retirer
            </Button>
          )}
        </div>
        <p className="text-xs text-muted">
          PNG, JPEG ou WebP — recadrée en carré.
        </p>
        {error && (
          <p role="alert" className="text-sm text-error">
            {error}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}