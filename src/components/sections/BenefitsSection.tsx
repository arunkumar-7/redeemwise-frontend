import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { BENEFITS, BENEFIT_ITEMS } from '../../data/landing-content';

/** Core value advantages in a 3-column feature card grid (spec §2.5, §9.2). */
export function BenefitsSection() {
  return (
    <section id="benefits" className="bg-white py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            badgeText={BENEFITS.badge}
            titleText={BENEFITS.title}
            subtitleText={BENEFITS.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {BENEFIT_ITEMS.map((benefit, index) => (
            <Reveal key={benefit.title} delayMs={index * 100}>
              <Card hoverable className="flex h-full flex-col">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.iconBgColor}`}
                >
                  {benefit.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.01em] text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {benefit.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
