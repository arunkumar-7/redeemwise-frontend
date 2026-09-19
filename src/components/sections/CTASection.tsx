import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { FINAL_CTA } from '../../data/landing-content';

/** Full-width deep-midnight conversion banner (spec §2.9, §7.13). Must stay dark. */
export function CTASection() {
  return (
    <section id="cta" className="bg-midnight py-24 lg:py-28">
      <Container width="narrow">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <SectionHeader
              badgeText={FINAL_CTA.badge}
              titleText={FINAL_CTA.title}
              subtitleText={FINAL_CTA.subtitle}
              onDark
            />

            <Link
              to="/search"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-[15px] font-semibold tracking-[0.01em] text-white shadow-[0_4px_14px_0_rgba(20,184,166,0.25)] transition-all duration-200 ease-out hover:-translate-y-px hover:bg-primary-dark hover:shadow-[0_8px_20px_0_rgba(20,184,166,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-midnight active:bg-primary-darker active:translate-y-0 sm:px-10 sm:py-5 sm:text-base"
            >
              {FINAL_CTA.buttonText}
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>

            <p className="text-[13px] text-text-on-dark-secondary">
              Free forever · No signup · No card details
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
