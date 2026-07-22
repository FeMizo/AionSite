"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { gsap, usePrefersReducedMotion } from "@/src/lib/animations";

const signalCards = [
  { label: "SEO", value: "indexa", x: "6%", y: "15%" },
  { label: "IA", value: "responde", x: "68%", y: "10%" },
  { label: "CMS", value: "edita", x: "73%", y: "57%" },
  { label: "Leads", value: "convierte", x: "10%", y: "66%" },
];

export function Hero({
  data,
  headerData,
}: {
  data: HeroSectionData;
  headerData: HeaderSectionData;
}) {
  const reduce = usePrefersReducedMotion();
  const [city, setCity] = useState("Cd. Carmen");
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const gradientTextRef = useRef<HTMLSpanElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const pulsePathRef = useRef<SVGPathElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const radarSweepRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const signalLineRefs = useRef<Array<SVGPathElement | null>>([]);
  const signalPulseRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setCity(data.city))
      .catch(() => setCity("Cd. Carmen"));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduce) {
      gsap.set(section.querySelectorAll("[data-hero-reveal]"), { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set([centerRef.current, ...cardRefs.current], { autoAlpha: 1, y: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current?.querySelectorAll("[data-hero-reveal]") ?? [],
        { autoAlpha: 0, y: 24, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.09, ease: "power3.out" },
      );

      gsap.fromTo(centerRef.current, { autoAlpha: 0, scale: 0.72 }, { autoAlpha: 1, scale: 1, duration: 0.75, delay: 0.35, ease: "power3.out" });
      gsap.fromTo(cardRefs.current.filter(Boolean), { autoAlpha: 0, y: 22, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, delay: 0.42, stagger: 0.08, ease: "power3.out" });

      gsap.to(gradientTextRef.current, { backgroundPosition: "240% 50%", duration: 7, ease: "none", repeat: -1, yoyo: true });
      gsap.to(".hero-orbit-a", { rotate: 360, duration: 42, ease: "none", repeat: -1 });
      gsap.to(".hero-orbit-b", { rotate: -360, duration: 36, ease: "none", repeat: -1 });
      gsap.to(radarSweepRef.current, { rotate: 360, duration: 8, ease: "none", repeat: -1 });
      cardRefs.current.filter(Boolean).forEach((card, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -12 : 12,
          duration: 2.5 + index * 0.35,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
      signalPulseRefs.current.filter(Boolean).forEach((pulse, index) => {
        gsap.to(pulse, {
          autoAlpha: 0.95,
          scale: 1.45,
          duration: 1.35,
          delay: index * 0.28,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      const mainPath = mainPathRef.current;
      if (mainPath) {
        const length = mainPath.getTotalLength();
        gsap.set(mainPath, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 0 });
        gsap.to(mainPath, { strokeDashoffset: 0, autoAlpha: 1, duration: 1.45, delay: 0.45, ease: "power3.out" });
      }

      gsap.to(pulsePathRef.current, { autoAlpha: 0.8, duration: 2.75, ease: "power1.inOut", repeat: -1, yoyo: true });
      signalLineRefs.current
        .filter((line): line is SVGPathElement => Boolean(line))
        .forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: `2 ${Math.max(length - 2, 1)}`, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: -length,
          duration: 2.6 + index * 0.22,
          delay: index * 0.18,
          ease: "none",
          repeat: -1,
        });
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    gsap.to(spotlightRef.current, {
      background: `radial-gradient(900px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.24), transparent 72%)`,
      duration: 0.35,
      ease: "power2.out",
    });

    if (!reduce) {
      gsap.to(visualRef.current, {
        x: (x / Math.max(currentTarget.clientWidth, 1) - 0.5) * 36,
        y: (y / Math.max(currentTarget.clientHeight, 1) - 0.5) * 28,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="group relative min-h-[calc(100vh-20px)] overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.26),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(124,58,237,0.22),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_56%,#020617_100%)]" />
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 -z-20 opacity-75"
        style={{ background: "radial-gradient(900px circle at 50% 35%, rgba(59, 130, 246, 0.24), transparent 72%)" }}
      />

      <Container className="relative z-10">
        <div className="grid min-h-[680px] gap-12 xl:grid-cols-[minmax(0,0.98fr)_minmax(440px,1.02fr)] xl:items-center">
          <div ref={introRef} className="relative">
            <div data-hero-reveal className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)] backdrop-blur-sm">
              <Sparkles size={14} />
              Agencia de diseño web en {city}
            </div>

            <h1 data-hero-reveal className="max-w-5xl font-display text-[clamp(2.5rem,6vw,7rem)] font-bold leading-[0.88] text-white">
              {data.title.split(" ").slice(0, 4).join(" ")}
              <span
                ref={gradientTextRef}
                className="mt-3 block bg-linear-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text pb-2 text-transparent"
                style={{ backgroundSize: "240% 100%", backgroundPosition: "0% 50%" }}
              >
                en automatico.
              </span>
            </h1>

            <p data-hero-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              {data.subtitle}
            </p>

            <div data-hero-reveal className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button
                size="lg"
                className="gap-2 shadow-[0_0_44px_-10px_rgba(37,99,235,0.75)] transition-shadow hover:shadow-[0_0_70px_-12px_rgba(37,99,235,0.95)]"
                onClick={() => window.open(headerData.whatsappLink, "_blank")}
              >
                <MessageCircleMore size={18} />
                {data.primaryCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 backdrop-blur-sm"
                onClick={() =>
                  window.open(
                    "https://wa.me/5219381573988?text=Hola%20AionSite%2C%20me%20gustaria%20solicitar%20una%20auditoria%20gratuita%20de%20mi%20sitio.",
                    "_blank",
                  )
                }
              >
                <ArrowRight size={16} />
                {data.secondaryCTA}
              </Button>
            </div>
          </div>

          <div ref={visualRef} className="relative min-h-[560px]">
            <div className="hero-orbit-a absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/15" />
            <div className="hero-orbit-b absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/15" />
            <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-cyan-200/10">
              <div
                ref={radarSweepRef}
                className="absolute inset-0 origin-center opacity-55"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(103,232,249,0.02) 250deg, rgba(103,232,249,0.2) 315deg, rgba(59,130,246,0.44) 345deg, transparent 360deg)",
                }}
              />
              <div className="absolute inset-[18%] rounded-full border border-white/8" />
              <div className="absolute inset-[36%] rounded-full border border-white/8" />
            </div>

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 560" fill="none">
              <path
                ref={mainPathRef}
                d="M92 376 C170 206 250 166 318 274 C386 382 450 356 536 168"
                stroke="url(#heroLine)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                ref={pulsePathRef}
                d="M122 154 C246 88 360 132 488 286"
                stroke="rgba(103,232,249,0.26)"
                strokeWidth="2"
                strokeDasharray="8 12"
              />
              {[
                "M310 280 C236 248 160 180 94 100",
                "M310 280 C375 224 432 118 532 78",
                "M310 280 C405 292 464 344 530 410",
                "M310 280 C224 330 150 370 92 432",
              ].map((path, index) => (
                <path
                  key={path}
                  ref={(node) => {
                    signalLineRefs.current[index] = node;
                  }}
                  d={path}
                  stroke="rgba(103,232,249,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
              <defs>
                <linearGradient id="heroLine" x1="92" x2="536" y1="376" y2="168">
                  <stop stopColor="#67e8f9" />
                  <stop offset="0.52" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>

            <div
              ref={centerRef}
              className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-center shadow-[0_0_80px_-30px_rgba(59,130,246,0.95)] backdrop-blur-md before:absolute before:inset-[-10px] before:rounded-full before:border before:border-cyan-200/10 before:content-['']"
            >
              <div>
                <div className="font-display text-5xl font-bold text-white">24/7</div>
                <div className="mt-2 text-xs uppercase tracking-[0.24em] text-blue-200">
                  Growth loop
                </div>
              </div>
            </div>

            {signalCards.map((card, index) => (
              <div
                key={card.label}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="absolute w-36 rounded-2xl border border-white/12 bg-slate-950/72 p-4 shadow-[0_26px_70px_-42px_rgba(59,130,246,0.9)] backdrop-blur-md"
                style={{ left: card.x, top: card.y }}
              >
                <span
                  ref={(node) => {
                    signalPulseRefs.current[index] = node;
                  }}
                  className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-300 opacity-50 shadow-[0_0_18px_rgba(103,232,249,0.95)]"
                />
                <div className="font-display text-3xl font-bold text-white">
                  {card.label}
                </div>
                <div className="mt-1 text-sm text-slate-400">{card.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-y border-white/8 py-5 sm:grid-cols-2 xl:grid-cols-4">
          {data.trustBar.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
              {item}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
