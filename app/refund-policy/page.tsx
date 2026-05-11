import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import {
  COMPANY_NAME,
  LEGAL_NAME,
  CONTACT,
  LEGAL
} from "@/data/site-config";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy — ${COMPANY_NAME}`,
  description: `Refund and Cancellation Policy for ${LEGAL_NAME}, operator of ${COMPANY_NAME} consumer products including the EMI Calculator & Loan Tracker app.`
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      intro={`This policy explains how cancellations and refunds work for digital subscriptions sold by ${LEGAL_NAME} ("Aarith", "we", "us" or "our") through aarith.com and our consumer applications, including the EMI Calculator & Loan Tracker app. By subscribing to a paid plan you agree to the terms set out below.`}
    >
      <h2>1. Scope</h2>
      <p>
        This policy applies to digital subscription products sold by us on
        aarith.com and inside our mobile applications, where payment is
        collected through our payment processor, Razorpay. It does not apply
        to purchases made through third-party stores (such as Google Play
        in-app purchases), which are governed by those stores&apos; own refund
        policies.
      </p>

      <h2>2. Cancellation</h2>
      <p>
        You can cancel a paid subscription at any time. Cancellation can be
        initiated:
      </p>
      <ul>
        <li>From within the app, under Settings → Subscription;</li>
        <li>
          By writing to us at{" "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> from the
          email address associated with the subscription;
        </li>
        <li>
          By writing to our Grievance Officer (see Section 7) where you have
          been unable to cancel through the channels above.
        </li>
      </ul>
      <p>
        When you cancel, no further renewal charges will be attempted. Your
        access to paid features continues until the end of the billing period
        you have already paid for, after which it is downgraded automatically
        to the free tier.
      </p>

      <h2>3. Refunds — general principle</h2>
      <p>
        Because subscriptions provide immediate, ongoing access to digital
        content and features, charges are <strong>generally non-refundable</strong>{" "}
        once the billing period has started. We do however offer refunds in
        the specific circumstances described in Section 4.
      </p>

      <h2>4. When you can request a refund</h2>
      <p>You may request a refund in the following situations:</p>
      <ul>
        <li>
          <strong>Duplicate or accidental charge.</strong> If you were charged
          more than once for the same billing period, or if a renewal was
          processed after you had successfully cancelled, write to us within
          7 days of the charge and we will refund the duplicate or erroneous
          amount in full.
        </li>
        <li>
          <strong>Failure of service.</strong> If a paid feature is materially
          broken for more than 72 consecutive hours due to an issue on our
          side, you may request a pro-rata refund for the affected days of
          the current billing period.
        </li>
        <li>
          <strong>Unauthorised charge.</strong> If a payment was made from
          your account without your authorisation (for example, by another
          person using your device), write to us promptly and we will
          investigate. Where we are reasonably satisfied the charge was
          unauthorised, we will refund the amount in full.
        </li>
        <li>
          <strong>First-time monthly subscribers.</strong> If you are
          subscribing for the first time to a monthly plan, you may request a
          full refund within 24 hours of the initial charge, provided you have
          not used the paid features beyond a reasonable trial. We reserve the
          right to deny obviously abusive use of this window (for example,
          repeated sign-ups from the same account).
        </li>
      </ul>

      <h2>5. How to request a refund</h2>
      <p>
        Send an email to{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> from the email
        address associated with your subscription, with the following details:
      </p>
      <ul>
        <li>Razorpay Payment ID or Subscription ID (visible on your receipt);</li>
        <li>Date of the charge and amount;</li>
        <li>Brief description of the reason for the refund request.</li>
      </ul>
      <p>
        We will acknowledge your request within 3 business days and respond
        with a decision within 7 business days. Where a refund is approved, it
        will be processed through Razorpay to the original payment method and
        will typically reach your account within 5 to 10 business days,
        depending on your bank or card network.
      </p>

      <h2>6. Chargebacks</h2>
      <p>
        We encourage you to contact us first before raising a chargeback with
        your bank or card network. Most issues can be resolved quickly and
        directly. Chargebacks raised without first contacting us may result in
        suspension of your account pending investigation.
      </p>

      <h2>7. Grievance Officer</h2>
      <p>
        In line with the IT Rules, 2021 and the Digital Personal Data
        Protection Act, 2023, if you have a complaint about a charge, a
        refund decision, or how we handled your payment data, you may contact
        our Grievance Officer:
      </p>
      <p>
        <strong>{LEGAL.grievanceOfficer.name}</strong>
        <br />
        Email:{" "}
        <a href={`mailto:${LEGAL.grievanceOfficer.email}`}>
          {LEGAL.grievanceOfficer.email}
        </a>
        <br />
        {LEGAL_NAME}
        <br />
        {CONTACT.address}
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this Refund &amp; Cancellation Policy from time to time
        to reflect changes in our products, our payment processor&apos;s
        terms, or applicable law. The current version, with the most recent
        &ldquo;Last updated&rdquo; date, always applies.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any question about this policy or a specific charge, write to us
        at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or call us
        at {CONTACT.phone}.
      </p>
    </LegalLayout>
  );
}
