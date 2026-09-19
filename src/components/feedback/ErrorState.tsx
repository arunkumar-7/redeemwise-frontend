import { AlertTriangle, RefreshCw, ServerCrash, WifiOff } from 'lucide-react';
import type { ApiRequestError } from '../../services';
import { Button } from '../ui/Button';

/** User-facing copy per §9.3 HTTP-code branching table. */
function describeError(error: ApiRequestError | null): { title: string; message: string; icon: React.ReactElement } {
  if (error === null) {
    return {
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again.',
      icon: <AlertTriangle size={26} strokeWidth={2} />,
    };
  }

  switch (error.kind) {
    case 'service_unavailable':
      return {
        title: 'Service temporarily unavailable',
        message: 'We could not reach the recommendation engine. Please try again in a moment.',
        icon: <ServerCrash size={26} strokeWidth={2} />,
      };
    case 'timeout':
    case 'network':
      return {
        title: 'Connection problem',
        message:
          'We could not reach RedeemWise. Check that the API gateway is running and your connection is active.',
        icon: <WifiOff size={26} strokeWidth={2} />,
      };
    case 'not_found':
      return {
        title: 'Not found',
        message: error.message,
        icon: <AlertTriangle size={26} strokeWidth={2} />,
      };
    default:
      return {
        title: 'Something went wrong',
        message: error.message,
        icon: <AlertTriangle size={26} strokeWidth={2} />,
      };
  }
}

interface ErrorStateProps {
  error: ApiRequestError | null;
  onRetry?: () => void;
  /** Optional secondary action, e.g. "Start over". */
  secondaryAction?: { label: string; onClick: () => void };
}

/** Full-panel error display with retry (§12.5 error-handling strategy). */
export function ErrorState({ error, onRetry, secondaryAction }: ErrorStateProps) {
  const { title, message, icon } = describeError(error);

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-border-subtle bg-white px-6 py-16 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-tint text-amber-700">
        {icon}
      </span>
      <h3 className="mt-1 font-sans text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-md text-[15px] leading-relaxed text-text-secondary">{message}</p>
      {(onRetry !== undefined || secondaryAction !== undefined) && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          {onRetry !== undefined && (
            <Button onClick={onRetry} icon={<RefreshCw size={16} strokeWidth={2.2} />}>
              Try Again
            </Button>
          )}
          {secondaryAction !== undefined && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
