import { cn } from "@/src/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
      "rounded-2xl border border-white/5 bg-slate-900/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-slate-900/80",
      className
    )}>
      {children}
    </div>
  );
};
