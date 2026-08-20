"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  Gauge,
  Globe,
  Layers3,
  MessageCircleMore,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { initialCmsContent } from "@/src/cms/site-content";
import { Header } from "@/src/components/sections/Header";
import { SiteFooter } from "@/src/components/sections/SiteFooter";
import { BreadcrumbSchema } from "@/src/components/ui/BreadcrumbSchema";
import { Container } from "@/src/components/ui/Container";
import { LinkButton } from "@/src/components/ui/LinkButton";
import { getScrollTrigger, gsap, usePrefersReducedMotion } from "@/src/lib/animations";

type Chapter = {
  eyebrow: string;
  title: string;
  summary: string;
  details: string[];
  metrics: Array<{ label: string; value: string }>;
  scene: "web" | "speed" | "code";
  layout: "split" | "reverse" | "stacked";
};

const chapters: Chapter[] = [
  {
    eyebrow: "Creacion de webs",
    title: "Sitios con jerarquia, belleza y venta clara.",
    summary:
      "Diseno a medida, copy preciso y una estructura pensada para convertir sin ruido visual.",
    details: [
      "Home premium con mensaje directo",
      "Secciones comerciales limpias",
      "SEO base, schema y metadatos",
    ],
    metrics: [
      { label: "Bloques", value: "5 a 7" },
      { label: "CTA", value: "WhatsApp" },
      { label: "SEO", value: "listo" },
    ],
    scene: "web",
    layout: "split",
  },
  {
    eyebrow: "Mejora de velocidad",
    title: "Menos friccion. Mas sensacion de respuesta.",
    summary:
      "Optimizacion real para que el sitio cargue antes, se mueva mejor y sostenga la atencion.",
    details: [
      "Reduccion de peso visual y tecnico",
      "Imagenes, fuentes y scripts afinados",
      "Mejor lectura de Core Web Vitals",
    ],
    metrics: [
      { label: "LCP", value: "-1.2 s" },
      { label: "Peso", value: "menos" },
      { label: "INP", value: "mas agiles" },
    ],
    scene: "speed",
    layout: "reverse",
  },
  {
    eyebrow: "Custom code",
    title: "Funciones exactas para vender, medir y automatizar.",
    summary:
      "Codigo a medida para conectar sistemas, crear micro experiencias y dejar una ventaja que no se copia.",
    details: [
      "Integraciones con APIs y formularios",
      "Tracking de eventos y conversiones",
      "Automatizaciones y logica de negocio",
    ],
    metrics: [
      { label: "Integraciones", value: "a medida" },
      { label: "Tracking", value: "fino" },
      { label: "Automatizacion", value: "si" },
    ],
    scene: "code",
    layout: "split",
  },
];

const sceneLabels = {
  web: "Webs premium",
  speed: "Performance",
  code: "Custom code",
} as const;

