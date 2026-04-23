"use client";

import { useEffect, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import type { PortfolioItem, PortfolioSectionData } from "@/src/cms/types";
import { Badge } from "@/src/components/ui/Badge";
import { LinkButton } from "@/src/components/ui/LinkButton";

function PortfolioModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="animate-backdrop-in absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />

      {/* Panel */}
      <div className="animate-scale-in relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_40px_80px_-20px_rgba(2,6,23,0.95)]">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-72 w-full object-cover md:h-96"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        {/* Info */}
        <div className="p-6 md:p-8">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge>{item.category}</Badge>
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              {item.type}
            </span>
          </div>

          <h3 className="mb-6 font-display text-2xl font-bold text-white">
            {item.title}
          </h3>

          <LinkButton
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="rounded-lg gap-2"
          >
            <ExternalLink size={15} />
            Ver sitio web
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

export function PortfolioGrid({
  items,
  showType = true,
}: {
  items: PortfolioSectionData;
  showType?: boolean;
}) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={`${item.title}-${item.url}`}
            type="button"
            onClick={() => setSelected(item)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_26px_52px_-34px_rgba(2,6,23,0.98)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/30 hover:shadow-[0_30px_56px_-34px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <div className="absolute right-4 top-4 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white">
              <ExternalLink size={12} />
              Ver más
            </div>

            <img
              src={item.image}
              alt={item.title}
              className="h-72 w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
            />

            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />

            <div className="absolute bottom-0 p-6 text-left">
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge>{item.category}</Badge>
                {showType && (
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                    {item.type}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <PortfolioModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
