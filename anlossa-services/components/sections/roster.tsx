"use client";

/**
 * Flagship section built directly on @skiper-ui/skiper40 (Skiper 40 — Animated
 * Link). Each roster profile is presented as a Skiper link; hover/selection
 * runs the component's mix-blend champagne sweep. Styling is mapped onto the
 * Anlossa palette and the Cormorant / Plus Jakarta type pairing.
 */

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, Users } from "lucide-react";
import { Link001, Link005 } from "@/components/ui/skiper40";
import { CropMarks, SectionLabel } from "@/components/ui/primitives";
import SplitReveal from "@/components/ui/split-reveal";
import { ROSTER } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Roster() {
  const [activeId, setActiveId] = useState(ROSTER[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  const active = ROSTER.find((r) => r.id === activeId) ?? ROSTER[0];
  const preview = ROSTER.find((r) => r.id === hoverId) ?? null;

  return (
    <section id="roster" className="relative overflow-hidden bg-obsidian text-alabaster"
      aria-labelledby={headingId}>
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-[0.35]" aria-hidden="true" />
      <div className="frame section-y relative">
        <SectionLabel index="02" tone="dark">
          The Anlossa Roster &amp; Campaign Engine
        </SectionLabel>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Left column — editorial intro + Skiper list */}
          <div className="lg:col-span-5">
            <SplitReveal
              as="h2"
              id={headingId}
              className="display-lg text-alabaster"
              lines={[
                <>
                  Six creators.
                </>,
                <>
                  Six unfair
                </>,
                <>
                  <em className="italic text-champagne">advantages.</em>
                </>,
              ]}
            />

            <p className="lede lede-light mt-6 max-w-[28rem]">
              A hand-built roster — one profile per category, each chosen for
              save-rate and repeat-purchase audiences rather than raw follower
              count. Hover a profile; the campaign concept opens beside it.
            </p>

            <div className="mt-10 border-t border-alabaster/12">
              {ROSTER.map((profile, index) => {
                const isActive = activeId === profile.id;
                return (
                  <motion.div
                    key={profile.id}
                    initial={reduce ? undefined : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
                    onMouseEnter={() => setHoverId(profile.id)}
                    onMouseLeave={() => setHoverId(null)}
                    className={cn(
                      "group relative border-b border-alabaster/12 transition-colors duration-500",
                      isActive && "bg-alabaster/[0.04]"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4 px-1 py-5 sm:px-3">
                      <div className="flex min-w-0 items-baseline gap-4">
                        <span
                          className={cn(
                            "mono-label shrink-0 transition-colors duration-500",
                            isActive ? "text-champagne" : "text-alabaster/35"
                          )}
                        >
                          {profile.id}
                        </span>
                        {/* @skiper-ui/skiper40 — Link005: full-height champagne sweep */}
                        <Link005
                          href={`#profile-${profile.id}`}
                          onClick={(event) => {
                            event.preventDefault();
                            setActiveId(profile.id);
                          }}
                          aria-current={isActive ? "true" : undefined}
                          className={cn(
                            "!px-2.5 text-left font-serif text-[1.35rem] leading-tight tracking-[-0.02em] sm:text-[1.6rem]",
                            isActive ? "text-alabaster" : "text-alabaster/70"
                          )}
                        >
                          {profile.archetype}
                        </Link005>
                      </div>
                      <div className="flex shrink-0 items-center gap-4 text-right">
                        <span className="mono-label hidden text-alabaster/40 sm:block">
                          {profile.city}
                        </span>
                        <span className="mono-label tabular-nums text-alabaster/60">
                          {profile.followers}
                        </span>
                        <ArrowRight
                          className={cn(
                            "size-3.5 transition-all duration-500",
                            isActive
                              ? "translate-x-0 text-champagne opacity-100"
                              : "-translate-x-1 text-alabaster/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                          )}
                        />
                      </div>
                    </div>
                    {/* progress hairline for the active profile */}
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-px origin-left bg-champagne transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link001
                href="#contact"
                className="text-champagne decoration-champagne/40 hover:text-champagne-soft"
              >
                Apply to join the roster
              </Link001>
              <span className="mono-label text-alabaster/30">
                Reviewed within 48 hours
              </span>
            </div>
          </div>

          {/* Right column — campaign engine detail panel */}
          <div className="lg:col-span-7" ref={panelRef}>
            <div className="relative h-full">
              <CropMarks tone="dark" className="hidden md:block" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="flex h-full flex-col justify-between gap-8 border border-alabaster/12 bg-gradient-to-br from-alabaster/[0.06] to-transparent p-6 sm:p-9"
                >
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="mono-label text-champagne">
                          Profile {active.id} / {String(ROSTER.length).padStart(2, "0")}
                        </p>
                        <h3 className="display-md mt-3 max-w-[16ch] text-alabaster">
                          {active.name}
                        </h3>
                      </div>
                      <div
                        className="flex size-16 items-center justify-center rounded-full border text-center"
                        style={{ borderColor: `${active.accent}55` }}
                      >
                        <span className="mono-label text-[0.55rem] leading-tight text-alabaster/70">
                          {active.city.split(" ")[0]}
                          <br />
                          <span className="text-champagne">{active.engagement}</span>
                          <br />
                          ER
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                      <Metric label="Followers" value={active.followers} />
                      <Metric label="Avg. reach" value={active.reach} />
                      <Metric label="Save rate" value={active.saveRate} />
                      <Metric label="Type" value={active.archetype.split(" &")[0]} />
                    </div>

                    <div className="mt-7 flex items-start gap-2.5 border-t border-alabaster/10 pt-6">
                      <Users className="mt-0.5 size-3.5 shrink-0 text-champagne" strokeWidth={1.6} />
                      <p className="text-[0.82rem] leading-relaxed text-alabaster/60">
                        {active.demographic}
                      </p>
                    </div>

                    <div className="mt-6">
                      <p className="mono-label text-alabaster/40">Content territory</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {active.contentFocus.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-alabaster/15 px-3 py-1 text-[0.72rem] text-alabaster/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-alabaster/12 pt-6">
                    <div className="flex items-center gap-2.5">
                      <Sparkles className="size-3.5 text-champagne" strokeWidth={1.6} />
                      <p className="mono-label text-alabaster/45">Campaign concept</p>
                      <span className="ml-auto mono-label text-alabaster/35">
                        {active.window}
                      </span>
                    </div>
                    <p className="mt-3 font-serif text-[1.4rem] leading-tight tracking-[-0.02em] text-alabaster sm:text-[1.6rem]">
                      &ldquo;{active.campaign}&rdquo;
                    </p>
                    <p className="mt-3 max-w-[38rem] text-[0.85rem] leading-relaxed text-alabaster/55">
                      {active.campaignDetail}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {active.formats.map((f) => (
                        <span key={f} className="mono-label flex items-center gap-1.5 text-alabaster/50">
                          <span className="size-1 rounded-full bg-champagne/70" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Hover preview tag */}
              <AnimatePresence>
                {preview && preview.id !== active.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute -top-3 right-4 z-20 flex items-center gap-2 rounded-full bg-champagne px-3 py-1.5 text-ink"
                  >
                    <MapPin className="size-3" strokeWidth={2} />
                    <span className="mono-label text-[0.55rem]">{preview.city}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Roster footer strip */}
        <div className="mt-16 grid gap-px overflow-hidden border border-alabaster/12 bg-alabaster/12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Roster size", v: "6 specialist profiles" },
            { k: "Creator band", v: "15K – 150K" },
            { k: "Commission", v: "20% on close only" },
            { k: "Onboarding", v: "₹0 · 30-day trial" },
          ].map((cell) => (
            <div key={cell.k} className="bg-obsidian px-5 py-5">
              <p className="mono-label text-alabaster/35">{cell.k}</p>
              <p className="mt-2 text-[0.95rem] text-alabaster/85">{cell.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-alabaster/12 pl-4">
      <p className="mono-label text-alabaster/35">{label}</p>
      <p className="mt-1.5 font-serif text-[1.5rem] leading-none tracking-[-0.02em] text-alabaster">
        {value}
      </p>
    </div>
  );
}
