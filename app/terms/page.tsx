import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Ship With AI",
  description: "Terms of service for the Ship With AI bootcamp.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout>
      <article className="max-w-3xl mx-auto prose prose-neutral font-geist">
        <h1 className="text-4xl md:text-5xl text-neutral-900 tracking-tighter font-newsreader font-light mb-2">
          Terms of Service
        </h1>
        <p className="text-neutral-500 text-sm mb-12">
          Last updated: February 2026
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            1. Agreement
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            By applying for or paying for access to Ship With AI (&quot;the Bootcamp&quot;), you agree to these Terms of Service. If you do not agree, do not apply or pay.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            2. The Program
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Ship With AI is a 2-week bootcamp for product designers and PMs. Cohort Access typically includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>6 live sessions (90 minutes each)</li>
            <li>Session recordings with lifetime access</li>
            <li>12 pre-built .skills (AI workflows)</li>
            <li>Action guides and supporting materials</li>
            <li>Access to bonuses as described at the time of purchase</li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4">
            Dates: March 17–28, 2026 (or as stated for your cohort). We may adjust session times with reasonable notice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            3. Application & Admission
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Submitting an application does not guarantee admission. We review applications and admit participants at our discretion. A payment link is provided only to accepted applicants. There is no fee to apply.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            4. Payment
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Accepted applicants receive a payment link. The Early Bird price is £297 (or as stated at the time). Payment is due before the cohort start date. We use Stripe for processing. All prices are in GBP unless otherwise indicated.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            5. Refund Policy
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            7-day refund policy. Complete the first week&apos;s assignments. Still not for you? Email us within 7 days of the cohort start date for a full refund. No questions asked.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            6. Your Obligations
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            As a participant, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>Attend live sessions or watch recordings as needed</li>
            <li>Be respectful and professional toward instructors and fellow participants</li>
            <li>Not share session recordings, .skills, or access credentials with anyone outside the cohort</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            All course materials, .skills, recordings, and content created by Ship With AI remain our property. You receive a non-exclusive, personal license to use them for your own learning during and after the cohort. You may not resell, redistribute, or publicly share the materials without our permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            8. No Guarantees
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Outcomes depend on your effort and context. We do not guarantee specific results, job offers, salary increases, or any particular career outcome.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            To the fullest extent permitted by law, our liability is limited to the amount you paid for the cohort. We are not liable for indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            10. Termination
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We may remove you from the cohort if you violate these terms or disrupt the experience for others. Refunds (if applicable) will be handled per our refund policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            11. Changes
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We may update these terms. Material changes will be communicated. Continued participation after changes constitutes acceptance.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            12. Governing Law
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            These terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            13. Contact
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            For questions about these terms:{" "}
            <a
              href="mailto:hello@shipwithai.com"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              hello@shipwithai.com
            </a>
          </p>
        </section>

        <div className="pt-8 border-t border-neutral-200">
          <Link
            href="/"
            className="text-sm font-medium text-orange-500 hover:text-orange-600 font-geist"
          >
            ← Back to Home
          </Link>
          <span className="mx-2 text-neutral-300">·</span>
          <Link
            href="/privacy"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 font-geist"
          >
            Privacy Policy
          </Link>
        </div>
      </article>
    </LegalPageLayout>
  );
}
