import { SolarIcon } from "@/components/ui/solar-icon";
import { skillItems } from "@/lib/landing-data";

export function SkillsLibrarySection() {
  return (
    <section
      id="skills-library"
      className="overflow-hidden bg-neutral-100/50 border-neutral-200/60 pt-24 pb-24 relative rounded-[2.5rem]"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-soft-light pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
              .skills Library
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-5xl text-neutral-900 max-w-3xl leading-[1.05] tracking-tighter font-newsreader font-light">
              12 Production-Ready{" "}
              <span className="text-orange-500 tracking-tighter font-newsreader font-light">
                .skills
              </span>{" "}
              <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
                Included
              </span>
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mt-4 max-w-xl font-normal font-geist">
              Install once. Use forever. Every .skill is tested and ready to go
              on day one.
            </p>
          </div>
          <a
            href="#"
            className="group inline-flex items-center text-sm text-neutral-900 transition-colors border-b border-neutral-900 pb-0.5 whitespace-nowrap font-medium hover:text-orange-600 hover:border-orange-600 font-geist"
          >
            Browse All Skills
            <SolarIcon
              icon="solar:arrow-right-up-linear"
              className="ml-1 text-lg transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Skills Grid: 4x3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillItems.map((skill) =>
            skill.highlighted ? (
              /* Highlighted (dark) card */
              <div
                key={skill.title}
                className="group bg-neutral-900 rounded-2xl border border-neutral-800 p-6 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-[50px] pointer-events-none bg-orange-600/20" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center bg-orange-500/20 border-orange-500/30 group-hover:bg-orange-500/30 transition-colors">
                    <SolarIcon
                      icon={skill.icon}
                      className="text-lg text-orange-400"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm text-white font-semibold tracking-tight font-geist">
                        {skill.title}
                      </h4>
                      {skill.badge && (
                        <span className="inline-flex items-center rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider bg-orange-500/15 border-orange-500/30 text-orange-400 font-geist">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal font-geist">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Regular (light) card */
              <div
                key={skill.title}
                className="group bg-white rounded-2xl border border-neutral-100 p-6 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-neutral-200"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center bg-orange-50 border-orange-100 group-hover:bg-orange-100 transition-colors">
                    <SolarIcon
                      icon={skill.icon}
                      className="text-lg text-orange-500"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-neutral-900 font-semibold mb-1 tracking-tight font-geist">
                      {skill.title}
                    </h4>
                    <p className="text-xs text-neutral-500 leading-relaxed font-normal font-geist">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        {/* Bottom summary */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-[80px] bg-neutral-200" />
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider font-geist">
            All .skills included with every plan &middot; No add-ons
          </p>
          <div className="h-px flex-1 max-w-[80px] bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}
