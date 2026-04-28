import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY_NAME, LEGAL_NAME, CONTACT, LEGAL } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${COMPANY_NAME}`,
  description: `Privacy Policy for ${LEGAL_NAME}, the operator of ${COMPANY_NAME} and its mobile and web products, drafted in line with India's Digital Personal Data Protection Act, 2023.`
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro={`This Privacy Policy explains how ${LEGAL_NAME} ("Aarith", "we", "us" or "our") collects, uses, shares and protects personal data when you use our websites, applications and services, including the Vriddhi learning app on Google Play. We are committed to handling personal data in line with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and the Information Technology Act, 2000 and rules made thereunder.`}
    >
      <h2>1. Who we are</h2>
      <p>
        <strong>{LEGAL_NAME}</strong> is a private limited company incorporated
        in India under the Companies Act, 2013, having its registered office at{" "}
        {CONTACT.address}. Corporate Identification Number (CIN): {LEGAL.cin}.
        For the purposes of the DPDP Act, we act as a <strong>Data Fiduciary</strong>{" "}
        in respect of personal data we process directly, and as a{" "}
        <strong>Data Processor</strong> when we process personal data on behalf
        of our clients.
      </p>

      <h2>2. What this policy covers</h2>
      <p>
        This policy covers personal data we collect through (i) our website at
        the domain on which this policy is hosted, (ii) our mobile applications,
        including the Vriddhi app, and (iii) any other services that link to
        this policy (collectively, the "Services"). It does not cover
        third-party websites, apps or services we do not control, even if they
        are linked from our Services.
      </p>

      <h2>3. Personal data we collect</h2>
      <p>We collect only the personal data needed to operate and improve the Services. This typically includes:</p>
      <ul>
        <li>
          <strong>Account information</strong>: name, email address, phone
          number and password (where you create an account).
        </li>
        <li>
          <strong>Profile information</strong>: optional information you choose
          to provide, such as preferred language, education level or area of
          interest.
        </li>
        <li>
          <strong>Usage data</strong>: in-app activity such as lessons started,
          progress, scores, and pages visited, used to power features and
          improve the product.
        </li>
        <li>
          <strong>Device and technical data</strong>: device model, operating
          system, app version, language settings, time zone, IP address and
          basic crash diagnostics.
        </li>
        <li>
          <strong>Communications</strong>: the content of any email, support
          ticket or feedback you send us.
        </li>
      </ul>
      <p>
        We do not knowingly collect special categories of personal data (such
        as financial account credentials, health data or biometrics) unless a
        specific feature requires it and we have explicitly told you so at the
        point of collection.
      </p>

      <h2>4. Children&apos;s data</h2>
      <p>
        Some of our products, including Vriddhi, are designed to be useful to
        students who may be under the age of 18. Where the user is a child as
        defined under the DPDP Act, we will:
      </p>
      <ul>
        <li>
          obtain verifiable consent of the parent or lawful guardian before
          processing the child&apos;s personal data;
        </li>
        <li>
          not undertake tracking, behavioural monitoring of children, or
          targeted advertising directed at children; and
        </li>
        <li>
          not process the child&apos;s personal data in a way that is likely to
          cause any detrimental effect on the well-being of the child.
        </li>
      </ul>

      <h2>5. How we use personal data</h2>
      <p>We use personal data only for purposes that are clear and proportionate, including to:</p>
      <ul>
        <li>provide, secure, operate and maintain the Services;</li>
        <li>create and manage your account, and authenticate you when you log in;</li>
        <li>personalise content (for example, recommending lessons in your preferred language);</li>
        <li>communicate with you about service updates, security notices and support requests;</li>
        <li>monitor performance, debug crashes, and improve quality and reliability;</li>
        <li>comply with legal, regulatory and tax obligations applicable to us; and</li>
        <li>prevent fraud, abuse and violations of our Terms of Service.</li>
      </ul>

      <h2>6. Lawful bases for processing</h2>
      <p>We process personal data on one or more of the following bases under the DPDP Act:</p>
      <ul>
        <li>your consent, freely given for a specified purpose;</li>
        <li>certain legitimate uses recognised under the DPDP Act, such as where you voluntarily provide data for a clear purpose; and</li>
        <li>compliance with applicable Indian law, judicial orders or regulatory directions.</li>
      </ul>

      <h2>7. Sharing of personal data</h2>
      <p>
        We do not sell personal data. We share personal data only with carefully
        selected service providers who help us run the Services — for example,
        cloud hosting, analytics, crash reporting, customer support and payment
        processing. These service providers are contractually required to
        process personal data only on our instructions and to keep it
        confidential and secure.
      </p>
      <p>
        We may also disclose personal data when required to do so by Indian
        law, by a court of competent jurisdiction, or by a lawful authority
        acting within its powers.
      </p>

      <h2>8. International transfers</h2>
      <p>
        Some of our service providers may process personal data outside India.
        Where we transfer personal data across borders, we do so only to
        countries that are not restricted by the Central Government under the
        DPDP Act, and we put in place reasonable safeguards to protect that
        data.
      </p>

      <h2>9. Retention</h2>
      <p>
        We retain personal data only for as long as necessary for the purposes
        for which it was collected, or for as long as required by applicable
        law. When personal data is no longer required, we delete or anonymise
        it in line with our internal retention schedule.
      </p>

      <h2>10. Security</h2>
      <p>
        We implement reasonable technical and organisational security measures
        designed to protect personal data against accidental or unlawful
        destruction, loss, alteration, unauthorised disclosure or access. These
        include encryption in transit, access controls, audit logging and
        regular review of our security practices. However, no method of
        electronic storage or transmission is fully secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>11. Your rights as a Data Principal</h2>
      <p>Subject to applicable law, you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> the personal data we hold about you and a
          summary of the purposes for which it is processed;
        </li>
        <li>
          <strong>Correct</strong> personal data that is inaccurate, incomplete
          or misleading, and to <strong>update</strong> it where necessary;
        </li>
        <li>
          <strong>Erase</strong> personal data that is no longer needed for the
          purpose for which it was collected, subject to legal exceptions;
        </li>
        <li>
          <strong>Withdraw consent</strong> at any time where processing is
          based on consent (this will not affect the lawfulness of processing
          carried out before withdrawal);
        </li>
        <li>
          <strong>Nominate</strong> another individual to exercise your rights
          in the event of your death or incapacity; and
        </li>
        <li>
          <strong>Grievance redressal</strong> through the readily available
          channels described below.
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us using the details in
        the &quot;Contact and Grievance Officer&quot; section.
      </p>

      <h2>12. Cookies and similar technologies</h2>
      <p>
        Our website uses a small number of cookies and similar technologies for
        essential functionality (such as remembering your theme preference) and
        for basic analytics so we can understand how the site is used. You can
        block or delete cookies in your browser at any time; certain features
        may not work as expected if you do.
      </p>

      <h2>13. Third-party services</h2>
      <p>
        Our Services may contain links to third-party websites and services
        (for example, the Google Play store listing for Vriddhi). We are not
        responsible for the privacy practices of those third parties. We
        encourage you to read their privacy policies before providing them with
        any personal data.
      </p>

      <h2>14. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we
        will revise the &quot;Last updated&quot; date at the top of this page,
        and where the changes are material we will take reasonable steps to
        notify you in advance.
      </p>

      <h2>15. Contact and Grievance Officer</h2>
      <p>
        If you have a question, request or complaint about how we process your
        personal data, please contact our Grievance Officer:
      </p>
      <ul>
        <li>
          <strong>Grievance Officer</strong>: {LEGAL.grievanceOfficer.name}
        </li>
        <li>
          <strong>Email</strong>:{" "}
          <a href={`mailto:${LEGAL.grievanceOfficer.email}`}>
            {LEGAL.grievanceOfficer.email}
          </a>
        </li>
        <li>
          <strong>Postal address</strong>: {LEGAL_NAME}, {CONTACT.address}
        </li>
      </ul>
      <p>
        We will acknowledge receipt of grievances and respond within the time
        frames required under applicable Indian law. If you are not satisfied
        with our response, you may approach the Data Protection Board of India
        established under the DPDP Act.
      </p>
    </LegalLayout>
  );
}
