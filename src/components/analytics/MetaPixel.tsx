"use client";

import { useEffect, useState } from "react";

const PIXEL_ID = "1068614168867621";
const CONSENT_COOKIE = "aionsite_gdpr_consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function hasConsent() {
  return document.cookie.split("; ").includes(`${CONSENT_COOKIE}=accepted`);
}

export function sendMetaCapiEvent(eventName: "Contact" | "LeadSubmitted", details: { email?: string; phone?: string } = {}) {
  if (typeof document === "undefined" || !hasConsent()) return "";
  const eventId = crypto.randomUUID();
  void fetch("/api/meta-capi.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: eventName, event_id: eventId, ...details }),
    keepalive: true,
  }).catch(() => undefined);
  return eventId;
}

export function MetaPixel() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(hasConsent());
    update();
    window.addEventListener("aionsite-consent-change", update);
    return () => window.removeEventListener("aionsite-consent-change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (!window.fbq) {
      const fbq = (...args: unknown[]) => {
        const queued = fbq as typeof fbq & { queue?: unknown[][] };
        queued.queue = queued.queue || [];
        queued.queue.push(args);
      };
      (fbq as typeof fbq & { loaded?: boolean; version?: string }).loaded = true;
      (fbq as typeof fbq & { loaded?: boolean; version?: string }).version = "2.0";
      window.fbq = fbq;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);
    }

    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");

    const handleWhatsAppClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href*='wa.me'], a[href*='whatsapp.com']");
      if (!link || !window.fbq) return;
      const eventId = sendMetaCapiEvent("Contact");
      window.fbq("track", "Contact", {}, { eventID: eventId });
    };

    document.addEventListener("click", handleWhatsAppClick, true);
    return () => document.removeEventListener("click", handleWhatsAppClick, true);
  }, [enabled]);

  return null;
}
