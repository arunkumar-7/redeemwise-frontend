import { ArrowRight, CreditCard } from 'lucide-react';
import type { CardResponse } from '../../types/api';
import { formatCurrency, formatEnumTitle } from '../../utils';

interface CardResultItemProps {
  card: CardResponse;
  onSelect: (card: CardResponse) => void;
}

/** Selectable card in the search results grid (§12.2 CardResultItem). */
export function CardResultItem({ card, onSelect }: CardResultItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(card)}
      aria-label={`Select ${card.cardName} from ${card.bankName}`}
      className="group flex w-full cursor-pointer flex-col rounded-[20px] border border-border-subtle bg-white p-6 text-left shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[0_10px_28px_-4px_rgba(20,184,166,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted">{card.bankName}</p>
          <h3 className="mt-1 truncate font-serif text-xl font-bold text-ink">{card.cardName}</h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-tint text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <CreditCard size={20} strokeWidth={2} />
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-border-subtle bg-soft px-3 py-1 text-xs font-semibold text-text-secondary">
          {formatEnumTitle(card.network)}
        </span>
        <span className="rounded-full border border-border-subtle bg-soft px-3 py-1 text-xs font-semibold text-text-secondary">
          {formatEnumTitle(card.rewardType)}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
        <div className="text-[13px] text-text-muted">
          Annual fee <span className="font-semibold text-ink">{formatCurrency(card.annualFee, { decimals: false })}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
          Select
          <ArrowRight size={16} strokeWidth={2.2} />
        </span>
      </div>
    </button>
  );
}
