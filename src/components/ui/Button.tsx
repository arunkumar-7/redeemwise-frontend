import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'medium' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  href?: string;
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold tracking-[0.01em] ' +
  'rounded-lg transition-all duration-200 ease-out cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white shadow-[0_4px_14px_0_rgba(20,184,166,0.25)] ' +
    'hover:bg-primary-dark hover:-translate-y-px hover:shadow-[0_8px_20px_0_rgba(20,184,166,0.35)] ' +
    'active:bg-primary-darker active:translate-y-0 active:shadow-[0_4px_14px_0_rgba(20,184,166,0.25)]',
  secondary:
    'bg-white text-ink border border-border-subtle ' +
    'hover:bg-muted-light hover:border-border-hover ' +
    'active:bg-border-subtle',
  ghost:
    'bg-transparent text-text-secondary rounded-md ' +
    'hover:text-primary hover:bg-soft ' +
    'active:text-primary',
};

const SIZES: Record<ButtonSize, string> = {
  medium: 'px-6 py-3 text-sm',
  large: 'px-8 py-4 text-[15px]',
};

/** Primary / secondary / ghost button per spec §8. Renders an `<a>` when `href` is set. */
export function Button({
  variant = 'primary',
  size = 'medium',
  icon,
  href,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim();

  if (href !== undefined) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
