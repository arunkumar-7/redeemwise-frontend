import { ArrowRight, IndianRupee, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { CreditCardMockup } from '../visual/CreditCardMockup';
import { TrustIndicators } from '../visual/TrustIndicators';
import { HERO } from '../../data/landing-content';

const TRUST_ITEMS = [
  { icon: <ShieldCheck size={18} strokeWidth={2} />, label: 'No login required' },
  { icon: <IndianRupee size={18} strokeWidth={2} />, label: 'Rupee-accurate valuations' },
  { icon: <Zap size={18} strokeWidth={2} />, label: 'Results in seconds' },
];

const FLOATING_BADGES = [
  { text: 'Up to 3X Better Value', type: 'multiplier' as const },
  { text: '₹0.25 / point', type: 'value' as const },
];

/** Above-the-fold hero: 2-column asymmetric split with card visual (spec §2.2). */
export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Decorative background accents */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-primary-tint blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[380px] w-[380px] rounded-full bg-sky-tint/70 blur-3xl"
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 pb-16 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-28">
        {/* Left column — text stack (7/12) */}
        <div className="flex flex-col items-start lg:col-span-7">
          <Badge>{HERO.badge}</Badge>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px]">
            {HERO.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            {HERO.subhead}
          </p>

          {/* CTA group — side-by-side on desktop per spec mistake #2 */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="#cta" size="large">
              Find Best Redemption
              <ArrowRight size={18} strokeWidth={2.2} />
            </Button>
            <Button href="#how-it-works" size="large" variant="secondary">
              {HERO.secondaryCta}
            </Button>
            {/*
              NOTE: onClick handlers are intentionally absent — Phase 1 has no
              business logic. CTAs navigate to the final CTA anchor; the
              anchor will be re-pointed at /search in Phase 2.
            */}
          </div>

          {/* Trust indicators */}
          <div className="mt-9">
            <TrustIndicators items={TRUST_ITEMS} />
          </div>
        </div>

        {/* Right column — card visual (5/12) */}
        <div className="flex lg:col-span-5">
          <CreditCardMockup bankName="HDFC BANK" cardModel="Regalia" floatingBadges={FLOATING_BADGES} />
        </div>
      </Container>
    </section>
 );
}
