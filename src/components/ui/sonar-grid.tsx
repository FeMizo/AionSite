"use client";

import { useEffect, useRef } from "react";

type Ring = { x: number; y: number; born: number };

const TAU = Math.PI * 2;
const MAX_DPR = 2;

export function SonarGrid({ className = "" }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!host || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rings: Ring[] = [];
    let width = 1;
    let height = 1;
    let frame = 0;
    let timer = 0;
    let visible = true;
    let nextPing = performance.now() + 1800;
    let color = "currentColor";

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = getComputedStyle(canvas).color;
      draw(performance.now());
    };

    const draw = (now: number) => {
      const speed = 240;
      const ringWidth = 88;
      const lifetime = (Math.hypot(width, height) + ringWidth) / speed;
      const live = rings.filter((ring) => (now - ring.born) / 1000 < lifetime);
      rings.splice(0, rings.length, ...live);

      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      const spacing = 26;
      const dotRadius = 1.35;
      const columns = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      const offsetX = (width - (columns - 1) * spacing) / 2;
      const offsetY = (height - (rows - 1) * spacing) / 2;

      context.globalAlpha = 0.24;
      context.beginPath();
      const hot: [number, number, number][] = [];

      for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
          const x = offsetX + column * spacing;
          const y = offsetY + row * spacing;
          let energy = 0;

          for (const ring of rings) {
            const age = (now - ring.born) / 1000;
            const radius = age * speed;
            const distance = Math.abs(Math.hypot(x - ring.x, y - ring.y) - radius);
            if (distance >= ringWidth) continue;
            const t = 1 - distance / ringWidth;
            energy = Math.max(energy, t * t * (3 - 2 * t) * (1 - age / lifetime));
          }

          if (energy < 0.01) {
            context.moveTo(x + dotRadius, y);
            context.arc(x, y, dotRadius, 0, TAU);
          } else {
            hot.push([x, y, energy]);
          }
        }
      }
      context.fill();

      for (const [x, y, energy] of hot) {
        context.globalAlpha = 0.24 + 0.76 * energy;
        context.beginPath();
        context.arc(x, y, dotRadius * (1 + 2.1 * energy), 0, TAU);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (!reducedMotion.matches && now >= nextPing) {
        rings.push({
          x: width * (0.18 + Math.random() * 0.64),
          y: height * (0.2 + Math.random() * 0.58),
          born: now,
        });
        while (rings.length > 5) rings.shift();
        nextPing = now + 2300;
      }
      draw(now);
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) wake();
    });

    resize();
    observer.observe(host);
    visibilityObserver.observe(host);
    document.addEventListener("visibilitychange", wake);
    reducedMotion.addEventListener("change", wake);
    timer = window.setTimeout(wake, 50);

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener("visibilitychange", wake);
      reducedMotion.removeEventListener("change", wake);
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden="true" className={`pointer-events-none overflow-hidden opacity-30 ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full text-blue-300" />
    </div>
  );
}

