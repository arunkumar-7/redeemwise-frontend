import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  verticalPadding?: "sm" | "md" | "lg" | "hero";
}

const paddingStyles = {
  sm: "py-7 sm:py-8",
  md: "py-20 sm:py-24",
  lg: "py-24 sm:py-[7rem]",
  hero: "pt-20 sm:pt-24 pb-16 sm:pb-20",
};

function PageWrapper({
  children,
  className = "",
  verticalPadding = "md",
}: PageWrapperProps) {
  return (
    <section
      className={[
        paddingStyles[verticalPadding],
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}

export default PageWrapper;
