"use client";

import { useRef, useState } from "react";
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
  /**
   * Seconds for one full loop of the repeated track. Slower is calmer — the
   * default is tuned so a reader can actually finish a word before it leaves.
   * Ignored when `baseVelocity` is supplied directly.
   */
  cycleSeconds?: number;
  /** Explicit px/second. Negative moves left. Overrides `cycleSeconds`. */
  baseVelocity?: number;
  className?: string;
  repeat?: number;
  /**
   * When true the marquee reacts to scroll velocity. Keep this off for large
   * display type, where a scroll kick turns a graceful band into a blur.
   */
  velocityReactive?: boolean;
  /** Pause the loop while the pointer is over the band. */
  pauseOnHover?: boolean;
};

/**
 * Velocity-reactive marquee. Scroll speed feeds into the track's horizontal
 * velocity, then eases back to base speed via a spring.
 *
 * Pausing short-circuits the frame callback before any measurement or motion
 * value write, so a paused band does no layout reads and triggers no
 * compositor work — only the bare callback dispatch remains.
 */
export default function VelocityMarquee({
  children,
  cycleSeconds,
  baseVelocity,
  className,
  repeat = 4,
  velocityReactive = true,
  pauseOnHover = true,
}: VelocityMarqueeProps) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });
  // Toned down from the original 4.5x: scroll now nudges the band instead of
  // launching it, which is what made the copy unreadable mid-scroll.
  const factor = useTransform(smoothVelocity, [-2500, 0, 2500], [1.1, 0, 1.1], {
    clamp: false,
  });

  const direction = useRef(1);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    direction.current = latest > previous ? 1 : -1;
  });

  // Resolved px/second, written only inside the frame callback. Deriving it
  // from the track's real width keeps the perceived pace identical whether one
  // repetition is narrow (category ticker) or very wide (closing wordmark).
  const speedRef = useRef<number>(typeof baseVelocity === "number" ? baseVelocity : -60);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repeat, 0, v)}%`);

  const factorCache = useRef(0);
  const sinceFactorRead = useRef(0);
  const measureCooldown = useRef(0);

  const paused = hovered || !!reduce;

  useAnimationFrame((_t, delta) => {
    if (paused) return;

    const dt = Math.min(delta, 50) / 1000;

    // Measure the track occasionally so cycleSeconds stays accurate after a
    // resize or font swap, without reading layout every frame.
    measureCooldown.current += dt;
    if (measureCooldown.current > 1) {
      measureCooldown.current = 0;
      const el = trackRef.current;
      if (typeof baseVelocity === "number") {
        speedRef.current = baseVelocity;
      } else if (el && typeof cycleSeconds === "number") {
        const oneRep = el.scrollWidth / repeat;
        if (oneRep > 0) speedRef.current = -(oneRep / cycleSeconds);
      }
    }

    sinceFactorRead.current += dt;
    if (sinceFactorRead.current > 0.1) {
      sinceFactorRead.current = 0;
      factorCache.current = factor.get();
    }

    let moveBy = speedRef.current * dt;
    if (velocityReactive) {
      moveBy += direction.current * factorCache.current * dt;
    }

    const range = 100 / repeat;
    baseX.set(wrap(-range, 0, baseX.get() + moveBy));
  });

  return (
    <div
      className={cn("relative w-full overflow-hidden whitespace-nowrap", className)}
      onPointerEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max flex-nowrap items-center will-change-transform"
        style={{ x }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span key={i} className="flex shrink-0 items-center" aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
