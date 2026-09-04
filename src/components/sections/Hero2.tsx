"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Bot, Globe2, MessageCircleMore, Search, Sparkles } from "lucide-react";
import type { HeaderSectionData, HeroSectionData } from "@/src/cms/types";
import { Button } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Container";
import { Heading } from "@/src/components/ui/Heading";
import { gsap, usePrefersReducedMotion } from "@/src/lib/animations";

export function Hero2({ data, headerData }: { data: HeroSectionData; headerData: HeaderSectionData }) {
  const reduce = usePrefersReducedMotion();
  const [city, setCity] = useState("Cd. Carmen");
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/location").then((res) => res.json()).then((result) => setCity(result.city)).catch(() => setCity("Cd. Carmen"));
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero2-reveal", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      gsap.to(glowRef.current, { scale: 1.08, opacity: 0.55, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reduce || !glowRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    gsap.to(glowRef.current, { left: `${x}%`, top: `${y}%`, duration: 0.8, ease: "power2.out" });
  }

  return (
    <section ref={rootRef} onPointerMove={handlePointerMove} className="relative isolate flex min-h-[calc(100vh-20px)] overflow-hidden bg-slate-950 text-white">
      <video className="pointer-events-none absolute inset-0 -z-30 h-full w-full object-cover" autoPlay muted loop playsInline aria-hidden="true"><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4" type="video/mp4" /></video>
      <div className="absolute inset-0 -z-20 bg-slate-950/78" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,6,23,0.18),rgba(2,6,23,0.76)_48%,rgba(2,6,23,0.98))]" />
      <div ref={glowRef} className="pointer-events-none absolute left-1/2 top-[43%] -z-10 h-[min(75vw,760px)] w-[min(75vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 opacity-45 blur-3xl" />

      <Container className="flex min-h-[calc(100vh-20px)] w-full flex-col items-center justify-center pb-12 pt-28 text-center md:pb-16">
        <div className="relative z-10 flex max-w-5xl flex-col items-center">
          <div className="hero2-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/25 bg-slate-950/55 px-4 py-2 text-xs font-medium tracking-[0.08em] text-blue-200 backdrop-blur-md sm:text-sm"><Sparkles size={14} />{data.badgeText} en {city}</div>
          <div className="hero2-reveal mb-7 flex flex-wrap items-center justify-center gap-2"><span className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 text-xs font-medium text-slate-300"><Globe2 size={15} className="text-blue-300" /> Sitios web</span><span className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 text-xs font-medium text-slate-300"><Search size={15} className="text-blue-300" /> SEO</span><span className="flex h-10 items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-3 text-xs font-medium text-slate-300"><Bot size={15} className="text-blue-300" /> IA</span></div>
          <Heading as="h1" className="hero2-reveal max-w-5xl text-white">{data.title}</Heading>
          <p className="hero2-reveal mt-7 max-w-2xl text-base leading-7 text-slate-200/85 sm:text-lg">{data.subtitle}</p>
          <div className="hero2-reveal mt-9 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"><Button size="lg" className="w-full gap-2 shadow-[0_0_44px_-10px_rgba(37,99,235,0.85)] transition-transform hover:-translate-y-0.5 sm:w-auto" onClick={() => window.open(headerData.whatsappLink, "_blank")}><MessageCircleMore size={18} />{data.primaryCTA}</Button><Button variant="outline" size="lg" className="w-full gap-2 border-white/20 bg-slate-950/35 backdrop-blur-sm sm:w-auto" onClick={() => document.getElementById("calculator-section")?.scrollIntoView({ behavior: "smooth" })}><ArrowRight size={16} />{data.secondaryCTA}</Button></div>
        </div>

        <div className="hero2-reveal relative z-10 mt-auto grid w-full max-w-5xl grid-cols-2 gap-x-5 gap-y-4 border-y border-white/10 py-5 sm:grid-cols-4 sm:gap-0"><div className="px-3 text-left text-xs font-medium text-slate-300/80 sm:border-r sm:border-white/10"><span className="mb-2 block font-display text-2xl text-blue-200/90">01</span>{data.trustBar[0]}</div><div className="px-3 text-left text-xs font-medium text-slate-300/80 sm:border-r sm:border-white/10"><span className="mb-2 block font-display text-2xl text-blue-200/90">02</span>{data.trustBar[1]}</div><div className="px-3 text-left text-xs font-medium text-slate-300/80 sm:border-r sm:border-white/10"><span className="mb-2 block font-display text-2xl text-blue-200/90">03</span>{data.trustBar[2]}</div><div className="px-3 text-left text-xs font-medium text-slate-300/80"><span className="mb-2 block font-display text-2xl text-blue-200/90">04</span>{data.trustBar[3]}</div></div>
      </Container>
    </section>
  );
}
