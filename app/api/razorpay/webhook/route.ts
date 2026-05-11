/**
 * POST /api/razorpay/webhook
 *
 * Razorpay calls this endpoint for every subscription / payment lifecycle
 * event we subscribed to in the Razorpay Dashboard. We:
 *
 *   1. Read the raw request body (Razorpay signs the exact bytes, not a
 *      re-stringified JSON — so we *must* not JSON.parse before verifying).
 *   2. Verify `x-razorpay-signature` against RAZORPAY_WEBHOOK_SECRET.
 *   3. Parse the event and route by `event` name.
 *   4. Acknowledge with 200. Anything non-2xx makes Razorpay retry.
 *
 * v1: we just log structured events. A future commit will persist
 * subscription state to a DB so `/api/razorpay/subscription-status` can
 * answer from our own store instead of round-tripping to Razorpay each time.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface RazorpayWebhook {
  event: string;
  payload: Record<string, unknown>;
  created_at?: number;
}

export async function POST(req: NextRequest) {
  // Razorpay signs the raw body bytes — read text() before any parsing.
  const rawBody = await req.text();
  const signatureHeader = req.headers.get("x-razorpay-signature") ?? "";

  if (!signatureHeader) {
    return NextResponse.json(
      { ok: false, error: "Missing x-razorpay-signature" },
      { status: 400 }
    );
  }

  let verified = false;
  try {
    verified = verifyWebhookSignature({ rawBody, signatureHeader });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[razorpay] webhook verifier threw:", err);
  }

  if (!verified) {
    return NextResponse.json(
      { ok: false, error: "Signature mismatch" },
      { status: 401 }
    );
  }

  let event: RazorpayWebhook;
  try {
    event = JSON.parse(rawBody) as RazorpayWebhook;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line no-console
  console.log("[razorpay] webhook", {
    event: event.event,
    createdAt: event.created_at,
    // Surface the most-useful identifiers without leaking the entire payload
    // to the logs. Pull whatever exists.
    keys: extractKeys(event.payload)
  });

  // TODO: persist to DB. Suggested shape:
  //   subscriptions(id, status, plan_id, customer_id, current_start,
  //                 current_end, next_charge_at, raw_event jsonb)
  //   payments(id, subscription_id, amount, status, method, captured_at)
  switch (event.event) {
    case "subscription.activated":
    case "subscription.charged":
    case "subscription.pending":
    case "subscription.halted":
    case "subscription.paused":
    case "subscription.resumed":
    case "subscription.cancelled":
    case "subscription.completed":
    case "subscription.updated":
    case "payment.captured":
    case "payment.failed":
      // No-op in v1 — handlers will live here once we wire persistence.
      break;
    default:
      // Unknown event types: still 200, so Razorpay doesn't retry forever.
      break;
  }

  return NextResponse.json({ ok: true });
}

function extractKeys(payload: Record<string, unknown>) {
  // Pull the obvious ids out of the nested Razorpay payload shape so they
  // show up in logs without dumping the full event.
  const out: Record<string, string | undefined> = {};
  const sub = (payload?.subscription as { entity?: { id?: string; status?: string } })?.entity;
  const pay = (payload?.payment as { entity?: { id?: string; status?: string } })?.entity;
  if (sub?.id) out.subscriptionId = sub.id;
  if (sub?.status) out.subscriptionStatus = sub.status;
  if (pay?.id) out.paymentId = pay.id;
  if (pay?.status) out.paymentStatus = pay.status;
  return out;
}
