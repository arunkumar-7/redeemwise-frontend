import { Repeat } from 'lucide-react';
import type { CardResponse } from '../../types/api';
import { formatEnumTitle } from '../../utils';

interface SelectedCardDisplayProps {
  card: CardResponse;
  /** Shows the "Change card" control. */
  onChangeCard?: () => void;
}

/** Compact selected-card banner with network/reward chips (§12.2 SelectedCardDisplay). */
export function SelectedCardDisplay({ card, onChangeCard }: SelectedCardDisplayProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-white px-5 py-4">
      <div className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-surface text-gold">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="5" width="20" height="14" rx="3" fill="currentColor" opacity="0.9" />
            <rect x="2" y="9" width="20" height="3" fill="#0A1128" opacity="0.55" />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted">{card.bankName}</p>
          <p className="truncate font-serif text-lg font-bold text-ink">{card.cardName}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden gap-2 sm:flex">
          <span className="rounded-full border border-border-subtle bg-soft px-3 py-1 text-xs font-semibold text-text-secondary">
            {formatEnumTitle(card.network)}
          </span>
          <span className="rounded-full border border-border-subtle bg-soft px-3 py-1 text-xs font-semibold text-text-secondary">
            {formatEnumTitle(card.rewardType)}
          </span>
        </div>
        {onChangeCard !== undefined && (
          <button
            type="button"
            onClick={onChangeCard}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-tint"
          >
            <Repeat size={15} strokeWidth={2.2} />
            Change
          </button>
        )}
      </div>
    </div>
  );
}
