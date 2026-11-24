"use client";

import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { LogoLockup } from "@/components/ui/brand-mark";
import { scrollToSection, scrollToTop } from "@/components/providers/smooth-scroll";
import { useCurrentYear } from "@/hooks/use-client-quality";

export default function Footer() {
  const year = useCurrentYear();

  return (
    <footer className="relative overflow-hidden border-t border-alabaster/10 bg-obsidian text-alabaster">
      <div className="frame pt-16">
        <div className="grid gap-12 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LogoLockup tone="light" className="w-44" />
            <p className="mt-6 max-w-[26rem] text-[0.86rem] leading-relaxed text-alabaster/50">
              A boutique creator partnerships &amp; sponsorship management agency
              for Indian skincare, beauty and haircare creators, and the D2C
              brands scaling with them.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["₹0 upfront", "20% on close", "30-day trial"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-alabaster/15 px-3 py-1 text-[0.68rem] text-alabaster/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="mono-label text-alabaster/35">Index</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="group inline-flex items-baseline gap-3 text-[0.86rem] text-alabaster/70 transition-colors hover:text-alabaster"
                  >
                    <span className="mono-label text-[0.55rem] text-champagne/70">
                      {link.index}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="mono-label text-alabaster/35">Contact</p>
            <a
              href={`mailto:${SITE.email}`}
              className="link-rule mt-5 inline-flex text-[0.9rem] text-alabaster/80"
            >
              {SITE.email}
              <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
            </a>
            <div className="mt-7">
              <p className="text-[0.9rem] text-alabaster/85">{SITE.founder}</p>
              <p className="mt-1 text-[0.72rem] text-alabaster/40">
                {SITE.founderTitle}
              </p>
            </div>
            <p className="mono-label mt-7 text-alabaster/30">
              Pan-India · Remote-first
            </p>
          </div>
        </div>

        {/* Oversized editorial wordmark */}
        <div className="relative select-none border-t border-alabaster/10 pt-6">
          <h2
            className="whitespace-nowrap font-serif font-light leading-[0.82] tracking-[-0.045em] text-alabaster/[0.94]"
            style={{ fontSize: "clamp(2.2rem, 9.4vw, 11rem)" }}
            aria-label="Anlossa Services"
          >
            ANLOSSA <span className="text-champagne/85">SERVICES</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4 py-7 text-[0.7rem] text-alabaster/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year ? `${year} ` : ""}Anlossa Services. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>Creator Partnerships · Sponsorship Management</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-alabaster/60 transition-colors hover:text-alabaster"
            >
              Back to top
              <ArrowUpRight className="size-3" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
