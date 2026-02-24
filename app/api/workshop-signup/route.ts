import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createWorkshopSubscriber } from "@/lib/beehiiv";
import { sendConversionEvent } from "@/lib/meta-pixel";
import { getSiteUrl } from "@/lib/site";
import type { WorkshopSignupFormData } from "@/types/database";

export async function POST(request: Request) {
  try {
    const body: WorkshopSignupFormData = await request.json();

    if (!body.fullName?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const email = body.email.toLowerCase().trim();
    const workshopSlug = body.workshopSlug || "obsidian-claude-code-workshop";

    const { data: existing } = await supabase
      .from("workshop_registrations")
      .select("id")
      .eq("email", email)
      .eq("workshop_slug", workshopSlug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "You're already registered for this workshop!" },
        { status: 409 }
      );
    }

    let beehiivSubscriberId: string | null = null;
    try {
      beehiivSubscriberId = await createWorkshopSubscriber({
        email,
        fullName: body.fullName.trim(),
        workshopSlug,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
      });
    } catch (beehiivError) {
      console.error(
        "Beehiiv workshop subscriber failed:",
        beehiivError instanceof Error ? beehiivError.message : beehiivError
      );
    }

    const { error: insertError } = await supabase
      .from("workshop_registrations")
      .insert({
        email,
        full_name: body.fullName.trim(),
        workshop_slug: workshopSlug,
        beehiiv_subscriber_id: beehiivSubscriberId,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save registration" },
        { status: 500 }
      );
    }

    const metaData = body._meta;
    if (metaData) {
      const [firstName, ...lastNameParts] = body.fullName.trim().split(" ");
      const lastName = lastNameParts.join(" ");
      const sourceUrl = `${getSiteUrl()}/`;
      const clientIp =
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        undefined;
      const clientUserAgent = request.headers.get("user-agent") || undefined;

      try {
        const capiPromises: Promise<void>[] = [];

        if (metaData.leadEventId) {
          capiPromises.push(
            sendConversionEvent({
              eventName: "Lead",
              eventId: metaData.leadEventId,
              sourceUrl,
              email,
              firstName,
              lastName: lastName || undefined,
              clientIpAddress: clientIp,
              clientUserAgent,
              fbc: metaData.fbc,
              fbp: metaData.fbp,
              customData: {
                content_name: "Workshop Registration",
                content_category: "workshop",
              },
            })
          );
        }

        if (metaData.completeRegEventId) {
          capiPromises.push(
            sendConversionEvent({
              eventName: "CompleteRegistration",
              eventId: metaData.completeRegEventId,
              sourceUrl,
              email,
              firstName,
              lastName: lastName || undefined,
              clientIpAddress: clientIp,
              clientUserAgent,
              fbc: metaData.fbc,
              fbp: metaData.fbp,
              customData: {
                content_name: workshopSlug,
                status: true,
              },
            })
          );
        }

        await Promise.all(capiPromises);
      } catch (metaError) {
        console.error(
          "Meta CAPI event failed:",
          metaError instanceof Error ? metaError.message : metaError
        );
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Unexpected error in /api/workshop-signup:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
