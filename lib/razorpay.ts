/**
 * lib/razorpay.ts
 * --------------------------------------------------------------------------
 * Thin server-side wrapper around the Razorpay SDK.
 *
 *   - Lazily constructs a singleton Razorpay client from env vars so build
 *     time doesn't fail if keys are missing (e.g. on a fresh Vercel preview).
 *   - Exposes HMAC verifiers for the two signatures Razorpay returns:
 *       1. The Checkout callback signature (payment_id + subscription_id)
 *       2. The Webhook x-razorpay-signature header
 *
 * NEVER import this file from a client component. Anything in here touches
 * RAZORPAY_KEY_SECRET, which must stay on the server.
 * --------------------------------------------------------------------------
 */

import crypto from "node:crypto";
import Razorpay from "razorpay";
import { PRICING_PLANS } from "@/data/site-config";

// ---------- Env helpers ----------------------------------------------------

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(
      `Missing required environment variable: ${name}. Add it to .env.local (dev) or to Vercel → Project → Settings → Environment Variables (prod).`
    );
  }
  return v;
}

export function getRazorpayKeyId(): string {
  return requireEnv("RAZORPAY_KEY_ID");
}

export function getRazorpayKeySecret(): string {
  return requireEnv("RAZORPAY_KEY_SECRET");
}

export function getRazorpayWebhookSecret(): string {
  return requireEnv("RAZORPAY_WEBHOOK_SECRET");
}

// ---------- Singleton client ----------------------------------------------

let _client: Razorpay | null = null;

export function getRazorpayClient(): Razorpay {
  if (_client) return _client;
  _client = new Razorpay({
    key_id: getRazorpayKeyId(),
    key_secret: getRazorpayKeySecret()
  });
  return _client;
}

// ---------- Plan resolution -----------------------------------------------

/**
 * Resolve a public plan slug ("pro_monthly") to the Razorpay plan_id by
 * looking up the env var named on the PRICING_PLANS entry. Returns null if
 * the slug is unknown or the env var is unset.
 */
export function resolvePlanIdBySlug(slug: string): string | null {
  const plan = PRICING_PLANS.find((p) => p.slug === slug);
  if (!plan) return null;
  const id = process.env[plan.razorpayPlanIdEnv];
  if (!id || id.length === 0) return null;
  return id;
}

// ---------- Live plan lookup ----------------------------------------------

export type LivePlan = {
  amountInr: number;
  currency: string;
  // Razorpay returns these on the plan object — useful for display sanity.
  period: "daily" | "weekly" | "monthly" | "yearly" | string;
  interval: number;
  itemName?: string;
};

/**
 * Fetch the *live* price of a plan from Razorpay so the website is always in
 * sync with whatever you set in the Razorpay Dashboard. Returns null on any
 * failure (missing env var, network error, unknown plan) so callers can fall
 * back to the static value in PRICING_PLANS.
 *
 * Note: Razorpay's plan amount is stored in paise. We round down to rupees
 * for display.
 */
export async function fetchLivePlan(slug: string): Promise<LivePlan | null> {
  const planId = resolvePlanIdBySlug(slug);
  if (!planId) return null;
  try {
    const rzp = getRazorpayClient();
    // Razorpay's TS types are partial; cast to a shape we actually need.
    const plan = (await rzp.plans.fetch(planId)) as unknown as {
      period?: string;
      interval?: number;
      item?: {
        amount?: number;
        currency?: string;
        name?: string;
      };
    };
    const paise = plan?.item?.amount;
    if (typeof paise !== "number") return null;
    return {
      amountInr: Math.round(paise / 100),
      currency: plan?.item?.currency ?? "INR",
      period: plan?.period ?? "monthly",
      interval: plan?.interval ?? 1,
      itemName: plan?.item?.name
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[razorpay] fetchLivePlan(${slug}) failed:`, err);
    return null;
  }
}

// ---------- Signature verification ----------------------------------------

/**
 * Verify the signature returned by Razorpay Checkout on a successful
 * subscription payment. Razorpay signs
 *   `${razorpay_payment_id}|${razorpay_subscription_id}`
 * with the key secret using HMAC-SHA256.
 */
export function verifySubscriptionPaymentSignature(args: {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}): boolean {
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    args;
  const expected = crypto
    .createHmac("sha256", getRazorpayKeySecret())
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest("hex");
  return timingSafeEqualHex(expected, razorpay_signature);
}

/**
 * Verify the `x-razorpay-signature` header sent on every webhook delivery.
 * Razorpay signs the raw request body with the webhook secret using
 * HMAC-SHA256.
 */
export function verifyWebhookSignature(args: {
  rawBody: string;
  signatureHeader: string;
}): boolean {
  const { rawBody, signatureHeader } = args;
  const expected = crypto
    .createHmac("sha256", getRazorpayWebhookSecret())
    .update(rawBody)
    .digest("hex");
  return timingSafeEqualHex(expected, signatureHeader);
}

function timingSafeEqualHex(a: string, b: string): boolean {
  // crypto.timingSafeEqual requires equal-length buffers; bail early if not.
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}
