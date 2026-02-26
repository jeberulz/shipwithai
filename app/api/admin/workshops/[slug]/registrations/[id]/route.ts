import { NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { unsubscribeBeehiivSubscriber } from "@/lib/beehiiv";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string; id: string }> }
) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, id } = await params;

  const admin = createAdminClient();

  const { data: registration, error: fetchError } = await admin
    .from("workshop_registrations")
    .select("id, workshop_slug, beehiiv_subscriber_id")
    .eq("id", id)
    .single();

  if (fetchError || !registration) {
    return NextResponse.json(
      { error: "Registration not found" },
      { status: 404 }
    );
  }

  if (registration.workshop_slug !== slug) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (registration.beehiiv_subscriber_id) {
    try {
      await unsubscribeBeehiivSubscriber(registration.beehiiv_subscriber_id);
    } catch (beehiivError) {
      console.error(
        "Beehiiv unsubscribe failed (proceeding with delete):",
        beehiivError instanceof Error ? beehiivError.message : beehiivError
      );
    }
  }

  const { error: deleteError } = await admin
    .from("workshop_registrations")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json(
      { error: deleteError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
