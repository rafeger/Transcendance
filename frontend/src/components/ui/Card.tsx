import type { HTMLAttributes } from 'react';

type CardElement = 'div' | 'article' | 'section';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const paddings: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Balise HTML rendue : article pour un contenu autonome, section pour une partie de page. */
  as?: CardElement;
  padding?: CardPadding;
  /** Bordure qui s'illumine au survol, pour une carte cliquable. */
  interactive?: boolean;
}

export function Card({
  as: Tag = 'div',
  padding = 'md',
  interactive = false,
  className = '',
  ...props
}: CardProps) {
  return (
    <Tag
      {...props}
      className={
        `rounded-card border border-border bg-surface text-fg shadow-sm ` +
        `${paddings[padding]} ` +
        `${interactive ? 'transition-colors hover:border-primary/60' : ''} ` +
        className
      }
    />
  );
}
