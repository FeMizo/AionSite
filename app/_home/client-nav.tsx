"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

type NavLink = { name: string; href: string };

/** Phone menu: a full-height sheet under the sticky header. */
export function MobileNav({ links, quoteHref, whatsapp }: { links: NavLink[]; quoteHref: string; whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close if the viewport grows past the phone breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 820px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="h3-menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="h3-menu-btn__lines" aria-hidden="true" />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="h3-menu"
        data-open={open}
        inert={!open}
        tabIndex={-1}
      >
        <nav aria-label="Menú móvil">
          <ul>
            {links.map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i }}>
                <a href={link.href} onClick={() => close(false)}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="h3-menu__actions" style={{ ["--i" as string]: links.length }}>
          <a href={quoteHref} className="h3-btn" onClick={() => close(false)}>
            Cotizar mi sitio
          </a>
          <a href={whatsapp} className="h3-btn h3-btn--ghost" target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

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
