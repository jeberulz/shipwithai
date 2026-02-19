---
name: Privacy and Terms Pages
overview: Build the Privacy Policy and Terms of Service pages for Ship With AI, using the same layout shell as the rest of the site. Include footer link updates.
todos:
  - id: legal-layout
    content: Add shared LegalPageLayout component for consistent nav + shell
  - id: privacy-page
    content: Create app/privacy/page.tsx with full policy content
  - id: terms-page
    content: Create app/terms/page.tsx with full terms content
  - id: footer-links
    content: Update footer Terms to /terms and add Privacy link to /privacy
isProject: false
---

# Privacy & Terms Pages – Build Plan

## Scope

Build two legal pages:
- **Privacy Policy** (`/privacy`)
- **Terms of Service** (`/terms`)

Match existing site layout (max-w-7xl, border shell, Geist + Newsreader) and wire footer links.

---

## Layout Approach

Reuse the same shell as [app/apply-page/page.tsx](app/apply-page/page.tsx):

```
<div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 relative bg-white/50 min-h-screen">
  <main className="z-10 relative p-4 md:p-6 lg:p-8">
```

- **Nav:** Logo left, "Back to Home" right (same as apply page)
- **Content:** max-w-3xl prose-style body for readability
- **Footer:** Copyright + links to Terms / Privacy

Extract a shared `LegalPageLayout` in `components/legal/legal-page-layout.tsx` to avoid duplication.

---

## Privacy Policy – Content Outline

| Section | Content |
|---------|---------|
| **1. Introduction** | Who we are, what this policy covers |
| **2. Data We Collect** | Application form: name, email, LinkedIn/portfolio URL, role, AI experience, goals; session recordings if participant; payment info via Stripe (if used) |
| **3. How We Use It** | Review applications, communicate about cohort, send recordings, improve bootcamp |
| **4. Legal Basis (GDPR)** | Legitimate interest for applications; consent for marketing if opted in |
| **5. Storage & Retention** | Where data lives; retention (e.g. applications 2 years; recordings while cohort active + X) |
| **6. Sharing** | No selling; processors (hosting, email, payment) listed |
| **7. Your Rights** | Access, rectify, erase, restrict, port, object, withdraw consent; complaint to supervisory authority |
| **8. Cookies & Analytics** | Minimal; GA4 or similar if used |
| **9. Children** | Not for under 16 |
| **10. Changes** | How we notify; continued use = acceptance |
| **11. Contact** | Email for data requests (placeholder: hello@shipwithai.com) |

---

## Terms of Service – Content Outline

| Section | Content |
|---------|---------|
| **1. Agreement** | By applying/paying you accept these terms |
| **2. The Program** | What Cohort Access includes (6 sessions, recordings, .skills, bonuses); dates (Mar 17–28, 2026) |
| **3. Application & Admission** | Application does not guarantee admission; we review; payment link only for accepted applicants |
| **4. Payment** | Price (£297 Early Bird); currency; when due; no application fee |
| **5. Refund Policy** | 7-day refund: complete first week, email within 7 days of start, full refund no questions |
| **6. Your Obligations** | Attend or watch recordings; respectful conduct; no sharing recordings/access outside cohort |
| **7. Intellectual Property** | Our materials are ours; you get license for personal learning; no resale/redistribution |
| **8. No Guarantees** | Outcomes depend on effort; no job/salary guarantees |
| **9. Limitation of Liability** | To extent permitted by law; cap at amount paid |
| **10. Termination** | We may remove disruptive participants; refund per policy |
| **11. Changes** | We may update; material changes notified |
| **12. Governing Law** | Jurisdiction (e.g. England and Wales) |
| **13. Contact** | Email for questions |

---

## File Structure

```
app/
  privacy/
    page.tsx              # Privacy Policy
  terms/
    page.tsx              # Terms of Service
components/
  legal/
    legal-page-layout.tsx # Shared nav + shell
```

---

## Footer Updates

In [components/landing/footer-cta-section.tsx](components/landing/footer-cta-section.tsx):

1. Change `Terms` link from `href="#"` to `href="/terms"`
2. Add `Privacy` link: `href="/privacy"` (in Company column, alongside Terms)

---

## Metadata (SEO)

- **Privacy:** `title: "Privacy Policy - Ship With AI"`, `description: "How Ship With AI collects and uses your data."`
- **Terms:** `title: "Terms of Service - Ship With AI"`, `description: "Terms of service for the Ship With AI bootcamp."`

Use `export const metadata` in each `page.tsx`.
