interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Renders in white for dark surfaces. */
  onDark?: boolean;
  className?: string;
}

const SIZES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
} as const;

/** Inline spinner for button and small loading states (§12.6). */
export function LoadingSpinner({ size = 'md', onDark = false, className = '' }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-solid ${
        onDark ? 'border-white/30 border-t-white' : 'border-primary/25 border-t-primary'
      } ${SIZES[size]} ${className}`.trim()}
    />
  );
}
