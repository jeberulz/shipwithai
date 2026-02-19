"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";
import { SolarIcon } from "@/components/ui/solar-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { ApplicationStatus, ApplicationWithCohort } from "@/types/database";

const statusOptions: { value: string; label: string }[] = [
  { value: "", label: "All Statuses" },
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under Review" },
  { value: "accepted", label: "Accepted" },
  { value: "payment_sent", label: "Payment Sent" },
  { value: "paid", label: "Paid" },
  { value: "rejected", label: "Rejected" },
  { value: "waitlisted", label: "Waitlisted" },
];

const selectClassName =
  "rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist appearance-none cursor-pointer";

export function ApplicationTable() {
  const [applications, setApplications] = useState<ApplicationWithCohort[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<ApplicationWithCohort | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    params.set("page", page.toString());

    const response = await fetch(`/api/admin/applications?${params}`);
    if (response.ok) {
      const data = await response.json();
      setApplications(data.data);
      setTotal(data.total);
    }
    setLoading(false);
  }, [statusFilter, search, page]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/applications/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDeleteTarget(null);
        fetchApplications();
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
    } finally {
      setIsDeleting(false);
    }
  }

  const totalPages = Math.ceil(total / 50);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <SolarIcon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-2.5 text-neutral-400 pointer-events-none"
            width={16}
            height={16}
          />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-neutral-200 bg-neutral-50 pl-9 pr-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist w-64"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className={selectClassName}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-neutral-400 font-geist ml-auto">
          {total} application{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-geist text-xs font-semibold">
                Name
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold">
                Email
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold">
                Role
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold">
                Experience
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold">
                Status
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold">
                Applied
              </TableHead>
              <TableHead className="font-geist text-xs font-semibold w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 font-geist">
                    <div className="w-4 h-4 border-2 border-neutral-300 border-t-orange-500 rounded-full animate-spin" />
                    Loading...
                  </div>
                </TableCell>
              </TableRow>
            ) : applications.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-sm text-neutral-400 font-geist"
                >
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id} className="group">
                  <TableCell className="font-geist text-sm font-medium">
                    {app.full_name}
                  </TableCell>
                  <TableCell className="font-geist text-sm text-neutral-500">
                    {app.email}
                  </TableCell>
                  <TableCell className="font-geist text-sm text-neutral-500 capitalize">
                    {app.role.replace(/-/g, " ")}
                  </TableCell>
                  <TableCell className="font-geist text-sm text-neutral-500">
                    {app.years_of_experience}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={app.status as ApplicationStatus} />
                  </TableCell>
                  <TableCell className="font-geist text-sm text-neutral-500">
                    {formatDate(app.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setDeleteTarget(app);
                        }}
                        className="p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <SolarIcon
                          icon="solar:trash-bin-trash-linear"
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          width={15}
                          height={15}
                        />
                      </button>
                      <Link href={`/admin/applications/${app.id}`}>
                        <SolarIcon
                          icon="solar:arrow-right-linear"
                          className="text-neutral-400 hover:text-orange-500 transition-colors"
                          width={16}
                          height={16}
                        />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="font-geist">
          <DialogHeader>
            <DialogTitle className="font-geist">Delete Application</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-neutral-500">
            Are you sure you want to delete the application from{" "}
            <span className="font-medium text-neutral-700">
              {deleteTarget?.full_name}
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="rounded-xl text-xs"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs"
              size="sm"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs font-geist rounded-lg border border-neutral-200 disabled:opacity-50 hover:bg-neutral-100 transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-neutral-500 font-geist">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-xs font-geist rounded-lg border border-neutral-200 disabled:opacity-50 hover:bg-neutral-100 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
