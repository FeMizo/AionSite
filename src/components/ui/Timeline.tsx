"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/utils";
import { getScrollTrigger, gsap, usePrefersReducedMotion } from "@/src/lib/animations";

export interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  description?: string;
  points?: readonly string[];
}

interface TimelineProps {
  items: readonly TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const reduce = usePrefersReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = timelineRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    if (reduce) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const ScrollTriggerPlugin = getScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: ScrollTriggerPlugin
          ? {
              trigger: root,
              start: "top 72%",
              end: "bottom 48%",
              scrub: 0.4,
            }
          : undefined,
      },
      );

      gsap.utils.toArray<HTMLElement>("[data-timeline-item]", root).forEach((item) => {
        const card = item.querySelector<HTMLElement>("[data-timeline-card]");
        const dot = item.querySelector<HTMLElement>("[data-timeline-dot]");
        const points = item.querySelectorAll<HTMLElement>("[data-timeline-point]");

        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 34, filter: "blur(14px)", scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: ScrollTriggerPlugin
              ? {
                  trigger: item,
                  start: "top 82%",
                  once: true,
                }
              : undefined,
          },
        );

        gsap.fromTo(
          dot,
          { scale: 0.5, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.45,
            ease: "back.out(1.8)",
            scrollTrigger: ScrollTriggerPlugin
              ? {
                  trigger: item,
                  start: "top 82%",
                  once: true,
                }
              : undefined,
          },
        );

        if (points.length) {
          gsap.fromTo(
            points,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: ScrollTriggerPlugin
                ? {
                    trigger: item,
                    start: "top 78%",
                    once: true,
                  }
                : undefined,
            },
          );
        }
      });

      gsap.to("[data-timeline-dot-core]", {
        scale: 1.45,
        autoAlpha: 0.55,
        duration: 1.3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reduce]);

  return (
    <div ref={timelineRef} className={cn("relative space-y-8", className)}>
      <div className="absolute bottom-2 left-3 top-2 w-px bg-white/10" />
      <div
        ref={lineRef}
        className="absolute bottom-2 left-3 top-2 w-[3px] origin-top -translate-x-1/2 rounded-full bg-linear-to-b from-cyan-300 via-blue-500 to-violet-500 shadow-[0_0_24px_rgba(59,130,246,0.72)]"
      />

      {items.map((item) => (
        <div
          key={`${item.title}-${item.period}`}
          data-timeline-item
          className="relative pl-10"
        >
          <div
            data-timeline-dot
            className="absolute left-0 top-8 h-6 w-6 rounded-full border border-blue-300/35 bg-slate-950 p-1 shadow-[0_0_26px_rgba(59,130,246,0.36)]"
          >
            <div
              data-timeline-dot-core
              className="h-full w-full rounded-full bg-blue-500 shadow-[0_0_18px_rgba(96,165,250,0.9)]"
            />
          </div>

          <div data-timeline-card>
          <Card className="relative overflow-hidden rounded-[1.75rem] p-6 md:p-8">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-cyan-200/45 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full border border-blue-200/10" />
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                  {item.period}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {item.title}
                </h3>
                {item.subtitle ? (
                  <p className="mt-2 text-base font-medium text-slate-300">
                    {item.subtitle}
                  </p>
                ) : null}
                {item.description ? (
                  <p className="mt-4 leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>

            {item.points?.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {item.points.map((point) => (
                  <div
                    key={point}
                    data-timeline-point
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-relaxed text-slate-300"
                  >
                    {point}
                  </div>
                ))}
              </div>
            ) : null}
          </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
