"use client";

import { SolarIcon } from "@/components/ui/solar-icon";

export function ReserveSpotNavButton() {
  return (
    <button
      className="transition-colors hover:bg-orange-50 text-xs font-semibold text-black tracking-tight bg-white rounded-full pt-2 pr-5 pb-2 pl-5 font-geist"
      onClick={() => {
        document.getElementById("email-capture")?.focus();
      }}
      type="button"
    >
      Reserve Spot
    </button>
  );
}

export function ScrollToTopCta() {
  return (
    <button
      className="px-10 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-[0_0_25px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2 font-semibold font-geist"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      Reserve My Spot
      <SolarIcon
        icon="solar:arrow-right-linear"
        className="text-lg"
        width={18}
        height={18}
      />
    </button>
  );
}
