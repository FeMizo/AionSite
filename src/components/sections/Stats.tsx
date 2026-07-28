"use client";

import { useEffect, useRef, useState } from "react";
import type { StatsSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";
import { getScrollTrigger, gsap, usePrefersReducedMotion } from "@/src/lib/animations";

function parseValue(raw: string) {
  const m = raw.match(/^([^\d]*)(\d+)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: raw };
  return { prefix: m[1], num: parseInt(m[2], 10), suffix: m[3] };
}

function StatItem({ value, label }: { value: string; label: string }) {
  const { prefix, num, suffix } = parseValue(value);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      setActive(true);
      return;
    }

    const ScrollTriggerPlugin = getScrollTrigger();
    const trigger = ScrollTriggerPlugin?.create({
      trigger: el,
      start: "top 76%",
      once: true,
      onEnter: () => setActive(true),
    });

    return () => {
      trigger?.kill();
    };
  }, [reduced]);

  useEffect(() => {
    if (!active) return;
    const valueRef = { value: 0 };
    const tween = gsap.to(valueRef, {
      value: num,
      duration: reduced ? 0 : 1.4,
      ease: "power3.out",
      onUpdate: () => setCount(Math.round(valueRef.value)),
    });
    const progressTween = gsap.to(progressRef.current, {
      width: "100%",
      duration: reduced ? 0 : 0.8,
      ease: "power2.out",
    });

    return () => {
      tween.kill();
      progressTween.kill();
    };
  }, [active, num, reduced]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/8 px-5 py-6 text-center shadow-[0_24px_60px_-44px_rgba(15,23,42,0.9)] backdrop-blur transition-transform duration-200 ease-out hover:-translate-y-2 hover:scale-[1.03]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.22),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative mb-1.5 font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
        {prefix}{count}{suffix}
      </div>
      <div className="relative text-sm font-medium text-blue-100/75">{label}</div>
      <div
        className="relative mt-5 h-1 rounded-full bg-white/20"
      >
        <div
          ref={progressRef}
          className="h-full rounded-full bg-white"
          style={{ width: active ? "18%" : "18%" }}
        />
      </div>
    </div>
  );
}

export function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="bg-blue-600 py-16">
      <Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {data.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
