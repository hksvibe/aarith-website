/**
 * GET /api/razorpay/subscription-status?subscription_id=sub_XXXX
 *
 * Returns the current state of a Razorpay subscription. The Android app
 * polls this (or calls it once on app launch after a successful payment)
 * to decide whether the user has an active entitlement.
 *
 * Response:
 *   {
 *     id: "sub_XXXX",
 *     status: "active" | "authenticated" | "pending" | "halted" |
 *             "cancelled" | "completed" | "paused" | "created" | "expired",
 *     planId: string,
 *     currentStart?: number,    // epoch seconds
 *     currentEnd?: number,      // epoch seconds — entitlement valid until
 *     chargeAt?: number,        // epoch seconds — next attempted charge
 *     paidCount?: number,
 *     totalCount?: number,
 *     notes?: Record<string, unknown>
 *   }
 *
 * "active" or "authenticated" → grant entitlement.
 * "halted" / "cancelled" / "completed" / "expired" → revoke.
 */

import { NextResponse, type NextRequest } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const subscriptionId = req.nextUrl.searchParams
    .get("subscription_id")
    ?.trim();

  if (!subscriptionId) {
    return NextResponse.json(
      { error: "subscription_id query param is required" },
      { status: 400 }
    );
  }

  // Basic shape check: Razorpay subscription IDs are "sub_" + alnum.
  if (!/^sub_[A-Za-z0-9]+$/.test(subscriptionId)) {
    return NextResponse.json(
      { error: "Malformed subscription_id" },
      { status: 400 }
    );
  }

  try {
    const rzp = getRazorpayClient();
    const sub = await rzp.subscriptions.fetch(subscriptionId);
    return NextResponse.json({
      id: sub.id,
      status: sub.status,
      planId: sub.plan_id,
      currentStart: sub.current_start ?? undefined,
      currentEnd: sub.current_end ?? undefined,
      chargeAt: sub.charge_at ?? undefined,
      paidCount: sub.paid_count ?? undefined,
      totalCount: sub.total_count ?? undefined,
      notes: sub.notes ?? undefined
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch subscription";
    // eslint-disable-next-line no-console
    console.error("[razorpay] subscription-status failed:", err);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
