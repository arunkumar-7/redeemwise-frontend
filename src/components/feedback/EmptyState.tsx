import type { ReactNode } from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  /** Optional call-to-action rendered below the text. */
  action?: ReactNode;
}

/** Friendly zero-result panel (§12.2: "no search results", §12.5: empty recommendations). */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-dashed border-border-subtle bg-soft px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted-light text-text-muted">
        {icon ?? <SearchX size={26} strokeWidth={2} />}
      </span>
      <h3 className="mt-1 font-sans text-lg font-semibold text-ink">{title}</h3>
      <p className="max-w-md text-[15px] leading-relaxed text-text-secondary">{description}</p>
      {action !== undefined && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Convenience CTA: navigate back to a flow step. */
export function EmptyStateAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Button variant="secondary" onClick={onClick}>
      {label}
    </Button>
  );
}
