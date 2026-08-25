import { forwardRef } from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      type = "text",
      error,
      disabled = false,
      className = "",
      id,
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={["flex flex-col gap-2", className].join(" ")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-[0.875rem] font-medium text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={[
            "w-full px-4 py-3 rounded-[var(--radius-md)]",
            "text-[0.9375rem] text-text-primary",
            "bg-white placeholder:text-text-muted",
            "border border-border-default",
            "transition-all duration-150 ease-out",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
            error
              ? "border-error focus:border-error focus:ring-error/20"
              : "",
            disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {error && (
          <p className="text-[0.8125rem] text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
