"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SolarIcon } from "@/components/ui/solar-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Workshop, WorkshopRegistration } from "@/types/database";

export default function WorkshopRegistrationsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>(
    []
  );
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] =
    useState<WorkshopRegistration | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const limit = 50;

  const fetchRegistrations = useCallback(async () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.set("search", search);

    const response = await fetch(
      `/api/admin/workshops/${slug}/registrations?${params}`
    );
    if (response.ok) {
      const data = await response.json();
      setRegistrations(data.data || []);
      setTotal(data.total || 0);
    }
    setLoading(false);
  }, [slug, page, search]);

  const fetchWorkshop = useCallback(async () => {
    const response = await fetch("/api/admin/workshops");
    if (response.ok) {
      const workshops = await response.json();
      const found = workshops.find(
        (w: Workshop) => w.slug === slug
      );
      if (found) setWorkshop(found);
    }
  }, [slug]);

  useEffect(() => {
    fetchWorkshop();
  }, [fetchWorkshop]);

  useEffect(() => {
    setLoading(true);
    fetchRegistrations();
  }, [fetchRegistrations]);

  const totalPages = Math.ceil(total / limit);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/workshops/${slug}/registrations/${deleteTarget.id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        setDeleteTarget(null);
        fetchRegistrations();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/workshops"
          className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-600 font-geist mb-3 transition-colors"
        >
          <SolarIcon
            icon="solar:arrow-left-linear"
            width={14}
            height={14}
          />
          Back to Workshops
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
              {workshop?.name || slug}
            </h1>
            <p className="text-sm text-neutral-500 font-geist">
              {total} registrant{total !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative">
          <SolarIcon
            icon="solar:magnifer-linear"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            width={16}
            height={16}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors font-geist"
          />
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3 font-geist">
                Name
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3 font-geist">
                Email
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3 font-geist">
                Registered
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 px-5 py-3 font-geist w-10">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-12">
                  <div className="flex items-center justify-center gap-2 text-sm text-neutral-400 font-geist">
                    <div className="w-4 h-4 border-2 border-neutral-300 border-t-orange-500 rounded-full animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-12 text-sm text-neutral-400 font-geist"
                >
                  {search
                    ? "No registrations match your search"
                    : "No registrations yet"}
                </td>
              </tr>
            ) : (
              registrations.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors group"
                >
                  <td className="px-5 py-3.5 text-sm text-neutral-900 font-geist">
                    {reg.full_name}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-neutral-600 font-geist">
                    {reg.email}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-neutral-500 font-geist">
                    {new Date(reg.registered_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setDeleteTarget(reg)}
                        className="p-1 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <SolarIcon
                          icon="solar:trash-bin-trash-linear"
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                          width={15}
                          height={15}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-neutral-400 font-geist">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-geist"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-geist"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="font-geist">
          <DialogHeader>
            <DialogTitle className="font-geist">
              Delete registration
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-neutral-500">
            Are you sure you want to remove{" "}
            <span className="font-medium text-neutral-700">
              {deleteTarget?.full_name}
            </span>{" "}
            ({deleteTarget?.email})? This will remove them from the workshop list
            and unsubscribe them from Beehiiv.
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
    </div>
  );
}
