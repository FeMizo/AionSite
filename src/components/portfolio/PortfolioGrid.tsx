"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ExternalLink, X } from "lucide-react";
import type { PortfolioItem, PortfolioSectionData } from "@/src/cms/types";
import { Badge } from "@/src/components/ui/Badge";
import { LinkButton } from "@/src/components/ui/LinkButton";
import {
  CONTAINER_ANIMATION_VARIANTS,
  FADE_UP_ANIMATION_VARIANTS,
} from "@/src/lib/animations";

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
      <motion.button
        type="button"
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_40px_80px_-20px_rgba(2,6,23,0.95)]"
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${smoothX}px ${smoothY}px, rgba(103,232,249,0.24), transparent 70%)`;

  return (
    <motion.button
      variants={FADE_UP_ANIMATION_VARIANTS}
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      whileHover={{ y: -10, rotate: -0.6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className="group relative block h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[0_26px_52px_-34px_rgba(2,6,23,0.98)] transition-colors duration-300 hover:border-cyan-300/45 hover:shadow-[0_34px_78px_-42px_rgba(37,99,235,0.82)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <motion.div
        className="absolute right-4 top-4 z-30 inline-flex items-center gap-1 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
        animate={{ y: hovered ? 0 : -4, opacity: hovered ? 1 : 0.75 }}
      >
        <ExternalLink size={12} />
        Ver más
      </motion.div>

      <Image
        src={item.image}
        alt={item.title}
        width={800}
        height={288}
        className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-112 group-hover:opacity-100 will-change-transform"
      />

      <motion.div
        className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"
        animate={{ opacity: hovered ? 0.92 : 1 }}
      />

      <motion.div
        className="absolute bottom-0 z-30 p-6 text-left"
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ duration: 0.28 }}
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
        <motion.p
          className="mt-3 max-w-xs text-sm text-slate-300"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
        >
          Abrir caso y revisar el sitio en detalle.
        </motion.p>
      </motion.div>
    </motion.button>
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

  return (
    <>
      <motion.div
        key={animationKey}
        variants={CONTAINER_ANIMATION_VARIANTS}
        initial="hidden"
        animate="show"
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
      </motion.div>

      <AnimatePresence>
        {selected && (
          <PortfolioModal
            key={selected.title}
            item={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
