"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SolarIcon } from "@/components/ui/solar-icon";
import type { ApplicationStatus, ApplicationWithCohort } from "@/types/database";

export function ApplicationActions({
  application,
}: {
  application: ApplicationWithCohort;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(application.payment_url || "");
  const [notesOpen, setNotesOpen] = useState(false);
  const [notes, setNotes] = useState(application.reviewer_notes || "");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function updateStatus(status: ApplicationStatus, extraData?: Record<string, string>) {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...extraData }),
      });
      if (!response.ok) throw new Error("Update failed");
      router.refresh();
    } catch (err) {
      console.error("Failed to update application:", err);
    } finally {
      setIsUpdating(false);
    }
  }

  async function saveNotes() {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewer_notes: notes }),
      });
      if (!response.ok) throw new Error("Update failed");
      setNotesOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteApplication() {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/applications/${application.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      setDeleteDialogOpen(false);
      router.push("/admin/applications");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete application:", err);
    } finally {
      setIsUpdating(false);
    }
  }

  async function sendPaymentLink() {
    if (!paymentUrl.trim()) return;
    await updateStatus("payment_sent", { payment_url: paymentUrl.trim() });
    setPaymentDialogOpen(false);
  }

  const status = application.status;

  return (
    <div className="space-y-4">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {(status === "submitted" || status === "under_review") && (
          <>
            <Button
              onClick={() => updateStatus("accepted")}
              disabled={isUpdating}
              className="bg-green-600 hover:bg-green-500 text-white text-xs rounded-xl"
              size="sm"
            >
              <SolarIcon icon="solar:check-circle-linear" width={14} height={14} />
              Accept
            </Button>
            <Button
              onClick={() => updateStatus("rejected")}
              disabled={isUpdating}
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50 text-xs rounded-xl"
              size="sm"
            >
              <SolarIcon icon="solar:close-circle-linear" width={14} height={14} />
              Reject
            </Button>
            <Button
              onClick={() => updateStatus("waitlisted")}
              disabled={isUpdating}
              variant="outline"
              className="text-neutral-600 text-xs rounded-xl"
              size="sm"
            >
              Waitlist
            </Button>
            {status === "submitted" && (
              <Button
                onClick={() => updateStatus("under_review")}
                disabled={isUpdating}
                variant="outline"
                className="text-yellow-700 border-yellow-200 hover:bg-yellow-50 text-xs rounded-xl"
                size="sm"
              >
                Mark Under Review
              </Button>
            )}
          </>
        )}

        {status === "accepted" && (
          <Button
            onClick={() => setPaymentDialogOpen(true)}
            disabled={isUpdating}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-xl"
            size="sm"
          >
            <SolarIcon icon="solar:card-linear" width={14} height={14} />
            Send Payment Link
          </Button>
        )}

        {status === "payment_sent" && application.payment_url && (
          <div className="text-xs text-neutral-500 font-geist">
            Payment link sent:{" "}
            <a
              href={application.payment_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 underline"
            >
              {application.payment_url.slice(0, 50)}...
            </a>
          </div>
        )}

        <Button
          onClick={() => setNotesOpen(true)}
          variant="outline"
          className="text-xs rounded-xl"
          size="sm"
        >
          <SolarIcon icon="solar:pen-new-square-linear" width={14} height={14} />
          {application.reviewer_notes ? "Edit Notes" : "Add Notes"}
        </Button>

        <Button
          onClick={() => setDeleteDialogOpen(true)}
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50 text-xs rounded-xl ml-auto"
          size="sm"
        >
          <SolarIcon icon="solar:trash-bin-trash-linear" width={14} height={14} />
          Delete
        </Button>
      </div>

      {/* Payment URL Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="font-geist">
          <DialogHeader>
            <DialogTitle className="font-geist">Send Payment Link</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-neutral-500">
            Paste the Stripe payment link for{" "}
            <span className="font-medium text-neutral-700">
              {application.full_name}
            </span>
            . This will update their status to &ldquo;Payment Sent&rdquo; and trigger a
            Beehiiv email automation.
          </p>
          <input
            type="url"
            value={paymentUrl}
            onChange={(e) => setPaymentUrl(e.target.value)}
            placeholder="https://buy.stripe.com/..."
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentDialogOpen(false)}
              className="rounded-xl text-xs"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={sendPaymentLink}
              disabled={isUpdating || !paymentUrl.trim()}
              className="bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs"
              size="sm"
            >
              Send Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="font-geist">
          <DialogHeader>
            <DialogTitle className="font-geist">Delete Application</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-neutral-500">
            Are you sure you want to delete the application from{" "}
            <span className="font-medium text-neutral-700">
              {application.full_name}
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="rounded-xl text-xs"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={deleteApplication}
              disabled={isUpdating}
              className="bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs"
              size="sm"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notes Dialog */}
      <Dialog open={notesOpen} onOpenChange={setNotesOpen}>
        <DialogContent className="font-geist">
          <DialogHeader>
            <DialogTitle className="font-geist">Reviewer Notes</DialogTitle>
          </DialogHeader>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Add private notes about this application..."
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist resize-none"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNotesOpen(false)}
              className="rounded-xl text-xs"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={saveNotes}
              disabled={isUpdating}
              className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs"
              size="sm"
            >
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
