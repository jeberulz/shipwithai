"use client";

import { useState, useEffect, useCallback } from "react";
import { SolarIcon } from "@/components/ui/solar-icon";
import { Button } from "@/components/ui/button";
import { CohortFormDialog } from "@/components/admin/cohort-form-dialog";
import type { CohortStatus, CohortWithCount } from "@/types/database";

function formatDate(dateString: string | null) {
  if (!dateString) return "\u2014";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statusColors: Record<CohortStatus, string> = {
  open: "bg-green-50 text-green-700 border-green-200",
  closed: "bg-red-50 text-red-700 border-red-200",
  archived: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<CohortWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingCohort, setEditingCohort] = useState<CohortWithCount | null>(
    null
  );

  const fetchCohorts = useCallback(async () => {
    const response = await fetch("/api/admin/cohorts");
    if (response.ok) {
      const data = await response.json();
      setCohorts(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCohorts();
  }, [fetchCohorts]);

  async function toggleStatus(cohort: CohortWithCount) {
    const newStatus: CohortStatus =
      cohort.status === "open" ? "closed" : "open";
    setUpdating(cohort.id);

    const response = await fetch("/api/admin/cohorts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cohort.id, status: newStatus }),
    });

    if (response.ok) {
      const updated = await response.json();
      // If we opened this cohort, close all others in local state
      if (newStatus === "open") {
        setCohorts((prev) =>
          prev.map((c) =>
            c.id === updated.id
              ? updated
              : c.status === "open"
                ? { ...c, status: "closed" as const }
                : c
          )
        );
      } else {
        setCohorts((prev) =>
          prev.map((c) => (c.id === updated.id ? updated : c))
        );
      }
    }
    setUpdating(null);
  }

  async function archiveCohort(cohort: CohortWithCount) {
    setUpdating(cohort.id);
    const response = await fetch("/api/admin/cohorts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: cohort.id, status: "archived" }),
    });
    if (response.ok) {
      const updated = await response.json();
      setCohorts((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
    }
    setUpdating(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="flex items-center gap-2 text-sm text-neutral-400 font-geist">
          <div className="w-4 h-4 border-2 border-neutral-300 border-t-orange-500 rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
            Cohorts
          </h1>
          <p className="text-sm text-neutral-500 font-geist">
            Manage cohort availability
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs"
          size="sm"
        >
          <SolarIcon icon="solar:add-circle-linear" width={14} height={14} />
          Create Cohort
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cohorts.map((cohort) => {
          const appCount = cohort.applications[0]?.count ?? 0;
          return (
            <div
              key={cohort.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 font-geist">
                    {cohort.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-geist font-mono">
                    {cohort.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEditingCohort(cohort)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    <SolarIcon
                      icon="solar:pen-new-square-linear"
                      width={14}
                      height={14}
                    />
                  </button>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-geist ${statusColors[cohort.status]}`}
                  >
                    {cohort.status.charAt(0).toUpperCase() +
                      cohort.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-geist">
                  <SolarIcon
                    icon="solar:chair-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {cohort.spots_total} spots
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-geist">
                  <SolarIcon
                    icon="solar:calendar-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {formatDate(cohort.start_date)} —{" "}
                  {formatDate(cohort.end_date)}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-geist">
                  <SolarIcon
                    icon="solar:document-text-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {appCount} application{appCount !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="flex gap-2">
                {cohort.status !== "archived" && (
                  <Button
                    onClick={() => toggleStatus(cohort)}
                    disabled={updating === cohort.id}
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl text-xs"
                  >
                    {updating === cohort.id ? (
                      <div className="w-3 h-3 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                    ) : cohort.status === "open" ? (
                      <>
                        <SolarIcon
                          icon="solar:lock-linear"
                          width={14}
                          height={14}
                        />
                        Close
                      </>
                    ) : (
                      <>
                        <SolarIcon
                          icon="solar:lock-unlocked-linear"
                          width={14}
                          height={14}
                        />
                        Open
                      </>
                    )}
                  </Button>
                )}
                {cohort.status === "closed" && (
                  <Button
                    onClick={() => archiveCohort(cohort)}
                    disabled={updating === cohort.id}
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-xs text-neutral-400 hover:text-neutral-600"
                  >
                    <SolarIcon
                      icon="solar:archive-linear"
                      width={14}
                      height={14}
                    />
                    Archive
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Dialog */}
      <CohortFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={(newCohort) => {
          setCohorts((prev) => [newCohort, ...prev]);
          setCreateOpen(false);
        }}
      />

      {/* Edit Dialog */}
      <CohortFormDialog
        cohort={editingCohort ?? undefined}
        open={!!editingCohort}
        onOpenChange={(open) => {
          if (!open) setEditingCohort(null);
        }}
        onSuccess={(updated) => {
          setCohorts((prev) =>
            prev.map((c) => (c.id === updated.id ? updated : c))
          );
          setEditingCohort(null);
        }}
      />
    </div>
  );
}
