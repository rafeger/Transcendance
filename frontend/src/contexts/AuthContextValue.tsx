import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types/users';
import { socket } from '../lib/socket';


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = Boolean(user);
  const [isLoading, setIsLoading] = useState(true);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function checkAuth(): Promise<void> {
    
    try {
      const response = await fetch('/api/auth/me' ,{
        method:      'GET',
        credentials:  'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (!socket.connected) {
          socket.connect();
          setUser(data);
        }  
      }
      else {
        setUser(null);
      }
    }
    catch {
      return setUser(null);
    }
    finally {
      setIsLoading(false);//isLoading stays at false in all circonstances
    }
  }

  useEffect(() => {
    let ignore = false;

    async function initAuth() {
      try {
        
        const response = await fetch('/api/auth/me' ,{
          method:      'GET',
          credentials:  'include',
        });
        if (ignore) return;
        
        if (response.ok) {
          const data = await response.json();
          if (!socket.connected) {
            socket.connect();
            setUser(data);
          }  
        }
        else {
          setUser(null);
        }
      }
      catch {
        if (!ignore) {
          return setUser(null);
        }
      }
      finally {
        if (!ignore) {
          setIsLoading(false);//isLoading stays at false in all circonstances
        }
      }
    }

    initAuth();

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
        method:       'POST',
        credentials:  'include',
      });
    }
    finally {
      setUser(null);
      socket.disconnect();
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, checkAuth, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
