interface SectionHeaderProps {
  badgeText?: string;
  titleText: string;
  subtitleText?: string;
  align?: "center" | "left";
  className?: string;
}

function SectionHeader({
  badgeText,
  titleText,
  subtitleText,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div
      className={[
        "flex flex-col gap-4",
        alignmentClasses,
        className,
      ].join(" ")}
    >
      {badgeText && (
        <span className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-primary">
          {badgeText}
        </span>
      )}
      <h2 className="font-serif text-h2 font-bold tracking-tight text-text-primary leading-[var(--leading-snug)]">
        {titleText}
      </h2>
      {subtitleText && (
        <p className="text-body-lg text-text-secondary leading-[var(--leading-relaxed)] max-w-2xl">
          {subtitleText}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
