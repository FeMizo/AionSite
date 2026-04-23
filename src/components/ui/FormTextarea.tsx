import type { TextareaHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

const baseClass =
  "w-full resize-none rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: ReactNode;
}

export function FormTextarea({ label, className, ...props }: FormTextareaProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
      <textarea className={cn(baseClass, className)} {...props} />
    </div>
  );
}
