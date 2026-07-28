"use client";

import { useEffect, useRef } from "react";
import { gsap, usePrefersReducedMotion } from "@/src/lib/animations";

const defaultSignals = [
  "arquitectura web",
  "SEO tecnico",
  "Core Web Vitals",
  "CMS editable",
  "automatizacion",
  "analitica",
  "conversion",
  "IA aplicada",
];

export function ScrollingSignalLine({
  items = defaultSignals,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduce) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [reduce]);

  return (
    <div
      className={`relative overflow-hidden border-y border-white/8 bg-slate-950/70 py-4 ${className}`}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-10 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-3">
            <span className="h-px w-10 bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
