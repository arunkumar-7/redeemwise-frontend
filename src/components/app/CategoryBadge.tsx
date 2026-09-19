import type { RedemptionCategory } from '../../types/api';
import { formatCategory } from '../../utils';

/** Tailwind class map for the 9 backend categories (DESIGN_SYSTEM category tokens). */
const CATEGORY_STYLES: Record<RedemptionCategory, string> = {
  FLIGHT: 'bg-sky-tint text-sky-700',
  HOTEL: 'bg-primary-tint text-primary-darker',
  STATEMENT_CREDIT: 'bg-success-light text-success',
  VOUCHER: 'bg-amber-tint text-amber-700',
  MERCHANDISE: 'bg-purple-50 text-purple-700',
  AIR_MILES_TRANSFER: 'bg-indigo-50 text-indigo-700',
  HOTEL_POINTS_TRANSFER: 'bg-rose-50 text-rose-700',
  FUEL: 'bg-orange-50 text-orange-700',
  OTHER: 'bg-muted-light text-text-secondary',
};

interface CategoryBadgeProps {
  category: RedemptionCategory;
}

/** Color-coded redemption category pill (§12.2 CategoryBadge). */
export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] ${CATEGORY_STYLES[category]}`}
    >
      {formatCategory(category)}
    </span>
  );
}
