"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SplitReveal from "@/components/ui/split-reveal";
import { SectionLabel } from "@/components/ui/primitives";
import { scrollToSection } from "@/components/providers/smooth-scroll";

const PRINCIPLES = [
  {
    index: "01",
    title: "Mid-tier is the sweet spot",
    body: "15K–150K creators carry the highest trust-per-rupee in Indian beauty. We build around that band on purpose — not as a fallback.",
  },
  {
    index: "02",
    title: "Paid on outcome, never on promise",
    body: "₹0 upfront to onboard. We earn a flat 20% only when a sponsorship closes. If the deal doesn't happen, neither does our invoice.",
  },
  {
    index: "03",
    title: "Boutique over billboard",
    body: "A deliberately small roster, matched by hand. Every introduction has a reason, and every creator is briefed by a human, not a spreadsheet.",
  },
];

export default function Positioning() {
  const reduce = useReducedMotion();

  return (
    <section id="positioning" className="section-y relative bg-alabaster">
      <div className="frame">
        <SectionLabel index="01">Why Anlossa exists</SectionLabel>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Left: manifesto */}
          <div className="lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-lg max-w-[15ch] text-ink"
              lines={[
                <>
                  The gap between
                </>,
                <>
                  great creators and
                </>,
                <>
                  <em className="italic text-champagne-deep">great brand</em>
                </>,
                <>deals isn&rsquo;t talent.</>,
                <>It&rsquo;s representation.</>,
              ]}
              stagger={0.075}
            />

            <div className="mt-12 max-w-[36rem] space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="lede"
              >
                India&rsquo;s best skincare and beauty creators are still
                negotiating barter deals for shampoo. Meanwhile, D2C brands
                burn crores on celebrity posts that convert worse than a
                47K-follower dermatology student who actually uses the product.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="lede"
              >
                Anlossa Services sits between them — structuring rates, usage
                rights, deliverables and invoicing, so the creator can stay a
                creator and the brand gets a campaign that holds up to scrutiny.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10"
            >
              <button
                type="button"
                onClick={() => scrollToSection("#method")}
                className="group inline-flex items-center gap-3 border-b border-ink/20 pb-2 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink"
              >
                Read the method
                <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right: principle stack */}
          <div className="lg:col-span-5 lg:pl-10">
            <div className="relative border-t border-ink/10">
              {PRINCIPLES.map((item, i) => (
                <motion.article
                  key={item.index}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-b border-ink/10 py-8"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="mono-label text-champagne-deep">{item.index}</span>
                    <h3 className="display-md text-[1.5rem] leading-[1.15] text-ink transition-colors duration-500 group-hover:text-champagne-deep md:text-[1.65rem]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-10 text-[0.9rem] leading-relaxed text-ink/60">
                    {item.body}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 flex items-center justify-between gap-6 bg-obsidian px-6 py-6 text-alabaster"
            >
              <div>
                <p className="mono-label text-alabaster/45">The commercial model</p>
                <p className="mt-2 font-serif text-2xl leading-tight tracking-[-0.02em]">
                  ₹0 upfront. 20% on closed deals.
                </p>
              </div>
              <span className="hidden h-12 w-px bg-alabaster/15 sm:block" />
              <p className="hidden max-w-[9rem] text-[0.72rem] leading-relaxed text-alabaster/55 sm:block">
                30-day non-exclusive trial. No lock-in, no retainer.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
