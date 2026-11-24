"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { SectionLabel } from "@/components/ui/primitives";
import SplitReveal from "@/components/ui/split-reveal";
import { cn } from "@/lib/utils";

type Mode = "creator" | "brand";

const EASE = [0.22, 1, 0.36, 1] as const;

const COPY: Record<
  Mode,
  {
    label: string;
    heading: string;
    blurb: string;
    fields: string[];
    cta: string;
    subject: (name: string, extra: string) => string;
    body: (name: string, extra: string) => string;
    noteA: string;
    noteB: string;
  }
> = {
  creator: {
    label: "I am a Creator",
    heading: "Apply for the roster.",
    blurb:
      "Tell us your niche and following. We read every application ourselves and reply within 48 hours — even when the answer is no.",
    fields: ["Your name / handle", "Instagram or YouTube", "Follower count", "Niche"],
    cta: "Open my application email",
    subject: (name) => `Roster Application — ${name || "Creator"} | Anlossa Services`,
    body: (name, extra) =>
      `Hi Pradeep,\n\nI'd like to apply for the Anlossa Services creator roster.\n\nName / handle: ${name}\nInstagram / YouTube: ${extra}\nFollower count: \nPrimary niche: \nCity: \nRecent brand work (if any): \n\nThanks,\n${name}`,
    noteA: "₹0 to join",
    noteB: "Non-exclusive 30-day trial",
  },
  brand: {
    label: "I am a Brand / Sponsor",
    heading: "Book talent, properly.",
    blurb:
      "Share the product, the budget band and the timeline. We'll come back with two or three matched profiles and a campaign shape — no deck required.",
    fields: ["Brand name", "Website", "Campaign budget band", "Target category"],
    cta: "Open my campaign brief",
    subject: (name) => `Campaign Brief — ${name || "Brand"} | Anlossa Services`,
    body: (name, extra) =>
      `Hi Pradeep,\n\nI'd like to book talent through Anlossa Services.\n\nBrand: ${name}\nWebsite: ${extra}\nCategory (skincare / haircare / beauty / grooming): \nCampaign budget band: \nLaunch window: \nDeliverables needed: \n\nLooking forward to the shortlist,\n${name}`,
    noteA: "20% on close only",
    noteB: "Shortlist in 48 hours",
  },
};

