import { requestList, requestSingle } from './apiClient';
import type { CardResponse, Network, RewardType } from '../types/api';

/**
 * Card Service endpoints (§4.1 Public Frontend APIs).
 * Note: `/api/cards/search` exists but client-side filtering is preferred for
 * the MVP catalog size (§7.4) — exposed here for future use.
 */
export const cardService = {
  /** GET /api/cards — all active cards. */
  getCards(signal?: AbortSignal): Promise<CardResponse[]> {
    return requestList<CardResponse>('/api/cards', { signal });
  },

  /** GET /api/cards/{id} — active card by id (FlowState revalidation / deep-link recovery). */
  getCardById(id: number, signal?: AbortSignal): Promise<CardResponse> {
    return requestSingle<CardResponse>(`/api/cards/${id}`, { signal });
  },

  /** GET /api/cards/search?bankName=&network=&rewardType= — server-side filtering. */
  searchCards(
    params: { bankName?: string; network?: Network; rewardType?: RewardType },
    signal?: AbortSignal,
  ): Promise<CardResponse[]> {
    const search = new URLSearchParams();
    if (params.bankName !== undefined && params.bankName !== '') search.set('bankName', params.bankName);
    if (params.network !== undefined) search.set('network', params.network);
    if (params.rewardType !== undefined) search.set('rewardType', params.rewardType);
    const qs = search.toString();
    return requestList<CardResponse>(`/api/cards/search${qs !== '' ? `?${qs}` : ''}`, { signal });
  },
} as const;
