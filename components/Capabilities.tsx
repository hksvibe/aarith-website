"use client";

import * as React from "react";
import {
  Banknote,
  GraduationCap,
  Sparkles,
  Smartphone,
  Boxes,
  CloudCog,
  ArrowUpRight
} from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { CAPABILITIES } from "@/data/site-config";

const icons = [Banknote, GraduationCap, Sparkles, Smartphone, Boxes, CloudCog];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-28 md:py-36">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>What we do</SectionLabel>
              <h2 className="mt-4 text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-5xl">
                Capabilities, applied with conviction.
              </h2>
              <p className="mt-5 max-w-md text-pretty text-ink-300">
                We work end-to-end across product, design and engineering — and
                we go especially deep where regulation, scale, or AI make most
                teams blink.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CAPABILITIES.map((c, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <Reveal key={c.title} delay={i * 0.05}>
                    <article
                      data-cursor="hover"
                      className="card-hover group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.04]"
                    >
                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="mt-5 font-sans text-lg font-medium tracking-tight text-white">
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-300">
                        {c.summary}
                      </p>
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {c.points.map((p) => (
                          <li
                            key={p}
                            className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-200"
                          >
                            {p}
                          </li>
                        ))}
                      </ul>
                      <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-ink-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
