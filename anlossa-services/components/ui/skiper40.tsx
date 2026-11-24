"use client";

/**
 * Skiper 40 Animated Link — React + Next.js App Router
 * Component: skiper40 from Skiper UI (https://skiper-ui.com)
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Author: @gurvinder-singh02
 * Registry: @skiper-ui/skiper40
 */

import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

export interface SkiperLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}

const isExternalHref = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

/**
 * Internal helper that renders a native anchor for external / protocol links
 * and next/link for app routes.
 */
const BaseLink = ({
  children,
  href,
  className,
  external,
  ...props
}: SkiperLinkProps) => {
  const externalLink = external ?? isExternalHref(href);

  if (externalLink) {
    const protocol = href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <a
        href={href}
        target={protocol ? undefined : "_blank"}
        rel={protocol ? undefined : "noopener noreferrer"}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

const ArrowGlyph = ({ className }: { className?: string }) => (
  <svg
    className={cn(
      "ml-[0.3em] size-[0.55em] transition-all duration-300 [motion-reduce:transition-none]",
      className
    )}
    fill="none"
    viewBox="0 0 10 10"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Link000 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100"
      )}
      {...props}
    >
      {children}
    </BaseLink>
  );
};

export const Link001 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        "group relative inline-flex items-center font-medium",
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        className
      )}
      {...props}
    >
      {children}
      <ArrowGlyph className="mt-[0em] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
    </BaseLink>
  );
};

export const Link002 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        "group relative inline-flex items-center font-medium",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left",
        "hover:before:origin-right hover:before:scale-x-100"
      )}
      {...props}
    >
      {children}
      <ArrowGlyph className="mt-[0em] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
    </BaseLink>
  );
};

export const Link003 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        "group relative inline-flex items-center font-medium",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center",
        "hover:before:scale-x-100"
      )}
      {...props}
    >
      {children}
      <ArrowGlyph className="mt-[0em] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100" />
    </BaseLink>
  );
};

export const Link004 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        "group relative inline-flex items-center font-medium",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center md:before:bottom-0",
        "before:z-1 px-2 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]"
      )}
      {...props}
    >
      {children}
      <ArrowGlyph className="z-0 ml-[0.6em] mt-[0em] translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100" />
    </BaseLink>
  );
};

export const Link005 = ({ children, href, className, ...props }: SkiperLinkProps) => {
  return (
    <BaseLink
      href={href}
      className={cn(
        className,
        "group relative inline-flex items-center font-medium",
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left md:before:top-0",
        "before:z-1 px-2 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100"
      )}
      {...props}
    >
      {children}
      <ArrowGlyph className="z-0 ml-[0.6em] mt-[0em] -translate-x-1 rotate-45 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
    </BaseLink>
  );
};

/**
 * Demo showcase section, mirroring the registry example.
 */
const Skiper40 = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-8 py-4",
        className
      )}
    >
      <Link001 href="/services">Explore our services</Link001>
      <Link002 href="/#contact">Start a project</Link002>
      <Link003 href="mailto:hello@anlossa.com">hello@anlossa.com</Link003>
    </div>
  );
};

export { Skiper40 };
export default Skiper40;
