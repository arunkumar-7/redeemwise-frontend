import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlowContext } from '../context/flowCore';
import type { CardResponse } from '../types/api';

/**
 * Flow-state consumer with navigation actions (FRONTEND_ARCHITECTURE §6.2).
 * Guards live in the pages themselves; this hook only exposes state + actions.
 */
export function useFlow() {
  const ctx = useFlowContext();
  const navigate = useNavigate();

  const selectCard = useCallback(
    (card: CardResponse) => {
      ctx.selectCard(card);
      navigate('/points');
    },
    [ctx, navigate],
  );

  const confirmPoints = useCallback(
    (value: number) => {
      ctx.setPoints(value);
      navigate('/results');
    },
    [ctx, navigate],
  );

  const resetFlow = useCallback(() => {
    ctx.resetFlow();
    navigate('/search');
  }, [ctx, navigate]);

  return { ...ctx, selectCard, confirmPoints, resetFlow };
}
