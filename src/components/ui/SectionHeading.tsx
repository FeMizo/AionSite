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
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
