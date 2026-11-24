"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitRevealProps = {
  /** Each string is rendered as one masked line. */
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  /** Words to render in the editorial italic serif accent. */
  accentIndices?: number[][];
  id?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Masked, line-by-line text reveal. Each line rises from behind a clipping
 * mask with a slight rotation so the reveal reads as letterpress, not slide-in.
 */
export default function SplitReveal({
  lines,
  as = "div",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  duration = 1.05,
  once = true,
  amount = 0.6,
  id,
}: SplitRevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  const line: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { y: "108%", rotate: 1.6, opacity: 0 },
    show: {
      y: "0%",
      rotate: 0,
      opacity: 1,
      transition: { duration: reduce ? 0.3 : duration, ease: EASE },
    },
  };

  return (
    <Tag
      id={id}
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {lines.map((content, index) => (
        <span
          key={index}
          className={cn("block overflow-hidden pb-[0.06em]", lineClassName)}
        >
          <motion.span variants={line} className="block origin-bottom-left">
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Word-by-word rise, used for the hero headline where a line mask would clip
 * tight leading.
 */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "105%" },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: reduce ? 0.3 : 1.1, ease: EASE },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Small utility to wrap accent words without repeating JSX. */
export function Accent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <em className={cn("font-serif italic tracking-[-0.01em]", className)}>{children}</em>
  );
}
