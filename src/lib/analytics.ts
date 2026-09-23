const CONSENT_COOKIE = "aionsite_gdpr_consent";

type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsProperties = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function hasAnalyticsConsent() {
  return document.cookie.split("; ").includes(`${CONSENT_COOKIE}=accepted`);
}

export function trackContentInteraction(properties: AnalyticsProperties) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: "content_interaction",
    content_type: "blog_article",
    ...properties,
  });
}
