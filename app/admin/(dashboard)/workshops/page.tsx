"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";
import { Button } from "@/components/ui/button";
import { WorkshopFormDialog } from "@/components/admin/workshop-form-dialog";
import type { WorkshopStatus, WorkshopWithCount } from "@/types/database";

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusColors: Record<WorkshopStatus, string> = {
  upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  live: "bg-green-50 text-green-700 border-green-200",
  completed: "bg-neutral-100 text-neutral-600 border-neutral-200",
  archived: "bg-neutral-50 text-neutral-400 border-neutral-200",
};

const nextStatusMap: Partial<Record<WorkshopStatus, { status: WorkshopStatus; label: string; icon: string }>> = {
  upcoming: { status: "live", label: "Go Live", icon: "solar:play-linear" },
  live: { status: "completed", label: "Complete", icon: "solar:check-circle-linear" },
  completed: { status: "archived", label: "Archive", icon: "solar:archive-linear" },
};

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<WorkshopWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] =
    useState<WorkshopWithCount | null>(null);

  const fetchWorkshops = useCallback(async () => {
    const response = await fetch("/api/admin/workshops");
    if (response.ok) {
      const data = await response.json();
      setWorkshops(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

  async function advanceStatus(workshop: WorkshopWithCount) {
    const next = nextStatusMap[workshop.status];
    if (!next) return;

    setUpdating(workshop.id);

    const response = await fetch("/api/admin/workshops", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: workshop.id, status: next.status }),
    });

    if (response.ok) {
      const updated = await response.json();
      setWorkshops((prev) =>
        prev.map((w) => (w.id === updated.id ? updated : w))
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
            Workshops
          </h1>
          <p className="text-sm text-neutral-500 font-geist">
            Manage your workshop series
          </p>
        </div>
        <Button
          onClick={() => setCreateOpen(true)}
          className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs"
          size="sm"
        >
          <SolarIcon icon="solar:add-circle-linear" width={14} height={14} />
          Create Workshop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workshops.map((workshop) => {
          const regCount = workshop.workshop_registrations[0]?.count ?? 0;
          const next = nextStatusMap[workshop.status];
          return (
            <div
              key={workshop.id}
              className="bg-white border border-neutral-200 rounded-2xl p-6 transition-all hover:shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0 flex-1 mr-2">
                  <h3 className="text-lg font-semibold text-neutral-900 font-geist truncate">
                    {workshop.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-geist font-mono">
                    {workshop.slug}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditingWorkshop(workshop)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                  >
                    <SolarIcon
                      icon="solar:pen-new-square-linear"
                      width={14}
                      height={14}
                    />
                  </button>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-geist ${statusColors[workshop.status]}`}
                  >
                    {workshop.status.charAt(0).toUpperCase() +
                      workshop.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-geist">
                  <SolarIcon
                    icon="solar:calendar-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {formatDateTime(workshop.date_time)}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-geist">
                  <SolarIcon
                    icon="solar:map-point-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {workshop.location}
                </div>
                <Link
                  href={`/admin/workshops/${workshop.slug}`}
                  className="flex items-center gap-2 text-sm text-neutral-600 font-geist hover:text-orange-600 transition-colors"
                >
                  <SolarIcon
                    icon="solar:users-group-rounded-linear"
                    className="text-neutral-400"
                    width={16}
                    height={16}
                  />
                  {workshop.capacity
                    ? `${regCount} / ${workshop.capacity} registered`
                    : `${regCount} registration${regCount !== 1 ? "s" : ""}`}
                </Link>
              </div>

              {next && (
                <Button
                  onClick={() => advanceStatus(workshop)}
                  disabled={updating === workshop.id}
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl text-xs"
                >
                  {updating === workshop.id ? (
                    <div className="w-3 h-3 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
                  ) : (
                    <>
                      <SolarIcon
                        icon={next.icon}
                        width={14}
                        height={14}
                      />
                      {next.label}
                    </>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {workshops.length === 0 && (
        <div className="text-center py-16">
          <SolarIcon
            icon="solar:presentation-graph-linear"
            className="text-neutral-300 mx-auto mb-3"
            width={40}
            height={40}
          />
          <p className="text-sm text-neutral-400 font-geist">
            No workshops yet. Create your first one.
          </p>
        </div>
      )}

      <WorkshopFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSuccess={(newWorkshop) => {
          setWorkshops((prev) => [newWorkshop, ...prev]);
          setCreateOpen(false);
        }}
      />

      <WorkshopFormDialog
        workshop={editingWorkshop ?? undefined}
        open={!!editingWorkshop}
        onOpenChange={(open) => {
          if (!open) setEditingWorkshop(null);
        }}
        onSuccess={(updated) => {
          setWorkshops((prev) =>
            prev.map((w) => (w.id === updated.id ? updated : w))
          );
          setEditingWorkshop(null);
        }}
      />
    </div>
  );
}
