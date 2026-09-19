import { CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { RecommendationDashboardMockup } from '../visual/RecommendationDashboardMockup';
import { ACTION_PREVIEW, DASHBOARD_MOCKUP } from '../../data/landing-content';

/** 2-column product demo: narrative copy + checkmarks left, dashboard preview right (spec §2.6). */
export function ActionPreviewSection() {
  return (
    <section className="bg-soft py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            badgeText={ACTION_PREVIEW.badge}
            titleText={ACTION_PREVIEW.title}
            subtitleText={ACTION_PREVIEW.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Left — narrative + checkmarks */}
          <Reveal className="lg:col-span-5">
            <ul className="flex flex-col gap-4">
              {ACTION_PREVIEW.checkmarks.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={22} strokeWidth={2} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-[15px] leading-relaxed text-text-secondary sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Right — dashboard preview */}
          <Reveal delayMs={120} className="lg:col-span-7">
            <RecommendationDashboardMockup
              cardName={DASHBOARD_MOCKUP.cardName}
              availablePoints={DASHBOARD_MOCKUP.availablePoints}
              subtitle={DASHBOARD_MOCKUP.subtitle}
              rows={DASHBOARD_MOCKUP.rows}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
