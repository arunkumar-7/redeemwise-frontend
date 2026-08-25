import type { ReactNode } from "react";

type BadgeVariant = "primary" | "success" | "warning" | "outline" | "dark";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary border border-primary/20",
  success: "bg-success-light text-success border border-success/20",
  warning: "bg-accent-amber text-amber-700 border border-accent-gold/30",
  outline: "bg-transparent text-text-secondary border border-border-default",
  dark: "bg-navy text-white border border-transparent",
};

function Badge({
  children,
  variant = "primary",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center",
        "px-3 py-1 rounded-full",
        "text-[0.75rem] font-bold uppercase",
        "tracking-[0.12em] leading-[1.4]",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export default Badge;
