const STEPS = [
  { key: 'search', label: 'Card' },
  { key: 'points', label: 'Points' },
  { key: 'results', label: 'Results' },
] as const;

export type AppStep = (typeof STEPS)[number]['key'];

interface StepIndicatorProps {
  current: AppStep;
}

/** Linear-flow progress: Card → Points → Results (FRONTEND_ARCHITECTURE §4.2). */
export function StepIndicator({ current }: StepIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <nav aria-label="Progress" className="flex items-center gap-2">
      <ol className="flex items-center gap-1.5 sm:gap-2">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <li key={step.key} className="flex items-center gap-1.5 sm:gap-2">
              {index > 0 && <span className="h-px w-4 bg-border-subtle sm:w-6" aria-hidden />}
              <span
                aria-current={isCurrent ? 'step' : undefined}
                className={[
                  'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:text-[13px]',
                  isCurrent
                    ? 'bg-primary-tint text-primary-darker'
                    : isDone
                      ? 'text-success'
                      : 'text-text-muted',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold',
                    isCurrent
                      ? 'bg-primary text-white'
                      : isDone
                        ? 'bg-success-light text-success'
                        : 'bg-muted-light text-text-muted',
                  ].join(' ')}
                >
                  {isDone ? '✓' : index + 1}
                </span>
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
