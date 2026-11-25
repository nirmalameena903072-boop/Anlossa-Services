"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "@/components/providers/smooth-scroll";
import Counter from "@/components/ui/counter";
import { Monogram } from "@/components/ui/brand-mark";
import {
  useInViewport,
  usePointerParallax,
  useScrollProgress,
} from "@/hooks/use-client-quality";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => null,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_ONE = ["Turning", "high-trust", "Indian"];
const HEADLINE_TWO = ["creators", "into"];

export default function Hero() {
  const reduce = useReducedMotion();

  // The WebGL scene is unmounted entirely once the hero leaves the viewport,
  // so scrolling the rest of the page costs the GPU nothing. The wrapper stays
  // mounted (fixed height, no children) so there is never a layout shift.
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const canvasVisible = useInViewport(canvasWrapRef, "200px");

  // Ref-based, rAF-coalesced scroll and pointer tracking: the 3D rig reads
  // these inside its own frame loop and nothing here triggers a re-render.
  const scrollRef = useScrollProgress();
  const pointerRef = usePointerParallax();

  // The h1 is the LCP element. Animating it from opacity 0 would delay the
  // largest paint behind the main thread, so the headline is always painted and
  // only its transform animates; supporting copy fades in separately.
  const rise = (delay: number) => ({
    initial: reduce ? {} : { y: "110%" },
    animate: { y: "0%" },
    transition: { duration: 1.15, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-alabaster pt-[84px]">
      {/* WebGL layer — reserves its own box, never causes layout shift */}
      <div
        ref={canvasWrapRef}
        className="pointer-events-none absolute inset-0 z-0 md:pointer-events-auto"
      >
        <div className="relative h-full w-full translate-y-[18%] opacity-70 md:translate-y-0 md:opacity-100">
          {canvasVisible && (
            <HeroScene scrollRef={scrollRef} pointerRef={pointerRef} />
          )}
        </div>
      </div>

      {/* Editorial scrim for text legibility over the 3D object */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,#F8F7F4_0%,rgba(248,247,244,0.94)_34%,rgba(248,247,244,0.55)_54%,rgba(248,247,244,0)_74%)] md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-alabaster to-transparent"
      />

      <div className="frame relative z-10 flex min-h-[calc(100svh-84px)] flex-col justify-between pb-8 pt-10 md:pt-14">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          className="flex flex-wrap items-start justify-between gap-6"
        >
          <div className="flex max-w-[16rem] flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <Monogram className="h-[22px] w-auto" />
              <span className="mono-label text-[0.55rem] text-ink/40">/ Est. India</span>
            </div>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-champagne-deep" />
              Creator Partnerships
            </span>
            <p className="text-[0.78rem] leading-relaxed text-ink/55">
              A boutique talent office for India&rsquo;s skincare, beauty &amp;
              haircare voices.
            </p>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <div className="text-right">
              <p className="mono-label text-ink/40">Engagements closed</p>
              <p className="mt-1 font-serif text-2xl tracking-[-0.02em]">
                <><Counter to={128} />+</>
              </p>
            </div>
            <span className="h-10 w-px bg-ink/10" />
            <div className="text-right">
              <p className="mono-label text-ink/40">Creator network</p>
              <p className="mt-1 font-serif text-2xl tracking-[-0.02em]">
                <><Counter to={60} />+</>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Headline block */}
        <div className="mt-auto max-w-[62rem] pt-16 md:pt-24">
          <h1 className="display-xl text-ink">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...rise(0.25)} className="block">
                {HEADLINE_ONE.map((w) => (
                  <span key={w} className="mr-[0.22em] inline-block">
                    {w}
                  </span>
                ))}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...rise(0.36)} className="block">
                {HEADLINE_TWO.map((w) => (
                  <span key={w} className="mr-[0.22em] inline-block">
                    {w}
                  </span>
                ))}
                <span className="inline-block text-champagne-deep">
                  <em className="font-serif italic">D2C</em>
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span {...rise(0.47)} className="block">
                <span className="inline-block">Brand</span>{" "}
                <span className="inline-block">
                  Powerhouses
                  <span className="text-champagne-deep">.</span>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.62, ease: EASE }}
            className="lede mt-7 max-w-[34rem] text-ink/70"
          >
            Boutique sponsorship &amp; talent partnerships for India&rsquo;s
            rising skincare and beauty voices.{" "}
            <span className="text-ink">Zero upfront cost.</span> 100%
            performance-aligned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.72, ease: EASE }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="btn btn-ink group w-full sm:w-auto"
            >
              <span>
                For Creators
                <span className="hidden sm:inline"> — Apply for Roster</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="btn btn-outline group w-full sm:w-auto"
            >
              <span>
                For D2C Brands
                <span className="hidden sm:inline"> — Book Talent</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
            </button>
          </motion.div>
        </div>

        {/* Bottom rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="mt-12 flex items-end justify-between gap-6 border-t border-ink/10 pt-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full border border-ink/15">
              <ArrowDown className="size-3.5 animate-bounce text-ink/60 [animation-duration:2.2s]" />
            </span>
            <span className="mono-label text-ink/45">Scroll to explore the roster</span>
          </div>
          <div className="hidden items-center gap-6 text-[0.72rem] text-ink/50 md:flex">
            <span>Mumbai</span>
            <span className="size-0.5 rounded-full bg-ink/25" />
            <span>Bengaluru</span>
            <span className="size-0.5 rounded-full bg-ink/25" />
            <span>Delhi NCR</span>
            <span className="size-0.5 rounded-full bg-ink/25" />
            <span>Pan-India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
