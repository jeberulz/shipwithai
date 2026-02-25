import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { validateWorkshopPayload } from "@/lib/validation";

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
    .from("workshops")
    .select("*, workshop_registrations(count)")
    .order("date_time", { ascending: false });

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
  const { name, slug, description, date_time, end_time, capacity, location } =
    body;

  const validationError = validateWorkshopPayload({
    name,
    slug,
    date_time,
    end_time,
    capacity,
  });
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("workshops")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (existing) {
    return NextResponse.json(
      { error: "A workshop with this slug already exists" },
      { status: 409 }
    );
  }

  const { data, error } = await admin
    .from("workshops")
    .insert({
      name: name.trim(),
      slug: slug.trim(),
      description: description?.trim() || null,
      date_time,
      end_time: end_time || null,
      status: "upcoming",
      capacity: capacity || null,
      location: location?.trim() || "Online (Zoom)",
    })
    .select("*, workshop_registrations(count)")
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
    return NextResponse.json(
      { error: "Missing workshop id" },
      { status: 400 }
    );
  }

  const validationError = validateWorkshopPayload(fields);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const admin = createAdminClient();

  if (fields.slug) {
    const { count } = await admin
      .from("workshop_registrations")
      .select("*", { count: "exact", head: true })
      .eq(
        "workshop_slug",
        (
          await admin.from("workshops").select("slug").eq("id", id).single()
        ).data?.slug ?? ""
      );

    if (count && count > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot change slug for a workshop that has registrations",
        },
        { status: 400 }
      );
    }

    const { data: existing } = await admin
      .from("workshops")
      .select("id")
      .eq("slug", fields.slug)
      .neq("id", id)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { error: "A workshop with this slug already exists" },
        { status: 409 }
      );
    }
  }

  const updates: Record<string, unknown> = {};
  if (fields.name !== undefined) updates.name = fields.name.trim();
  if (fields.slug !== undefined) updates.slug = fields.slug.trim();
  if (fields.description !== undefined)
    updates.description = fields.description?.trim() || null;
  if (fields.date_time !== undefined) updates.date_time = fields.date_time;
  if (fields.end_time !== undefined)
    updates.end_time = fields.end_time || null;
  if (fields.status !== undefined) updates.status = fields.status;
  if (fields.capacity !== undefined)
    updates.capacity = fields.capacity || null;
  if (fields.location !== undefined)
    updates.location = fields.location?.trim() || "Online (Zoom)";

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No fields to update" },
      { status: 400 }
    );
  }

  const { data, error } = await admin
    .from("workshops")
    .update(updates)
    .eq("id", id)
    .select("*, workshop_registrations(count)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
