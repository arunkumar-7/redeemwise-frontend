import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Button } from '../components/ui/Button';

/** Catch-all 404 (FRONTEND_ARCHITECTURE §4.1). */
export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-soft px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-tint text-primary">
        <Compass size={30} strokeWidth={2} aria-hidden />
      </span>
      <h1 className="mt-6 font-serif text-5xl font-bold text-ink">404</h1>
      <p className="mt-3 max-w-md text-lg text-text-secondary">
        This page doesn't exist. The smartest redemption is still just a few clicks away.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button size="large">Back to Home</Button>
        </Link>
        <Link to="/search">
          <Button size="large" variant="secondary">
            Find Best Redemption
          </Button>
        </Link>
      </div>
    </div>
  );
}
