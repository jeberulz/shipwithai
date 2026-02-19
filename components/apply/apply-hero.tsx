import { SolarIcon } from "@/components/ui/solar-icon";
import { heroStats } from "@/lib/apply-data";

export function ApplyHero() {
  return (
    <section className="lg:p-12 p-8 overflow-hidden bg-white border-neutral-200 border rounded-[2.5rem] relative shadow-sm">
      {/* Background decorative icon */}
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <SolarIcon
          icon="solar:file-send-linear"
          className="text-9xl"
          width={128}
          height={128}
        />
      </div>

      <div className="relative z-10">
        <div className="inline-flex text-xs font-medium text-orange-600 bg-orange-50 border-orange-200 border rounded-full mb-6 pt-1 pr-3 pb-1 pl-3 items-center font-geist">
          COHORT I - 20 SPOTS ONLY
        </div>
        <h1 className="md:text-5xl lg:text-6xl text-4xl font-light text-neutral-900 tracking-tighter font-newsreader mb-4">
          Let&apos;s get you <span className="text-orange-500">shipping.</span>
        </h1>
        <p className="text-lg font-normal text-neutral-500 max-w-xl font-geist">
          Cohort IV is a small group of 20 product designers and PMs building
          real AI workflows. We review every application to ensure high-quality
          peer learning.
        </p>
        <div className="grid grid-cols-3 gap-3 mt-8 max-w-md">
          {heroStats.map((stat) => (
            <div key={stat.label} className="bg-neutral-900 rounded-2xl p-4">
              <div className="text-2xl font-light text-white font-newsreader">
                {stat.value}
              </div>
              <div className="text-[0.65rem] font-medium text-neutral-400 uppercase tracking-widest font-geist">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
