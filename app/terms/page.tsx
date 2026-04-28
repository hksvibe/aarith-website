import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { COMPANY_NAME, LEGAL_NAME, CONTACT, LEGAL } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Terms of Service — ${COMPANY_NAME}`,
  description: `Terms of Service governing the use of websites, applications and services provided by ${LEGAL_NAME}.`
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro={`These Terms of Service ("Terms") govern your use of the websites, mobile applications and services provided by ${LEGAL_NAME} ("Aarith", "we", "us" or "our"), including the Vriddhi learning app on Google Play. By accessing or using the Services, you agree to be bound by these Terms.`}
    >
      <h2>1. Who we are</h2>
      <p>
        <strong>{LEGAL_NAME}</strong> is a private limited company incorporated
        in India, having its registered office at {CONTACT.address}. Corporate
        Identification Number (CIN): {LEGAL.cin}. References in these Terms to
        &quot;Aarith&quot; mean the consumer-app practice of {LEGAL_NAME}.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be capable of forming a legally binding contract under the
        Indian Contract Act, 1872 to use the Services. If you are a minor, you
        may use the Services only with the involvement of a parent or lawful
        guardian who agrees to these Terms on your behalf and supervises your
        use.
      </p>

      <h2>3. Your account</h2>
      <p>
        Some features of the Services require you to create an account. You
        agree to provide accurate, current and complete information when
        registering, to keep that information up to date, and to keep your
        login credentials confidential. You are responsible for all activity
        that takes place under your account.
      </p>

      <h2>4. Acceptable use</h2>
      <p>When using the Services, you agree not to:</p>
      <ul>
        <li>
          use the Services for any unlawful purpose or in violation of any
          applicable Indian law, regulation or third-party right;
        </li>
        <li>
          attempt to gain unauthorised access to the Services, other accounts
          or our systems;
        </li>
        <li>
          interfere with, disrupt, or place an unreasonable load on the
          Services or the networks they run on;
        </li>
        <li>
          reverse-engineer, decompile or disassemble any part of the Services,
          except to the extent expressly permitted by applicable law;
        </li>
        <li>
          upload or transmit any content that is unlawful, harmful, defamatory,
          obscene, or that infringes the intellectual property or privacy
          rights of any person;
        </li>
        <li>
          use any robot, scraper, or other automated means to access the
          Services without our prior written permission; or
        </li>
        <li>
          impersonate any person or misrepresent your affiliation with any
          person or organisation.
        </li>
      </ul>

      <h2>5. Content</h2>
      <p>
        All content made available through the Services that is provided by us
        — including text, graphics, audio, video, software, logos and other
        materials — is owned by {LEGAL_NAME} or our licensors, and is protected
        by Indian and international intellectual property laws. We grant you a
        limited, non-exclusive, non-transferable, revocable licence to access
        and use such content solely for your personal, non-commercial use
        through the Services.
      </p>
      <p>
        Where you submit content to the Services (for example, feedback or
        responses), you retain ownership of that content. You grant us a
        worldwide, royalty-free licence to host, store, reproduce and use that
        content solely for the purpose of operating, providing and improving
        the Services.
      </p>

      <h2>6. Privacy</h2>
      <p>
        Our processing of personal data in connection with the Services is
        governed by our <a href="/privacy">Privacy Policy</a>. By using the
        Services, you acknowledge that you have read and understood the Privacy
        Policy.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        The Services may integrate with or link to third-party platforms, such
        as Google Play, payment gateways, or analytics providers. We are not
        responsible for the availability, content, or practices of those third
        parties. Your use of any third-party platform is subject to that
        platform&apos;s own terms.
      </p>

      <h2>8. Fees</h2>
      <p>
        Some features of the Services may be offered free of charge, and others
        may require payment. Where fees apply, we will set them out clearly
        before you are charged. All fees are stated in Indian Rupees (INR)
        unless otherwise specified, and are inclusive or exclusive of taxes as
        indicated. Refunds, where available, are governed by the policy
        published with the relevant offer.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Services are provided on an <strong>&quot;as is&quot;</strong> and{" "}
        <strong>&quot;as available&quot;</strong> basis. To the maximum extent
        permitted by applicable law, we make no warranties of any kind, whether
        express or implied, regarding the Services, including warranties of
        merchantability, fitness for a particular purpose, non-infringement, or
        that the Services will be uninterrupted, error-free or secure.
      </p>
      <p>
        Educational content available through the Services, including Vriddhi,
        is provided for general information and learning purposes. It is not a
        substitute for professional advice in any field, including financial,
        medical, legal or career advice.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, {LEGAL_NAME} and its
        directors, officers, employees and agents will not be liable for any
        indirect, incidental, special, consequential, exemplary or punitive
        damages, or for any loss of profits, revenue, data, business
        opportunities, or goodwill, arising out of or in connection with your
        use of the Services. Our total aggregate liability arising out of or
        in connection with these Terms shall not exceed the amounts paid by
        you to us, if any, in the twelve (12) months immediately preceding the
        event giving rise to the claim, or INR 1,000, whichever is greater.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless {LEGAL_NAME} and its
        directors, officers, employees and agents from and against any claims,
        damages, liabilities, losses and expenses (including reasonable legal
        fees) arising out of or relating to (i) your breach of these Terms,
        (ii) your violation of any law or regulation, or (iii) your violation
        of any third-party right.
      </p>

      <h2>12. Suspension and termination</h2>
      <p>
        We may suspend or terminate your access to the Services at any time,
        with or without notice, if we reasonably believe that you have
        breached these Terms, that your use of the Services poses a security
        or legal risk, or that we are required to do so by applicable law.
        You may stop using the Services at any time.
      </p>

      <h2>13. Changes to the Services or these Terms</h2>
      <p>
        We may update the Services, or modify these Terms, from time to time.
        Where the changes to these Terms are material, we will take reasonable
        steps to notify you in advance, including by updating the
        &quot;Last updated&quot; date at the top of this page. Your continued
        use of the Services after the changes take effect constitutes your
        acceptance of the updated Terms.
      </p>

      <h2>14. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws
        of India, without regard to its conflict-of-laws principles. Subject to
        the section below on dispute resolution, the courts at Bengaluru,
        Karnataka shall have exclusive jurisdiction over any disputes arising
        out of or in connection with these Terms.
      </p>

      <h2>15. Dispute resolution</h2>
      <p>
        Before initiating formal proceedings, the parties shall attempt in good
        faith to resolve any dispute through informal negotiation. If the
        dispute cannot be resolved within thirty (30) days of one party giving
        the other written notice of the dispute, it shall be referred to and
        finally resolved by arbitration in accordance with the Arbitration and
        Conciliation Act, 1996. The seat of arbitration shall be Bengaluru,
        India and the language of arbitration shall be English.
      </p>

      <h2>16. Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, or by post at{" "}
        {LEGAL_NAME}, {CONTACT.address}.
      </p>
    </LegalLayout>
  );
}
