import type { ReactNode } from "react";
import { Card } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/utils";

export interface HighlightGridItem {
  title: string;
  description: string;
  eyebrow?: string;
  meta?: string;
  icon?: ReactNode;
}

interface HighlightGridProps {
  items: readonly HighlightGridItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClassName: Record<NonNullable<HighlightGridProps["columns"]>, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

export function HighlightGrid({
  items,
  columns = 3,
  className,
}: HighlightGridProps) {
  return (
    <div className={cn("grid gap-6", columnClassName[columns], className)}>
      {items.map((item) => (
        <Card key={item.title} className="h-full">
          {item.icon ? (
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-300 shadow-[0_18px_28px_-22px_rgba(59,130,246,0.9)]">
              {item.icon}
            </div>
          ) : null}

          {item.eyebrow ? (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
              {item.eyebrow}
            </p>
          ) : null}

          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 leading-relaxed text-slate-400">{item.description}</p>

          {item.meta ? (
            <p className="mt-5 text-sm font-medium text-slate-300">{item.meta}</p>
          ) : null}
        </Card>
      ))}
    </div>
  );
}
