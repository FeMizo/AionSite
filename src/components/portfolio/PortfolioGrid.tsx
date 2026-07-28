"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import type { PortfolioItem, PortfolioSectionData } from "@/src/cms/types";
import { Badge } from "@/src/components/ui/Badge";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { gsap, useGsapStagger } from "@/src/lib/animations";

function PortfolioModal({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: "power2.out" });
      gsap.fromTo(panelRef.current, { autoAlpha: 0, scale: 0.93 }, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power3.out" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        ref={overlayRef}
        type="button"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
      />

      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_40px_80px_-20px_rgba(2,6,23,0.95)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>

        <div className="relative overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={400}
            className="h-72 w-full object-cover md:h-96"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

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

function PortfolioTile({
  item,
  showType,
  hovered,
  onHover,
  onLeave,
  onSelect,
}: {
  item: PortfolioItem;
  showType: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
}) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  return (
    <button
      data-gsap-reveal
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        gsap.to(spotlightRef.current, {
          background: `radial-gradient(260px circle at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, rgba(103,232,249,0.24), transparent 70%)`,
          duration: 0.25,
          ease: "power2.out",
        });
      }}
      className="group relative block h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_26px_52px_-34px_rgba(2,6,23,0.98)] transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-2.5 hover:rotate-[-0.6deg] hover:scale-[1.015] hover:border-cyan-300/45 hover:shadow-[0_34px_78px_-42px_rgba(37,99,235,0.82)] active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        className="absolute right-4 top-4 z-30 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
        style={{ transform: hovered ? "translateY(0)" : "translateY(-4px)", opacity: hovered ? 1 : 0.75 }}
      >
        <ExternalLink size={12} />
        Ver más
      </div>

      <Image
        src={item.image}
        alt={item.title}
        width={800}
        height={288}
        className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-112 group-hover:opacity-100 will-change-transform"
      />

      <div
        className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"
        style={{ opacity: hovered ? 0.92 : 1 }}
      />

      <div
        className="absolute bottom-0 z-30 p-6 text-left"
        style={{ transform: hovered ? "translateY(-10px)" : "translateY(0)", transition: "transform 280ms ease-out" }}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge>{item.category}</Badge>
          {showType && (
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              {item.type}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <p
          className="mt-3 max-w-xs text-sm text-slate-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)", transition: "opacity 220ms ease-out, transform 220ms ease-out" }}
        >
          Abrir caso y revisar el sitio en detalle.
        </p>
      </div>
    </button>
  );
}

export function PortfolioGrid({
  items,
  showType = true,
  animationKey,
}: {
  items: PortfolioSectionData;
  showType?: boolean;
  animationKey?: string;
}) {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const gridRef = useGsapStagger<HTMLDivElement>();

  return (
    <>
      <div
        ref={gridRef}
        key={animationKey}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <PortfolioTile
            key={`${item.title}-${item.url}`}
            item={item}
            showType={showType}
            hovered={hovered === item.title}
            onHover={() => setHovered(item.title)}
            onLeave={() => setHovered(null)}
            onSelect={() => setSelected(item)}
          />
        ))}
      </div>

      {selected && (
        <PortfolioModal
          key={selected.title}
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
