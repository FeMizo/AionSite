"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import {
  Bot,
  Globe,
  ShoppingBag,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { ServicesSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { gsap, useGsapStagger } from "@/src/lib/animations";

const iconMap: Record<string, ComponentType<{ size?: number }>> = {
  Globe,
  Target,
  ShoppingBag,
  TrendingUp,
  Bot,
  Zap,
};

const iconColors: Record<string, { container: string; hover: string; glow: string }> = {
  Globe: {
    container: "border-blue-400/25 bg-blue-600/10 text-blue-300",
    hover: "group-hover:bg-blue-600",
    glow: "rgba(59,130,246,0.5)",
  },
  Target: {
    container: "border-sky-400/25 bg-sky-600/10 text-sky-300",
    hover: "group-hover:bg-sky-600",
    glow: "rgba(14,165,233,0.5)",
  },
  ShoppingBag: {
    container: "border-indigo-400/25 bg-indigo-600/10 text-indigo-300",
    hover: "group-hover:bg-indigo-600",
    glow: "rgba(99,102,241,0.5)",
  },
  TrendingUp: {
    container: "border-cyan-400/25 bg-cyan-600/10 text-cyan-300",
    hover: "group-hover:bg-cyan-600",
    glow: "rgba(6,182,212,0.5)",
  },
  Bot: {
    container: "border-violet-400/25 bg-violet-600/10 text-violet-300",
    hover: "group-hover:bg-violet-600",
    glow: "rgba(139,92,246,0.5)",
  },
  Zap: {
    container: "border-amber-400/25 bg-amber-600/10 text-amber-300",
    hover: "group-hover:bg-amber-600",
    glow: "rgba(245,158,11,0.45)",
  },
};

const serviceFlows: Record<string, { entry: string; action: string; result: string }> = {
  TrendingUp: {
    entry: "Búsqueda",
    action: "SEO técnico",
    result: "Tráfico calificado",
  },
  ShoppingBag: {
    entry: "Catálogo",
    action: "Checkout",
    result: "Pedido",
  },
  Bot: {
    entry: "Pregunta",
    action: "Asistente IA",
    result: "Lead filtrado",
  },
  Zap: {
    entry: "Formulario",
    action: "Automatización",
    result: "Seguimiento",
  },
  Globe: {
    entry: "Visitante",
    action: "Sitio web",
    result: "Contacto",
  },
  Target: {
    entry: "Campaña",
    action: "Landing",
    result: "Conversión",
  },
};

function getServiceFlow(icon: string) {
  return serviceFlows[icon] ?? serviceFlows.Globe;
}

function InteractiveServiceCard({
  service,
  active,
  index,
  onActivate,
  className = "",
  style,
  onPointerDown,
  onPointerUp,
  onMouseDown,
  onMouseUp,
  onClick,
}: {
  service: ServicesSectionData[number];
  active: boolean;
  index: number;
  onActivate: () => void;
  className?: string;
  style?: CSSProperties;
  onPointerDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerUp?: (event: PointerEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (event: MouseEvent<HTMLButtonElement>) => void;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const Icon = iconMap[service.icon] ?? Globe;
  const colors = iconColors[service.icon] ?? iconColors.Globe;
  const flow = getServiceFlow(service.icon);
  const glowRef = useRef<HTMLDivElement>(null);

  return (
    <button
      type="button"
      data-gsap-reveal
      onClick={onClick ?? onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        gsap.to(glowRef.current, {
          background: `radial-gradient(220px circle at ${event.clientX - rect.left}px ${event.clientY - rect.top}px, ${colors.glow}, transparent 68%)`,
          duration: 0.25,
          ease: "power2.out",
        });
      }}
      style={style}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`group relative min-h-[210px] overflow-hidden rounded-2xl border p-6 text-left transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-2 hover:scale-[1.015] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
        active
          ? "border-blue-300/45 bg-slate-900"
          : "border-white/10 bg-slate-900 hover:border-blue-300/35"
      } ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="absolute right-5 top-5 font-display text-5xl font-bold text-white/[0.035]">
        0{index + 1}
      </div>
      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-[0_18px_42px_-26px_rgba(59,130,246,0.9)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 group-hover:text-white ${colors.container} ${colors.hover}`}
        >
          <Icon size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
            {service.description}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {[flow.entry, flow.action, flow.result].map((label, flowIndex) => (
          <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                active ? "bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" : "bg-white/18"
              }`}
            />
            <span className="truncate group-hover:text-slate-300">{label}</span>
            {flowIndex < 2 ? (
              <span className="hidden h-px flex-1 bg-white/10 sm:block" />
            ) : null}
          </div>
        ))}
      </div>
    </button>
  );
}

export function Services({ data }: { data: ServicesSectionData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);
  const sectionRef = useGsapStagger<HTMLDivElement>();
  const activePanelRef = useRef<HTMLDivElement>(null);
  const activeService = data[activeIndex] ?? data[0];
  const ActiveIcon = iconMap[activeService?.icon] ?? Globe;
  const activeFlow = getServiceFlow(activeService?.icon ?? "Globe");

  useEffect(() => {
    gsap.fromTo(
      activePanelRef.current,
      { autoAlpha: 0, y: 16, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "power3.out" },
    );
  }, [activeIndex]);

  function showPreviousService() {
    setActiveIndex((current) => (current === 0 ? data.length - 1 : current - 1));
  }

  function showNextService() {
    setActiveIndex((current) => (current + 1) % data.length);
  }

  function finishSwipe(clientX: number) {
    if (dragStartX.current === null) {
      return;
    }

    const delta = clientX - dragStartX.current;
    dragStartX.current = null;

    if (delta < -45) {
      didSwipe.current = true;
      showNextService();
    }

    if (delta > 45) {
      didSwipe.current = true;
      showPreviousService();
    }
  }

  return (
    <section id="servicios" className="relative overflow-hidden bg-slate-950 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,99,235,0.16),transparent_28%),radial-gradient(circle_at_78%_64%,rgba(124,58,237,0.12),transparent_32%)]" />
      <Container className="relative">
        <div
          ref={sectionRef}
          className="grid gap-12 xl:grid-cols-[minmax(340px,0.8fr)_minmax(0,1.2fr)] xl:items-start xl:gap-16"
        >
          <div data-gsap-reveal className="xl:sticky xl:top-28">
            <h2 className="text-heading-fluid font-display font-bold text-white">
              Diseño web, IA y automatización para negocios
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-slate-400">
              Pasa el cursor por cada sistema y mira cómo cambia el motor digital que armamos para tu negocio.
            </p>

            <div
              ref={activePanelRef}
              key={activeService?.title}
              className="mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_34px_90px_-58px_rgba(59,130,246,0.9)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/30 bg-blue-500/15 text-blue-200">
                  <ActiveIcon size={24} />
                </div>
                <span className="text-xs uppercase tracking-[0.24em] text-blue-300">
                  activo
                </span>
              </div>
              <h3 className="mt-6 font-display text-3xl font-semibold text-white">
                {activeService?.title}
              </h3>
              <div className="mt-6 grid gap-3">
                {[
                  ["Entrada", activeFlow.entry],
                  ["Acción", activeFlow.action],
                  ["Resultado", activeFlow.result],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-gsap-reveal>
            <div className="sm:hidden">
              <div className="relative mx-auto min-h-[340px] md:min-h-[300px] md:max-w-[340px] overflow-hidden">
                {data.map((service, index) => {
                  const depth = (index - activeIndex + data.length) % data.length;
                  const visible = depth < 4;
                  const isActive = depth === 0;
                  const stackTransforms = [
                    { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
                    { x: -10, y: 26, rotate: -5, scale: 0.8, opacity: 0.78 },
                    { x: 10, y: 26, rotate: 5, scale: 0.80, opacity: 0.78 },
                    { x: 0, y: 44, rotate: 0, scale: 0.75, opacity: 0.5 },
                  ] as const;
                  const transform = stackTransforms[depth] ?? {
                    x: 0,
                    y: 48,
                    rotate: 0,
                    scale: 0.82,
                    opacity: 0,
                  };

                  return (
                    <InteractiveServiceCard
                      key={service.title}
                      service={service}
                      active={activeIndex === index}
                      index={index}
                      onActivate={() => setActiveIndex(index)}
                      onClick={() => {
                        if (didSwipe.current) {
                          didSwipe.current = false;
                          return;
                        }

                        setActiveIndex(index);
                      }}
                      className="!absolute inset-x-5 top-2"
                      style={{
                        zIndex: 40 - depth,
                        pointerEvents: visible ? "auto" : "none",
                        opacity: visible ? transform.opacity : 0,
                        transform: `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${transform.rotate}deg) scale(${transform.scale})`,
                      }}
                      onPointerDown={(event) => {
                        if (isActive) {
                          dragStartX.current = event.clientX;
                        }
                      }}
                      onPointerUp={(event) => {
                        if (isActive) {
                          finishSwipe(event.clientX);
                        }
                      }}
                      onMouseDown={(event) => {
                        if (isActive) {
                          dragStartX.current = event.clientX;
                        }
                      }}
                      onMouseUp={(event) => {
                        if (isActive) {
                          finishSwipe(event.clientX);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="hidden gap-5 sm:grid sm:grid-cols-2">
              {data.map((service, index) => (
                <InteractiveServiceCard
                  key={service.title}
                  service={service}
                  active={activeIndex === index}
                  index={index}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
