import type { ReactNode } from 'react';

/** Base shimmer block — 1s pulse, slate fill. */
export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted-light ${className}`.trim()} aria-hidden />;
}

/** Skeleton for one card result in the search grid. */
export function CardSkeleton() {
  return (
    <div className="rounded-[20px] border border-border-subtle bg-white p-6" aria-hidden>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2.5">
          <SkeletonBlock className="h-3 w-24 rounded-full" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-4 w-1/2" />
        </div>
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
      </div>
      <div className="mt-5 flex gap-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

/** Skeleton grid mirroring the search results layout (§12.6). */
export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton for one ranked recommendation row. */
export function RecommendationSkeleton() {
  return (
    <div className="rounded-[20px] border border-border-subtle bg-white p-6" aria-hidden>
      <div className="flex items-center gap-4">
        <SkeletonBlock className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2.5">
          <SkeletonBlock className="h-5 w-2/5" />
          <SkeletonBlock className="h-4 w-1/4" />
        </div>
        <SkeletonBlock className="h-8 w-24" />
      </div>
    </div>
  );
}

/** Stack of recommendation skeletons for the results page. */
export function RecommendationSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <RecommendationSkeleton key={i} />
      ))}
    </div>
  );
}

/** Generic wrapper so pages can compose custom skeleton regions. */
export function SkeletonRegion({ children }: { children: ReactNode }) {
  return <div className="animate-pulse">{children}</div>;
}
