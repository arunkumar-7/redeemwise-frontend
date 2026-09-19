import { Navigate, useNavigate } from 'react-router-dom';
import { IndianRupee, Percent, PencilLine, RotateCcw, Trophy } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SelectedCardDisplay } from '../components/app/SelectedCardDisplay';
import { CategoryFilterTabs } from '../components/app/CategoryFilterTabs';
import { RecommendationCard } from '../components/app/RecommendationCard';
import { IneligibleOptionRow } from '../components/app/IneligibleOptionRow';
import { RecommendationSkeletonList, ErrorState, EmptyState, EmptyStateAction } from '../components/feedback';
import { useDashboard, useFlow, useRecommendations } from '../hooks';
import { formatCurrency, formatPoints, formatValuePerPoint } from '../utils';

/** `/results` — recommendations. Guard: requires card + points ≥ 1, else redirect to /search (§9.3). */
export default function ResultsPage() {
  const { selectedCard, points, resetFlow } = useFlow();
  const navigate = useNavigate();

  // Route guard (incomplete flow → /search).
  if (selectedCard === null || points === null || points < 1) {
    return <Navigate to="/search" replace />;
  }

  return (
    <ResultsBody
      cardId={selectedCard.id}
      points={points}
      onEditPoints={() => navigate('/points')}
      onNewSearch={resetFlow}
    />
  );
}

function ResultsBody({
  cardId,
  points,
  onEditPoints,
  onNewSearch,
}: {
  cardId: number;
  points: number;
  onEditPoints: () => void;
  onNewSearch: () => void;
}) {
  // Hooks must live below the guard — split body keeps them unconditional.
  const { selectedCard } = useFlow();
  const { data, loading, error, setCategoryFilter, activeCategoryFilter, refetch } = useRecommendations({
    cardId,
    availablePoints: points,
  });
  const { data: dashboard } = useDashboard(cardId, points);

  const best = data?.bestRecommendation ?? null;
  const eligible = data?.recommendations ?? [];
  const ineligible = data?.ineligibleOptions ?? [];
  const isEmptyResponse =
    data !== null && best === null && eligible.length === 0 && ineligible.length === 0;

  return (
    <Container className="py-12 lg:py-16">
      {selectedCard !== null && (
        <SelectedCardDisplay card={selectedCard} onChangeCard={onNewSearch} />
      )}

      {/* Header: card identity + generated stamp */}
      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Your Results</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-ink sm:text-4xl">
            Best ways to redeem {formatPoints(points)} points
          </h1>
          {data !== null && (
            <p className="mt-1 text-sm text-text-muted">
              {data.cardName} · {data.bankName} · generated {data.generatedAt}
            </p>
          )}
        </div>
      </div>

      {/* Dashboard summary strip (parallel GET /api/recommendations/dashboard) */}
      {dashboard !== null && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <SummaryTile
            icon={<IndianRupee size={18} strokeWidth={2.2} />}
            label="Max estimated value"
            value={formatCurrency(dashboard.estimatedMaxValue, { decimals: false })}
          />
          <SummaryTile
            icon={<Percent size={18} strokeWidth={2.2} />}
            label="Avg value per point"
            value={formatValuePerPoint(dashboard.averageValuePerPoint)}
          />
          <SummaryTile
            icon={<Trophy size={18} strokeWidth={2.2} />}
            label="Eligible options"
            value={String(dashboard.eligibleOptions)}
          />
          <SummaryTile
            icon={<IndianRupee size={18} strokeWidth={2.2} />}
            label="Total options"
            value={String(dashboard.totalRedemptionOptions)}
          />
        </div>
      )}

      {/* Body states */}
      <div className="mt-8">
        {loading && <RecommendationSkeletonList count={3} />}

        {!loading && error !== null && (
          <ErrorState
            error={error}
            onRetry={refetch}
            secondaryAction={{ label: 'Start Over', onClick: onNewSearch }}
          />
        )}

        {!loading && error === null && isEmptyResponse && (
          <EmptyState
            title="No redemption options available"
            description="This card has no redemption options in the catalog yet. Try another card from the search page."
            action={<EmptyStateAction label="Choose Another Card" onClick={onNewSearch} />}
          />
        )}

        {!loading && error === null && !isEmptyResponse && data !== null && (
          <>
            {/* Best recommendation highlight */}
            {best !== null && (
              <section aria-labelledby="best-heading" className="mb-8">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-white">
                    <Trophy size={14} strokeWidth={2.4} aria-hidden />
                  </span>
                  <h2 id="best-heading" className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-success">
                    Best Value
                  </h2>
                </div>
                <RecommendationCard option={best} />
              </section>
            )}

            {/* Category filter — re-queries the backend (server-side filter) */}
            <section aria-labelledby="all-heading">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 id="all-heading" className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-text-muted">
                  All options ({eligible.length})
                </h2>
                <CategoryFilterTabs active={activeCategoryFilter} onChange={setCategoryFilter} />
              </div>

              {eligible.length > 0 ? (
                <div className="space-y-4">
                  {eligible.map((option) => (
                    <RecommendationCard key={option.id} option={option} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Nothing eligible in this category"
                  description="No options in this category are redeemable with your current points. Try All or another category."
                />
              )}
            </section>

            {/* Ineligible options — dimmed with backend reasons */}
            {ineligible.length > 0 && (
              <section aria-labelledby="ineligible-heading" className="mt-8">
                <h2 id="ineligible-heading" className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.1em] text-text-muted">
                  Below minimum ({ineligible.length})
                </h2>
                <div className="space-y-3">
                  {ineligible.map((option) => (
                    <IneligibleOptionRow key={option.id} option={option} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* Flow navigation */}
      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border-subtle pt-8">
        <button
          type="button"
          onClick={onEditPoints}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-tint"
        >
          <PencilLine size={15} strokeWidth={2.2} />
          Edit points
        </button>
        <button
          type="button"
          onClick={onNewSearch}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-muted-light hover:text-ink"
        >
          <RotateCcw size={15} strokeWidth={2.2} />
          New search
        </button>
        <span className="ml-auto hidden text-[13px] text-text-muted sm:block">
          Values are estimates based on current catalog rates.
        </span>
      </div>
    </Container>
  );
}

function SummaryTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-white px-4 py-4">
      <div className="flex items-center gap-2 text-text-muted">
        {icon}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em]">{label}</p>
      </div>
      <p className="mt-1.5 font-sans text-xl font-extrabold text-ink sm:text-2xl">{value}</p>
    </div>
  );
}
