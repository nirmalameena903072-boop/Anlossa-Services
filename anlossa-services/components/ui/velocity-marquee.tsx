"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

type VelocityMarqueeProps = {
  children: React.ReactNode;
  /** Base px/second. Negative moves left. */
  baseVelocity?: number;
  className?: string;
  repeat?: number;
  /**
   * When true the marquee reacts to scroll velocity.
   * Set false for a steady editorial ticker.
   */
  velocityReactive?: boolean;
};

/**
 * Velocity-reactive marquee. Scroll speed feeds directly into the track's
 * horizontal velocity, then eases back to its base speed via a spring.
 */
export default function VelocityMarquee({
  children,
  baseVelocity = -60,
  className,
  repeat = 4,
  velocityReactive = true,
}: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });
  const factor = useTransform(smoothVelocity, [-2500, 0, 2500], [4.5, 0, 4.5], {
    clamp: false,
  });

  const direction = useRef(1);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    direction.current = latest > previous ? 1 : -1;
  });

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);

  // Cache the scroll-velocity factor at ~10Hz instead of per frame: `factor`
  // is backed by a spring that only changes on scroll, and reading it every
  // frame from inside the ticker keeps a second subscription hot.
  const factorCache = useRef(0);
  const sinceFactorRead = useRef(0);

  useAnimationFrame((_t, delta) => {
    if (reduce) return;
    const dt = Math.min(delta, 50) / 1000;

    sinceFactorRead.current += dt;
    if (sinceFactorRead.current > 0.1) {
      sinceFactorRead.current = 0;
      factorCache.current = factor.get();
    }

    let moveBy = baseVelocity * dt;
    if (velocityReactive) {
      moveBy += direction.current * factorCache.current * dt;
    }
    // Wrap the accumulator itself so the number never grows unbounded over a
    // long session (float precision loss shows up as visible stutter).
    const range = 100 / repeat;
    baseX.set(wrap(-range, 0, baseX.get() + moveBy));
  });

  return (
    <div className={cn("relative w-full overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex w-max flex-nowrap items-center will-change-transform" style={{ x }}>
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
