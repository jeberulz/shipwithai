import { SolarIcon } from "@/components/ui/solar-icon";
import { sidebarInfo } from "@/lib/apply-data";

export function ApplySidebar() {
  return (
    <>
      {/* Program Overview - Dark Card */}
      <div className="bg-[#08090a] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none bg-orange-600/20" />

        <div className="relative z-10 space-y-8">
          <h3 className="text-2xl font-newsreader font-light tracking-tight">
            Program Overview
          </h3>

          <div className="space-y-6">
            {sidebarInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <SolarIcon
                    icon={item.icon}
                    className="text-orange-400"
                    width={18}
                    height={18}
                  />
                </div>
                <div>
                  <p className="text-[0.65rem] text-neutral-400 uppercase font-semibold font-geist">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium font-geist">{item.value}</p>
                    {item.badge && (
                      <span className="text-[0.65rem] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 font-geist">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Social Proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-[#08090a] bg-neutral-800" />
              <div className="w-8 h-8 rounded-full border-2 border-[#08090a] bg-neutral-700" />
              <div className="w-8 h-8 rounded-full border-2 border-[#08090a] bg-orange-500 flex items-center justify-center text-[10px] font-bold">
                +12
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-geist">
              Be one of the first 20
            </p>
          </div>
        </div>
      </div>

      {/* Money Back Guarantee */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm flex items-center gap-4">
        <SolarIcon
          icon="solar:shield-check-linear"
          className="text-3xl text-orange-500 flex-shrink-0"
          width={30}
          height={30}
        />
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 font-geist">
            Money Back Guarantee
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5 font-geist">
            Full refund if not satisfied after week one.
          </p>
        </div>
      </div>
    </>
  );
}
