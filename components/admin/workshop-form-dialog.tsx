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
import type { WorkshopWithCount } from "@/types/database";

type WorkshopFormDialogProps = {
  workshop?: WorkshopWithCount;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (workshop: WorkshopWithCount) => void;
};

const inputClassName =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist";

export function WorkshopFormDialog({
  workshop,
  open,
  onOpenChange,
  onSuccess,
}: WorkshopFormDialogProps) {
  const isEdit = !!workshop;
  const hasRegistrations =
    isEdit && workshop.workshop_registrations[0]?.count > 0;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("Online (Zoom)");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      if (workshop) {
        setName(workshop.name);
        setSlug(workshop.slug);
        setDescription(workshop.description || "");
        setDateTime(toLocalDateTimeValue(workshop.date_time));
        setEndTime(workshop.end_time ? toLocalDateTimeValue(workshop.end_time) : "");
        setCapacity(workshop.capacity?.toString() || "");
        setLocation(workshop.location);
        setSlugManuallyEdited(true);
      } else {
        setName("");
        setSlug("");
        setDescription("");
        setDateTime("");
        setEndTime("");
        setCapacity("");
        setLocation("Online (Zoom)");
        setSlugManuallyEdited(false);
      }
      setError("");
    }
  }, [open, workshop]);

  function toLocalDateTimeValue(isoString: string): string {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  }

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
            id: workshop.id,
            name,
            slug,
            description: description || null,
            date_time: new Date(dateTime).toISOString(),
            end_time: endTime ? new Date(endTime).toISOString() : null,
            capacity: capacity ? parseInt(capacity) : null,
            location,
          }
        : {
            name,
            slug,
            description: description || null,
            date_time: new Date(dateTime).toISOString(),
            end_time: endTime ? new Date(endTime).toISOString() : null,
            capacity: capacity ? parseInt(capacity) : null,
            location,
          };

      const response = await fetch("/api/admin/workshops", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save workshop");
      }

      const saved = await response.json();
      toast.success(isEdit ? "Workshop updated" : "Workshop created");
      onSuccess(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="font-geist sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-geist">
            {isEdit ? "Edit Workshop" : "Create Workshop"}
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
                placeholder="AI Workshop"
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
                placeholder="ai-workshop"
                disabled={isEdit && hasRegistrations}
                className={`${inputClassName} ${isEdit && hasRegistrations ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {isEdit && hasRegistrations && (
                <p className="text-[10px] text-neutral-400 mt-1">
                  Cannot edit slug (has registrations)
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this workshop covers..."
              rows={2}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                required
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className={inputClassName}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                End Time
              </label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Capacity
              </label>
              <input
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Unlimited"
                className={inputClassName}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-neutral-500 mb-1.5 block">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Online (Zoom)"
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
                  : "Create Workshop"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
