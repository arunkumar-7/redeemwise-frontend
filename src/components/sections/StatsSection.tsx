import { Container } from '../ui/Container';
import { STATS } from '../../data/landing-content';

/** Quantifiable scale bar: 4 metrics with vertical dividers (spec §2.3, §6.2). */
export function StatsSection() {
  return (
    <section aria-label="Platform statistics" className="bg-white py-6 sm:py-8">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-soft px-6 py-7 text-center"
            >
              <p className="font-sans text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[13px] font-medium text-text-muted sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
