"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { COMPANY_NAME, NAV_LINKS } from "@/data/site-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-4 md:px-6",
          "rounded-full border transition-all duration-500",
          scrolled
            ? "mt-2 border-white/10 bg-ink-900/70 px-4 py-2 backdrop-blur-xl"
            : "border-transparent py-3"
        )}
      >
        <Link href="#top" className="group inline-flex items-center gap-2.5">
          <Logo size={38} />
          <span className="text-lg font-semibold tracking-tight text-white md:text-xl">
            {COMPANY_NAME}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-200 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden md:inline-flex" />
          <a
            href="#contact"
            className={cn(
              "group hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-900",
              "shadow-[0_0_0_1px_rgba(255,255,255,0.1)] transition hover:bg-ink-50 md:inline-flex"
            )}
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur-md md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="#top" onClick={() => setOpen(false)} className="inline-flex items-center gap-2.5">
              <Logo size={38} />
              <span className="text-lg font-semibold tracking-tight text-white">{COMPANY_NAME}</span>
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 pt-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-4 text-2xl font-medium tracking-tight text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white py-4 text-base font-medium text-ink-900"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </a>
            <div className="mt-6 flex justify-center">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

