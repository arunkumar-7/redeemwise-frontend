import type { TrustIndicatorItem } from '../../types/ui-types';

interface TrustIndicatorsProps {
  items: TrustIndicatorItem[];
}

/** Inline row of micro trust items beneath the Hero CTAs (spec §7.5). */
export function TrustIndicators({ items }: TrustIndicatorsProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white text-primary">
            {item.icon}
          </span>
          <span className="text-[13px] font-medium text-text-muted">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
