"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "@/src/components/ui/SiteLink";

type NavLink = { name: string; href: string };

/** Phone menu: a full-height sheet under the sticky site header. */
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
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="sc-menu-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sc-menu-btn__lines" aria-hidden="true" />
      </button>

      <div ref={panelRef} id={panelId} className="sc-menu" data-open={open} inert={!open} tabIndex={-1}>
        <nav aria-label="Menú móvil">
          <ul>
            {links.map((link, i) => (
              <li key={link.href} style={{ ["--i" as string]: i }}>
                <Link href={link.href} onClick={() => close(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sc-menu__actions" style={{ ["--i" as string]: links.length }}>
          <Link href={quoteHref} className="sc-btn" onClick={() => close(false)}>
            Cotizar mi sitio
          </Link>
          <a href={whatsapp} className="sc-btn sc-btn--ghost" target="_blank" rel="noopener noreferrer">
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
