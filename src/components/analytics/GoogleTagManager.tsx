"use client";

import { useEffect, useState } from "react";

const CONSENT_COOKIE = "aionsite_gdpr_consent";
const GTM_ID = "GTM-PBTGRC8R";

function hasConsent() {
  return document.cookie.split("; ").includes(`${CONSENT_COOKIE}=accepted`);
}

export function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(hasConsent());
    update();
    window.addEventListener("aionsite-consent-change", update);
    return () => window.removeEventListener("aionsite-consent-change", update);
  }, []);

  useEffect(() => {
    if (!enabled || document.getElementById("gtm-script")) {
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

    const script = document.createElement("script");
    script.id = "gtm-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }, [enabled]);

  return null;
}
