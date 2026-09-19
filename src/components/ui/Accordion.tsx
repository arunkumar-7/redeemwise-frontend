import { ChevronDown } from 'lucide-react';

interface FAQAccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

/** Collapsible FAQ item with animated chevron and smooth height reveal (spec §7.12). */
export function FAQAccordionItem({ question, answer, isOpen, onToggle }: FAQAccordionItemProps) {
  return (
    <div
      className={[
        'rounded-2xl border bg-white px-5 py-[18px] transition-colors duration-200 sm:px-6',
        isOpen ? 'border-border-hover' : 'border-border-subtle hover:border-border-hover',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={undefined}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
      >
        <span className="text-base font-semibold text-ink sm:text-[17px]">{question}</span>
        <ChevronDown
          size={20}
          strokeWidth={2}
          className={`shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      {/* Grid-rows trick animates height 0 → auto without measuring (spec §12 accordion). */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pt-3 pr-8 text-[15px] leading-relaxed text-text-secondary">{answer}</p>
        </div>
      </div>
    </div>
  );
}
