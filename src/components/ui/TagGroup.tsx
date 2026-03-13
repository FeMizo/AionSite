import { Badge } from "@/src/components/ui/Badge";
import { cn } from "@/src/lib/utils";

interface TagGroupProps {
  title: string;
  items: readonly string[];
  description?: string;
  className?: string;
}

export function TagGroup({
  title,
  items,
  description,
  className,
}: TagGroupProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description ? (
          <p className="mt-2 max-w-2xl leading-relaxed text-slate-400">
            {description}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <Badge
            key={item}
            className="border border-white/8 bg-white/5 px-4 py-2 text-sm text-slate-200 ring-0"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
