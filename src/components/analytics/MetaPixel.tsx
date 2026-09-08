"use client";

import Script from "next/script";
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

    const handleWhatsAppClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href*='wa.me'], a[href*='whatsapp.com']");
      if (!link || !window.fbq) return;
      window.fbq("track", "Contact", {}, { eventID: crypto.randomUUID() });
    };

    document.addEventListener("click", handleWhatsAppClick, true);
    return () => document.removeEventListener("click", handleWhatsAppClick, true);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
      }}
    />
  );
}
