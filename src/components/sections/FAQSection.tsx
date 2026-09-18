import { useState } from 'react';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Reveal } from '../ui/Reveal';
import { FAQAccordionItem } from '../ui/Accordion';
import { FAQ, FAQ_ITEMS } from '../../data/landing-content';

/** Single-column centered FAQ accordion (spec §2.8, §9.5). */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-soft py-20 lg:py-24">
      <Container width="narrow">
        <Reveal>
          <SectionHeader badgeText={FAQ.badge} titleText={FAQ.title} />
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 lg:mt-14">
          {FAQ_ITEMS.map((faq, index) => (
            <Reveal key={faq.question} delayMs={index * 60}>
              <FAQAccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
