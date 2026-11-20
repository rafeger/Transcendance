import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/users';
import { socket } from '../lib/socket';

/** Utilisateur pour lequel le socket est ouvert (le serveur lit le JWT à la connexion). */
let socketUserId: number | null = null;

/** Demande au backend qui est connecté : null si pas de session valide. */
async function fetchMe(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', { credentials: 'include' });
    return response.ok ? ((await response.json()) as User) : null;
  } catch {
    return null;
  }
}

/** Ouvre le socket pour l'utilisateur connecté, le ferme sinon. */
function syncSocket(me: User | null) {
  const userId = me?.id ?? null;
  if (socket.active && socketUserId === userId) return; // déjà dans le bon état
  if (socket.active) socket.disconnect(); // déconnexion ou changement de compte
  socketUserId = userId;
  if (userId !== null) socket.connect(); // envoie le cookie du nouveau compte
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = user !== null;

  async function checkAuth(): Promise<void> {
    const me = await fetchMe();
    setUser(me);
    syncSocket(me);
    setIsLoading(false);
  }

  useEffect(() => {
    let ignore = false; // en dev, StrictMode lance l'effet deux fois
    fetchMe().then((me) => {
      if (ignore) return;
      setUser(me);
      syncSocket(me);
      setIsLoading(false);
    });
    return () => {
      ignore = true;
    };
  }, []);

  function updateUser(changes: Partial<User>) {
    setUser((current) => (current ? { ...current, ...changes } : current));
  }

  async function logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      syncSocket(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, checkAuth, updateUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}