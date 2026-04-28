"use client";

import * as React from "react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { TECH } from "@/data/site-config";

// Map technology names to a tasteful brand-adjacent accent color used on hover.
const TECH_ACCENT: Record<string, string> = {
  Swift: "#FA7343",
  Kotlin: "#7F52FF",
  Flutter: "#54C5F8",
  "React Native": "#61DAFB",
  "Next.js": "#FFFFFF",
  "Node.js": "#8CC84B",
  Python: "#FFD43B",
  AWS: "#FF9900",
  GCP: "#4285F4",
  Firebase: "#FFCA28",
  PostgreSQL: "#4169E1",
  Kubernetes: "#326CE5",
  TensorFlow: "#FF6F00"
};

export function TechTools() {
  return (
    <section className="relative border-t border-white/5 py-24 md:py-28">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Tech & tools</SectionLabel>
              <h2 className="mt-4 text-balance font-sans text-3xl font-semibold tracking-tighter2 text-white md:text-4xl">
                Boring stack. Brilliant outcomes.
              </h2>
              <p className="mt-4 max-w-md text-pretty text-ink-300">
                We pick technologies for what they let us ship reliably — not
                for what's loudest on Twitter that month.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/8 sm:grid-cols-3 lg:grid-cols-4">
                {TECH.map((name) => (
                  <li
                    key={name}
                    data-cursor="hover"
                    className="group relative flex items-center justify-center bg-ink-950 p-6 text-center transition-colors hover:bg-ink-900"
                  >
                    <span
                      className="font-mono text-sm tracking-tight text-ink-300 transition-colors duration-300 group-hover:text-white"
                      style={
                        {
                          "--accent": TECH_ACCENT[name] ?? "#3D7BFF"
                        } as React.CSSProperties
                      }
                    >
                      <span className="transition-colors duration-300 group-hover:[color:var(--accent)]">
                        {name}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
