/**
 * Verified backend contracts — mirrored 1:1 from docs/BACKEND_ANALYSIS_REPORT.md §6.
 * Do NOT add fields that the backend does not send.
 */

/* ── Response envelopes (uniform across all services) ──────────────────── */

export interface ApiSingle<T> {
  message: string;
  data: T;
}

export interface ApiList<T> {
  message: string;
  data: T[];
  totalElements: number;
}

/** §9.1 uniform error envelope (all four GlobalExceptionHandlers). */
export interface ApiError {
  timestamp: string; // ISO local date-time, no zone
  status: number; // 400 | 401 | 404 | 500 | 502
  error: string; // "Validation Error" | "Not Found" | ...
  message: string;
  /** field → message map, present ONLY on 400 validation errors */
  details?: Record<string, string>;
}

/* ── §5.3 Shared enums (backend source of truth) ───────────────────────── */

export type Network = 'VISA' | 'MASTERCARD' | 'RUPAY' | 'AMEX';

export type RewardType = 'CASHBACK' | 'REWARD_POINTS' | 'AIR_MILES' | 'HOTEL_POINTS';

export type RedemptionCategory =
  | 'FLIGHT'
  | 'HOTEL'
  | 'STATEMENT_CREDIT'
  | 'VOUCHER'
  | 'MERCHANDISE'
  | 'AIR_MILES_TRANSFER'
  | 'HOTEL_POINTS_TRANSFER'
  | 'FUEL'
  | 'OTHER';

/* ── Card Service ──────────────────────────────────────────────────────── */

export interface CardResponse {
  id: number;
  cardName: string;
  bankName: string;
  network: Network;
  rewardType: RewardType;
  annualFee: number;
  joiningFee: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

/* ── Recommendation Service ────────────────────────────────────────────── */

/** §5.1 — availablePoints must be ≥ 1 (backend @Min(1); 0 → 400). */
export interface RecommendationRequest {
  cardId: number;
  availablePoints: number;
  /** Exact RedemptionCategory value, or omit — backend filters server-side. */
  categoryFilter?: RedemptionCategory | null;
}

export interface RedemptionOption {
  id: number;
  name: string | null; // derived from conversionFormula; can be null
  category: RedemptionCategory;
  valuePerPoint: number;
  pointsRequired: number; // integer (truncated minimumRedemption)
  estimatedValue: number;
  minimumRedemption: number;
  conversionFormula: string | null;
  transferPartner: string | null;
  rank: number;
  isRecommended: boolean;
  isEligible: boolean;
  ineligibilityReason: string | null;
}

export interface RecommendationResponse {
  cardId: number;
  cardName: string;
  bankName: string;
  /** Stringly-typed in this payload, unlike CardResponse enums (§5.2). */
  network: string;
  rewardType: string;
  availablePoints: number;
  /** Best option's value (NOT a sum despite the name); 0.00 when nothing eligible. */
  totalEstimatedValue: number;
  bestRecommendation: RedemptionOption | null;
  recommendations: RedemptionOption[];
  ineligibleOptions: RedemptionOption[];
  generatedAt: string;
}

export interface DashboardResponse {
  cardId: number;
  cardName: string;
  bankName: string;
  network: string;
  rewardType: string;
  totalAvailablePoints: number;
  estimatedMaxValue: number;
  averageValuePerPoint: number;
  totalRedemptionOptions: number;
  eligibleOptions: number;
  bestOption: RedemptionOption | null;
  generatedAt: string;
}
