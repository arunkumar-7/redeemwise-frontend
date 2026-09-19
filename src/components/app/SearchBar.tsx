import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Accessible label; visually hidden. */
  label?: string;
}

/** Bank/card search input with clear button (§12.2 SearchBar). Filtering is debounced by the page. */
export function SearchBar({ value, onChange, placeholder = 'Search by bank or card name…', label = 'Search cards' }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        strokeWidth={2}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="w-full rounded-xl border border-border-subtle bg-white py-3.5 pl-11 pr-11 text-[15px] text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
      />
      {value !== '' && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-muted-light hover:text-ink"
        >
          <X size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
