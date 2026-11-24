"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Handshake, PenLine, ScrollText } from "lucide-react";
import { registerGsap } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/primitives";
import SplitReveal from "@/components/ui/split-reveal";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/components/providers/smooth-scroll";

const STEPS = [
  {
    index: "01",
    title: "Strategic Brand Matching",
    kicker: "Match",
    body: "We pair untapped, high-trust creators (15K–150K) with fast-scaling Indian D2C beauty and skincare brands — the ones whose product can genuinely survive a 30-day honesty test.",
    detail: "Brief translated into creator archetype, audience overlap and category fit.",
    icon: Handshake,
  },
  {
    index: "02",
    title: "Rate Architecture & Negotiation",
    kicker: "Structure",
    body: "No more underpaid barter deals. We structure fair commercial rates, usage rights and deliverables — so a repost, a paid boost or a six-month license is priced, not gifted.",
    detail: "Deliverables, exclusivity windows and usage rights written into one clean term sheet.",
    icon: PenLine,
  },
  {
    index: "03",
    title: "End-to-End Execution",
    kicker: "Execute",
    body: "Contracts, briefs, approvals and invoicing — handled completely by Anlossa Services on a transparent 20% commission. The creator creates; the brand is billed; nobody chases anyone on WhatsApp.",
    detail: "One invoice, one point of contact, and a published-campaign wrap report.",
    icon: ScrollText,
  },
];

export default function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const { gsap, ScrollTrigger } = registerGsap();
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) {
      // Mobile: no pin, light progress read-out only.
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 60%",
        onUpdate: (self) => {
          setProgress(self.progress);
          setActive(Math.min(2, Math.floor(self.progress * 3)));
        },
      });
      return () => st.kill();
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-method-step]");

      // One pinned timeline drives the progress rail and every step reveal, so
      // the scroll positions can never disagree.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top+=80",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActive(
              Math.min(panels.length - 1, Math.max(0, Math.floor(self.progress * panels.length)))
            );
          },
        },
      });

      panels.forEach((panel, i) => {
        tl.fromTo(
          panel,
          { opacity: i === 0 ? 1 : 0.2, y: i === 0 ? 0 : 34 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          i
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      id="method"
      ref={sectionRef}
      className="relative bg-alabaster-2"
      aria-label="How Anlossa works"
    >
      <div className="frame pt-[var(--section-y)]">
        <SectionLabel index="03">How Anlossa works</SectionLabel>
        <div className="mt-12 grid gap-8 md:grid-cols-12 md:items-end">
          <SplitReveal
            as="h2"
            className="display-lg md:col-span-7"
            lines={[<>Three steps,</>, <>zero ambiguity.</>]}
          />
          <p className="lede md:col-span-4 md:col-start-9">
            The whole engagement runs inside one screen of scope. No retainers,
            no hidden line items, no &ldquo;let&rsquo;s circle back after the
            festive season.&rdquo;
          </p>
        </div>
      </div>

      <div ref={trackRef} className="relative mt-14 lg:mt-0 lg:min-h-[100svh] lg:pb-16">
        <div className="frame grid h-full gap-10 pt-8 lg:grid-cols-12 lg:content-center lg:pt-16">
          {/* Progress rail */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 hidden lg:block">
              <p className="mono-label text-ink/40">Process</p>
              <div className="relative mt-6 h-[1px] w-full bg-ink/12">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-champagne-deep"
                  style={{ width: `${Math.max(6, progress * 100)}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="mt-6 space-y-4">
                {STEPS.map((s, i) => (
                  <button
                    key={s.index}
                    type="button"
                    onClick={() => {
                      const target = sectionRef.current;
                      if (!target) return;
                      const rect = target.getBoundingClientRect();
                      const top = window.scrollY + rect.top;
                      const per = window.innerHeight * 1.8;
                      window.scrollTo({ top: top + (per / 3) * i + 40, behavior: "smooth" });
                    }}
                    className="flex w-full items-baseline gap-3 text-left"
                  >
                    <span
                      className={cn(
                        "mono-label transition-colors duration-500",
                        i === active ? "text-champagne-deep" : "text-ink/30"
                      )}
                    >
                      {s.index}
                    </span>
                    <span
                      className={cn(
                        "text-[0.82rem] transition-colors duration-500",
                        i === active ? "text-ink" : "text-ink/40"
                      )}
                    >
                      {s.kicker}
                    </span>
                  </button>
                ))}
              </div>
              <p className="mono-label mt-10 text-ink/30">
                {String(active + 1).padStart(2, "0")} / 03
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="lg:col-span-9 lg:pl-8">
            <div className="space-y-5 lg:space-y-0">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                return (
                  <div
                    key={step.index}
                    data-method-step
                    className={cn(
                      "relative border-t border-ink/12 pt-7 transition-colors duration-500 lg:pb-10 lg:pt-8",
                      isActive ? "lg:min-h-[46vh]" : "lg:min-h-0"
                    )}
                  >
                    <div className="grid gap-6 sm:grid-cols-12">
                      <div className="sm:col-span-1">
                        <span className={cn("mono-label", isActive ? "text-champagne-deep" : "text-ink/35")}>
                          {step.index}
                        </span>
                      </div>
                      <div className="sm:col-span-7">
                        <h3
                          className={cn(
                            "display-md max-w-[18ch] transition-colors duration-700",
                            isActive ? "text-ink" : "text-ink/55"
                          )}
                        >
                          {step.title}
                        </h3>
                        <p className="mt-4 max-w-[34rem] text-[0.92rem] leading-relaxed text-ink/60">
                          {step.body}
                        </p>
                      </div>
                      <div className="sm:col-span-4">
                        <div
                          className={cn(
                            "flex items-start gap-3 border-l pl-4 transition-colors duration-500",
                            isActive ? "border-champagne-deep/60" : "border-ink/12"
                          )}
                        >
                          <Icon
                            className={cn(
                              "mt-0.5 size-4 shrink-0 transition-colors duration-500",
                              isActive ? "text-champagne-deep" : "text-ink/35"
                            )}
                            strokeWidth={1.5}
                          />
                          <p className="text-[0.78rem] leading-relaxed text-ink/50">
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-ink/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[0.85rem] text-ink/55">
                Transparent 20% commission. No retainer, no listing fee, no surprises.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn btn-ink group shrink-0"
              >
                Start the process
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
