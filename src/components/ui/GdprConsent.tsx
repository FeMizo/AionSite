"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";

const COOKIE_NAME = "aionsite_gdpr_consent";

type ConsentState = "accepted" | "rejected" | "unknown" | null;

function readConsentCookie(): ConsentState {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${COOKIE_NAME}=`));

  if (!cookie) {
    return "unknown";
  }

  const value = cookie.split("=")[1];
  return value === "accepted" || value === "rejected" ? value : "unknown";
}

function setConsentCookie(value: "accepted" | "rejected") {
  if (typeof document === "undefined") {
    return;
  }

  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; sameSite=Lax`;
}

export function GdprConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setConsent(readConsentCookie());
  }, []);

  const handleAccept = () => {
    setConsentCookie("accepted");
    setConsent("accepted");
    setShowDetails(false);
  };

  const handleReject = () => {
    setConsentCookie("rejected");
    setConsent("rejected");
    setShowDetails(false);
  };

  if (consent === null || consent !== "unknown") {
    return null;
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/95 p-5 shadow-[0_32px_80px_-42px_rgba(0,0,0,0.85)] backdrop-blur-md ring-1 ring-white/5 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div className="space-y-3 text-sm leading-6 text-slate-200 sm:flex-1">
            <p className="font-semibold text-white">Protección de datos y cookies</p>
            <p>
              Usamos datos como dirección IP, comportamiento de navegación y cookies para mejorar el sitio, asegurar su funcionamiento y optimizar tu experiencia.
            </p>
            <p className="text-slate-400">
              Si rechazas, el sitio seguirá funcionando con lo estrictamente necesario; no se activarán analíticas ni personalización.
            </p>
          </div>

          <div className="grid gap-3 sm:auto-cols-fr sm:grid-flow-col sm:items-center">
            <Button size="sm" onClick={handleAccept}>
              ACEPTAR
            </Button>
            <Button variant="outline" size="sm" onClick={handleReject}>
              RECHAZAR
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-200 hover:text-white" onClick={() => setShowDetails(true)}>
              LEER MÁS
            </Button>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 px-4 pb-6 pt-20 backdrop-blur-sm sm:items-center sm:px-6">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_50px_120px_-52px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Política de privacidad</p>
                <h2 className="mt-3 text-2xl font-bold text-white">Detalles del consentimiento</h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:bg-white/10"
                onClick={() => setShowDetails(false)}
                aria-label="Cerrar detalles de privacidad"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-300">
              <p>
                Esta web recopila datos básicos como tu dirección IP, datos de navegación, rendimiento y cookies para:
              </p>
              <ul className="list-disc space-y-2 pl-5 text-slate-400">
                <li>Mejorar la experiencia del sitio y su rendimiento.</li>
                <li>Guardar preferencias de idioma y navegación.</li>
                <li>Evaluar cómo los usuarios interactúan con el contenido.</li>
              </ul>
              <p>
                Si seleccionas <strong>RECHAZAR</strong>, solo se mantendrán los datos estrictamente necesarios para que el sitio funcione. No se activarán cookies de analítica ni personalización.
              </p>
              <p>
                Puedes cambiar tu elección borrando el almacenamiento local del navegador o contactándonos directamente.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button size="sm" onClick={handleAccept}>
                Aceptar y continuar
              </Button>
              <Button variant="outline" size="sm" onClick={handleReject}>
                Rechazar y cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
