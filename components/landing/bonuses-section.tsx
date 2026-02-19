import { SolarIcon } from "@/components/ui/solar-icon";
import { bonusItems } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function BonusesSection() {
  return (
    <section
      id="bonuses"
      className="overflow-hidden lg:p-16 bg-[#08090a] rounded-[2.5rem] p-8 relative shadow-2xl"
    >
      {/* Background glows */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none bg-orange-600/10" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-[120px] pointer-events-none bg-orange-600/[0.08]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-6 font-medium border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
            Included Free
          </div>
          <h2 className="text-4xl md:text-5xl text-white leading-[1.05] tracking-tighter font-newsreader font-light">
            Bonuses{" "}
            <span className="text-neutral-500 tracking-tighter font-newsreader font-light">
              worth over £670.
            </span>
          </h2>
        </div>

        {/* Bonus Cards */}
        <div className="space-y-4">
          {bonusItems.map((bonus) => (
            <div
              key={bonus.title}
              className={cn(
                "group relative flex flex-col sm:flex-row sm:items-start gap-5 border rounded-2xl p-6 transition-all duration-300",
                bonus.highlighted
                  ? "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/15 overflow-hidden"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/15"
              )}
            >
              {bonus.highlighted && (
                <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-[60px] pointer-events-none bg-orange-600/20" />
              )}
              <div className="absolute top-4 right-5 z-10">
                <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border-orange-400/30 bg-orange-400/10 text-orange-400 font-geist">
                  Worth {bonus.worth}
                </span>
              </div>
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center relative z-10",
                  bonus.highlighted
                    ? "bg-orange-500/20 border-orange-500/30"
                    : "bg-orange-500/10 border-orange-500/20"
                )}
              >
                <SolarIcon
                  icon={bonus.icon}
                  className="text-lg text-orange-400"
                />
              </div>
              <div className="flex-1 min-w-0 pr-20 sm:pr-24 relative z-10">
                <h4 className="text-[15px] text-white font-semibold mb-1.5 tracking-tight font-geist">
                  {bonus.title}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed font-normal font-geist">
                  {bonus.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
          <p className="text-xs text-neutral-500 font-medium uppercase tracking-wider font-geist">
            All bonuses included with every paid plan · No add-ons
          </p>
          <div className="h-px flex-1 max-w-[60px] bg-white/10" />
        </div>
      </div>
    </section>
  );
}
