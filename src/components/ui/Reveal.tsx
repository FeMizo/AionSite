"use client";

import { cn } from "@/src/lib/utils";
import { useGsapReveal } from "@/src/lib/animations";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export function Reveal({
  children,
  className,
  delay = 0,
  width = "100%",
}: RevealProps) {
  const revealRef = useGsapReveal<HTMLDivElement>({ delay: delay / 1000 });

  return (
    <div style={{ width }} className={cn("relative overflow-hidden", className)}>
      <div ref={revealRef}>
        {children}
      </div>
    </div>
  );
}
