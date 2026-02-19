import { ApplyNav } from "@/components/apply/apply-nav";
import { ApplyHero } from "@/components/apply/apply-hero";
import { ApplyWhySection } from "@/components/apply/apply-why-section";
import { ApplyForm } from "@/components/apply/apply-form";
import { ApplyNextSteps } from "@/components/apply/apply-next-steps";
import { ApplyFaq } from "@/components/apply/apply-faq";
import { ApplySidebar } from "@/components/apply/apply-sidebar";
import { ApplyFooter } from "@/components/apply/apply-footer";

export function ApplyPage() {
  return (
    <div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 min-h-screen relative bg-white/50 selection:bg-orange-500 selection:text-white">
      {/* Vertical Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4 opacity-20 z-0">
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
      </div>

      <main className="z-10 relative p-4 md:p-6 lg:p-8 space-y-6">
        <ApplyNav />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <ApplyHero />
            <ApplyWhySection />
            <ApplyForm />
            <ApplyNextSteps />
            <ApplyFaq />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <ApplySidebar />
          </div>
        </div>
      </main>

      <ApplyFooter />
    </div>
  );
}
