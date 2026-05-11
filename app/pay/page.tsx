import * as React from "react";
import type { Metadata } from "next";
import { PayClient } from "./PayClient";
import { fetchLivePlan } from "@/lib/razorpay";
import { LEGAL_NAME_SHORT } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Subscribe — ${LEGAL_NAME_SHORT}`,
  description:
    "Secure subscription checkout for the EMI Calculator & Loan Tracker app, powered by Razorpay.",
  // Don't index payment surfaces.
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default async function PayPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sp = (k: string): string => {
    const v = searchParams[k];
    if (Array.isArray(v)) return v[0] ?? "";
    return v ?? "";
  };

  const planSlug = sp("plan") || "pro_monthly";

  // Ask Razorpay for the authoritative price so the page never disagrees with
  // what the user will actually be charged. Falls back to the static price in
  // PRICING_PLANS if the API call fails.
  const livePlan = await fetchLivePlan(planSlug);

  return (
    <PayClient
      planSlug={planSlug}
      customerId={sp("customerId")}
      customerName={sp("customerName")}
      customerEmail={sp("customerEmail")}
      customerPhone={sp("customerPhone")}
      autostart={sp("autostart") === "1"}
      livePriceInr={livePlan?.amountInr}
    />
  );
}
