import { Card } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/utils";

export interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  description?: string;
  points?: readonly string[];
}

interface TimelineProps {
  items: readonly TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8", className)}>
      <div className="absolute bottom-2 left-3 top-2 w-px bg-white/10" />

      {items.map((item) => (
        <div key={`${item.title}-${item.period}`} className="relative pl-10">
          <div className="absolute left-0 top-8 h-6 w-6 rounded-full border border-blue-300/35 bg-slate-950 p-1">
            <div className="h-full w-full rounded-full bg-blue-500" />
          </div>

          <Card className="rounded-[1.75rem] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                  {item.period}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-2 text-base font-medium text-slate-300">
                    {item.subtitle}
                  </p>
                ) : null}
                {item.description ? (
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>

            {item.points?.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {item.points.map((point) => (
                  <div
                    key={point}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-relaxed text-slate-300"
                  >
                    {point}
                  </div>
                ))}
              </div>
            ) : null}
          </Card>
        </div>
      ))}
    </div>
  );
}
