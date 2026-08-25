import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "p-5",
  md: "p-7",
  lg: "p-8",
};

function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={[
        "bg-white rounded-[var(--radius-2xl)]",
        "border border-border-default",
        "shadow-card",
        paddingStyles[padding],
        hover &&
          "transition-card hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}

export default Card;
