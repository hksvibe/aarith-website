import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { COMPANY_NAME } from "@/data/site-config";
import { FailureBridge } from "./FailureBridge";

export const metadata: Metadata = {
  title: `Payment didn't go through — ${COMPANY_NAME}`,
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function PayFailurePage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sp = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v ?? "";
  };
  const reason = sp("reason") || "Payment was not completed.";
  const planSlug = sp("plan") || "pro_monthly";

  return (
    <main className="relative min-h-dvh bg-ink-950">
      <div className="mx-auto w-full max-w-xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-8 flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-sm font-semibold tracking-tight text-white">
            {COMPANY_NAME}
          </span>
        </div>

        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 md:p-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 ring-1 ring-red-500/30">
            <AlertTriangle className="h-6 w-6 text-red-300" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Payment didn&apos;t go through.
          </h1>
          <p className="mt-3 text-ink-200">{reason}</p>
          <p className="mt-2 text-sm text-ink-300">
            No money was charged. You can try again, or close this window and
            come back to it from the app later.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/pay?plan=${encodeURIComponent(planSlug)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent/90"
            >
              Try again
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              Back to {COMPANY_NAME}
            </Link>
          </div>
        </div>

        <FailureBridge reason={reason} />
      </div>
    </main>
  );
}
