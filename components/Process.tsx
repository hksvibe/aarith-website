"use client";

import * as React from "react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { PROCESS } from "@/data/site-config";

export function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/5 py-28 md:py-36"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>Our process</SectionLabel>
            <h2 className="mt-4 text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-5xl">
              Five stages. No theatre.
            </h2>
            <p className="mt-5 text-pretty text-ink-300 md:text-lg">
              We've stripped product development to what actually matters: deep
              context, clear systems, and honest weekly demos. Here's how a
              project moves through the studio.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/5 md:grid-cols-5">
          {PROCESS.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.05}>
              <li className="group relative flex h-full flex-col gap-5 bg-ink-950 p-7 transition-colors hover:bg-ink-900">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-1 w-6 rounded-full bg-accent/40 transition-all duration-500 group-hover:w-10 group-hover:bg-accent" />
                </div>
                <h3 className="font-sans text-2xl font-medium tracking-tight text-white">
                  {step.label}
                </h3>
                <p className="text-sm leading-relaxed text-ink-300">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
