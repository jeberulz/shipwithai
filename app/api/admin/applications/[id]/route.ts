import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { updateBeehiivTags, enrollInAutomation } from "@/lib/beehiiv";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("applications")
    .select("*, cohort:cohorts(name, slug)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { status, reviewer_notes, payment_url } = body;

  const admin = createAdminClient();

  // Fetch current application for Beehiiv tag update
  const { data: currentApp } = await admin
    .from("applications")
    .select("status, beehiiv_subscriber_id")
    .eq("id", id)
    .single();

  if (!currentApp) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  const updates: Record<string, unknown> = {};
  if (status) {
    updates.status = status;
    updates.reviewed_at = new Date().toISOString();
  }
  if (reviewer_notes !== undefined) updates.reviewer_notes = reviewer_notes;
  if (payment_url) updates.payment_url = payment_url;

  const { data, error } = await admin
    .from("applications")
    .update(updates)
    .eq("id", id)
    .select("*, cohort:cohorts(name, slug)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Update Beehiiv tags + enroll in automation if status changed
  if (status && currentApp.beehiiv_subscriber_id) {
    try {
      await updateBeehiivTags(
        currentApp.beehiiv_subscriber_id,
        [`status:${status}`],
        [`status:${currentApp.status}`]
      );
    } catch (beehiivError) {
      console.error("Beehiiv tag update failed:", beehiivError);
    }

    // Enroll in the corresponding Beehiiv automation
    try {
      await enrollInAutomation(data.email, status);
    } catch (automationError) {
      console.error("Beehiiv automation enrollment failed:", automationError);
    }
  }

  return NextResponse.json(data);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("applications").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
