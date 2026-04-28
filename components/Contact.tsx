"use client";

import * as React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container, SectionLabel } from "./Container";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/data/site-config";

const PROJECT_TYPES = [
  "FinTech app",
  "EdTech app",
  "HealthTech",
  "D2C Commerce",
  "B2B SaaS",
  "AI / ML feature",
  "Other"
];

const BUDGETS = [
  "₹1 – 5 L",
  "₹5 – 25 L",
  "₹25 L – ₹1 Cr",
  "₹1 – 2 Cr",
  "Not sure yet"
];

export function Contact() {
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // [PLACEHOLDER] Wire to a real form handler / CRM (e.g. Resend, HubSpot, custom API)
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 py-28 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-grid opacity-30"
      />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel>Start a project</SectionLabel>
              <h2 className="mt-4 text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-6xl">
                Have an idea worth building? Let's talk.
              </h2>
              <p className="mt-6 max-w-md text-pretty text-ink-300 md:text-lg">
                We take on a small number of new projects each quarter. Tell us
                what you're building and we'll come back within two working days
                with a candid response.
              </p>

              <ul className="mt-10 flex flex-col gap-4 text-sm">
                <li className="flex items-center gap-3 text-ink-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-ink-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Phone className="h-4 w-4" />
                  </span>
                  <a href={`tel:${CONTACT.phone}`} className="hover:text-white">
                    {CONTACT.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-ink-200">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                      Registered office
                    </span>
                    <span>{CONTACT.address}</span>
                  </span>
                </li>
              </ul>

              {/* Brand panel — studio identity, registered office and country */}
              <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-dot-grid opacity-30"
                />
                <div className="relative grid grid-cols-3 gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                      Studio
                    </p>
                    <p className="mt-2 text-sm text-white">Bengaluru, IN</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                      Reg. office
                    </p>
                    <p className="mt-2 text-sm text-white">Bhandara, MH</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-400">
                      Country
                    </p>
                    <p className="mt-2 text-sm text-white">India 🇮🇳</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form
                onSubmit={onSubmit}
                className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 backdrop-blur md:p-10"
              >
                {submitted ? (
                  <div className="flex flex-col items-start gap-4 py-8">
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Message received
                    </span>
                    <h3 className="font-sans text-2xl font-medium text-white md:text-3xl">
                      Thanks — we'll be in touch shortly.
                    </h3>
                    <p className="max-w-md text-ink-300">
                      In the meantime, feel free to email{" "}
                      <a className="text-white underline" href={`mailto:${CONTACT.email}`}>
                        {CONTACT.email}
                      </a>{" "}
                      with anything time-sensitive.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field id="name" label="Name" required>
                      <input
                        id="name"
                        name="name"
                        required
                        type="text"
                        placeholder="Ada Lovelace"
                        className={inputCls}
                      />
                    </Field>

                    <Field id="email" label="Work email" required>
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        placeholder="ada@company.com"
                        className={inputCls}
                      />
                    </Field>

                    <Field id="company" label="Company">
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Company name"
                        className={inputCls}
                      />
                    </Field>

                    <Field id="type" label="Project type">
                      <select id="type" name="type" className={inputCls} defaultValue="">
                        <option value="" disabled>
                          Select…
                        </option>
                        {PROJECT_TYPES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </Field>

                    <Field id="budget" label="Budget range" className="md:col-span-2">
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b, i) => (
                          <label
                            key={b}
                            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-ink-200 transition has-[:checked]:border-accent has-[:checked]:bg-accent/15 has-[:checked]:text-white hover:bg-white/10"
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={b}
                              defaultChecked={i === 1}
                              className="sr-only"
                            />
                            {b}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field id="message" label="Tell us about it" required className="md:col-span-2">
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="What are you building, and what's the timeline?"
                        className={inputCls}
                      />
                    </Field>

                    <div className="md:col-span-2 flex flex-col-reverse items-stretch justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="text-xs text-ink-400">
                        We respond within 2 working days. NDA on request.
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:bg-ink-50"
                      >
                        Send message
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-ink-400 outline-none transition focus:border-accent focus:bg-ink-900";

function Field({
  id,
  label,
  required,
  className,
  children
}: {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-300">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
