import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText: string;
  titleText: string;
  subtitleText?: string;
  align?: 'center' | 'left';
  /** Renders the title in on-dark colors (final CTA banner). */
  onDark?: boolean;
}

/** Standardized section title block: teal badge → serif title → subtitle (spec §7.2). */
export function SectionHeader({
  badgeText,
  titleText,
  subtitleText,
  align = 'center',
  onDark = false,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  const alignment = isCenter ? 'items-center text-center' : 'items-start text-left';
  const titleColor = onDark ? 'text-white' : 'text-ink';
  const subtitleColor = onDark ? 'text-text-on-dark-secondary' : 'text-text-secondary';

  return (
    <div className={`flex flex-col gap-4 ${alignment}`.trim()}>
      <Badge onDark={onDark}>{badgeText}</Badge>
      <h2
        className={`max-w-3xl font-serif text-3xl font-bold leading-[1.2] tracking-[-0.015em] md:text-4xl ${titleColor}`.trim()}
      >
        {titleText}
      </h2>
      {subtitleText !== undefined && (
        <p className={`max-w-2xl text-lg leading-relaxed ${subtitleColor}`.trim()}>
          {subtitleText}
        </p>
      )}
    </div>
  );
}
