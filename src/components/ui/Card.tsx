import { cn } from "@/src/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn(
      "rounded-2xl border border-white/8 bg-slate-900/55 p-8 shadow-[0_24px_50px_-34px_rgba(2,6,23,0.95)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-slate-900/72 hover:shadow-[0_30px_56px_-34px_rgba(30,64,175,0.45)]",
      className
    )}>
      {children}
    </div>
  );
};
