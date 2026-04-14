import { cn } from "@/src/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-500/25",
      className
    )}>
      {children}
    </span>
  );
};
