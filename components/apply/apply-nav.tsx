import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";

export function ApplyNav() {
  return (
    <nav className="flex items-center justify-between mb-8 relative z-20">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold tracking-tight text-neutral-900 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-sm hover:border-orange-200 transition-colors font-geist"
      >
        <SolarIcon
          icon="solar:ufo-3-outline"
          className="text-lg text-orange-500"
          width={18}
          height={18}
        />
        ShipWithAI
      </Link>
      <Link
        href="/"
        className="text-xs font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-neutral-200 transition-colors font-geist"
      >
        <SolarIcon
          icon="solar:arrow-left-linear"
          className="text-sm"
          width={14}
          height={14}
        />
        Back to Home
      </Link>
    </nav>
  );
}
