import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  /** Renders in the on-dark variant used by the final CTA banner. */
  onDark?: boolean;
  className?: string;
}

/** Uppercase tracked teal pre-heading badge (spec §4 "Pre-Heading Badge"). */
export function Badge({ children, onDark = false, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-block text-xs font-bold uppercase tracking-[0.12em]',
        onDark ? 'text-primary' : 'text-primary',
        className,
      ]
        .join(' ')
        .trim()}
    >
      {children}
    </span>
  );
}
