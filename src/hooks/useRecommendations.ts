import { useEffect, useState } from 'react';
import { recommendationService, ApiRequestError } from '../services';
import type { RedemptionCategory, RecommendationRequest, RecommendationResponse } from '../types/api';

interface UseRecommendationsResult {
  data: RecommendationResponse | null;
  loading: boolean;
  error: ApiRequestError | null;
  /** Re-issues the POST with an exact RedemptionCategory (server-side filter, §7.4 item 13). */
  setCategoryFilter: (category: RedemptionCategory | null) => void;
  activeCategoryFilter: RedemptionCategory | null;
  refetch: () => void;
}

/**
 * POST /api/recommendations on mount and whenever the category filter changes.
 * Inputs are guaranteed valid before navigation (points ≥ 1 enforced client-side).
 */
export function useRecommendations(
  request: Omit<RecommendationRequest, 'categoryFilter'> & { cardId: number; availablePoints: number },
): UseRecommendationsResult {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiRequestError | null>(null);
  const [categoryFilter, setCategoryFilterState] = useState<RedemptionCategory | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    recommendationService
      .getRecommendations({
        cardId: request.cardId,
        availablePoints: request.availablePoints,
        categoryFilter,
      })
      .then((response) => {
        if (!cancelled) setData(response);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiRequestError ? err : new ApiRequestError({ kind: 'unknown', message: 'Failed to load recommendations' }));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [request.cardId, request.availablePoints, categoryFilter, reloadToken]);

  const setCategoryFilter = (category: RedemptionCategory | null) => setCategoryFilterState(category);
  const refetch = () => setReloadToken((token) => token + 1);

  return { data, loading, error, setCategoryFilter, activeCategoryFilter: categoryFilter, refetch };
}
