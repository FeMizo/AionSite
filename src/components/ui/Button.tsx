"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary:
        "border border-blue-400/35 bg-blue-600 text-white shadow-[0_14px_30px_-16px_rgba(37,99,235,0.78)] hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_22px_38px_-20px_rgba(59,130,246,0.76)]",
      secondary:
        "border border-violet-400/35 bg-violet-600 text-white shadow-[0_14px_30px_-16px_rgba(124,58,237,0.72)] hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_22px_38px_-20px_rgba(139,92,246,0.72)]",
      outline:
        "border border-white/15 bg-slate-900/30 text-white shadow-[0_14px_24px_-18px_rgba(15,23,42,0.9)] hover:-translate-y-0.5 hover:border-blue-300/50 hover:bg-blue-500/10 hover:shadow-[0_20px_30px_-18px_rgba(37,99,235,0.35)]",
      ghost:
        "bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/8",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg font-semibold",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
