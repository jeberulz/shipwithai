import { SolarIcon } from "@/components/ui/solar-icon";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: number;
  icon: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 transition-all",
        accent
          ? "bg-[#08090a] border-neutral-800 text-white"
          : "bg-white border-neutral-200 text-neutral-900"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center",
            accent
              ? "bg-orange-500/20 border border-orange-500/30"
              : "bg-neutral-100 border border-neutral-200"
          )}
        >
          <SolarIcon
            icon={icon}
            className={accent ? "text-orange-400" : "text-neutral-500"}
            width={18}
            height={18}
          />
        </div>
      </div>
      <p className="text-2xl font-semibold tracking-tight font-geist">
        {value}
      </p>
      <p
        className={cn(
          "text-xs font-medium font-geist mt-0.5",
          accent ? "text-neutral-400" : "text-neutral-500"
        )}
      >
        {label}
      </p>
    </div>
  );
}
