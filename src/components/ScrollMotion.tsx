"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-scroll-motion], .clay-rituals, .clay-manifesto, .clay-cta, .special-marquee, .special-system, .special-cards, .special-contact, .skeu-detail, .skeu-quote, .skeu-front-cta, .spatial-layers, .spatial-mission");
    document.documentElement.classList.add("motion-ready");
    const revealIfVisible = (element: HTMLElement) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) element.classList.add("is-visible");
    };
    elements.forEach(revealIfVisible);
    let frame = 0;
    const revealOnScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => elements.forEach(revealIfVisible));
    };
    window.addEventListener("scroll", revealOnScroll, { passive: true });
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", revealOnScroll);
        document.documentElement.classList.remove("motion-ready");
      };
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.14, rootMargin: "0px 0px -9%" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealOnScroll);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
