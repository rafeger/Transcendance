import {
  useEffect,
  useId,
  useRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

type ModalSize = 'sm' | 'md' | 'lg';

const widths: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
};

interface ModalProps {
  /** La modale est-elle ouverte ? (état géré par le parent) */
  open: boolean;
  /** Appelée sur Échap, clic sur le fond ou bouton Fermer. */
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Boutons d'action, alignés à droite en bas. */
  footer?: ReactNode;
  size?: ModalSize;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  // Synchronise la prop `open` avec le <dialog> natif du navigateur.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  // Un clic dont la cible est le <dialog> lui-même = clic sur le fond.
  function handleClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleClick}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={`m-auto w-[calc(100%-2rem)] ${widths[size]} rounded-card border border-border bg-surface p-0 text-fg shadow-xl backdrop:bg-black/60`}
    >
      <div className="flex flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id={titleId} className="text-lg font-bold">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-sm text-muted">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            aria-label="Fermer"
            onClick={onClose}
            className="-mt-1 -mr-2"
          >
            <X className="size-4" aria-hidden="true" />
          </Button>
        </header>

        {children}

        {footer && (
          <footer className="flex justify-end gap-3 pt-2">{footer}</footer>
        )}
      </div>
    </dialog>
  );
}