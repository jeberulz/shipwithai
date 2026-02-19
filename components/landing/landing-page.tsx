import { AudienceFitSection } from "@/components/landing/audience-fit-section";
import { BonusesSection } from "@/components/landing/bonuses-section";
import { CurriculumSection } from "@/components/landing/curriculum-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FooterCtaSection } from "@/components/landing/footer-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { InstructorSection } from "@/components/landing/instructor-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { ProblemSection } from "@/components/landing/problem-section";
import { SkillsExplainerSection } from "@/components/landing/skills-explainer-section";
import { SkillsLibrarySection } from "@/components/landing/skills-library-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";

export function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 relative bg-white/50 min-h-screen">
      {/* Vertical Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4 opacity-20 z-0">
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
      </div>

      <main className="z-10 relative p-4 md:p-6 lg:p-8 space-y-6">
        <HeroSection />
        <ProblemSection />
        <SkillsExplainerSection />
        <SkillsLibrarySection />
        <CurriculumSection />
        <AudienceFitSection />
        <BonusesSection />
        <InstructorSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <FooterCtaSection />
      </main>
    </div>
  );
}
