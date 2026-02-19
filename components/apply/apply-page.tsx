import { ApplyNav } from "@/components/apply/apply-nav";
import { ApplyHero } from "@/components/apply/apply-hero";
import { ApplyWhySection } from "@/components/apply/apply-why-section";
import { ApplyForm } from "@/components/apply/apply-form";
import { ApplyNextSteps } from "@/components/apply/apply-next-steps";
import { ApplyFaq } from "@/components/apply/apply-faq";
import { ApplySidebar } from "@/components/apply/apply-sidebar";
import { ApplyFooter } from "@/components/apply/apply-footer";
import { SolarIcon } from "@/components/ui/solar-icon";
import type { Cohort } from "@/types/database";

type CohortData = Pick<
  Cohort,
  "id" | "name" | "slug" | "spots_total" | "start_date" | "end_date"
>;

export function ApplyPage({ cohort }: { cohort: CohortData | null }) {
  if (!cohort) {
    return (
      <div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 min-h-screen relative bg-white/50 selection:bg-orange-500 selection:text-white">
        <div className="absolute inset-0 pointer-events-none flex justify-between px-4 opacity-20 z-0">
          <div className="w-px h-full bg-neutral-300" />
          <div className="w-px h-full bg-neutral-300" />
          <div className="w-px h-full bg-neutral-300" />
        </div>
        <main className="z-10 relative p-4 md:p-6 lg:p-8 space-y-6">
          <ApplyNav />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white border border-neutral-100 rounded-[2rem] p-8 lg:p-12 shadow-sm text-center max-w-lg">
              <SolarIcon
                icon="solar:lock-linear"
                className="text-neutral-300 mx-auto mb-6"
                width={48}
                height={48}
              />
              <h2 className="text-3xl font-light text-neutral-900 tracking-tight font-newsreader mb-3">
                Applications are currently closed
              </h2>
              <p className="text-sm text-neutral-500 font-geist leading-relaxed">
                We&apos;re not accepting applications right now. Follow us to be
                notified when the next cohort opens.
              </p>
            </div>
          </div>
        </main>
        <ApplyFooter />
      </div>
    );
  }

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
            <ApplyForm cohortSlug={cohort.slug} cohortName={cohort.name} />
            <ApplyNextSteps />
            <ApplyFaq />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
            <ApplySidebar cohort={cohort} />
          </div>
        </div>
      </main>

      <ApplyFooter />
    </div>
  );
}
