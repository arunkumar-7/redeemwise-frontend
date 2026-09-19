import { IndianRupee } from 'lucide-react';
import { formatPoints } from '../../utils';
import { digitsOnly } from '../../utils/pointsInput';

interface PointsInputProps {
  /** Raw string state owned by the page (so validation and formatting stay testable). */
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  disabled?: boolean;
}

/** Points entry field with live comma formatting and error styling (§12.2 PointsInput, §12.6). */
export function PointsInput({ value, onChange, error, disabled = false }: PointsInputProps) {
  const displayValue = value === '' ? '' : formatPoints(Number.parseInt(value, 10));

  return (
    <div>
      <label htmlFor="points-input" className="mb-2 block text-sm font-semibold text-ink">
        Reward points balance
      </label>
      <div
        className={[
          'flex items-center rounded-xl border bg-white transition-colors',
          error !== undefined && error !== null
            ? 'border-red-400 focus-within:ring-2 focus-within:ring-red-200'
            : 'border-border-subtle focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25',
        ].join(' ')}
      >
        <span className="pl-4 text-text-muted">
          <IndianRupee size={18} strokeWidth={2} aria-hidden />
        </span>
        <span className="pl-1 pr-1 text-[13px] font-medium uppercase tracking-wide text-text-muted">pts</span>
        <input
          id="points-input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          disabled={disabled}
          value={displayValue}
          onChange={(event) => onChange(digitsOnly(event.target.value))}
          placeholder="50,000"
          aria-invalid={error !== undefined && error !== null}
          aria-describedby={error !== undefined && error !== null ? 'points-input-error' : undefined}
          className="w-full bg-transparent py-3.5 pr-4 text-lg font-semibold text-ink outline-none placeholder:font-normal placeholder:text-text-muted disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
      {error !== undefined && error !== null && (
        <p id="points-input-error" role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
