import { Star, TrendingUp } from 'lucide-react';
import type { RedemptionOption } from '../../types/api';
import { formatCategory, formatCurrency, formatPoints, formatValuePerPoint } from '../../utils';
import { CategoryBadge } from './CategoryBadge';
import { RankBadge } from './RankBadge';

interface RecommendationCardProps {
  option: RedemptionOption;
}

/** Ranked, eligible recommendation row (§12.2 RecommendationCard). */
export function RecommendationCard({ option }: RecommendationCardProps) {
  const isTop = option.rank === 1;

  return (
    <article
      className={[
        'rounded-[20px] border bg-white p-5 sm:p-6 transition-shadow',
        isTop
          ? 'border-[1.5px] border-primary bg-primary-tint shadow-[0_10px_30px_-4px_rgba(20,184,166,0.18)]'
          : 'border-border-subtle shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)]',
      ].join(' ')}
    >
      <div className="flex flex-wrap items-start gap-4">
        <RankBadge rank={option.rank} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={option.category} />
            {option.isRecommended && (
              <span className="inline-flex items-center gap-1 rounded-full bg-success px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-white">
                <Star size={10} strokeWidth={2.5} />
                RECOMMENDED
              </span>
            )}
          </div>
          <h3 className="mt-2 truncate font-serif text-lg font-bold text-ink sm:text-xl">
            {option.name ?? option.conversionFormula ?? formatCategory(option.category)}
          </h3>
          {option.transferPartner !== null && (
            <p className="mt-0.5 text-[13px] text-text-muted">via {option.transferPartner}</p>
          )}
        </div>

        <div className="text-right">
          <p
            className={`font-sans text-xl font-extrabold sm:text-2xl ${
              isTop ? 'text-primary-darker' : 'text-ink'
            }`}
          >
            {formatCurrency(option.estimatedValue, { decimals: false })}
          </p>
          <p className="text-xs font-medium text-text-muted">estimated value</p>
        </div>
      </div>

      {/* Metrics strip: VPP + points required */}
      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border-subtle pt-4 text-[13px]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
          <TrendingUp size={14} strokeWidth={2.2} className="text-primary" aria-hidden />
          {formatValuePerPoint(option.valuePerPoint)} per point
        </span>
        <span className="text-text-secondary">
          Requires <span className="font-semibold text-ink">{formatPoints(option.pointsRequired)}</span> points
        </span>
      </div>
    </article>
  );
}
