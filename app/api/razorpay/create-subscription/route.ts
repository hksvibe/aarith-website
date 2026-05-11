/**
 * POST /api/razorpay/create-subscription
 *
 * Body:
 *   {
 *     planSlug: "pro_monthly" | "pro_annual",
 *     // Optional — passed through to Razorpay's `notes` for later reconciliation.
 *     customerId?: string,
 *     customerName?: string,
 *     customerEmail?: string,
 *     customerPhone?: string,
 *     // Total billing cycles (e.g. 12 for one year on a monthly plan).
 *     // Default 120 — effectively "until cancelled" for most consumer apps.
 *     totalCount?: number
 *   }
 *
 * Returns:
 *   { subscriptionId: string, keyId: string, shortUrl?: string }
 *
 * The client uses `subscriptionId` to open Razorpay Checkout. `keyId` is the
 * public test/live key (rzp_test_... / rzp_live_...) and is safe to ship.
 */

import { NextResponse, type NextRequest } from "next/server";
import {
  getRazorpayClient,
  getRazorpayKeyId,
  resolvePlanIdBySlug
} from "@/lib/razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface Body {
  planSlug?: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  totalCount?: number;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const planSlug = (body.planSlug ?? "").trim();
  if (!planSlug) {
    return NextResponse.json(
      { error: "planSlug is required" },
      { status: 400 }
    );
  }

  const planId = resolvePlanIdBySlug(planSlug);
  if (!planId) {
    return NextResponse.json(
      {
        error: `Unknown or unconfigured plan: ${planSlug}. Set the matching RAZORPAY_PLAN_ID_* env var.`
      },
      { status: 400 }
    );
  }

  // Cap at Razorpay's max of 120 cycles; bottom-cap at 1 to avoid zero/negative.
  const totalCount = Math.min(
    Math.max(1, Math.floor(body.totalCount ?? 120)),
    120
  );

  try {
    const rzp = getRazorpayClient();

    const subscription = await rzp.subscriptions.create({
      plan_id: planId,
      total_count: totalCount,
      customer_notify: 1,
      // `notes` is searchable in the Razorpay dashboard and surfaces in
      // webhook payloads — perfect for reconciling against our user ID.
      notes: {
        plan_slug: planSlug,
        customer_id: body.customerId ?? "",
        customer_name: body.customerName ?? "",
        customer_email: body.customerEmail ?? "",
        customer_phone: body.customerPhone ?? "",
        source: "aarith.com/pay"
      }
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: getRazorpayKeyId(),
      shortUrl: subscription.short_url ?? undefined,
      status: subscription.status
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create subscription";
    // eslint-disable-next-line no-console
    console.error("[razorpay] create-subscription failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
