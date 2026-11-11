"use client";

import { useLayoutEffect } from "react";

/**
 * Marks [data-reveal] elements inside .h3 with `is-in` the first time they
 * enter the viewport. Content stays visible without JS: the hidden starting
 * states only apply once `.h3-js` is set on the root.
 */
export function Reveal() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".h3");
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) return;
    root.classList.add("h3-js");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
