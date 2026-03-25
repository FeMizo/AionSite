import { ExternalLink } from "lucide-react";
import type { PortfolioSectionData } from "@/src/cms/types";
import { Badge } from "@/src/components/ui/Badge";

export function PortfolioGrid({
  items,
  showType = true,
}: {
  items: PortfolioSectionData;
  showType?: boolean;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <a
          key={`${item.title}-${item.url}`}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_26px_52px_-34px_rgba(2,6,23,0.98)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:shadow-[0_30px_56px_-34px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white">
            <ExternalLink size={12} />
            Abrir
          </div>

          <img
            src={item.image}
            alt={item.title}
            className="h-72 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

          <div className="absolute bottom-0 p-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge>{item.category}</Badge>
              {showType ? (
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  {item.type}
                </span>
              ) : null}
            </div>

            <h3 className="text-xl font-bold text-white">{item.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
}
