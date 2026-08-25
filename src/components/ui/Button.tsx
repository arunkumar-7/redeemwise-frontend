import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-primary text-white",
    "hover:bg-primary-hover active:bg-primary-active",
    "shadow-button hover:shadow-[0_6px_20px_0_rgba(20,184,166,0.35)]",
    "hover:-translate-y-px active:translate-y-0",
    "border-0",
  ].join(" "),
  secondary: [
    "bg-navy text-white",
    "border border-navy",
    "hover:bg-navy-surface active:bg-navy",
    "border-navy hover:border-navy-surface",
  ].join(" "),
  outline: [
    "bg-white text-navy",
    "border border-border-default",
    "hover:bg-slate-50 hover:border-slate-300",
    "active:bg-slate-100",
  ].join(" "),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[0.8125rem] gap-1.5",
  md: "px-6 py-3 text-[0.9375rem] gap-2",
  lg: "px-8 py-4 text-body gap-2.5",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center",
        "font-semibold rounded-[var(--radius-md)]",
        "transition-all duration-150 ease-out",
        "cursor-pointer select-none",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0",
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(" ")}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
