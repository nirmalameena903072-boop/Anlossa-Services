"use client";

import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Swiss corner-cross registration marks used to frame key sections. */
export function CropMarks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const color = tone === "dark" ? "border-alabaster/25" : "border-ink/15";
  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)} aria-hidden="true">
      <span className={cn("absolute -left-px -top-px size-3 border-l border-t", color)} />
      <span className={cn("absolute -right-px -top-px size-3 border-r border-t", color)} />
      <span className={cn("absolute -bottom-px -left-px size-3 border-b border-l", color)} />
      <span className={cn("absolute -bottom-px -right-px size-3 border-b border-r", color)} />
    </div>
  );
}

/** Section header: index + label + hairline. */
export function SectionLabel({ index, children, tone = "light", className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4",
        tone === "dark" ? "text-alabaster/55" : "text-ink/50",
        className
      )}
    >
      <span className="mono-label text-champagne-deep">{index}</span>
      <span className={cn("h-px flex-1", tone === "dark" ? "bg-alabaster/15" : "bg-ink/12")} />
      <span className="mono-label">{children}</span>
    </div>
  );
}
