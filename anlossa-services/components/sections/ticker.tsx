"use client";

import { SERVICE_CATEGORIES } from "@/lib/site";
import VelocityMarquee from "@/components/ui/velocity-marquee";

export default function Ticker() {
  return (
    <section className="relative border-y border-ink/10 bg-alabaster-2/60 py-6" aria-label="Focus categories">
      <VelocityMarquee cycleSeconds={60} repeat={3} className="mask-fade-x">
        <span className="flex items-center">
          {SERVICE_CATEGORIES.map((label, i) => (
            <span key={label} className="flex items-center">
              <span className="mx-6 font-serif text-[clamp(1.35rem,2.6vw,2.35rem)] tracking-[-0.02em] text-ink/85">
                {label}
              </span>
              <span className="mx-2 inline-flex items-center gap-2" aria-hidden="true">
                <span className="size-1 rounded-full bg-champagne-deep/70" />
                <span className="mono-label text-[0.55rem] text-ink/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
            </span>
          ))}
        </span>
      </VelocityMarquee>
    </section>
  );
}
