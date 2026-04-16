import { cn } from "@/src/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading = ({ title, subtitle, centered = true, className }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-12 md:mb-16", centered && "text-center", className)}>
      {centered && (
        <div className="mx-auto mb-5 h-px w-10 rounded-full bg-blue-500/70" />
      )}
      <h2 className="text-heading-fluid font-display font-bold text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-slate-400 max-w-2xl", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
