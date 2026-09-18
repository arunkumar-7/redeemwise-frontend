import { IndianRupee, TrendingUp } from 'lucide-react';
import type { FloatingBadge } from '../../types/ui-types';

interface CreditCardMockupProps {
  bankName: string;
  cardModel: string;
  floatingBadges: FloatingBadge[];
}

const BADGE_ICONS = {
  value: IndianRupee,
  multiplier: TrendingUp,
} as const;

/** Hero visual anchor: dark navy credit card with chip, tilt and floating value chips (spec §7.6). */
export function CreditCardMockup({ bankName, cardModel, floatingBadges }: CreditCardMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      {/* Soft ambient glow behind the card */}
      <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-tr from-primary/15 via-primary-tint to-transparent blur-2xl" />

      <div className="relative aspect-[8/5] w-full -rotate-2 transition-transform duration-500 ease-out hover:rotate-0">
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-navy-surface p-6 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.35)] sm:p-7">
          {/* Subtle sheen */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

          {/* Top row: bank + LIVE badge */}
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] text-text-on-dark-secondary">
                {bankName}
              </p>
              <p className="mt-1 font-serif text-xl text-white sm:text-2xl">{cardModel}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border-dark bg-white/5 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              LIVE
            </span>
          </div>

          {/* Gold chip */}
          <div className="relative mt-5 h-8 w-11 rounded-md bg-gradient-to-br from-gold via-amber-300 to-amber-500 sm:mt-6 sm:h-9 sm:w-12">
            <div className="absolute inset-y-0 left-[30%] w-px bg-amber-700/40" />
            <div className="absolute inset-y-0 right-[30%] w-px bg-amber-700/40" />
            <div className="absolute inset-x-0 top-1/2 h-px bg-amber-700/40" />
          </div>

          {/* Bottom row: masked number + network */}
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between sm:inset-x-7 sm:bottom-7">
            <p className="font-mono text-sm tracking-[0.18em] text-text-on-dark-secondary sm:text-base">
              •••• •••• •••• 5678
            </p>
            <p className="font-serif text-lg italic text-white/90">VISA</p>
          </div>
        </div>

        {/* Floating value chips */}
        {floatingBadges.map((badge, index) => {
          const Icon = BADGE_ICONS[badge.type];
          const positionClass =
            index === 0
              ? 'absolute -right-3 -top-4 sm:-right-5'
              : 'absolute -bottom-4 -left-3 sm:-left-6';
          return (
            <div
              key={badge.text}
              className={`${positionClass} flex items-center gap-2 rounded-xl border border-border-subtle bg-white px-3.5 py-2.5 shadow-[0_10px_24px_-6px_rgba(15,23,42,0.16)]`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-tint text-primary">
                <Icon size={15} strokeWidth={2.4} />
              </span>
              <span className="text-[13px] font-semibold text-ink">{badge.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
