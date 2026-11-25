"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export type RenderQuality = "high" | "low";

const QUERY = "(max-width: 899px), (pointer: coarse)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): RenderQuality {
  if (typeof window === "undefined") return "low";
  const coarse = window.matchMedia(QUERY).matches;
  const weakCores = (navigator.hardwareConcurrency ?? 4) <= 4;
  return coarse || weakCores ? "low" : "high";
}

function getServerSnapshot(): RenderQuality {
  return "low";
}

/**
 * Detects viewport/device capability without a state-in-effect cascade, and
 * stays subscribed so a resize or device rotation re-evaluates quality.
 */
export function useRenderQuality(): RenderQuality {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function subscribeYear(callback: () => void) {
  // Re-evaluate when the tab regains focus (covers midnight rollovers).
  window.addEventListener("focus", callback);
  return () => window.removeEventListener("focus", callback);
}

const currentYear = () => new Date().getFullYear();

/** Current year, resolved on the client only (keeps prerender deterministic). */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(subscribeYear, currentYear, () => null);
}

/**
 * True only after hydration — lets effects that touch the DOM run once the
 * client tree is live, without setState in an effect body.
 */
export function useIsMounted() {
  return useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false
  );
}

/**
 * Scroll progress across one viewport, coalesced to at most one write per
 * animation frame and delivered through a ref — so a scroll that fires 100+
 * times a second never re-renders React or stalls the 3D rig.
 */
export function useScrollProgress(): React.RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;
    let pending = 0;

    const commit = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      progress.current = Math.min(1, Math.max(0, pending / vh));
    };

    const onScroll = () => {
      pending = window.scrollY;
      if (!frame) frame = requestAnimationFrame(commit);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

/**
 * Coalesced pointer position in normalised device coordinates (-1 → 1).
 * Passive listener, one frame-batched write, zero re-renders.
 */
export function usePointerParallax(): React.RefObject<{ x: number; y: number }> {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    let px = 0;
    let py = 0;

    const commit = () => {
      frame = 0;
      pointer.current = { x: px, y: py };
    };

    const onMove = (event: PointerEvent) => {
      px = (event.clientX / window.innerWidth) * 2 - 1;
      py = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(commit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return pointer;
}

/**
 * True while the element intersects the viewport. Lets a heavy subtree (the
 * WebGL canvas) unmount entirely once it scrolls out of view, so the GPU does
 * zero 3D work behind the rest of the page.
 */
export function useInViewport(
  ref: React.RefObject<Element | null>,
  rootMargin = "0px"
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
