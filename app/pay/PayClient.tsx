"use client";

/**
 * The /pay surface that the EMI Calculator Android app opens in a WebView.
 *
 * URL contract:
 *   /pay?plan=pro_monthly
 *        &customerId=<our user id>
 *        &customerName=<for prefill, optional>
 *        &customerEmail=<for prefill, optional>
 *        &customerPhone=<for prefill, optional>
 *
 * Lifecycle:
 *   1. Render plan summary (read-only).
 *   2. POST /api/razorpay/create-subscription → { subscriptionId, keyId }.
 *   3. Load Razorpay Checkout JS (one-shot).
 *   4. Open the modal with subscription_id; the user authorises (UPI mandate,
 *      card, etc.).
 *   5. On success, POST /api/razorpay/verify-payment with the signed tuple.
 *   6. On verified success, notify the native side via the JS bridge and
 *      hard-redirect to /pay/success?subscription_id=... (so back-button /
 *      reload don't replay the modal).
 *
 * JS bridge contract (Android):
 *   The app should `addJavascriptInterface(..., "AarithPayBridge")` and
 *   expose at minimum:
 *     - onSuccess(subscriptionId: String, paymentId: String)
 *     - onFailure(reason: String)
 *     - onDismissed()
 *   We try-catch around every bridge call so the page still works in a
 *   normal browser (e.g. during testing on desktop).
 */

