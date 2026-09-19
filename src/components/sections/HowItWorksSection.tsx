import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { HOW_IT_WORKS, STEPS } from '../../data/landing-content';

/** 3-step process explained in a 3-column card grid (spec §2.4, §9.1). */
export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-soft py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            badgeText={HOW_IT_WORKS.badge}
            titleText={HOW_IT_WORKS.title}
            subtitleText={HOW_IT_WORKS.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal key={step.stepNumber} delayMs={index * 100}>
              <Card hoverable className="flex h-full flex-col">
                {/* Icon box */}
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBgColor}`}
                >
                  {step.icon}
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
                  {step.stepNumber}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
