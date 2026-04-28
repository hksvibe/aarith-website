import * as React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { Footer } from "./Footer";
import { COMPANY_NAME, LEGAL } from "@/data/site-config";

export function LegalLayout({
  title,
  intro,
  children
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      <header className="border-b border-white/8 bg-ink-950/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Logo size={32} />
              <span className="text-base font-semibold tracking-tight text-white md:text-lg">
                {COMPANY_NAME}
              </span>
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-200 transition hover:bg-white/10 hover:text-white"
            >
              Back to site
            </Link>
          </div>
        </Container>
      </header>

      <section className="pt-16 pb-24 md:pt-24 md:pb-32">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Legal
            </p>
            <h1 className="mt-4 text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-5xl">
              {title}
            </h1>
            {intro ? (
              <p className="mt-6 text-pretty text-lg text-ink-200 md:text-xl">
                {intro}
              </p>
            ) : null}
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-400">
              Last updated: {LEGAL.policiesLastUpdated}
            </p>
          </div>

          <article className="legal-prose mt-12 max-w-3xl text-ink-200">
            {children}
          </article>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