import * as React from "react";
import Link from "next/link";
import { Loader2, ShieldCheck, CreditCard, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";
import { COMPANY_NAME, PRICING_PLANS } from "@/data/site-config";

// Minimal type for Razorpay's global injected by checkout.js
type RazorpayCheckoutOptions = {
  key: string;
  subscription_id: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
};

type RazorpayCtor = new (opts: RazorpayCheckoutOptions) => {
  open(): void;
  on?: (evt: string, cb: (resp: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: RazorpayCtor;
    AarithPayBridge?: {
      onSuccess?: (subscriptionId: string, paymentId: string) => void;
      onFailure?: (reason: string) => void;
      onDismissed?: () => void;
    };
  }
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const s = document.createElement("script");
    s.src = RAZORPAY_SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function bridgeSafeCall(fn: (() => void) | undefined) {
  try {
    fn?.();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[pay] bridge call failed:", err);
  }
}

export function PayClient(props: {
  planSlug: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  autostart?: boolean;
}) {
  const plan = React.useMemo(
    () => PRICING_PLANS.find((p) => p.slug === props.planSlug),
    [props.planSlug]
  );

  const [status, setStatus] = React.useState<
    "idle" | "creating" | "ready" | "opening" | "verifying" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  if (!plan) {
    return (
      <PayShell>
        <h1 className="text-2xl font-semibold text-white">
          Unknown plan
        </h1>
        <p className="mt-3 text-ink-200">
          We don&apos;t recognise the plan code{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
            {props.planSlug}
          </code>
          . Please return to the app and try again.
        </p>
      </PayShell>
    );
  }

  const startCheckout = React.useCallback(async () => {
    setError(null);
    setStatus("creating");

    // 1. Create the subscription server-side.
    let createResp: Response;
    try {
      createResp = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          planSlug: plan.slug,
          customerId: props.customerId,
          customerName: props.customerName,
          customerEmail: props.customerEmail,
          customerPhone: props.customerPhone
        })
      });
    } catch {
      setError("Couldn't reach the server. Check your internet and retry.");
      setStatus("error");
      return;
    }

    if (!createResp.ok) {
      const j = (await createResp.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(j.error ?? "Couldn't start checkout. Please retry.");
      setStatus("error");
      return;
    }

    const { subscriptionId, keyId } = (await createResp.json()) as {
      subscriptionId: string;
      keyId: string;
    };

    // 2. Load Razorpay Checkout.
    setStatus("opening");
    const ok = await loadRazorpayScript();
    if (!ok || !window.Razorpay) {
      setError("Couldn't load the Razorpay checkout. Please retry.");
      setStatus("error");
      return;
    }

    // 3. Open the modal.
    const rzp = new window.Razorpay({
      key: keyId,
      subscription_id: subscriptionId,
      name: COMPANY_NAME,
      description: `${plan.name} — ${COMPANY_NAME}`,
      image: "/aarith-logo.svg",
      prefill: {
        name: props.customerName,
        email: props.customerEmail,
        contact: props.customerPhone
      },
      notes: {
        plan_slug: plan.slug,
        customer_id: props.customerId ?? ""
      },
      theme: { color: "#10b981" },
      modal: {
        ondismiss: () => {
          setStatus("idle");
          bridgeSafeCall(() => window.AarithPayBridge?.onDismissed?.());
        }
      },
      handler: async (response) => {
        setStatus("verifying");
        try {
          const v = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(response)
          });
          const j = (await v.json()) as { verified?: boolean; error?: string };
          if (!v.ok || !j.verified) {
            throw new Error(j.error ?? "Signature mismatch");
          }
          bridgeSafeCall(() =>
            window.AarithPayBridge?.onSuccess?.(
              response.razorpay_subscription_id,
              response.razorpay_payment_id
            )
          );
          // Hard-redirect so reload / back doesn't re-trigger the modal.
          window.location.replace(
            `/pay/success?subscription_id=${encodeURIComponent(
              response.razorpay_subscription_id
            )}&payment_id=${encodeURIComponent(response.razorpay_payment_id)}`
          );
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Verification failed";
          bridgeSafeCall(() => window.AarithPayBridge?.onFailure?.(msg));
          window.location.replace(
            `/pay/failure?reason=${encodeURIComponent(msg)}`
          );
        }
      }
    });

    rzp.open();
  }, [plan, props.customerId, props.customerName, props.customerEmail, props.customerPhone]);

  // Auto-start checkout once when this is opened from the app. We require
  // an explicit ?autostart=1 or a customerId param so a curious visitor on
  // the open web doesn't auto-launch a payment modal.
  React.useEffect(() => {
    if ((props.autostart || props.customerId) && status === "idle") {
      startCheckout();
    }
    // We deliberately depend only on mount-stable identifiers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PayShell>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to {COMPANY_NAME}
      </Link>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          Subscribe
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {plan.name}
        </h1>
        <p className="mt-3 text-ink-200">{plan.tagline}</p>

        <div className="mt-6 inline-flex items-baseline gap-1.5">
          <span className="text-4xl font-semibold text-white">
            ₹{plan.priceInr.toLocaleString("en-IN")}
          </span>
          <span className="text-ink-300">/ {plan.interval}</span>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-ink-200">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={startCheckout}
            disabled={
              status === "creating" ||
              status === "opening" ||
              status === "verifying"
            }
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink-950 transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "creating" || status === "opening" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Opening secure checkout…
              </>
            ) : status === "verifying" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying payment…
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" />
                Pay ₹{plan.priceInr.toLocaleString("en-IN")} · {plan.interval}
              </>
            )}
          </button>

          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <p className="flex items-center gap-2 text-xs text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Payments are processed by Razorpay over a secure connection. Aarith
            never stores your card or UPI details.
          </p>
        </div>
      </div>

      <hr className="mt-10 border-white/8" />
      <p className="mt-6 text-xs text-ink-400">
        By subscribing you agree to our{" "}
        <Link href="/terms" className="underline">
          Terms of Service
        </Link>
        ,{" "}
        <Link href="/privacy" className="underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/refund-policy" className="underline">
          Refund &amp; Cancellation Policy
        </Link>
        . You can cancel anytime from within the app. The mandate is set up by
        Razorpay; recurring charges happen automatically on the renewal date.
      </p>
    </PayShell>
  );
}

function PayShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh bg-ink-950">
      <div className="mx-auto w-full max-w-xl px-5 py-10 md:px-8 md:py-16">
        <div className="mb-8 flex items-center gap-2.5">
          <Logo size={28} />
          <span className="text-sm font-semibold tracking-tight text-white">
            {COMPANY_NAME}
          </span>
        </div>
        <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-6 md:p-10">
          {children}
        </div>
      </div>
    </main>
  );
}
