const API_URL = '/api';

/** Erreur HTTP de l'API, avec le message renvoyé par NestJS. */
export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  // Avec un FormData (envoi de fichier), le navigateur doit écrire lui-même
  // le Content-Type (multipart/form-data + boundary) : on ne force le JSON que sinon.
  const isFormData = options.body instanceof FormData;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await readErrorMessage(response));
  }
  return response.json() as Promise<T>;
}

/** NestJS répond { message: string | string[] } : on le rend lisible. */
async function readErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) return body.message.join(', ');
    if (body.message) return body.message;
  } catch {
    // Corps vide ou non JSON (ex. 413 renvoyé par Nginx en HTML).
  }
  return `Error API: ${response.status}`;
}