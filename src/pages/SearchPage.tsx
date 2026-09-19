import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SearchBar } from '../components/app/SearchBar';
import { FilterChips } from '../components/app/FilterChips';
import { CardResultItem } from '../components/app/CardResultItem';
import { CardSkeletonGrid } from '../components/feedback';
import { EmptyState, EmptyStateAction } from '../components/feedback';
import { ErrorState } from '../components/feedback';
import { useCards, useDebounce, useFlow } from '../hooks';
import { filterCards } from '../utils';
import type { Network, RewardType } from '../types/api';

/** `/search` — card selection: GET /api/cards once, filter client-side (§7.1). */
export default function SearchPage() {
  const { cards, loading, error, refetch } = useCards();
  const { selectCard } = useFlow();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [network, setNetwork] = useState<Network | null>(null);
  const [rewardType, setRewardType] = useState<RewardType | null>(null);
  const debouncedQuery = useDebounce(query, 300);

  const filtered = useMemo(
    () => filterCards(cards, debouncedQuery, network, rewardType),
    [cards, debouncedQuery, network, rewardType],
  );

  const hasActiveFilters = query !== '' || network !== null || rewardType !== null;

  return (
    <Container className="py-12 lg:py-16">
      <SectionHeader
        badgeText="STEP 01"
        titleText="Select your credit card"
        subtitleText="Search our catalog and pick the card sitting in your wallet."
      />

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-6">
        <SearchBar value={query} onChange={setQuery} />

        <FilterChips
          activeNetwork={network}
          activeRewardType={rewardType}
          onNetworkChange={setNetwork}
          onRewardTypeChange={setRewardType}
        />
      </div>

      <div className="mt-10">
        {/* Loading: skeleton grid (§12.6) */}
        {loading && <CardSkeletonGrid count={6} />}

        {/* Error: full-panel retry state (§12.5) */}
        {!loading && error !== null && (
          <ErrorState
            error={error}
            onRetry={refetch}
            secondaryAction={{ label: 'Back to Home', onClick: () => navigate('/') }}
          />
        )}

        {/* Success + results */}
        {!loading && error === null && filtered.length > 0 && (
          <>
            <p className="mb-5 text-sm font-medium text-text-muted" role="status">
              {filtered.length} card{filtered.length === 1 ? '' : 's'} found
            </p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((card) => (
                <CardResultItem key={card.id} card={card} onSelect={selectCard} />
              ))}
            </div>
          </>
        )}

        {/* Success + no matches: distinct empty vs error (§7.4 item 3) */}
        {!loading && error === null && filtered.length === 0 && (
          <EmptyState
            title={hasActiveFilters ? 'No cards match your search' : 'No cards available yet'}
            description={
              hasActiveFilters
                ? 'Try a different bank name or clear a filter — the catalog grows regularly.'
                : 'The card catalog is empty right now. Please check back soon.'
            }
            action={
              hasActiveFilters ? (
                <EmptyStateAction
                  label="Clear filters"
                  onClick={() => {
                    setQuery('');
                    setNetwork(null);
                    setRewardType(null);
                  }}
                />
              ) : undefined
            }
          />
        )}
      </div>
    </Container>
  );
}
