import { createContext } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  message: string;
  title?: string;
  variant?: ToastVariant;
  /** Durée d'affichage en millisecondes (5000 par défaut). */
  duration?: number;
}

export interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined,
);