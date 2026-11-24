"use client";

import { useEffect, useRef } from "react";

/**
 * Film-grain texture overlay. Steps through a handful of offsets at a low
 * frame rate — the "printed paper" feel without a continuous repaint.
 */
export default function GrainOverlay() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const el = ref.current;
    if (!el) return;

    const steps = [
      "translate3d(0,0,0)",
      "translate3d(-4%,3%,0)",
      "translate3d(3%,-2%,0)",
      "translate3d(-2%,-4%,0)",
      "translate3d(4%,2%,0)",
    ];
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % steps.length;
      el.style.transform = steps[i];
    }, 220);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-[-50%] z-[90] opacity-[0.048] [background-image:url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22220%22%20height%3D%22220%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.82%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22220%22%20height%3D%22220%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')] [background-size:220px_220px]"
    />
  );
}
