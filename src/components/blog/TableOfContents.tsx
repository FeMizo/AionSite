import { cn } from "@/src/lib/utils";
import type { ArticleHeading } from "@/src/cms/types";

export function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  return (
    <div className="sticky top-24 rounded-xl border border-white/8 bg-slate-900/40 p-5 backdrop-blur-sm">
      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Contenido
      </p>
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "flex items-start gap-2 rounded-md px-2 py-1.5 text-sm transition-all duration-150 hover:bg-white/5 hover:text-white",
                h.level === 2
                  ? "text-slate-300 font-medium"
                  : "pl-5 text-slate-500"
              )}
            >
              <span className="mt-px shrink-0 font-mono text-xs text-blue-500/60">
                {h.level === 2 ? "#" : "##"}
              </span>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
