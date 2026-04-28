"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { CASE_STUDIES } from "@/data/site-config";
import { cn } from "@/lib/utils";

function CaseImage({
  src,
  fallback,
  alt
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [current, setCurrent] = React.useState(src);
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
    />
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-5xl">
              Built, shipped, and live in users&apos; pockets.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              Talk to us
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.name} delay={i * 0.06} className={cn(cs.span)}>
              <article
                data-cursor="hover"
                className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] hover:border-white/15"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-900">
                  <CaseImage
                    src={cs.image ?? `/api/placeholder/${1200}/${750 + i * 30}`}
                    fallback={`/api/placeholder/${1200}/${750 + i * 30}`}
                    alt={cs.imageAlt ?? cs.name}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent" />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-ink-900/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white backdrop-blur">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {cs.vertical}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-8">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                      {cs.client}
                    </p>
                    <h3 className="mt-3 font-sans text-2xl font-medium tracking-tight text-white md:text-3xl">
                      {cs.name}
                    </h3>
                    <p className="mt-3 text-pretty text-ink-200 md:text-lg">
                      {cs.outcome}
                    </p>
                  </div>
                  {(() => {
                    const isExternal = /^https?:\/\//.test(cs.href);
                    const isPlayStore = /play\.google\.com/.test(cs.href);
                    const label = isPlayStore
                      ? "View on Play Store"
                      : isExternal
                      ? "Visit live site"
                      : "Read case study";
                    return (
                      <a
                        href={cs.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="inline-flex w-fit items-center gap-2 text-sm text-white"
                      >
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-white/40 transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    );
                  })()}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
