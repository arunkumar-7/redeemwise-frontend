import { useEffect, useState } from 'react';
import { recommendationService, ApiRequestError } from '../services';
import type { DashboardResponse } from '../types/api';

interface UseDashboardResult {
  data: DashboardResponse | null;
  loading: boolean;
  error: ApiRequestError | null;
}

/**
 * GET /api/recommendations/dashboard?cardId=&availablePoints= — run in parallel
 * with the recommendations POST on the results page (independent inputs, §7.4 item 4).
 * Skips fetching until inputs are valid (cardId ≥ 1, points ≥ 1).
 * Failure is non-fatal: the summary strip simply hides.
 */
export function useDashboard(cardId: number, availablePoints: number): UseDashboardResult {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiRequestError | null>(null);

  const enabled = cardId >= 1 && availablePoints >= 1;

  useEffect(() => {
    if (!enabled) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    recommendationService
      .getDashboard({ cardId, availablePoints })
      .then((response) => {
        if (!cancelled) setData(response);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof ApiRequestError
              ? err
              : new ApiRequestError({ kind: 'unknown', message: 'Failed to load dashboard' }),
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [cardId, availablePoints, enabled]);

  return { data, loading, error };
}
