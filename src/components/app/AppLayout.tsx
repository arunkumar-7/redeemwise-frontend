import { Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Brand } from './Brand';
import { StepIndicator, type AppStep } from './StepIndicator';
import { Container } from '../ui/Container';

/** Map a pathname to the current flow step for the indicator. */
function stepFromPathname(pathname: string): AppStep {
  if (pathname.startsWith('/points')) return 'points';
  if (pathname.startsWith('/results') || pathname.startsWith('/dashboard')) return 'results';
  return 'search';
}

const STEP_LABELS: Record<AppStep, string> = {
  search: 'Select your card',
  points: 'Enter your points',
  results: 'View recommendations',
};

/** Application experience shell (search/points/results/dashboard) — reuses Phase 1 tokens. */
export function AppLayout() {
  const { pathname } = useLocation();
  const step = stepFromPathname(pathname);

  // Scroll to top on route change (linear flow expectations).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-soft">
      {/* App header — reuses brand mark; CTA button replaced by step context */}
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-white/90 backdrop-blur-md">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Brand />
          <div className="hidden md:block">
            <StepIndicator current={step} />
          </div>
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-text-secondary transition-colors hover:bg-soft hover:text-primary"
          >
            Back to Home
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle bg-white">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 sm:flex-row">
          <p className="text-[13px] text-text-muted">{STEP_LABELS[step]}</p>
          <p className="text-[13px] text-text-muted">
            Part of the{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              RedeemWise
            </Link>{' '}
            experience
          </p>
        </Container>
      </footer>
    </div>
  );
}
