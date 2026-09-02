"use client";

import { useEffect } from "react";

export function ScrollMotion() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-scroll-motion], .clay-rituals, .clay-manifesto, .clay-cta, .special-system, .special-cards, .special-contact, .skeu-detail, .skeu-quote, .skeu-front-cta, .spatial-layers, .spatial-mission");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14, rootMargin: "0px 0px -9%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
