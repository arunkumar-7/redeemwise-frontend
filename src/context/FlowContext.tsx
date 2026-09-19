import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { CardResponse } from '../types/api';
import { FlowContext } from './flowCore';

const STORAGE_KEY = 'redeemwise.flow.v1';

interface PersistedFlow {
  selectedCard: CardResponse | null;
  points: number | null;
}

function loadPersisted(): PersistedFlow {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) return { selectedCard: null, points: null };
    const parsed = JSON.parse(raw) as Partial<PersistedFlow>;
    return {
      selectedCard:
        parsed.selectedCard !== null && typeof parsed.selectedCard === 'object'
          ? (parsed.selectedCard as CardResponse)
          : null,
      points: typeof parsed.points === 'number' ? parsed.points : null,
    };
  } catch {
    return { selectedCard: null, points: null };
  }
}

/** Cross-page flow state (selected card + points), persisted to localStorage (§11 item 3). */
export function FlowProvider({ children }: { children: ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<CardResponse | null>(() => loadPersisted().selectedCard);
  const [points, setPointsState] = useState<number | null>(() => loadPersisted().points);

  const selectCard = useCallback((card: CardResponse) => {
    setSelectedCard(card);
  }, []);

  const setPoints = useCallback((value: number) => {
    setPointsState(value);
  }, []);

  const clearPoints = useCallback(() => {
    setPointsState(null);
  }, []);

  const resetFlow = useCallback(() => {
    setSelectedCard(null);
    setPointsState(null);
  }, []);

  // Persist on every change (§10: state survives refresh).
  useMemo(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedCard, points }));
    } catch {
      // Storage unavailable (private mode/quota) — flow simply won't persist.
    }
  }, [selectedCard, points]);

  const value = useMemo(
    () => ({ selectedCard, points, selectCard, setPoints, clearPoints, resetFlow }),
    [selectedCard, points, selectCard, setPoints, clearPoints, resetFlow],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}
