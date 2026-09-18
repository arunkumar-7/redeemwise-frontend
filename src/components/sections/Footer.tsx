import { Container } from '../ui/Container';
import { FOOTER_LINKS, FOOTER_ATTRIBUTION } from '../../data/landing-content';

/** Bottom legal bar: links left, attribution right (spec §2.10, §7.14). Must stay pure black. */
export function Footer() {
  return (
    <footer className="bg-black">
      <Container className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row sm:py-4">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[13px] text-text-on-dark-secondary transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-[13px] text-text-on-dark-secondary">{FOOTER_ATTRIBUTION}</p>
      </Container>
    </footer>
  );
}
