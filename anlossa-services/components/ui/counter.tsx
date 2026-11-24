"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

type CounterProps = {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
  /** Render prop receives the formatted current display string. */
  children?: (display: string) => React.ReactNode;
};

/**
 * Count-up driven by a MotionValue, so frames update the DOM directly instead
 * of re-rendering React on every tick.
 */
export default function Counter({
  to,
  decimals = 0,
  duration = 1.5,
  className,
  children,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const value = useMotionValue(0);

  useEffect(() => {
    const format = (v: number) => v.toFixed(decimals);
    if (reduce) {
      if (ref.current) ref.current.textContent = format(to);
      return;
    }
    if (!inView) return;

    const controls = animate(value, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration, reduce, value]);

  if (children) {
    // Custom renderers read the element text; the span stays the live value.
    return (
      <span ref={ref} className={className}>
        {(0).toFixed(decimals)}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
    </span>
  );
}
