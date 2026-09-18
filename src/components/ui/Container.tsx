import type { ElementType, ReactNode } from 'react';

const WIDTHS = {
  default: 'max-w-[1200px]',
  narrow: 'max-w-[800px]',
} as const;

interface ContainerProps {
  children: ReactNode;
  /** `narrow` constrains to 800px (FAQ / Final CTA per spec §5). */
  width?: keyof typeof WIDTHS;
  className?: string;
  as?: ElementType;
}

/** Centered content-width wrapper — 1200px max, responsive gutters (spec §5). */
export function Container({ children, width = 'default', className = '', as }: ContainerProps) {
  const Tag = as ?? 'div';
  return (
    <Tag
      className={`mx-auto w-full ${WIDTHS[width]} px-4 sm:px-6 lg:px-8 ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
