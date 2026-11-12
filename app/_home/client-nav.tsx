"use client";

import { useEffect, useId, useRef, useState } from "react";

/** (i) button that opens a small panel with what a package includes. */
export function PlanInfo({ name, pages, notes }: { name: string; pages: string[]; notes: string[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="h3-info" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="h3-info__btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Qué incluye ${name}`}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10 9v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="10" cy="6.2" r="1.05" fill="currentColor" />
        </svg>
      </button>
      <div id={panelId} className="h3-info__panel" data-open={open} role="region" aria-label={`Detalle de ${name}`} inert={!open}>
        <p className="h3-info__title">Páginas incluidas</p>
        <ol>
          {pages.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        {notes.length > 0 && (
          <ul className="h3-info__notes">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
