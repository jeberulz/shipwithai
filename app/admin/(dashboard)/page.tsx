import { Suspense } from "react";
import { createAdminClient } from "@/lib/supabase/admin";
import { StatCard } from "@/components/admin/stat-card";
import { CohortSelector } from "@/components/admin/cohort-selector";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ cohort_id?: string }>;
}) {
  const { cohort_id } = await searchParams;
  const supabase = createAdminClient();

  let appQuery = supabase.from("applications").select("status, cohort_id");
  if (cohort_id) appQuery = appQuery.eq("cohort_id", cohort_id);

  let cohortQuery = supabase
    .from("cohorts")
    .select("id, name, spots_total, status");
  if (cohort_id) cohortQuery = cohortQuery.eq("id", cohort_id);

  const allCohortsQuery = supabase
    .from("cohorts")
    .select("id, name, status")
    .order("created_at", { ascending: false });

  const [{ data: applications }, { data: cohorts }, { data: allCohorts }] =
    await Promise.all([appQuery, cohortQuery, allCohortsQuery]);

  const apps = applications || [];
  const spotsTotal = cohort_id
    ? cohorts?.[0]?.spots_total || 20
    : cohorts?.reduce((sum, c) => sum + c.spots_total, 0) || 20;

  const paidCount = apps.filter((a) => a.status === "paid").length;

  const stats = {
    total: apps.length,
    submitted: apps.filter((a) => a.status === "submitted").length,
    under_review: apps.filter((a) => a.status === "under_review").length,
    accepted: apps.filter((a) => a.status === "accepted").length,
    payment_sent: apps.filter((a) => a.status === "payment_sent").length,
    paid: paidCount,
    rejected: apps.filter((a) => a.status === "rejected").length,
    waitlisted: apps.filter((a) => a.status === "waitlisted").length,
    spots_remaining: spotsTotal - paidCount,
  };

  const selectedCohort = cohort_id
    ? allCohorts?.find((c) => c.id === cohort_id)
    : null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
            Dashboard
          </h1>
          <p className="text-sm text-neutral-500 font-geist">
            {selectedCohort
              ? `${selectedCohort.name} pipeline`
              : "Application pipeline overview"}
          </p>
        </div>
        <Suspense>
          <CohortSelector
            cohorts={allCohorts || []}
            selectedId={cohort_id || null}
          />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Applications"
          value={stats.total}
          icon="solar:document-text-linear"
          accent
        />
        <StatCard
          label="Spots Remaining"
          value={stats.spots_remaining}
          icon="solar:chair-linear"
          accent
        />
        <StatCard
          label="New / Submitted"
          value={stats.submitted}
          icon="solar:inbox-linear"
        />
        <StatCard
          label="Under Review"
          value={stats.under_review}
          icon="solar:eye-linear"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Accepted"
          value={stats.accepted}
          icon="solar:check-circle-linear"
        />
        <StatCard
          label="Payment Sent"
          value={stats.payment_sent}
          icon="solar:card-linear"
        />
        <StatCard
          label="Paid (Enrolled)"
          value={stats.paid}
          icon="solar:verified-check-linear"
        />
        <StatCard
          label="Rejected"
          value={stats.rejected}
          icon="solar:close-circle-linear"
        />
      </div>
    </div>
  );
}
