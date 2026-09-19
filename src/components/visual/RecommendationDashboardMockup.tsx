import { CheckCircle2, IndianRupee, Plane, ShoppingBag } from 'lucide-react';
import type { DashboardRow } from '../../types/ui-types';

interface RecommendationDashboardMockupProps {
  cardName: string;
  availablePoints: string;
  subtitle: string;
  rows: DashboardRow[];
}

/** Static category icon per mockup row. */
function rowIcon(category: string) {
  switch (category) {
    case 'Flights':
      return <Plane size={16} strokeWidth={2} />;
    case 'Hotels':
      return <CheckCircle2 size={16} strokeWidth={2} />;
    default:
      return <ShoppingBag size={16} strokeWidth={2} />;
  }
}

/** Interactive preview of the recommendation UI (spec §7.10): highlighted best-value row + ranked rows. */
export function RecommendationDashboardMockup({
  cardName,
  availablePoints,
  subtitle,
  rows,
}: RecommendationDashboardMockupProps) {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-border-subtle bg-white p-5 shadow-[0_10px_30px_-4px_rgba(15,23,42,0.08)] sm:p-7">
        {/* Header row: card name + available points badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">{cardName}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-soft px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-text-muted">
            <IndianRupee size={12} strokeWidth={2.5} />
            AVAILABLE POINTS: {availablePoints}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-text-muted">{subtitle}</p>

        {/* Recommendation rows */}
        <div className="mt-5 space-y-3">
          {rows.map((row) => {
            const isBest = row.isBestValue;
            return (
              <div
                key={row.category}
                className={[
                  'flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 sm:px-5',
                  isBest
                    ? 'border-[1.5px] border-primary bg-primary-tint'
                    : 'border border-border-subtle bg-white',
                ].join(' ')}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isBest ? 'bg-primary text-white' : 'bg-muted-light text-text-secondary'
                    }`}
                  >
                    {rowIcon(row.category)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink sm:text-[15px]">
                      {row.category}
                    </p>
                    {row.rate !== '' && (
                      <p className="text-xs text-text-muted sm:text-[13px]">{row.rate}</p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1">
                  <p
                    className={`font-sans text-base font-bold sm:text-lg ${
                      isBest ? 'text-primary-darker' : 'text-ink'
                    }`}
                  >
                    {row.totalRupees}
                  </p>
                  {isBest && (
                    <span className="rounded-full bg-success px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-white">
                      BEST VALUE
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="mt-4 text-xs text-text-muted">
          Estimated value updates with live conversion rates.
        </p>
      </div>

      {/* Soft backdrop glow */}
      <div
        className="absolute -inset-4 -z-10 rounded-[36px] bg-gradient-to-tr from-primary/10 via-transparent to-sky-tint/60 blur-xl"
        aria-hidden
      />
    </div>
  );
}
