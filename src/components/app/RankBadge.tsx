interface RankBadgeProps {
  rank: number;
}

/** Ranked position chip with medal treatment for top 3 (§12.2 RankBadge). */
export function RankBadge({ rank }: RankBadgeProps) {
  const styles: Record<number, string> = {
    1: 'bg-gold text-ink',
    2: 'bg-slate-300 text-ink',
    3: 'bg-amber-200 text-amber-900',
  };
  const style = styles[rank] ?? 'bg-muted-light text-text-secondary';

  return (
    <span
      aria-label={`Rank ${rank}`}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${style}`}
    >
      #{rank}
    </span>
  );
}
