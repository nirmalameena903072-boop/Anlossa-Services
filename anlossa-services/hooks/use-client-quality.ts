"use client";

import { useCallback, useSyncExternalStore } from "react";

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
