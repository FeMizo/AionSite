"use client";

import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { FADE_UP_ANIMATION_VARIANTS } from "@/src/lib/animations";

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
  return (
    <div style={{ width }} className={cn("relative overflow-hidden", className)}>
      <motion.div
        variants={FADE_UP_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: delay / 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
