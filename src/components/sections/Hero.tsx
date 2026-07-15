"use client";

import { MouseEvent, useEffect, useState } from "react";
import { ArrowRight, MessageCircleMore, Sparkles } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;
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
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 55, damping: 22 });
  const smoothY = useSpring(mouseY, { stiffness: 55, damping: 22 });
  const panelX = useTransform(smoothX, [0, 900], [-18, 18]);
  const panelY = useTransform(smoothY, [0, 700], [-14, 14]);

  const [city, setCity] = useState("Cd. Carmen");

  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setCity(data.city))
      .catch(() => setCity("Cd. Carmen"));
  }, []);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(59, 130, 246, 0.24), transparent 72%)`;

  return (
    <section
      onMouseMove={handleMouseMove}
      className="group relative min-h-[calc(100vh-20px)] overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36"
    >
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.26),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(124,58,237,0.22),transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_56%,#020617_100%)]" />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-20 opacity-75"
        style={{ background: spotlight }}
      />

      <Container className="relative z-10">
        <div className="grid min-h-[680px] gap-12 xl:grid-cols-[minmax(0,0.98fr)_minmax(440px,1.02fr)] xl:items-center">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-white/5 px-3 py-1 text-sm font-medium text-blue-300 shadow-[0_14px_28px_-20px_rgba(59,130,246,0.7)] backdrop-blur-sm"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles size={14} />
              Agencia de diseño web en {city}
            </motion.div>

            <h1 className="max-w-5xl font-display text-[clamp(2.5rem,8vw,7.8rem)] font-bold leading-[0.88] text-white">
              {data.title.split(" ").slice(0, 4).join(" ")}
              <motion.span
                className="mt-3 block bg-linear-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text pb-2 text-transparent"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "240% 100%" }}
              >
                automáticamente.
              </motion.span>
            </h1>

            <motion.p
              className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap"
              initial={{ opacity: 0, y: reduce ? 0 : 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
            >
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
            </motion.div>
          </motion.div>

          <motion.div
            className="relative min-h-[560px]"
            style={reduce ? undefined : { x: panelX, y: panelY }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 h-[31rem] w-[31rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/15"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/15"
              animate={reduce ? undefined : { rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            />

            <motion.svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 620 560"
              fill="none"
              initial="hidden"
              animate="show"
            >
              <motion.path
                d="M92 376 C170 206 250 166 318 274 C386 382 450 356 536 168"
                stroke="url(#heroLine)"
                strokeWidth="3"
                strokeLinecap="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  show: { pathLength: 1, opacity: 1 },
                }}
                transition={{ duration: 1.45, delay: 0.45, ease: EASE }}
              />
              <motion.path
                d="M122 154 C246 88 360 132 488 286"
                stroke="rgba(103,232,249,0.26)"
                strokeWidth="2"
                strokeDasharray="8 12"
                animate={reduce ? undefined : { pathLength: [0.2, 1, 0.2], opacity: [0.25, 0.8, 0.25] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="heroLine" x1="92" x2="536" y1="376" y2="168">
                  <stop stopColor="#67e8f9" />
                  <stop offset="0.52" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.div
              className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-center shadow-[0_0_80px_-30px_rgba(59,130,246,0.95)] backdrop-blur-md"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.35, ease: EASE }}
            >
              <div>
                <div className="font-display text-5xl font-bold text-white">24/7</div>
                <div className="mt-2 text-xs uppercase tracking-[0.24em] text-blue-200">
                  Growth loop
                </div>
              </div>
            </motion.div>

            {signalCards.map((card, index) => (
              <motion.div
                key={card.label}
                className="absolute w-36 rounded-2xl border border-white/12 bg-slate-950/72 p-4 shadow-[0_26px_70px_-42px_rgba(59,130,246,0.9)] backdrop-blur-md"
                style={{ left: card.x, top: card.y }}
                initial={{ opacity: 0, y: reduce ? 0 : 22, scale: reduce ? 1 : 0.9 }}
                animate={{
                  opacity: 1,
                  y: reduce ? 0 : [0, index % 2 === 0 ? -12 : 12, 0],
                  scale: 1,
                }}
                transition={{
                  opacity: { duration: 0.45, delay: 0.42 + index * 0.08 },
                  scale: { duration: 0.45, delay: 0.42 + index * 0.08 },
                  y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="font-display text-3xl font-bold text-white">
                  {card.label}
                </div>
                <div className="mt-1 text-sm text-slate-400">{card.value}</div>
              </motion.div>
            ))}
          </motion.div>
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
