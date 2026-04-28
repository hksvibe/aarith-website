"use client";

import * as React from "react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { FACTS } from "@/data/site-config";

export function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-ink-900/40 py-20 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>About the studio</SectionLabel>
            <h2 className="mt-3 max-w-xl text-balance font-sans text-3xl font-semibold tracking-tighter2 text-white md:text-4xl">
              The plain facts.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-400">
            Aarith is the consumer-app practice of Imnemosyne Technologies
            Private Limited, an Indian private limited company headquartered
            in Bengaluru.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/8 md:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05}>
              <li className="flex h-full flex-col gap-2 bg-ink-950 p-6 md:p-8">
                <span className="font-sans text-2xl font-semibold tracking-tightest text-white md:text-4xl">
                  {f.value}
                </span>
                <span className="text-sm text-ink-300">{f.label}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
