"use client";

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface MotionButtonBaseProps {
  label: string;
  variant?: "primary" | "outline";
  classes?: string;
  animate?: boolean;
  delay?: number;
  icon?: ReactNode;
  style?: CSSProperties;
}

type MotionButtonProps = MotionButtonBaseProps &
  ({ as?: "button"; } & ButtonHTMLAttributes<HTMLButtonElement> | { as: "a"; } & AnchorHTMLAttributes<HTMLAnchorElement>);

function MotionButton({ as = "button", label, variant = "primary", classes, animate = true, delay = 0, icon = <ArrowRight className="size-5" />, style, ...props }: MotionButtonProps) {
  const className = cn(
    "group relative inline-flex min-h-16 min-w-50 max-w-full cursor-pointer items-center overflow-hidden rounded-full p-1 outline-none transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
    variant === "outline" ? "border border-white/20 bg-white/[0.02] hover:bg-blue-500/10" : "border border-blue-400/35 bg-blue-600 shadow-[0_14px_30px_-16px_rgba(37,99,235,0.78)]",
    classes,
  );
  const content = (
    <span className="relative z-10 flex min-w-0 w-full items-center gap-7 pr-3 pl-5 py-2 text-left">
      <span aria-hidden="true" className="shrink-0 text-white transition-transform duration-500 group-hover:translate-x-1">{icon}</span>
      <span className="min-w-0 flex-1 whitespace-normal break-words font-[inherit] text-lg leading-tight tracking-tight text-white">{label}</span>
    </span>
  );
  const background = <span aria-hidden="true" className={cn("pointer-events-none absolute inset-y-1 left-1 w-14 rounded-full border border-blue-300/70 bg-blue-500/40 transition-[width,background-color] duration-500 ease-out", variant === "outline" && "border-blue-300/50 bg-blue-500/5", animate && "group-hover:w-[calc(100%-0.5rem)] group-hover:bg-blue-500/25")} />;

  if (as === "a") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...anchorProps} className={className} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}>{background}{content}</a>;
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button {...buttonProps} type={buttonProps.type ?? "button"} className={className} style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}>{background}{content}</button>;
}

export default MotionButton;
