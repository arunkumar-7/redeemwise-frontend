import { useEffect, useRef, useState } from 'react';
import { cardService, ApiRequestError } from '../services';
import type { CardResponse } from '../types/api';

interface UseCardsResult {
  cards: CardResponse[];
  loading: boolean;
  error: ApiRequestError | null;
  refetch: () => void;
}

/** Fetches the full active-card catalog once per mount (§7.1: GET /api/cards, client-side filter). */
export function useCards(): UseCardsResult {
  const [cards, setCards] = useState<CardResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiRequestError | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setLoading(true);
    setError(null);

    cardService
      .getCards()
      .then((data) => {
        if (mountedRef.current) setCards(data);
      })
      .catch((err: unknown) => {
        if (mountedRef.current) setError(err instanceof ApiRequestError ? err : new ApiRequestError({ kind: 'unknown', message: 'Failed to load cards' }));
      })
      .finally(() => {
        if (mountedRef.current) setLoading(false);
      });

    return () => {
      mountedRef.current = false;
    };
  }, [reloadToken]);

  const refetch = () => setReloadToken((token) => token + 1);

  return { cards, loading, error, refetch };
}