function ChapterSection({
  chapter,
  index,
  active,
  slideRef,
}: {
  chapter: Chapter;
  index: number;
  active: boolean;
  slideRef: (node: HTMLDivElement | null) => void;
}) {
  const copy = (
    <div
      data-stage-copy
      className={`max-w-2xl ${chapter.layout === "reverse" ? "xl:ml-auto" : ""}`}
    >
      <div
        data-reveal
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] transition duration-300 ${
          active
            ? "border-blue-300/30 bg-blue-300/10 text-blue-200"
            : "border-white/10 bg-white/[0.04] text-slate-400"
        }`}
      >
        <WandSparkles size={14} />
        {chapter.eyebrow}
      </div>

      <h2
        data-reveal
        className="mt-8 max-w-xl font-display text-[clamp(1.85rem,2.8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white"
      >
        {chapter.title}
      </h2>

      <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
        {chapter.summary}
      </p>

      <div data-reveal className="mt-8 grid gap-3">
        {chapter.details.map((detail) => (
          <div
            key={detail}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-slate-300"
          >
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(59,130,246,0.85)]" />
            <span>{detail}</span>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-10 flex flex-wrap gap-3">
        <LinkButton
          href={initialCmsContent.base.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
          className="gap-2 border border-white/12 bg-white/[0.04] text-white hover:border-blue-300/30 hover:bg-blue-300/10"
        >
          <MessageCircleMore size={16} />
          Consultar por WhatsApp
        </LinkButton>
      </div>
    </div>
  );

  const visual = (
    <div data-stage-visual className="relative">
      <div className="absolute inset-0 -z-10 rounded-full bg-blue-300/8 blur-[120px]" />
      {chapter.scene === "web" ? <BrowserScene active={active} /> : null}
      {chapter.scene === "speed" ? <SpeedScene active={active} /> : null}
      {chapter.scene === "code" ? <CodeScene active={active} /> : null}
      <div className="pointer-events-none absolute -bottom-10 left-8 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-slate-300">
        {index + 1} / 3
      </div>
    </div>
  );

  return (
    <div
      ref={slideRef}
      className="absolute inset-0 grid items-center px-4 py-6 opacity-0 will-change-transform sm:px-6 md:px-10"
      style={{ zIndex: active ? 3 : index + 1 }}
    >
      <div
        className={`grid h-full gap-12 ${
          chapter.layout === "reverse"
            ? "xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
            : chapter.layout === "stacked"
              ? "xl:grid-cols-1"
              : "xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
        } xl:items-center`}
      >
        {chapter.layout === "stacked" ? (
          <div className="mx-auto grid max-w-5xl gap-10">
            {visual}
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:items-start">
              <div>{copy}</div>
              <div className="grid gap-4">
                <div data-reveal className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    detalles
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {chapter.details.map((detail) => (
                      <div
                        key={detail}
                        className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4 text-sm text-slate-300"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
                <div data-reveal className="grid grid-cols-3 gap-3">
                  {chapter.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                        {metric.label}
                      </div>
                      <div className="mt-2 font-display text-2xl font-semibold text-white">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {chapter.layout === "reverse" ? visual : copy}
            {chapter.layout === "reverse" ? copy : visual}
          </>
        )}
      </div>
    </div>
  );
}

function BrowserScene({ active }: { active: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border bg-white/[0.03] p-4 shadow-[0_28px_90px_-54px_rgba(59,130,246,0.45)] backdrop-blur-xl transition duration-500 ${
        active ? "border-blue-300/35" : "border-white/10"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.2),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.06),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.76))]" />
      <div className="relative flex items-center gap-2 border-b border-white/10 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-300/80 shadow-[0_0_18px_rgba(59,130,246,0.75)]" />
        <div className="ml-4 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-slate-300">
          aionsite.mx
        </div>
      </div>

      <div className="relative mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(240px,0.95fr)]">
        <div
          data-stage-ring
          className="pointer-events-none absolute left-1/2 top-[54%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/14"
        />
        <div
          data-stage-ring
          className="pointer-events-none absolute left-1/2 top-[54%] h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
        />
        <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/8 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-200">
            <Globe size={12} />
            lanzamiento
          </div>
          <h3 className="mt-5 max-w-sm font-display text-3xl font-semibold leading-[1.02] text-white">
            Diseno sobrio que hace sentir el valor antes de explicarlo.
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            La navegacion, la jerarquia y el detalle visual se alinean para que el
            mensaje se entienda en segundos.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              estructura
            </div>
            <div className="mt-3 grid gap-2">
              {["Hero", "Prueba", "Servicio", "CTA"].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-slate-950/50 px-3 py-2 text-sm text-slate-300"
                >
                  <span>{item}</span>
                  <span className="text-blue-200">0{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                seo
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-white">
                meta + schema
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                ventas
              </div>
              <p className="mt-3 font-display text-2xl font-semibold text-white">
                CTA limpio
              </p>
            </div>
          </div>
        </div>

        <div
          data-stage-orb
            className="pointer-events-none absolute -right-10 top-12 h-40 w-40 rounded-full border border-blue-300/18"
        />
        <div
          data-stage-orb
          className="pointer-events-none absolute -left-12 bottom-10 h-24 w-24 rounded-full border border-white/10"
        />
      </div>
    </div>
  );
}

function SpeedScene({ active }: { active: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border bg-white/[0.03] p-4 shadow-[0_28px_90px_-54px_rgba(59,130,246,0.38)] backdrop-blur-xl transition duration-500 ${
        active ? "border-blue-300/35" : "border-white/10"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.15),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(59,130,246,0.12),transparent_26%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.76))]" />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(240px,1.1fr)] lg:items-center">
        <div
          data-stage-ring
          className="pointer-events-none absolute left-[56%] top-[52%] h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/16"
        />
        <div
          data-stage-ring
          className="pointer-events-none absolute left-[56%] top-[52%] h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/14"
        />
        <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-slate-500">
            <span>before</span>
            <span>after</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                peso
              </div>
              <p className="mt-3 font-display text-3xl font-semibold text-white">alto</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                carga
              </div>
              <p className="mt-3 font-display text-3xl font-semibold text-white">
                afinada
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-300/20 bg-blue-300/10 text-blue-200">
                <Gauge size={22} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  performance score
                </div>
                <p className="font-display text-3xl font-semibold text-white">98</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.16),transparent_44%),conic-gradient(from_180deg,rgba(59,130,246,0.24),rgba(59,130,246,0.08),transparent_160deg,rgba(59,130,246,0.16))]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="mx-auto mt-2 flex h-52 w-52 items-center justify-center rounded-full border border-white/12 bg-black/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="absolute h-40 w-40 rounded-full border border-blue-300/16" />
              <div className="absolute h-28 w-28 rounded-full border border-blue-300/18" />
              <div className="absolute h-6 w-1 origin-bottom -translate-y-18 rounded-full bg-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.85)]" />
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.28em] text-blue-200">
                  carga rapida
                </div>
                <div className="mt-2 font-display text-5xl font-semibold text-white">
                  1.8s
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ["LCP", "1.8 s"],
                ["CLS", "0.02"],
                ["JS", "-37%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    {label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            data-stage-orb
            className="pointer-events-none absolute -left-10 top-10 h-24 w-24 rounded-full border border-blue-300/18"
          />
          <div
            data-stage-orb
            className="pointer-events-none absolute -right-8 bottom-10 h-36 w-36 rounded-full border border-white/10"
          />
        </div>
      </div>
    </div>
  );
}

function CodeScene({ active }: { active: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border bg-white/[0.03] p-4 shadow-[0_28px_90px_-54px_rgba(59,130,246,0.45)] backdrop-blur-xl transition duration-500 ${
        active ? "border-blue-300/35" : "border-white/10"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_24%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.76))]" />
      <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.82fr)]">
        <div
          data-stage-ring
          className="pointer-events-none absolute left-[46%] top-[52%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/14"
        />
        <div
          data-stage-ring
          className="pointer-events-none absolute left-[46%] top-[52%] h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
        />
        <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-950/80">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300/80" />
            <div className="ml-3 text-[10px] uppercase tracking-[0.24em] text-slate-500">
              custom code
            </div>
          </div>

          <div className="grid gap-3 p-4 text-sm leading-relaxed">
            {[
              "const system = buildExperience({",
              "  conversion: true,",
              "  tracking: 'preciso',",
              "  automation: 'si',",
              "});",
            ].map((line, index) => (
              <div
                key={line}
                className="grid grid-cols-[36px_minmax(0,1fr)] gap-3 rounded-2xl border border-white/6 bg-white/[0.03] px-3 py-2"
              >
                <div className="text-right font-mono text-[10px] text-slate-500">
                  0{index + 1}
                </div>
                <div className="font-mono text-slate-200">{line}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/80 p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/8 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-blue-200">
              <Code2 size={12} />
              logica
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.02] text-white">
              Codigo que se siente invisible y hace el trabajo dificil.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Integraciones, medicion y automatizacion pensadas para crecer sin depender
              de un parche generico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["API", "conectada"],
              ["Eventos", "medidos"],
              ["Form", "inteligente"],
              ["Deploy", "estable"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                  {label}
                </div>
                <div className="mt-2 font-display text-2xl font-semibold text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex flex-wrap gap-2">
              {["APIs", "funnels", "tracking", "automatizacion", "microinteracciones"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-slate-300"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        <div
          data-stage-orb
          className="pointer-events-none absolute -right-12 top-8 h-40 w-40 rounded-full border border-blue-300/18"
        />
        <div
          data-stage-orb
          className="pointer-events-none absolute -left-10 bottom-8 h-24 w-24 rounded-full border border-white/10"
        />
      </div>
    </div>
  );
}

export function PublicProductsPage() {
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroSceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroRingRefs = useRef<Array<HTMLDivElement | null>>([]);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slides = slideRefs.current.filter((slide): slide is HTMLDivElement => Boolean(slide));
    const story = storyRef.current;

    if (!slides.length || !story) {
      return;
    }

    if (reduceMotion) {
      slides.forEach((slide) => {
        gsap.set(slide.querySelectorAll("[data-reveal]"), { autoAlpha: 1, y: 0, clearProps: "transform" });
        gsap.set(slide, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
      });
      return;
    }

    const ScrollTrigger = getScrollTrigger();
    if (!ScrollTrigger) {
      return;
    }

    const ctx = gsap.context(() => {
      const hero = heroRef.current;
      if (hero) {
        const heroScenes = heroSceneRefs.current.filter(
          (scene): scene is HTMLDivElement => Boolean(scene),
        );
        const heroRings = heroRingRefs.current.filter(
          (ring): ring is HTMLDivElement => Boolean(ring),
        );

        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });

        gsap.to(heroRings, {
          rotate: (index) => (index % 2 === 0 ? 360 : -360),
          duration: 42,
          ease: "none",
          repeat: -1,
        });

        gsap.to(heroScenes, {
          y: (index) => (index === 1 ? -10 : index === 2 ? 12 : 8),
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.18,
        });

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        heroTimeline
          .to(heroScenes[0], { x: -220, y: -55, rotate: -15, scale: 0.82, autoAlpha: 0.38 }, 0.08)
          .to(heroScenes[1], { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1 }, 0.18)
          .to(heroScenes[2], { x: 220, y: 68, rotate: 14, scale: 0.84, autoAlpha: 0.42 }, 0.28)
          .to(heroRingRefs.current[0], { rotate: 180, scale: 1.08 }, 0.18)
          .to(heroRingRefs.current[1], { rotate: -180, scale: 0.95 }, 0.28)
          .to(heroScenes[0], { x: -320, y: -140, rotate: -22, scale: 0.68, autoAlpha: 0.12 }, 0.72)
          .to(heroScenes[1], { x: -140, y: -16, rotate: -8, scale: 0.9, autoAlpha: 0.72 }, 0.82)
          .to(heroScenes[2], { x: 130, y: 18, rotate: 8, scale: 0.92, autoAlpha: 0.9 }, 0.92)
          .to(heroScenes[1], { x: -40, y: -8, rotate: -4, scale: 0.96, autoAlpha: 0.5 }, 1.28)
          .to(heroScenes[2], { x: 0, y: 0, rotate: 0, scale: 1, autoAlpha: 1 }, 1.48)
          .to(heroScenes[0], { x: -120, y: 72, rotate: -10, scale: 0.72, autoAlpha: 0.24 }, 1.62)
          .to(heroScenes[1], { x: 130, y: 40, rotate: 10, scale: 0.84, autoAlpha: 0.44 }, 1.72)
          .to(heroScenes[2], { x: 0, y: -26, rotate: 0, scale: 1.04, autoAlpha: 1 }, 1.88);
      }

      gsap.set(slides, { autoAlpha: 0, y: 58, scale: 0.98 });
      gsap.set(slides[0], { autoAlpha: 1, y: 0, scale: 1 });

      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: () => `+=${window.innerHeight * (slides.length * 0.3)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              slides.length - 1,
              Math.floor(self.progress * slides.length),
            );
            setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
          },
        },
      });

      slides.forEach((slide, index) => {
        const revealItems = slide.querySelectorAll("[data-reveal]");
        const orbitItems = slide.querySelectorAll("[data-orbit], [data-stage-orb]");
        const rings = slide.querySelectorAll("[data-stage-ring]");
        const copyLayer = slide.querySelector("[data-stage-copy]");
        const visualLayer = slide.querySelector("[data-stage-visual]");
        const stageCards = slide.querySelectorAll("[data-stage-card]");

        gsap.fromTo(
          revealItems,
          { autoAlpha: 0, y: 34, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: slide,
              start: "top 82%",
              once: true,
            },
          },
        );

        if (copyLayer) {
          gsap.fromTo(
            copyLayer,
            { y: 36, x: index === 1 ? -18 : 0, rotateY: index === 1 ? 10 : 0 },
            {
              y: 0,
              x: 0,
              rotateY: 0,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        if (visualLayer) {
          gsap.fromTo(
            visualLayer,
            {
              y: 78,
              x: index === 0 ? 24 : index === 1 ? -18 : 0,
              rotate: index === 0 ? -6 : index === 1 ? 6 : -4,
              scale: 0.92,
            },
            {
              y: 0,
              x: 0,
              rotate: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        gsap.fromTo(
          rings,
          { scale: 0.78, autoAlpha: 0.2 },
          {
            scale: 1.14,
            autoAlpha: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        if (stageCards.length) {
          gsap.fromTo(
            stageCards,
            { y: 20, rotateX: 16, autoAlpha: 0.35 },
            {
              y: 0,
              rotateX: 0,
              autoAlpha: 1,
              stagger: 0.07,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                start: "top 85%",
                end: "bottom 25%",
                scrub: true,
              },
            },
          );
        }

        gsap.to(orbitItems, {
          rotate: index % 2 === 0 ? 360 : -360,
          duration: 26 + index * 2.5,
          ease: "none",
          repeat: -1,
        });

        storyTimeline.to(
          slide,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          index,
        );

        if (index < slides.length - 1) {
          storyTimeline.to(
            slide,
            {
              autoAlpha: 0,
              y: -54,
              scale: 0.97,
              duration: 0.5,
              ease: "power2.inOut",
            },
            index + 0.78,
          );
        } else {
          storyTimeline.to(
            slide,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "none",
            },
            index + 0.78,
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <>
      <Header
        base={initialCmsContent.base}
        data={initialCmsContent.sections.header.data}
      />
      <BreadcrumbSchema items={[{ name: "Productos", path: "/productos/" }]} />

      <main ref={rootRef} className="relative overflow-hidden bg-[#02040a] text-white">
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] overflow-hidden pt-28 md:pt-32"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(255,255,255,0.07),transparent_24%),linear-gradient(180deg,#02040a_0%,#050b14_50%,#02040a_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />

          <Container className="relative h-full flex">
            <div className="grid gap-14 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-center">
              <div className="max-w-3xl">
                <div
                  data-reveal
                  className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-blue-200"
                >
                  <Sparkles size={14} />
                  AionSite productos
                </div>

                <h1
                  data-reveal
                  className="mt-8 max-w-4xl font-display text-[clamp(3rem,5.6vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
                >
                  Tres productos.
                  <br />
                  Un sistema que vende.
                </h1>

                <p
                  data-reveal
                  className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Creacion de webs, mejora de velocidad y custom code para que AionSite se
                  vea mas premium, responda mejor y cierre mas rapido.
                </p>

                <div data-reveal className="mt-10 flex flex-wrap gap-3">
                  <LinkButton
                    href={initialCmsContent.base.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="gap-2 border border-blue-300/35 bg-blue-500 text-slate-950 shadow-[0_20px_50px_-24px_rgba(59,130,246,0.85)] hover:bg-blue-400"
                  >
                    <MessageCircleMore size={18} />
                    Pedir por WhatsApp
                  </LinkButton>
                  <a
                    href="#productos"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    Ver productos
                    <ArrowRight size={16} />
                  </a>
                </div>

                <div data-reveal className="mt-10 grid gap-3 sm:grid-cols-3">
                  {[
                    "Visual minimalista",
                    "SEO tecnico",
                    "Todo en espanol",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div data-reveal className="relative">
                <div className="absolute inset-0 -z-10 rounded-full bg-blue-300/10 blur-[140px]" />
                <div className="rounded-[2.3rem] border border-white/10 bg-white/[0.02] p-4 shadow-[0_34px_100px_-62px_rgba(59,130,246,0.72)]">
                  <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-5">
                    <div
                      ref={(node) => {
                        heroRingRefs.current[0] = node;
                      }}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/16"
                    />
                    <div
                      ref={(node) => {
                        heroRingRefs.current[1] = node;
                      }}
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.11),transparent_40%)]" />

                    <div className="relative z-10 grid h-full gap-4">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-slate-500">
                        <span>experiencia</span>
                        <span className="text-blue-200">
                          {sceneLabels[chapters[activeIndex]?.scene ?? "web"]}
                        </span>
                      </div>

                      <div className="relative flex min-h-[430px] items-center justify-center">
                        {[chapters[0], chapters[1], chapters[2]].map((chapter, index) => (
                          <div
                            key={chapter.title}
                            ref={(node) => {
                              heroSceneRefs.current[index] = node;
                            }}
                            className={`absolute w-full max-w-[25rem] rounded-[2rem] border bg-white/[0.04] p-5 shadow-[0_28px_80px_-48px_rgba(59,130,246,0.6)] backdrop-blur-xl transition duration-300 ${
                              index === 0
                                ? "border-blue-300/28"
                                : index === 1
                                  ? "border-white/12"
                                  : "border-blue-300/24"
                            }`}
                            style={{
                              transform:
                                index === 0
                                  ? "translate3d(-150px, 84px, 0) rotate(-10deg) scale(0.8)"
                                  : index === 1
                                    ? "translate3d(0, 0, 0) rotate(0deg) scale(1)"
                                    : "translate3d(150px, 86px, 0) rotate(10deg) scale(0.8)",
                            }}
                          >
                            <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/78 p-4">
                              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                                {chapter.eyebrow}
                              </div>
                              <p className="mt-2 font-display text-2xl font-semibold leading-[1.02] text-white">
                                {chapter.title}
                              </p>
                              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                {chapter.summary}
                              </p>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3">
                              {chapter.metrics.map((metric) => (
                                <div
                                  key={metric.label}
                                  className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-3 py-3"
                                >
                                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                                    {metric.label}
                                  </div>
                                  <div className="mt-2 font-display text-lg font-semibold text-white">
                                    {metric.value}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                        <div
                          className="grid min-w-0 gap-2 overflow-hidden"
                          style={{
                            maskImage:
                              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                            WebkitMaskImage:
                              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
                          }}
                        >
                          <div
                            ref={marqueeRef}
                            className="flex min-w-max gap-8 whitespace-nowrap text-[10px] uppercase tracking-[0.28em] text-slate-500"
                          >
                            {[
                              "web premium",
                              "performance",
                              "custom code",
                              "conversion",
                              "motion",
                              "seo tecnico",
                              "web premium",
                              "performance",
                              "custom code",
                              "conversion",
                              "motion",
                              "seo tecnico",
                            ].map((word) => (
                              <span key={word} className="inline-flex items-center gap-10">
                                {word}
                                <span className="h-px w-12 bg-white/10" />
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-full border border-blue-300/20 bg-blue-300/8 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-blue-200">
                          motion activo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-white/10 bg-white/[0.02] py-6">
          <Container>
            <div className="flex flex-wrap items-center gap-3">
              {chapters.map((chapter, index) => {
                const active = index === activeIndex;

                return (
                  <div
                    key={chapter.title}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-300 ${
                      active
                        ? "border-blue-300/35 bg-blue-500 text-slate-950"
                        : "border-white/10 bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    {chapter.eyebrow}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        <section
          ref={storyRef}
          id="productos"
          className="relative min-h-[140vh] border-y border-white/10 bg-white/[0.015]"
        >
          <div className="sticky top-0 flex min-h-[100dvh] items-center py-12 md:py-14">
            <Container>
              <div className="mx-auto grid max-w-6xl gap-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Narrativa continua
                  </div>
                  <div className="text-xs uppercase tracking-[0.3em] text-blue-200">
                    {chapters[activeIndex]?.eyebrow}
                  </div>
                </div>

                <div className="relative h-[min(78vh,780px)] overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.025] p-4 shadow-[0_34px_100px_-62px_rgba(59,130,246,0.45)] md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(59,130,246,0.11),transparent_28%),radial-gradient(circle_at_82%_32%,rgba(255,255,255,0.06),transparent_26%),linear-gradient(180deg,rgba(2,4,10,0.4),rgba(2,4,10,0.92))]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  {chapters.map((chapter, index) => (
                    <ChapterSection
                      key={chapter.title}
                      chapter={chapter}
                      index={index}
                      active={index === activeIndex}
                      slideRef={(node) => {
                        slideRefs.current[index] = node;
                      }}
                    />
                  ))}
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {chapters.map((chapter, index) => {
                    const active = index === activeIndex;

                    return (
                      <div
                        key={chapter.title}
                        data-stage-card
                        className={`rounded-2xl border px-4 py-4 transition duration-300 ${
                          active
                            ? "border-blue-300/30 bg-blue-300/8 text-white"
                            : "border-white/10 bg-white/[0.03] text-slate-400"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                          {chapter.eyebrow}
                        </div>
                        <div className="mt-3 font-display text-base font-semibold leading-snug md:text-lg">
                          {chapter.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Container>
          </div>
        </section>

        <section className="relative -mt-56 overflow-hidden py-12 md:-mt-114 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_82%_30%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(2,4,10,0.76),rgba(2,4,10,1))]" />
          <Container className="relative">
            <div className="mx-auto max-w-6xl rounded-[3rem] border border-white/8 bg-white/[0.025] p-8 text-center shadow-[0_34px_100px_-62px_rgba(59,130,246,0.55)] md:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.26em] text-blue-200">
                <Sparkles size={14} />
                Cierre comercial
              </div>
              <h2 className="mt-8 font-display text-[clamp(2.4rem,4vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
                Un paquete visual para vender mejor.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Si quieres que te armemos esta experiencia para tu marca o negocio, te
                respondo por WhatsApp con una propuesta clara.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <LinkButton
                  href={initialCmsContent.base.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="gap-2 border border-blue-300/35 bg-blue-500 text-slate-950 hover:bg-blue-400"
                >
                  <MessageCircleMore size={18} />
                  Hablar por WhatsApp
                </LinkButton>
                <div className="text-sm text-slate-400">
                  Respuesta directa. Todo en espanol.
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
