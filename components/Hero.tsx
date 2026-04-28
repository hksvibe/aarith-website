"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { HERO } from "@/data/site-config";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Hero() {
  const reduced = useReducedMotion();

  // Stagger headline word-by-word.
  // Words AFTER the first \n get the brand gradient — by convention, that's
  // the punch line of the headline (e.g. "money, minds, and markets.").
  const tokens = HERO.headline.split(/(\s+|\n)/).filter(Boolean);
  let pastBreak = false;

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32"
    >
      {/* Animated gradient mesh + giant logo watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dot-grid opacity-50" />
        <motion.div
          className="hero-glow absolute -top-32 left-1/2 h-[680px] w-[1200px] -translate-x-1/2"
          animate={
            reduced
              ? undefined
              : {
                  rotate: [0, 6, -4, 0],
                  scale: [1, 1.03, 0.99, 1]
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Giant cross watermark — hard-anchored bottom-right of hero */}
        <motion.div
          className="absolute -right-24 -bottom-24 opacity-[0.18] blur-[1px] md:opacity-25"
          initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
          animate={{ opacity: 0.22, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        >
          <Logo size={520} ariaLabel="" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-200">
            {HERO.badge}
          </span>
        </motion.div>

        <h1 className="max-w-[18ch] text-balance font-sans text-5xl font-semibold leading-[1.02] tracking-tightest text-white sm:text-6xl md:text-7xl lg:text-[88px]">
          {tokens.map((w, i) => {
            if (w === "\n") {
              pastBreak = true;
              return <br key={`br-${i}`} />;
            }
            const gradient = pastBreak;
            return (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15 + i * 0.05
                }}
                className={
                  gradient
                    ? "inline-block whitespace-pre text-brand-gradient"
                    : "inline-block whitespace-pre"
                }
              >
                {w}
              </motion.span>
            );
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-ink-200 md:text-xl"
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href={HERO.primaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:bg-ink-50"
          >
            {HERO.primaryCta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={HERO.secondaryCta.href}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
          >
            {HERO.secondaryCta.label}
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </motion.div>

        {/* Decorative meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid max-w-3xl grid-cols-2 gap-y-6 border-t border-white/5 pt-8 text-sm text-ink-300 sm:grid-cols-4"
        >
          <Meta label="Studio in" value="Bengaluru, India" />
          <Meta label="Entity" value="Pvt. Ltd." />
          <Meta label="Focus" value="EdTech · FinTech" />
          <Meta label="Live on" value="Google Play" />
        </motion.div>
      </Container>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
        {label}
      </span>
      <span className="text-white">{value}</span>
    </div>
  );
}
