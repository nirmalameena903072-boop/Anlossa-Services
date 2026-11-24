"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import VelocityMarquee from "@/components/ui/velocity-marquee";
import { scrollToSection } from "@/components/providers/smooth-scroll";

export default function Closing() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-obsidian py-20 text-alabaster sm:py-28">
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" aria-hidden="true" />
      <div className="relative">
        <VelocityMarquee baseVelocity={-46} repeat={3} className="opacity-[0.16]" velocityReactive={false}>
          <span className="flex items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="mx-6 font-serif text-[clamp(3rem,8vw,7rem)] leading-none tracking-[-0.035em]">
                Anlossa Services —
              </span>
            ))}
          </span>
        </VelocityMarquee>
      </div>

      <div className="frame relative mt-4 text-center">
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow eyebrow-light mx-auto"
        >
          <span className="size-1.5 rounded-full bg-champagne" />
          Currently onboarding for the next quarter
        </motion.p>

        <motion.h2
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="display-lg mx-auto mt-6 max-w-[20ch] text-alabaster"
        >
          Your next sponsorship should be{" "}
          <em className="italic text-champagne">worth the caption.</em>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button type="button" onClick={() => scrollToSection("#contact")} className="btn btn-champagne group">
            Start the conversation
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
          </button>
          <a href="mailto:anlossaservices@gmail.com" className="btn btn-outline-light">
            Email Pradeep directly
          </a>
        </motion.div>
      </div>
    </section>
  );
}
