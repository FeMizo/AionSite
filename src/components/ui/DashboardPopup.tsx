"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Zap, ArrowRight } from "lucide-react";
import { gsap, usePrefersReducedMotion } from "@/src/lib/animations";

const COOKIE_NAME = "dashboard_popup_dismissed";
const COOKIE_RESET_DAYS = 4;

export function DashboardPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const shouldShow = checkShouldShowPopup();
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduced ? 0 : 0.25 });
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: reduced ? 0 : 24 },
        { autoAlpha: 1, y: 0, duration: reduced ? 0 : 0.4, ease: "power3.out" },
      );
    });
    return () => ctx.revert();
  }, [isVisible, reduced]);

  const checkShouldShowPopup = (): boolean => {
    if (typeof window === "undefined") return false;
    const cookie = getCookie(COOKIE_NAME);
    if (!cookie) return true;
    try {
      const data = JSON.parse(cookie);
      const dismissedAt = new Date(data.dismissedAt);
      const now = new Date();
      if (data.neverShowAgain) return false;
      const daysDiff = (now.getTime() - dismissedAt.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= COOKIE_RESET_DAYS;
    } catch {
      return true;
    }
  };

  const setCookie = (name: string, value: string, days: number) => {
    if (typeof window === "undefined") return;
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string): string | null => {
    if (typeof window === "undefined") return null;
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const handleClose = () => {
    setIsVisible(false);
    const cookieData = { dismissedAt: new Date().toISOString(), neverShowAgain: false };
    setCookie(COOKIE_NAME, JSON.stringify(cookieData), COOKIE_RESET_DAYS);
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/newsletter.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Algo salió mal. Intenta de nuevo.");
        return;
      }
      setSubmitted(true);
      const cookieData = { dismissedAt: new Date().toISOString(), neverShowAgain: true };
      setCookie(COOKIE_NAME, JSON.stringify(cookieData), 365);
    } catch {
      setError("No se pudo enviar. Revisa tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={panelRef}
        className="relative flex w-full max-w-5xl overflow-hidden rounded-2xl bg-gray-950 shadow-2xl border border-white/10"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-gray-500 hover:bg-white/10 hover:text-gray-300 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left — Content */}
        <div className="flex flex-1 flex-col justify-center p-8">
          {/* Badge */}
          <div className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Próximamente</span>
          </div>

          <h3 className="mb-2 text-2xl font-bold leading-tight text-white">
            ¿Cómo se ve tu sitio web hoy?
          </h3>

          <p className="mb-1 text-sm text-gray-400">
            Checa cómo luce tu negocio en línea, identifica qué mejorar y sube tu posicionamiento en Google — todo desde nuestro dashboard, gratis.
          </p>

          <p className="mb-6 text-sm font-medium text-blue-400">
            Disponible a partir del 18 de mayo de 2026
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-xs text-gray-400">
                Déjanos tu email y te avisamos el día del lanzamiento con un descuento exclusivo.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                >
                  Quiero mi descuento
                  <ArrowRight size={14} />
                </button>
              </div>
              <p className="text-xs text-gray-600">Sin spam • Solo te escribimos cuando importa</p>
            </form>
          ) : (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
              <p className="text-sm font-medium text-green-400">
                ¡Listo! Te avisamos el 18 de mayo con acceso anticipado y tu descuento.
              </p>
            </div>
          )}

          {/* CTA secundario */}
          <div className="mt-5">
            <Link
              href="https://dashboard.aionsite.com.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-300 transition-colors"
              onClick={handleClose}
            >
              Explorar el dashboard ahora
            </Link>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative hidden w-130 flex-shrink-0 sm:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-900/40" />
          <Image
            src="/dashboard-placeholder.webp"
            alt="Dashboard Preview"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export const markPopupAsCompleted = () => {
  if (typeof window === "undefined") return;
  const cookieData = { dismissedAt: new Date().toISOString(), neverShowAgain: true };
  const expires = new Date();
  expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000);
  document.cookie = `${COOKIE_NAME}=${JSON.stringify(cookieData)};expires=${expires.toUTCString()};path=/`;
};
