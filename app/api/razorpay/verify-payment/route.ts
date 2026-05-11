/**
 * POST /api/razorpay/verify-payment
 *
 * Body:
 *   {
 *     razorpay_payment_id: string,
 *     razorpay_subscription_id: string,
 *     razorpay_signature: string
 *   }
 *
 * Returns:
 *   { verified: true,  subscriptionId, paymentId }     ← signature OK
 *   { verified: false, error: string }                 ← signature mismatch
 *
 * This is a *cheap, synchronous* check that the success callback on the
 * client genuinely came from Razorpay. It is NOT a substitute for the
 * webhook — the webhook is the source of truth for subscription state.
 */

import { NextResponse, type NextRequest } from "next/server";
import { verifySubscriptionPaymentSignature } from "@/lib/razorpay";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface Body {
  razorpay_payment_id?: string;
  razorpay_subscription_id?: string;
  razorpay_signature?: string;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { verified: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const {
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature
  } = body;

  if (
    !razorpay_payment_id ||
    !razorpay_subscription_id ||
    !razorpay_signature
  ) {
    return NextResponse.json(
      {
        verified: false,
        error:
          "razorpay_payment_id, razorpay_subscription_id and razorpay_signature are all required"
      },
      { status: 400 }
    );
  }

  let ok = false;
  try {
    ok = verifySubscriptionPaymentSignature({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[razorpay] verify-payment threw:", err);
    return NextResponse.json(
      { verified: false, error: "Verification failed" },
      { status: 500 }
    );
  }

  if (!ok) {
    return NextResponse.json(
      { verified: false, error: "Signature mismatch" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    verified: true,
    subscriptionId: razorpay_subscription_id,
    paymentId: razorpay_payment_id
  });
}