export default function Contact() {
  const [mode, setMode] = useState<Mode>("creator");
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [extra, setExtra] = useState("");
  const reduce = useReducedMotion();

  const copy = COPY[mode];

  const mailto = useMemo(() => {
    const subject = copy.subject(name, extra);
    const body = copy.body(name, extra);
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [copy, name, extra]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      toast.success("Email copied", {
        description: SITE.email,
      });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Couldn’t access the clipboard", {
        description: `Copy manually: ${SITE.email}`,
      });
    }
  };

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-alabaster">
      <div className="frame">
        <SectionLabel index="05">Start the conversation</SectionLabel>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: heading + direct email */}
          <div className="lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-lg max-w-[12ch]"
              lines={[<>Two doors.</>, <>One <em className="italic text-champagne-deep">brief</em> away.</>]}
            />
            <p className="lede mt-6 max-w-[26rem]">
              Choose the side you&rsquo;re on. Both routes land in{" "}
              {SITE.founder}&rsquo;s inbox personally — there is no
              &ldquo;info@&rdquo; funnel here.
            </p>

            <div className="mt-10 border-t border-ink/10 pt-7">
              <p className="mono-label text-ink/40">Direct email</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-rule font-serif text-[clamp(1.2rem,2.4vw,1.75rem)] tracking-[-0.02em] text-ink"
                >
                  <Mail className="size-[0.85em] text-champagne-deep" strokeWidth={1.6} />
                  {SITE.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-ink/15 px-4 py-2.5 text-[0.75rem] font-medium text-ink/75 transition-all duration-300 hover:border-ink/40 hover:text-ink"
              >
                {copied ? (
                  <Check className="size-3.5 text-champagne-deep" strokeWidth={2.2} />
                ) : (
                  <Copy className="size-3.5" strokeWidth={1.6} />
                )}
                {copied ? "Copied to clipboard" : "Copy direct email"}
              </button>
            </div>

            <div className="mt-10 space-y-3">
              {[
                { icon: ShieldCheck, text: "Contracts, briefs and invoicing handled by Anlossa" },
                { icon: Check, text: "You keep full creative control and final approval" },
                { icon: Check, text: "30-day non-exclusive trial, cancel any time" },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 size-3.5 shrink-0 text-champagne-deep" strokeWidth={1.8} />
                    <p className="text-[0.82rem] leading-relaxed text-ink/60">{row.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: composer card */}
          <div className="lg:col-span-7">
            <div className="relative border border-ink/10 bg-alabaster-2/50 p-6 sm:p-9">

              {/* Switcher */}
              <div
                role="group"
                aria-label="Choose your path"
                className="relative grid grid-cols-2 gap-1 rounded-full border border-ink/10 bg-alabaster p-1"
              >
                {(Object.keys(COPY) as Mode[]).map((key) => (
                  <button
                    key={key}
                    aria-pressed={mode === key}
                    type="button"
                    onClick={() => setMode(key)}
                    className={cn(
                      "relative z-10 rounded-full px-4 py-3 text-[0.78rem] font-semibold tracking-[0.01em] transition-colors duration-300 sm:text-[0.83rem]",
                      mode === key ? "text-alabaster" : "text-ink/55 hover:text-ink"
                    )}
                  >
                    {COPY[key].label}
                  </button>
                ))}
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className={cn(
                    "absolute inset-y-1 z-0 w-[calc(50%-4px)] rounded-full bg-ink",
                    mode === "creator" ? "left-1" : "left-[calc(50%+3px)]"
                  )}
                  aria-hidden="true"
                />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, ease: EASE }}
                  className="mt-8"
                >
                  <h3 className="display-md text-[1.75rem] leading-tight sm:text-[2.1rem]">
                    {copy.heading}
                  </h3>
                  <p className="mt-3 max-w-[30rem] text-[0.88rem] leading-relaxed text-ink/60">
                    {copy.blurb}
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="mono-label text-ink/45">{copy.fields[0]}</span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={mode === "creator" ? "e.g. Ananya R. · @skinauthority" : "e.g. Amara D2C"}
                        className="h-11 rounded-md border border-ink/15 bg-alabaster px-3.5 text-[0.85rem] text-ink placeholder:text-ink/30 focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne/40"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="mono-label text-ink/45">{copy.fields[1]}</span>
                      <input
                        type="url"
                        value={extra}
                        onChange={(e) => setExtra(e.target.value)}
                        placeholder={
                          mode === "creator"
                            ? "instagram.com/handle"
                            : "yourbrand.in"
                        }
                        className="h-11 rounded-md border border-ink/15 bg-alabaster px-3.5 text-[0.85rem] text-ink placeholder:text-ink/30 focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne/40"
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {copy.fields.slice(2).map((field) => (
                      <span
                        key={field}
                        className="rounded-full border border-dashed border-ink/15 px-3 py-1.5 text-[0.68rem] text-ink/45"
                      >
                        {field} — in the email
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <a href={mailto} className="btn btn-ink group">
                      {copy.cta}
                      <Send className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.8} />
                    </a>
                    <p className="text-[0.7rem] leading-relaxed text-ink/40">
                      Opens your mail app, pre-filled.
                      <br />
                      Nothing is stored on this site.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-5">
                <span className="mono-label flex items-center gap-2 text-ink/40">
                  <span className="size-1.5 rounded-full bg-champagne-deep" />
                  {copy.noteA}
                </span>
                <span className="mono-label text-ink/40">{copy.noteB}</span>
              </div>
            </div>

            <p className="mt-5 text-center text-[0.7rem] text-ink/35 sm:text-left">
              Prefer to write from scratch? Email{" "}
              <a href={`mailto:${SITE.email}`} className="underline decoration-ink/25 underline-offset-4 hover:text-ink">
                {SITE.email}
              </a>{" "}
              directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
