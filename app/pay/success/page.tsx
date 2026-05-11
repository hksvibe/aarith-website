import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { COMPANY_NAME } from "@/data/site-config";
import { SuccessBridge } from "./SuccessBridge";

export const metadata: Metadata = {
  title: `Subscription confirmed — ${COMPANY_NAME}`,
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function PaySuccessPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sp = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v ?? "";
  };
  const subscriptionId = sp("subscription_id");
  const paymentId = sp("payment_id");

  return (
    <main className="relative min-h-dvh bg-ink-950">
      <div className="mx-auto w-full max-w-xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-8 flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-sm font-semibold tracking-tight text-white">
            {COMPANY_NAME}
          </span>
        </div>

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="h-6 w-6 text-emerald-300" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            You&apos;re subscribed.
          </h1>
          <p className="mt-3 text-ink-200">
            Your mandate is set up and your subscription is active. You can
            close this window and return to the app — your premium features
            will be unlocked automatically.
          </p>

          {subscriptionId ? (
            <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-4 font-mono text-xs text-ink-300">
              <div>
                Subscription ID:{" "}
                <span className="text-white">{subscriptionId}</span>
              </div>
              {paymentId ? (
                <div className="mt-1">
                  First payment ID:{" "}
                  <span className="text-white">{paymentId}</span>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-2">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-1.5 text-sm text-ink-300 hover:text-white"
            >
              ← Back to {COMPANY_NAME}
            </Link>
          </div>
        </div>

        <SuccessBridge
          subscriptionId={subscriptionId}
          paymentId={paymentId}
        />
      </div>
    </main>
  );
}
