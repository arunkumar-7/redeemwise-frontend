import { Lock } from 'lucide-react';
import type { RedemptionOption } from '../../types/api';
import { formatCurrency, formatPoints } from '../../utils';
import { CategoryBadge } from './CategoryBadge';

interface IneligibleOptionRowProps {
  option: RedemptionOption;
}

/** Dimmed row for options below the minimum redemption threshold (§12.2: shown with reason). */
export function IneligibleOptionRow({ option }: IneligibleOptionRowProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-soft px-5 py-4 opacity-80">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted-light text-text-muted">
          <Lock size={16} strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={option.category} />
            <span className="truncate text-sm font-semibold text-text-secondary">
              {option.name ?? option.conversionFormula ?? 'Redemption option'}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-text-muted">
            {option.ineligibilityReason ??
              `Need ${formatPoints(Math.max(0, option.pointsRequired))} more points (minimum: ${formatPoints(option.minimumRedemption)}).`}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-text-muted">
          {formatCurrency(option.estimatedValue, { decimals: false })}
        </p>
        <p className="text-[11px] uppercase tracking-wide text-text-muted">if eligible</p>
      </div>
    </div>
  );
}
