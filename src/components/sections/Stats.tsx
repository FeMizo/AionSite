"use client";

import { useEffect, useRef, useState } from "react";
import type { StatsSectionData } from "@/src/cms/types";
import { Container } from "@/src/components/ui/Container";

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    let startTs: number | null = null;
    let rafId: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * num));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, num]);

  return (
    <div ref={ref} className="text-center">
      <div className="mb-1.5 font-display text-4xl font-bold tabular-nums text-white md:text-5xl">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm font-medium text-blue-100/70">{label}</div>
    </div>
  );
}

export function Stats({ data }: { data: StatsSectionData }) {
  return (
    <section className="bg-blue-600 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {data.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
