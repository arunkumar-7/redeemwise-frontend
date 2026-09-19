import type { CardResponse, Network, RewardType } from '../types/api';

/** Case-insensitive "contains" on bank or card name + exact enum chip filters (§11 item 6). */
export function filterCards(
  cards: CardResponse[],
  query: string,
  network: Network | null,
  rewardType: RewardType | null,
): CardResponse[] {
  const q = query.trim().toLowerCase();
  return cards.filter((card) => {
    const matchesQuery =
      q === '' ||
      card.bankName.toLowerCase().includes(q) ||
      card.cardName.toLowerCase().includes(q);
    const matchesNetwork = network === null || card.network === network;
    const matchesRewardType = rewardType === null || card.rewardType === rewardType;
    return matchesQuery && matchesNetwork && matchesRewardType;
  });
}
