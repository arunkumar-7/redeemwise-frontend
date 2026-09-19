import { formatPoints } from '../../utils';

interface QuickAmountChipsProps {
  amounts?: number[];
  activeAmount: number | null;
  onSelect: (amount: number) => void;
}

const DEFAULT_AMOUNTS = [5_000, 10_000, 25_000, 50_000];

/** Preset point amounts (§12.2 QuickAmountChips: 5k/10k/25k/50k). */
export function QuickAmountChips({
  amounts = DEFAULT_AMOUNTS,
  activeAmount,
  onSelect,
}: QuickAmountChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-[0.1em] text-text-muted">Quick fill</span>
      {amounts.map((amount) => {
        const active = activeAmount === amount;
        return (
          <button
            key={amount}
            type="button"
            onClick={() => onSelect(amount)}
            aria-pressed={active}
            className={[
              'cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all duration-150',
              active
                ? 'border-primary bg-primary-tint text-primary-darker'
                : 'border-border-subtle bg-white text-text-secondary hover:border-border-hover hover:text-ink',
            ].join(' ')}
          >
            {formatPoints(amount)}
          </button>
        );
      })}
    </div>
  );
}
