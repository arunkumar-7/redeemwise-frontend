import { Link } from 'react-router-dom';

interface BrandProps {
  /** Navigate target; defaults to landing home. */
  to?: string;
}

/** RedeemWise wordmark + teal leaf mark, linking back to the landing page. */
export function Brand({ to = '/' }: BrandProps) {
  return (
    <Link to={to} className="flex items-center gap-2" aria-label="RedeemWise home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M17.5 5.5c-5 .2-8.4 2.9-9.2 7.6-.2 1.4-.1 2.7 0 3.7.9-.2 2.2-.6 3.6-1.3 3.5-1.8 5.6-5.3 5.6-10z"
            fill="#fff"
          />
          <path
            d="M8 18.5c1.1-4.2 3.8-7.2 7.2-8.7"
            stroke="#0D9488"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="font-serif text-xl font-bold tracking-[-0.01em] text-ink">RedeemWise</span>
    </Link>
  );
}
