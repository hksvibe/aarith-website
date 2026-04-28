import * as React from "react";
import { Container } from "./Container";
import { Logo } from "./Logo";
import {
  COMPANY_NAME,
  LEGAL_NAME,
  TAGLINE,
  FOOTER_COLUMNS,
  SOCIAL_LINKS,
  CONTACT,
  LEGAL
} from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/8 bg-ink-950 pb-10 pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-medium tracking-tight text-white">
                {COMPANY_NAME}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-pretty text-sm text-ink-300">
              {TAGLINE}
            </p>

            <dl className="mt-6 space-y-2 text-xs text-ink-400">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono uppercase tracking-[0.18em]">
                  Registered office
                </dt>
                <dd className="text-ink-200">{CONTACT.address}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono uppercase tracking-[0.18em]">CIN</dt>
                <dd className="text-ink-200">{LEGAL.cin}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-mono uppercase tracking-[0.18em]">Email</dt>
                <dd className="text-ink-200">
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
            </dl>

            {SOCIAL_LINKS.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-3">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-200 transition hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized wordmark — brand gradient at low opacity */}
        <div className="mt-20 select-none overflow-hidden">
          <p
            aria-hidden
            className="bg-brand-gradient bg-clip-text text-center font-sans text-[20vw] font-semibold leading-none tracking-tightest text-transparent opacity-30"
          >
            {COMPANY_NAME}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>
            © {year} {LEGAL_NAME}. All rights reserved.
          </p>
          <p>Made with care in Bengaluru, India.</p>
        </div>
      </Container>
    </footer>
  );
}
