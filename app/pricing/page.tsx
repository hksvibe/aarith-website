import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import {
  COMPANY_NAME,
  PRICING_PLANS,
  CONTACT,
  LEGAL_NAME
} from "@/data/site-config";

export const metadata: Metadata = {
  title: `Pricing — ${COMPANY_NAME}`,
  description: `Subscription pricing for the EMI Calculator & Loan Tracker app and other ${COMPANY_NAME} consumer products. Operated by ${LEGAL_NAME}.`
};

export default function PricingPage() {
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

      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <Container>
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
              Pricing
            </p>
            <h1 className="mt-4 text-balance font-sans text-4xl font-semibold tracking-tighter2 text-white md:text-5xl">
              Simple, transparent pricing for the EMI Calculator &amp; Loan
              Tracker app.
            </h1>
            <p className="mt-6 text-pretty text-lg text-ink-200 md:text-xl">
              The app is free to use for basic EMI computation. Upgrade to Pro
              to unlock unlimited trackers, detailed schedules and exports. All
              prices are in Indian Rupees (INR) and inclusive of applicable
              taxes where shown.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {PRICING_PLANS.map((p) => (
              <article
                key={p.slug}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-7 md:p-9"
              >
                {p.ribbon ? (
                  <span className="absolute right-5 top-5 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-200">
                    {p.ribbon}
                  </span>
                ) : null}
                <h2 className="font-sans text-2xl font-medium tracking-tight text-white">
                  {p.name}
                </h2>
                <p className="mt-2 text-ink-200">{p.tagline}</p>

                <div className="mt-6 inline-flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold text-white">
                    ₹{p.priceInr.toLocaleString("en-IN")}
                  </span>
                  <span className="text-ink-300">/ {p.interval}</span>
                </div>

                <ul className="mt-6 space-y-2.5 text-sm text-ink-200">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={`/pay?plan=${encodeURIComponent(p.slug)}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent/90"
                  >
                    Subscribe to {p.name}
                  </Link>
                  <p className="mt-3 text-center text-xs text-ink-400">
                    You&apos;ll be taken to a secure Razorpay checkout.
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 max-w-3xl text-sm text-ink-300">
            <p>
              <strong className="text-white">Billing.</strong> Subscriptions
              renew automatically on the same day each billing cycle through
              your saved UPI mandate or card. You will receive a Razorpay email
              receipt for every successful charge.
            </p>
            <p className="mt-3">
              <strong className="text-white">Cancellation.</strong> You can
              cancel anytime from inside the app or by writing to{" "}
              <a href={`mailto:${CONTACT.email}`} className="underline">
                {CONTACT.email}
              </a>
              . Cancellation stops future renewals; you keep access until the
              end of the current paid period.
            </p>
            <p className="mt-3">
              <strong className="text-white">Refunds.</strong> See our{" "}
              <Link href="/refund-policy" className="underline">
                Refund &amp; Cancellation Policy
              </Link>{" "}
              for the full terms.
            </p>
            <p className="mt-3">
              <strong className="text-white">Taxes.</strong> Where Indian GST
              applies, it is included in the price shown above and itemised on
              your Razorpay invoice.
            </p>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
