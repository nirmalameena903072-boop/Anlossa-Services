"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

let registered = false;

/**
 * Registers GSAP ScrollTrigger and drives it from Lenis's RAF loop so inertial
 * scrolling and scroll-linked animation stay in perfect sync.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 1,
      syncTouch: false,
      // Pauses itself whenever a modal/sheet sets overflow hidden on <html>.
      autoToggle: true,
      // Let Lenis own in-page anchors so hashes don't double-handle.
      anchors: { offset: -8, duration: 1.4 },
      stopInertiaOnNavigate: true,
    });

    // Expose for UI that needs to pause scroll (e.g. the full-screen menu).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Programmatic section navigation used by nav, hero and footer.
    const onCustomScroll = (event: Event) => {
      const selector = (event as CustomEvent<string>).detail;
      if (!selector) return;
      const target = document.querySelector(selector);
      if (target) lenis.scrollTo(target as HTMLElement, { offset: -8, duration: 1.4 });
    };
    window.addEventListener("anlossa:scroll-to", onCustomScroll);

    // Keep pin measurements honest when fonts or images settle.
    const refresh = () => ScrollTrigger.refresh();
    const refreshId = window.setTimeout(refresh, 600);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      window.clearTimeout(refreshId);
      window.removeEventListener("anlossa:scroll-to", onCustomScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [pathname]);

  return null;
}

type LenisLike = {
  scrollTo: (target: HTMLElement | number, options?: Record<string, unknown>) => void;
  start: () => void;
  stop: () => void;
};

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/**
 * Lenis-aware navigation for in-page sections, with a native fallback for
 * reduced-motion users (where Lenis is never initialised).
 */
export function scrollToSection(selector: string) {
  const lenis = getLenis();
  if (lenis) {
    window.dispatchEvent(new CustomEvent("anlossa:scroll-to", { detail: selector }));
    return;
  }
  const target = document.querySelector(selector) as HTMLElement | null;
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.4 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}
