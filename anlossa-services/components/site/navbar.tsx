"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Monogram, LogoLockup } from "@/components/ui/brand-mark";
import { scrollToSection, scrollToTop } from "@/components/providers/smooth-scroll";
import { cn } from "@/lib/utils";

function ISTClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="mono-label tabular-nums text-ink/55">
      IST {time}
    </span>
  );
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScroll = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 80);
    lastScroll.current = latest;
  });

  // Freeze the page behind the sheet — includes Lenis's scroll loop.
  useEffect(() => {
    if (!open) return;
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToSection(href), open ? 260 : 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          condensed
            ? "border-b border-ink/10 bg-alabaster/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div
          className={cn(
            "frame flex items-center justify-between transition-all duration-500",
            condensed ? "h-[64px]" : "h-[84px]"
          )}
        >
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="group flex items-center gap-3"
            aria-label="Anlossa Services — home"
          >
            <Monogram className="h-[26px] w-auto transition-transform duration-500 group-hover:-rotate-3" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[1.35rem] tracking-[-0.02em]">
                Anlossa
              </span>
              <span className="mono-label mt-0.5 text-[0.5rem] text-ink/45">
                Services
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="group relative inline-flex items-baseline gap-1.5 text-[0.8125rem] font-medium text-ink/70 transition-colors hover:text-ink"
              >
                <span className="mono-label text-[0.5rem] text-champagne-deep opacity-70">
                  {link.index}
                </span>
                <span className="relative">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100" />
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-3 md:flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-champagne-deep opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-champagne-deep" />
              </span>
              <ISTClock />
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              className="btn btn-ink hidden h-11 px-5 text-[0.75rem] md:inline-flex"
            >
              Start a conversation
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="size-4.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-obsidian text-alabaster"
          >
            <div className="frame flex h-[84px] items-center justify-between">
              <LogoLockup tone="light" className="w-32" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-11 items-center justify-center rounded-full border border-alabaster/20 transition-colors hover:border-alabaster/60"
                aria-label="Close menu"
              >
                <X className="size-4.5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="frame mt-10 flex flex-col" aria-label="Mobile">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline justify-between border-b border-alabaster/10 py-5"
                >
                  <span className="display-md text-alabaster">{link.label}</span>
                  <span className="mono-label text-champagne">{link.index}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="frame mt-10 flex flex-col gap-4"
            >
              <a
                href={`mailto:${SITE.email}`}
                className="link-rule text-[0.9375rem] text-alabaster/80"
              >
                {SITE.email}
              </a>
              <p className="mono-label text-alabaster/40">
                {SITE.founder} — {SITE.founderTitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
