import { Sparkles } from 'lucide-react';
import { formatCurrency, formatPoints } from '../../utils';

interface EstimatedValuePreviewProps {
  points: number;
}

/**
 * Client-side-only preview (backend has no preview endpoint, §11 item 9).
 * Uses the documented illustrative VPP range: ₹0.08–₹0.15 per point.
 */
export function EstimatedValuePreview({ points }: EstimatedValuePreviewProps) {
  const min = points * 0.08;
  const max = points * 0.15;

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-tint px-5 py-4">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
        <Sparkles size={16} strokeWidth={2} />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">
          {formatPoints(points)} points ≈ {formatCurrency(min, { decimals: false })} –{' '}
          {formatCurrency(max, { decimals: false })}
        </p>
        <p className="mt-0.5 text-[13px] leading-relaxed text-text-secondary">
          Rough range based on typical reward rates. Your card's exact values appear on the next screen.
        </p>
      </div>
    </div>
  );
}
