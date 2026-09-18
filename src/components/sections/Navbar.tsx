import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { NAV_LINKS, CTA_LABEL } from '../../data/landing-content';

/** Sticky top navigation with brand anchor, inline links and persistent CTA (spec §7.1). */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-white/90 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2" onClick={closeMenu}>
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
          <span className="font-serif text-xl font-bold tracking-[-0.01em] text-ink">
            RedeemWise
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="#cta">{CTA_LABEL}</Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-soft lg:hidden"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-border-subtle bg-white px-4 pb-6 pt-3 sm:px-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-text-secondary transition-colors hover:bg-soft hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#cta" className="mt-4 w-full">
            {CTA_LABEL}
          </Button>
        </div>
      )}
    </header>
  );
}
