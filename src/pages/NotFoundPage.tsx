import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="text-center">
        <h1 className="text-[4rem] font-bold font-serif text-navy mb-4">
          404
        </h1>
        <p className="text-[1.25rem] text-text-secondary mb-8">
          Page Not Found
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-[var(--radius-md)] font-semibold text-[0.9375rem] transition-all duration-150 ease-out hover:bg-primary-hover hover:-translate-y-px hover:shadow-button active:bg-primary-active active:translate-y-0"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
