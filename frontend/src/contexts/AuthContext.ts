import { createContext } from 'react';
import type { User } from '../types/users';


export type AuthContextType = {
  isAuthenticated: boolean;
  // setIsAuthenticated: (value: boolean) => void;
  user: User | null;
  isLoading: boolean;
  checkAuth:  () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);