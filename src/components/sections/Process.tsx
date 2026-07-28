"use client";

import { useEffect, useRef } from "react";
import type { ProcessSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { getScrollTrigger, gsap, usePrefersReducedMotion } from "@/src/lib/animations";

export function Process({ data }: { data: ProcessSectionData }) {
  const reduce = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduce) {
      gsap.set([lineRef.current, orbRef.current], { clearProps: "all" });
      gsap.set(section.querySelectorAll("[data-process-reveal]"), { autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0 });
      return;
    }

    const ScrollTriggerPlugin = getScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: section,
                start: "top 68%",
                end: "bottom 42%",
                scrub: 0.45,
              }
            : undefined,
        },
      );

      gsap.fromTo(
        orbRef.current,
        { top: "0%" },
        {
          top: "100%",
          ease: "none",
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: section,
                start: "top 68%",
                end: "bottom 42%",
                scrub: 0.45,
              }
            : undefined,
        },
      );

      gsap.fromTo(
        wordRef.current,
        { x: 120 },
        {
          x: -120,
          ease: "none",
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              }
            : undefined,
        },
      );

      gsap.fromTo(
        beamRef.current,
        { xPercent: -18 },
        {
          xPercent: 18,
          ease: "none",
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              }
            : undefined,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-process-reveal]", section).forEach((item) => {
        const fromX = Number(item.dataset.processX ?? 0);
        const fromScale = Number(item.dataset.processScale ?? 1);
        const fromRotate = Number(item.dataset.processRotate ?? 0);
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: fromX, y: Number(item.dataset.processY ?? 0), scale: fromScale, rotate: fromRotate },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: ScrollTriggerPlugin
              ? {
                  trigger: item,
                  start: "top 86%",
                  once: true,
                }
              : undefined,
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-900/30 py-24 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_80%_60%,rgba(124,58,237,0.14),transparent_32%)]" />
      <div
        ref={wordRef}
        className="pointer-events-none absolute -right-28 top-28 z-0 hidden font-display text-[13rem] font-bold uppercase leading-none text-white/[0.035] md:block"
      >
        Proceso
      </div>
      <div
        ref={beamRef}
        className="pointer-events-none absolute left-[-20%] top-24 z-0 h-28 w-[140%] -rotate-6 bg-linear-to-r from-transparent via-cyan-300/10 to-transparent blur-sm"
      />
      <Container>
        <div
          data-process-reveal
          data-process-y="20"
        >
          <SectionHeading
            title="Nuestro proceso"
            subtitle="Metodología ágil diseñada para garantizar el éxito de tu proyecto."
            centered={false}
          />
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <div
            ref={lineRef}
            className="absolute left-8 top-0 h-full w-[3px] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_28px_rgba(59,130,246,0.75)] md:left-1/2"
          />
          {!reduce ? (
            <div
              ref={orbRef}
              className="absolute left-8 z-20 h-10 w-10 -translate-x-1/2 rounded-full border border-cyan-200/50 bg-blue-500/20 shadow-[0_0_34px_10px_rgba(59,130,246,0.35)] backdrop-blur-md md:left-1/2"
              style={{ top: 0 }}
            >
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
            </div>
          ) : null}

          <div className="space-y-12">
            {data.map((item, index) => (
              <div
                key={item.step}
                className={`relative flex flex-col items-center gap-8 md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  data-process-reveal
                  data-process-scale="0.5"
                  className="absolute left-8 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200/50 bg-slate-950 ring-4 ring-blue-500/20 shadow-[0_0_22px_3px_rgba(59,130,246,0.55)] md:left-1/2"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.95)]" />
                </div>

                <div className="w-full pl-16 md:w-1/2 md:pl-0">
                  <div
                    data-process-reveal
                    data-process-x={index % 2 === 0 ? 40 : -40}
                    data-process-rotate={index % 2 === 0 ? 1.5 : -1.5}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-8 shadow-[0_28px_70px_-48px_rgba(59,130,246,0.85)] backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.015] ${
                      index % 2 === 0 ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(37,99,235,0.18),transparent_42%,rgba(124,58,237,0.12))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-blue-300/15 transition-transform duration-500 group-hover:scale-125" />
                    <span className="relative mb-4 block font-display text-5xl font-bold text-blue-300/50">
                      {item.step}
                    </span>
                    <h3 className="relative mb-2 text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="relative text-slate-400">{item.description}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
