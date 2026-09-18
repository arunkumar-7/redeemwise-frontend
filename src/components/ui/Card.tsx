import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  /** Adds the spec hover elevation (translateY(-2px), border/shadow deepen). */
  hoverable?: boolean;
  className?: string;
}

/** Standard white surface card — radius 20–24px, 1px border, soft shadow (spec §9). */
export function Card({ children, hoverable = false, className = '' }: CardProps) {
  return (
    <div
      className={[
        'rounded-[20px] border border-border-subtle bg-white p-8',
        'shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]',
        hoverable
          ? 'transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-border-hover hover:shadow-[0_10px_28px_-4px_rgba(15,23,42,0.10)]'
          : '',
        className,
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </div>
  );
}
