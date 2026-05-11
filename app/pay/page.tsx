import * as React from "react";
import type { Metadata } from "next";
import { PayClient } from "./PayClient";

export const metadata: Metadata = {
  title: "Subscribe — Aarith",
  description:
    "Secure subscription checkout for the EMI Calculator & Loan Tracker app, powered by Razorpay.",
  // Don't index payment surfaces.
  robots: { index: false, follow: false }
};

export const dynamic = "force-dynamic";

export default function PayPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sp = (k: string): string => {
    const v = searchParams[k];
    if (Array.isArray(v)) return v[0] ?? "";
    return v ?? "";
  };
  return (
    <PayClient
      planSlug={sp("plan") || "pro_monthly"}
      customerId={sp("customerId")}
      customerName={sp("customerName")}
      customerEmail={sp("customerEmail")}
      customerPhone={sp("customerPhone")}
      autostart={sp("autostart") === "1"}
    />
  );
}
