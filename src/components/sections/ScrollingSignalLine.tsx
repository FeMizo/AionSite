"use client";

import { motion, useReducedMotion } from "motion/react";

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
  const reduce = useReducedMotion();
  const loop = [...items, ...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-white/8 bg-slate-950/70 py-4 ${className}`}
    >
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em] text-slate-400"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-3">
            <span className="h-px w-10 bg-linear-to-r from-transparent via-cyan-300/80 to-transparent" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
