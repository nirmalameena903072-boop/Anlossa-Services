"use client";

import { motion, useReducedMotion } from "framer-motion";
import Counter from "@/components/ui/counter";
import { SectionLabel } from "@/components/ui/primitives";
import SplitReveal from "@/components/ui/split-reveal";

const STATS = [
  {
    value: 92,
    suffix: "%",
    label: "Deal close rate",
    note: "of briefs we take to shortlist",
  },
  {
    value: 4.7,
    suffix: "x",
    label: "Median reach per rupee",
    note: "vs. celebrity-led placements",
    decimals: 1,
  },
  {
    value: 48,
    suffix: "h",
    label: "Time to first shortlist",
    note: "from brief received",
  },
  {
    value: 0,
    suffix: "",
    prefix: "₹",
    label: "Upfront onboarding fee",
    note: "commission only on close",
  },
];

const NOTES = [
  {
    quote:
      "I stopped juggling six WhatsApp groups. Anlossa negotiated a rate I would never have asked for myself — and it landed in the first week.",
    who: "Barrier-repair creator, Mumbai",
    meta: "84K followers · skincare",
  },
  {
    quote:
      "We needed 14 creators across three cities for a sunscreen launch. We got one term sheet, one invoice and zero follow-up chaos.",
    who: "Founder, Indian sunscreen D2C",
    meta: "Series A · Mumbai",
  },
  {
    quote:
      "The brief they wrote back was sharper than ours. That's the part nobody tells you about a good talent partner.",
    who: "Brand marketing lead, haircare",
    meta: "₹40 Cr ARR · Bengaluru",
  },
];

export default function Proof() {
  const reduce = useReducedMotion();

  return (
    <section
      id="partners"
      className="section-y relative overflow-hidden border-y border-ink/10 bg-alabaster"
    >
      <div className="frame relative">
        <SectionLabel index="04">Proof, not promises</SectionLabel>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <SplitReveal
            as="h2"
            className="display-lg lg:col-span-7"
            lines={[<>The numbers that</>, <>close the brief.</>]}
          />
          <p className="lede lg:col-span-4 lg:col-start-9">
            Anlossa is young by name and old by method. Every engagement is
            measured on reach efficiency and repeat bookings — not impressions
            screenshots.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.75, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-alabaster p-6 transition-colors duration-500 hover:bg-alabaster-2 sm:p-7"
            >
              <p className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] leading-none tracking-[-0.03em] text-ink">
                {stat.prefix}
                <Counter to={stat.value} decimals={stat.decimals ?? 0} />
                <span className="text-champagne-deep">{stat.suffix}</span>
              </p>
              <p className="mt-4 text-[0.82rem] font-semibold text-ink/80">{stat.label}</p>
              <p className="mt-1 text-[0.72rem] leading-relaxed text-ink/45">{stat.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonies */}
        <div className="mt-16 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 md:grid-cols-3">
          {NOTES.map((note, i) => (
            <motion.figure
              key={note.who}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-between gap-8 bg-alabaster p-7"
            >
              <blockquote className="font-serif text-[clamp(1.25rem,1.9vw,1.55rem)] leading-[1.28] tracking-[-0.015em] text-ink/85">
                &ldquo;{note.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="block h-px w-8 bg-champagne-deep/60" />
                <p className="mt-4 text-[0.8rem] font-semibold text-ink/80">{note.who}</p>
                <p className="mt-1 mono-label text-ink/35">{note.meta}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="mt-6 max-w-[46rem] text-[0.7rem] leading-relaxed text-ink/35">
          Figures reflect aggregated Anlossa engagements and are shared for
          direction, not as a guarantee of individual campaign performance.
          Client names withheld under active NDAs.
        </p>
      </div>
    </section>
  );
}
