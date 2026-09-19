import { createContext, useContext } from 'react';
import type { CardResponse } from '../types/api';

export interface FlowContextValue {
  selectedCard: CardResponse | null;
  points: number | null;
  selectCard: (card: CardResponse) => void;
  setPoints: (points: number) => void;
  clearPoints: () => void;
  resetFlow: () => void;
}

/** Non-component module: context object + consumer hook (fast-refresh safe). */
export const FlowContext = createContext<FlowContextValue | null>(null);

/** Access flow state; throws if used outside FlowProvider (programmer error). */
export function useFlowContext(): FlowContextValue {
  const ctx = useContext(FlowContext);
  if (ctx === null) {
    throw new Error('useFlowContext must be used within a FlowProvider');
  }
  return ctx;
}
