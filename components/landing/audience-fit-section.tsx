import { SolarIcon } from "@/components/ui/solar-icon";
import { audienceForItems, audienceNotForItems } from "@/lib/landing-data";

export function AudienceFitSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm px-3 py-1 text-xs text-neutral-500 mb-6 shadow-sm font-medium font-geist">
            Who It&apos;s For
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-neutral-900 max-w-4xl leading-[1.05] tracking-tighter font-newsreader font-light">
            Is This Bootcamp{" "}
            <span className="text-neutral-400 tracking-tighter font-newsreader font-light">
              For You?
            </span>
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: This is for you if... */}
          <div className="group bg-white rounded-[2rem] border border-neutral-100 p-8 lg:p-10 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-orange-50 border-orange-100">
                <SolarIcon
                  icon="solar:check-circle-bold"
                  className="text-lg text-orange-500"
                />
              </div>
              <h3 className="text-xl text-neutral-900 tracking-tight font-newsreader font-light">
                This is for you if&hellip;
              </h3>
            </div>
            <div className="space-y-5">
              {audienceForItems.map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-orange-400" />
                  <p className="text-[15px] text-neutral-600 leading-relaxed font-normal font-geist">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: This is NOT for you if... */}
          <div className="relative group">
            <div className="bg-[#08090a] rounded-[2rem] p-8 lg:p-10 relative overflow-hidden min-h-full">
              <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/15" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-white/5 border-white/10">
                    <SolarIcon
                      icon="solar:close-circle-linear"
                      className="text-lg text-neutral-400"
                    />
                  </div>
                  <h3 className="text-xl text-white tracking-tight font-newsreader font-light">
                    This is NOT for you if&hellip;
                  </h3>
                </div>
                <div className="space-y-5">
                  {audienceNotForItems.map((item) => (
                    <div key={item.text} className="flex items-start gap-4">
                      <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-neutral-600" />
                      <p className="text-[15px] text-neutral-400 leading-relaxed font-normal font-geist">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-neutral-500 uppercase tracking-widest font-medium flex items-center gap-2 font-geist">
                    <SolarIcon
                      icon="solar:info-circle-linear"
                      className="text-sm text-orange-400"
                    />
                    Still unsure? Book a free 15-min call with a mentor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
