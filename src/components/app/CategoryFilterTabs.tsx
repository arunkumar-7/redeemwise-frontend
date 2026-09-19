import type { RedemptionCategory } from '../../types/api';
import { formatCategory } from '../../utils';

interface CategoryFilterTabsProps {
  active: RedemptionCategory | null;
  onChange: (category: RedemptionCategory | null) => void;
}

/** All 9 backend RedemptionCategory values (§5.3) — exact strings sent to the API. */
const CATEGORIES: RedemptionCategory[] = [
  'FLIGHT',
  'HOTEL',
  'STATEMENT_CREDIT',
  'VOUCHER',
  'MERCHANDISE',
  'AIR_MILES_TRANSFER',
  'HOTEL_POINTS_TRANSFER',
  'FUEL',
  'OTHER',
];

/**
 * Category filter for the results page. Selecting a category re-issues
 * POST /api/recommendations with `categoryFilter` — a server-side re-query,
 * NOT client-side filtering (§7.4 item 13).
 */
export function CategoryFilterTabs({ active, onChange }: CategoryFilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        aria-pressed={active === null}
        className={[
          'cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all duration-150',
          active === null
            ? 'border-primary bg-primary-tint text-primary-darker'
            : 'border-border-subtle bg-white text-text-secondary hover:border-border-hover hover:text-ink',
        ].join(' ')}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(active === category ? null : category)}
          aria-pressed={active === category}
          className={[
            'cursor-pointer rounded-full border px-4 py-1.5 text-[13px] font-semibold transition-all duration-150',
            active === category
              ? 'border-primary bg-primary-tint text-primary-darker'
              : 'border-border-subtle bg-white text-text-secondary hover:border-border-hover hover:text-ink',
          ].join(' ')}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
