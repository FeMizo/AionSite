"use client";

import { useEffect, useState } from "react";
import { getWhatsAppLink } from "@/src/config/whatsapp";

/** Current time in Ciudad del Carmen. Renders nothing until mounted to avoid a hydration mismatch. */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-MX", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Merida",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="h3-localtime">
      <span className="h3-localtime__dot" aria-hidden="true" />
      Ciudad del Carmen{time ? `, ${time}` : ""}
    </p>
  );
}

/** Prev/next buttons and a position counter for the project strip. */
export function StripControls({
  targetId,
  total,
  label = "proyectos",
  className = "",
}: {
  targetId: string;
  total: number;
  label?: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const strip = document.getElementById(targetId);
    if (!strip) return;
    const onScroll = () => {
      const first = strip.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(strip).columnGap || "0");
      const atEnd = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
      setIndex(atEnd ? total - 1 : Math.round(strip.scrollLeft / step));
    };
    strip.addEventListener("scroll", onScroll, { passive: true });
    return () => strip.removeEventListener("scroll", onScroll);
  }, [targetId, total]);

  const go = (dir: 1 | -1) => {
    const strip = document.getElementById(targetId);
    const first = strip?.firstElementChild as HTMLElement | null;
    if (!strip || !first) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollBy({ left: dir * first.offsetWidth, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className={`h3-strip-controls ${className}`}>
      <p aria-live="polite">
        <span className="h3-tabular">{index + 1}</span> de <span className="h3-tabular">{total}</span> {label}
      </p>
      <div className="h3-strip-controls__buttons">
        <button type="button" className="h3-round" onClick={() => go(-1)} disabled={index === 0} aria-label="Anterior">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button type="button" className="h3-round" onClick={() => go(1)} disabled={index >= total - 1} aria-label="Siguiente">
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M7.5 4.5 13 10l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

const contactOptions = ["Sitio web", "Tienda en línea", "SEO", "Mantenimiento", "Automatización o IA"];

/** Pick what you need, then open WhatsApp with a message that already says it. */
export function ContactPicker({ email }: { email: string }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (option: string) =>
    setSelected((cur) => (cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option]));

  const message =
    selected.length > 0
      ? `Hola, me interesa cotizar: ${selected.join(", ")}.`
      : "Hola, me gustaría cotizar un proyecto web.";

  return (
    <div className="h3-picker">
      <p className="h3-picker__label" id="h3-picker-label">
        ¿Qué necesitas? Puedes elegir varias opciones.
      </p>
      <div className="h3-chips" role="group" aria-labelledby="h3-picker-label">
        {contactOptions.map((option, i) => {
          const on = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              className="h3-chip"
              aria-pressed={on}
              onClick={() => toggle(option)}
              style={{ ["--d" as string]: `${i * 50}ms` }}
            >
              <span className="h3-chip__check" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="12" height="12"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              {option}
            </button>
          );
        })}
      </div>
      <div className="h3-actions">
        <a href={getWhatsAppLink(message)} className="h3-btn" target="_blank" rel="noopener noreferrer">
          {selected.length > 0 ? "Enviar mi selección por WhatsApp" : "Escribir por WhatsApp"}
        </a>
        <a href={`mailto:${email}`} className="h3-btn h3-btn--ghost-dark">
          {email}
        </a>
      </div>
    </div>
  );
}
