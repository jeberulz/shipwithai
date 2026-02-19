"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SolarIcon } from "@/components/ui/solar-icon";

type CohortOption = {
  id: string;
  name: string;
  status: string;
};

export function CohortSelector({
  cohorts,
  selectedId,
}: {
  cohorts: CohortOption[];
  selectedId: string | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("cohort_id", value);
    } else {
      params.delete("cohort_id");
    }
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <div className="relative">
      <select
        value={selectedId || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none rounded-xl border border-neutral-200 bg-white px-4 py-2 pr-9 text-xs font-geist text-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none cursor-pointer"
      >
        <option value="">All Cohorts</option>
        {cohorts.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name} {c.status === "open" ? "(Open)" : ""}
          </option>
        ))}
      </select>
      <SolarIcon
        icon="solar:alt-arrow-down-linear"
        className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none"
        width={14}
        height={14}
      />
    </div>
  );
}
