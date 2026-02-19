import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateCohortPayload } from "@/lib/validation";

async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return null;
  }
  return user;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("cohorts")
    .select("*, applications(count)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, spots_total, start_date, end_date } = body;

  const validationError = validateCohortPayload({
    name,
    slug,
    spots_total,
    start_date,
    end_date,
  });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const admin = createAdminClient();

  // Check slug uniqueness
  const { data: existing } = await admin
    .from("cohorts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: "A cohort with this slug already exists" },
      { status: 409 }
    );
  }

  const { data, error } = await admin
    .from("cohorts")
    .insert({
      name: name.trim(),
      slug: slug.trim(),
      spots_total,
      status: "closed",
      start_date: start_date || null,
      end_date: end_date || null,
    })
    .select("*, applications(count)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing cohort id" }, { status: 400 });
  }

  const validationError = validateCohortPayload(fields);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const admin = createAdminClient();

  // If changing slug, block if cohort has applications
  if (fields.slug) {
    const { count } = await admin
      .from("applications")
      .select("*", { count: "exact", head: true })
      .eq("cohort_id", id);

    if (count && count > 0) {
      return NextResponse.json(
        { error: "Cannot change slug for a cohort that has applications" },
        { status: 400 }
      );
    }

    // Check slug uniqueness (excluding this cohort)
    const { data: existing } = await admin
      .from("cohorts")
      .select("id")
      .eq("slug", fields.slug)
      .neq("id", id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "A cohort with this slug already exists" },
        { status: 409 }
      );
    }
  }

  // If opening this cohort, close any currently open ones first
  if (fields.status === "open") {
    await admin
      .from("cohorts")
      .update({ status: "closed" })
      .eq("status", "open")
      .neq("id", id);
  }

  // Build update object from provided fields only
  const updates: Record<string, unknown> = {};
  if (fields.name !== undefined) updates.name = fields.name.trim();
  if (fields.slug !== undefined) updates.slug = fields.slug.trim();
  if (fields.spots_total !== undefined) updates.spots_total = fields.spots_total;
  if (fields.status !== undefined) updates.status = fields.status;
  if (fields.start_date !== undefined)
    updates.start_date = fields.start_date || null;
  if (fields.end_date !== undefined)
    updates.end_date = fields.end_date || null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("cohorts")
    .update(updates)
    .eq("id", id)
    .select("*, applications(count)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
