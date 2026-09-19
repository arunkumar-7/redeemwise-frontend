import { requestSingle } from './apiClient';
import type {
  DashboardResponse,
  RecommendationRequest,
  RecommendationResponse,
} from '../types/api';

/**
 * Recommendation Service endpoints (§4.1 Public Frontend APIs).
 * All requests go through the API gateway; never call
 * `/api/rewards/card/{cardId}` directly (§4.2/§7.3).
 */
export const recommendationService = {
  /** POST /api/recommendations — ranked recommendations for cardId + points. */
  getRecommendations(
    body: RecommendationRequest,
    signal?: AbortSignal,
  ): Promise<RecommendationResponse> {
    return requestSingle<RecommendationResponse>('/api/recommendations', {
      method: 'POST',
      body,
      signal,
    });
  },

  /** GET /api/recommendations/dashboard?cardId=&availablePoints= — summary strip. */
  getDashboard(
    params: { cardId: number; availablePoints: number },
    signal?: AbortSignal,
  ): Promise<DashboardResponse> {
    const search = new URLSearchParams({
      cardId: String(params.cardId),
      availablePoints: String(params.availablePoints),
    });
    return requestSingle<DashboardResponse>(`/api/recommendations/dashboard?${search.toString()}`, {
      signal,
    });
  },
} as const;
