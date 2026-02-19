"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { generateSlug } from "@/lib/validation";
import type { CohortWithCount } from "@/types/database";

type CohortFormDialogProps = {
  cohort?: CohortWithCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (cohort: CohortWithCount) => void;
};

const inputClassName =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist";

export function CohortFormDialog({
  cohort,
  open,
  onOpenChange,
  onSuccess,
}: CohortFormDialogProps) {
  const isEdit = !!cohort;
  const hasApplications =
    isEdit && cohort.applications[0]?.count > 0;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [spotsTotal, setSpotsTotal] = useState(20);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      if (cohort) {
        setName(cohort.name);
        setSlug(cohort.slug);
        setSpotsTotal(cohort.spots_total);
        setStartDate(cohort.start_date || "");
        setEndDate(cohort.end_date || "");
        setSlugManuallyEdited(true);
      } else {
        setName("");
        setSlug("");
        setSpotsTotal(20);
        setStartDate("");
        setEndDate("");
        setSlugManuallyEdited(false);
      }
      setError("");
    }
  }, [open, cohort]);

  function handleNameChange(value: string) {
    setName(value);
    if (!isEdit && !slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = isEdit
        ? {
            id: cohort.id,
            name,
            slug,
            spots_total: spotsTotal,
            start_date: startDate || null,
            end_date: endDate || null,
          }
        : {
            name,
            slug,
            spots_total: spotsTotal,
            start_date: startDate || null,
            end_date: endDate || null,
          };

      const response = await fetch("/api/admin/cohorts", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save cohort");
      }

      const saved = await response.json();
      toast.success(isEdit ? "Cohort updated" : "Cohort created");
      onSuccess(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-geist sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-geist">
            {isEdit ? "Edit Cohort" : "Create Cohort"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Cohort II"
                className={inputClassName}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                placeholder="cohort-2"
                disabled={isEdit && hasApplications}
                className={`${inputClassName} ${isEdit && hasApplications ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {isEdit && hasApplications && (
                <p className="text-[10px] text-neutral-400 mt-1">
                  Cannot edit slug (has applications)
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
              Total Spots
            </label>
            <input
              type="number"
              required
              min={1}
              value={spotsTotal}
              onChange={(e) => setSpotsTotal(parseInt(e.target.value) || 1)}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={inputClassName}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 font-geist">{error}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl text-xs"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs"
              size="sm"
            >
              {saving
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save Changes"
                  : "Create Cohort"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
