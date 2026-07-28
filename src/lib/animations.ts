"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const GSAP_EASE = "power3.out";
export const GSAP_SOFT_EASE = "power2.out";
export const GSAP_REVEAL_Y = 28;

let scrollTriggerReady = false;

export function getScrollTrigger() {
  if (typeof window === "undefined") return null;
  if (!scrollTriggerReady) {
    gsap.registerPlugin(ScrollTrigger);
    scrollTriggerReady = true;
  }
  return ScrollTrigger;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = () => setReduced(query.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

export function useGsapReveal<T extends HTMLElement>({
  delay = 0,
  y = GSAP_REVEAL_Y,
  start = "top 88%",
  duration = 0.7,
  once = true,
} = {}) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ScrollTriggerPlugin = getScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease: GSAP_EASE,
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: el,
                start,
                once,
              }
            : undefined,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, once, reduced, start, y]);

  return ref;
}

export function useGsapStagger<T extends HTMLElement>({
  selector = "[data-gsap-reveal]",
  delay = 0,
  stagger = 0.09,
  y = GSAP_REVEAL_Y,
  start = "top 86%",
  duration = 0.7,
  once = true,
} = {}) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = gsap.utils.toArray<HTMLElement>(selector, el);

    if (reduced) {
      gsap.set(items.length ? items : el, { autoAlpha: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ScrollTriggerPlugin = getScrollTrigger();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items.length ? items : el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: GSAP_EASE,
          scrollTrigger: ScrollTriggerPlugin
            ? {
                trigger: el,
                start,
                once,
              }
            : undefined,
        },
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, once, reduced, selector, stagger, start, y]);

  return ref;
}

export { gsap };
