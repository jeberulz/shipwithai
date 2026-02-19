import { SolarIcon } from "@/components/ui/solar-icon";

export function ApplyFooter() {
  return (
    <footer className="mt-14 border-t border-neutral-200 bg-[#08090a] py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-semibold text-white font-geist">
          <SolarIcon
            icon="solar:ufo-3-outline"
            className="text-lg text-orange-500"
            width={18}
            height={18}
          />
          ShipWithAI
        </div>
        <p className="text-xs text-neutral-500 font-geist">
          &copy; 2026 ShipWithAI. Built for builders.
        </p>
      </div>
    </footer>
  );
}
