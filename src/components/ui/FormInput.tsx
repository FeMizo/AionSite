import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

const baseClass =
  "w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
}

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-slate-400">
        {label}
      </label>
      <input className={cn(baseClass, className)} {...props} />
    </div>
  );
}
