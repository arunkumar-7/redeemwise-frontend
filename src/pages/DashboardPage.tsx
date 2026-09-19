import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Percent, Trophy } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { CardResultItem } from '../components/app/CardResultItem';
import { CardSkeletonGrid, ErrorState, LoadingSpinner } from '../components/feedback';
import { useCards, useDashboard, useFlow } from '../hooks';
import { formatCurrency, formatPoints, formatValuePerPoint } from '../utils';

/**
 * `/dashboard` — implemented because the backend exposes
 * GET /api/recommendations/dashboard (§4.1 Public Frontend APIs).
 * Standalone entry: pick a card, enter points, see the summary metrics.
 */
export default function DashboardPage() {
  const { cards, loading: cardsLoading, error: cardsError, refetch } = useCards();
  const { selectCard, selectedCard, points, setPoints } = useFlow();
  const navigate = useNavigate();

  const [pointsRaw, setPointsRaw] = useState(points !== null ? String(points) : '');

  const [dashCardId, setDashCardId] = useState<number | null>(selectedCard?.id ?? null);
  const dashPoints = points ?? 0;

  const { data: dashboard, loading: dashLoading, error: dashError } = useDashboard(
    dashCardId ?? 0,
    dashPoints,
  );

  const parsedPoints = pointsRaw === '' ? null : Number.parseInt(pointsRaw.replace(/[^0-9]/g, ''), 10);
  const canSubmit = dashCardId !== null && parsedPoints !== null && parsedPoints >= 1;

  return (
    <Container className="py-12 lg:py-16">
      <SectionHeader
        badgeText="DASHBOARD"
        titleText="Redemption dashboard"
        subtitleText="Pick a card, enter your points, and see the summary metrics."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: card + points entry */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-ink">1. Choose a card</p>
            {cardsLoading ? (
              <CardSkeletonGrid count={2} />
            ) : cardsError !== null ? (
              <ErrorState error={cardsError} onRetry={refetch} />
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {cards.slice(0, 6).map((card) => (
                  <CardResultItem
                    key={card.id}
                    card={card}
                    onSelect={(c) => setDashCardId(c.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="dash-points" className="mb-2 block text-sm font-semibold text-ink">
              2. Enter points
            </label>
            <input
              id="dash-points"
              type="text"
              inputMode="numeric"
              value={pointsRaw}
              onChange={(e) => setPointsRaw(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="50,000"
              className="w-full rounded-xl border border-border-subtle bg-white px-4 py-3 text-lg font-semibold text-ink outline-none transition-colors placeholder:font-normal placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                disabled={!canSubmit}
                onClick={() => {
                  if (dashCardId !== null && parsedPoints !== null) {
                    // Register the selection in the shared flow; the summary on the
                    // right loads immediately via useDashboard.
                    const card = cards.find((c) => c.id === dashCardId);
                    if (card !== undefined) selectCard(card);
                    setPoints(parsedPoints);
                  }
                }}
              >
                Load Dashboard
              </Button>
              {canSubmit && dashCardId !== null && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    const card = cards.find((c) => c.id === dashCardId);
                    if (card !== undefined) selectCard(card);
                    setPoints(parsedPoints ?? 1);
                    navigate('/results');
                  }}
                >
                  See Full Recommendations
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Right: dashboard metrics */}
        <div>
          <p className="mb-3 text-sm font-semibold text-ink">3. Summary</p>
          {!canSubmit ? (
            <div className="rounded-[20px] border border-dashed border-border-subtle bg-soft px-6 py-16 text-center text-[15px] text-text-secondary">
              Select a card and enter at least 1 point to see the summary.
            </div>
          ) : dashLoading ? (
            <div className="flex items-center gap-3 rounded-[20px] border border-border-subtle bg-white px-6 py-10">
              <LoadingSpinner size="lg" />
              <span className="text-[15px] text-text-secondary">Loading summary…</span>
            </div>
          ) : dashError !== null ? (
            <ErrorState error={dashError} />
          ) : dashboard !== null ? (
            <div className="flex flex-col gap-4">
              <div className="rounded-[20px] border border-border-subtle bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-text-muted">
                  {dashboard.bankName}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-bold text-ink">{dashboard.cardName}</h3>
                <p className="mt-1 text-sm text-text-muted">
                  {formatPoints(dashboard.totalAvailablePoints)} points analyzed
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <MetricTile
                  icon={<IndianRupee size={18} strokeWidth={2.2} />}
                  label="Max value"
                  value={formatCurrency(dashboard.estimatedMaxValue, { decimals: false })}
                />
                <MetricTile
                  icon={<Percent size={18} strokeWidth={2.2} />}
                  label="Avg VPP"
                  value={formatValuePerPoint(dashboard.averageValuePerPoint)}
                />
                <MetricTile
                  icon={<Trophy size={18} strokeWidth={2.2} />}
                  label="Eligible"
                  value={String(dashboard.eligibleOptions)}
                />
                <MetricTile
                  icon={<IndianRupee size={18} strokeWidth={2.2} />}
                  label="Total options"
                  value={String(dashboard.totalRedemptionOptions)}
                />
              </div>
              {dashboard.bestOption !== null && (
                <div className="rounded-[20px] border-[1.5px] border-primary bg-primary-tint p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary-darker">Best option</p>
                  <p className="mt-1.5 font-serif text-lg font-bold text-ink">
                    {dashboard.bestOption.name ?? dashboard.bestOption.conversionFormula ?? 'Redemption'}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {formatCurrency(dashboard.bestOption.estimatedValue, { decimals: false })} estimated value ·{' '}
                    {formatValuePerPoint(dashboard.bestOption.valuePerPoint)} per point
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}

function MetricTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-white px-4 py-4">
      <div className="flex items-center gap-2 text-text-muted">
        {icon}
        <p className="text-[11px] font-bold uppercase tracking-[0.08em]">{label}</p>
      </div>
      <p className="mt-1.5 font-sans text-xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
