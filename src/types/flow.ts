/** Frontend-only flow types (not backend DTOs) — per BACKEND_ANALYSIS_REPORT §6. */

export type FlowStep = 'landing' | 'search' | 'points' | 'results';

export interface FlowState {
  step: FlowStep;
  selectedCard: import('./api').CardResponse | null;
  points: number | null;
}
