import type { ElementType, ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5";

const headingClasses: Record<HeadingLevel, string> = {
  h1: "text-[clamp(3rem,7vw,5.2rem)] font-display font-semibold leading-[0.9] tracking-[-0.06em]",
  h2: "text-[clamp(2.35rem,5vw,4.5rem)] font-display font-bold leading-[1.02] tracking-[-0.04em]",
  h3: "text-[clamp(1.35rem,2.5vw,2rem)] font-display font-semibold leading-[1.08] tracking-[-0.03em]",
  h4: "text-[clamp(1.15rem,2vw,1.5rem)] font-display font-semibold leading-[1.12] tracking-[-0.02em]",
  h5: "text-base font-display font-semibold leading-[1.2] tracking-[-0.01em]",
};

export function Heading({
  as,
  children,
  className = "",
}: {
  as: HeadingLevel;
  children: ReactNode;
  className?: string;
}) {
  const Component = as as ElementType;
  return <Component className={`${headingClasses[as]} ${className}`}>{children}</Component>;
}
