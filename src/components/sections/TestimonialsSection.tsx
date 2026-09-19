import { Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { TESTIMONIALS, TESTIMONIAL_ITEMS } from '../../data/landing-content';

/** Social proof grid: gold stars, serif quotes, author meta (spec §2.7, §9.4). */
export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            badgeText={TESTIMONIALS.badge}
            titleText={TESTIMONIALS.title}
            subtitleText={TESTIMONIALS.subtitle}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {TESTIMONIAL_ITEMS.map((testimonial, index) => (
            <Reveal key={testimonial.authorName} delayMs={index * 100}>
              <Card hoverable className="flex h-full flex-col">
                {/* Rating */}
                <div className="flex items-center gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
                  {Array.from({ length: testimonial.rating }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      className="fill-gold text-gold"
                      aria-hidden
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-4 flex-1 font-serif text-[17px] italic leading-relaxed text-ink">
                  “{testimonial.quote}”
                </blockquote>

                {/* Author */}
                <div className="mt-6 flex items-center gap-3">
                  {testimonial.avatarUrl === '' ? (
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${testimonial.avatarBgColor}`}
                      aria-hidden
                    >
                      {testimonial.authorName
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </span>
                  ) : (
                    <img
                      src={testimonial.avatarUrl}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-ink">{testimonial.authorName}</p>
                    <p className="text-xs text-text-muted">{testimonial.authorLocation}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
