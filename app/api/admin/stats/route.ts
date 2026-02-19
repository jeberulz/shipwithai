import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cohortId = request.nextUrl.searchParams.get("cohort_id");
  const admin = createAdminClient();

  let appQuery = admin.from("applications").select("status, cohort_id");
  if (cohortId) appQuery = appQuery.eq("cohort_id", cohortId);

  let cohortQuery = admin.from("cohorts").select("id, spots_total, status");
  if (cohortId) cohortQuery = cohortQuery.eq("id", cohortId);

  const [{ data: applications }, { data: cohorts }] = await Promise.all([
    appQuery,
    cohortQuery,
  ]);

  const apps = applications || [];
  const spotsTotal = cohortId
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

  return NextResponse.json(stats);
}
