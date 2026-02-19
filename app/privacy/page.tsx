import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal/legal-page-layout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Ship With AI",
  description: "How Ship With AI collects and uses your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout>
      <article className="max-w-3xl mx-auto prose prose-neutral font-geist">
        <h1 className="text-4xl md:text-5xl text-neutral-900 tracking-tighter font-newsreader font-light mb-2">
          Privacy Policy
        </h1>
        <p className="text-neutral-500 text-sm mb-12">
          Last updated: February 2026
        </p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            1. Introduction
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Ship With AI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) runs a bootcamp for product designers and PMs. This Privacy Policy explains how we collect, use, and protect your personal data when you apply for or participate in our cohorts, visit our website, or otherwise interact with our services.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            2. Data We Collect
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We collect the following information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>
              <strong>Application data:</strong> Full name, email address, LinkedIn or portfolio URL, professional role, AI experience level, and goals you provide when applying for a cohort
            </li>
            <li>
              <strong>Participant data:</strong> If accepted, access to session recordings, community channels, and course materials
            </li>
            <li>
              <strong>Payment data:</strong> Processed by Stripe. We do not store card numbers; Stripe handles payment details in accordance with their privacy policy
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type, and similar data from visiting our website
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            3. How We Use It
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>Review your application and decide on admission</li>
            <li>Communicate with you about your application and the cohort</li>
            <li>Deliver course materials, session recordings, and support</li>
            <li>Process payments (via Stripe)</li>
            <li>Improve our bootcamp and user experience</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            4. Legal Basis (GDPR)
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            If you are in the UK or EU:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>
              <strong>Legitimate interest:</strong> Processing applications and running the bootcamp
            </li>
            <li>
              <strong>Consent:</strong> Where we send marketing emails (you can withdraw at any time)
            </li>
            <li>
              <strong>Contract:</strong> Fulfilling our agreement once you pay and join a cohort
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            5. Storage & Retention
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Your data is stored on secure servers (e.g. Vercel, Supabase, Stripe). We retain:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>
              <strong>Applications:</strong> Up to 2 years, then anonymised or deleted
            </li>
            <li>
              <strong>Participant data:</strong> For the duration of your cohort access and up to 2 years after
            </li>
            <li>
              <strong>Payment records:</strong> As required for tax and legal compliance
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            6. Sharing
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We do not sell your data. We share it only with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li>
              <strong>Stripe</strong> for payment processing
            </li>
            <li>
              <strong>Hosting providers</strong> (e.g. Vercel, Supabase) that host our site and database
            </li>
            <li>
              <strong>Email providers</strong> for transactional and, if you opt in, marketing emails
            </li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4">
            These processors are bound by contracts that require them to protect your data.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            7. Your Rights
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-neutral-600">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Rectify</strong> inaccurate data</li>
            <li><strong>Erase</strong> your data (&quot;right to be forgotten&quot;)</li>
            <li><strong>Restrict</strong> or object to processing</li>
            <li><strong>Data portability</strong> (receive your data in a structured format)</li>
            <li><strong>Withdraw consent</strong> where we rely on it</li>
          </ul>
          <p className="text-neutral-600 leading-relaxed mt-4">
            To exercise these rights, contact us at the email below. You also have the right to lodge a complaint with your local data protection supervisory authority.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            8. Cookies & Analytics
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We use minimal cookies and may use analytics (e.g. Google Analytics) to understand how visitors use our site. You can control cookies via your browser settings.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            9. Children
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            Our services are not intended for anyone under 16. We do not knowingly collect data from children.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            10. Changes
          </h2>
          <p className="text-neutral-600 leading-relaxed mb-4">
            We may update this policy from time to time. We will post the updated version here and update the &quot;Last updated&quot; date. Material changes will be communicated via email where appropriate. Continued use of our services after changes constitutes acceptance.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 font-geist mb-4">
            11. Contact
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            For data requests or privacy questions:{" "}
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
            href="/terms"
            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 font-geist"
          >
            Terms of Service
          </Link>
        </div>
      </article>
    </LegalPageLayout>
  );
}
