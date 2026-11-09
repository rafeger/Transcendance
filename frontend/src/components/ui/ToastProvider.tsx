import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';
import { Button } from './Button';
import {
  ToastContext,
  type ToastOptions,
  type ToastVariant,
} from './toastContext';

type ToastItem = ToastOptions & { id: number };

const icons = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};

const accents: Record<ToastVariant, string> = {
  info: 'border-l-primary',
  success: 'border-l-success',
  warning: 'border-l-warning',
  error: 'border-l-error',
};

const iconColors: Record<ToastVariant, string> = {
  info: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: number) => void;
}) {
  const { id, title, message, variant = 'info', duration = 5000 } = toast;
  const Icon = icons[variant];

  // Disparition automatique après `duration` ms.
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 rounded-card border border-l-4 border-border ${accents[variant]} bg-surface p-4 text-fg shadow-lg`}
    >
      <Icon
        aria-hidden="true"
        className={`mt-0.5 size-5 shrink-0 ${iconColors[variant]}`}
      />
      <div className="min-w-0 flex-1 text-sm">
        {title && <p className="font-semibold">{title}</p>}
        <p className={title ? 'text-muted' : ''}>{message}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        aria-label="Fermer la notification"
        onClick={() => onDismiss(id)}
        className="-mt-1 -mr-2"
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { ...options, id }]);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Zone toujours présente : tout ce qui y apparaît est lu par les lecteurs d'écran. */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}