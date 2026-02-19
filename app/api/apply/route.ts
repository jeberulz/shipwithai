import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createBeehiivSubscriber } from "@/lib/beehiiv";
import { sendConversionEvent } from "@/lib/meta-pixel";
import { getSiteUrl } from "@/lib/site";
import type { ApplicationFormData } from "@/types/database";

export async function POST(request: Request) {
  try {
    const body: ApplicationFormData = await request.json();

    // Validate required fields
    const required = [
      "fullName",
      "email",
      "linkedinUrl",
      "selectedRole",
      "yearsOfExperience",
      "aiUsage",
      "claudeExperience",
      "attendance",
      "bootcampGoals",
      "cohortSlug",
    ] as const;

    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Look up cohort
    const { data: cohort, error: cohortError } = await supabase
      .from("cohorts")
      .select("id, spots_total, status")
      .eq("slug", body.cohortSlug)
      .single();

    if (cohortError || !cohort) {
      return NextResponse.json({ error: "Cohort not found" }, { status: 404 });
    }

    if (cohort.status !== "open") {
      return NextResponse.json(
        { error: "Applications are currently closed" },
        { status: 400 }
      );
    }

    // Check for duplicate email in this cohort
    const { data: existing } = await supabase
      .from("applications")
      .select("id")
      .eq("cohort_id", cohort.id)
      .eq("email", body.email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "You have already applied to this cohort" },
        { status: 409 }
      );
    }

    // Push to Beehiiv (non-blocking)
    let beehiivSubscriberId: string | null = null;
    try {
      beehiivSubscriberId = await createBeehiivSubscriber({
        email: body.email,
        fullName: body.fullName,
        role: body.selectedRole,
        company: body.company,
        cohortSlug: body.cohortSlug,
      });
    } catch (beehiivError) {
      console.error(
        "Beehiiv subscriber creation failed for email:",
        body.email,
        "| cohort:",
        body.cohortSlug,
        "| error:",
        beehiivError instanceof Error ? beehiivError.message : beehiivError
      );
    }

    // Insert application
    const { data: application, error: insertError } = await supabase
      .from("applications")
      .insert({
        cohort_id: cohort.id,
        full_name: body.fullName.trim(),
        email: body.email.toLowerCase().trim(),
        linkedin_url: body.linkedinUrl.trim(),
        role: body.selectedRole,
        company: body.company?.trim() || null,
        years_of_experience: body.yearsOfExperience,
        ai_usage: body.aiUsage.trim(),
        claude_experience: body.claudeExperience,
        attendance: body.attendance,
        bootcamp_goals: body.bootcampGoals.trim(),
        anything_else: body.anythingElse?.trim() || null,
        status: "submitted",
        beehiiv_subscriber_id: beehiivSubscriberId,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save application" },
        { status: 500 }
      );
    }

    // Fire Meta Conversions API events (non-blocking, best-effort)
    const metaData = body._meta;
    if (metaData) {
      const [firstName, ...lastNameParts] = body.fullName.trim().split(" ");
      const lastName = lastNameParts.join(" ");
      const sourceUrl = `${getSiteUrl()}/apply-page`;
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
              email: body.email,
              firstName,
              lastName: lastName || undefined,
              clientIpAddress: clientIp,
              clientUserAgent,
              fbc: metaData.fbc,
              fbp: metaData.fbp,
              customData: {
                content_name: "Bootcamp Application",
                content_category: "application",
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
              email: body.email,
              firstName,
              lastName: lastName || undefined,
              clientIpAddress: clientIp,
              clientUserAgent,
              fbc: metaData.fbc,
              fbp: metaData.fbp,
              customData: {
                content_name: body.cohortSlug,
                status: true,
              },
            })
          );
        }

        await Promise.all(capiPromises);
      } catch (metaError) {
        console.error(
          "Meta CAPI event failed (application was saved):",
          metaError instanceof Error ? metaError.message : metaError
        );
      }
    }

    return NextResponse.json(
      { success: true, applicationId: application.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error in /api/apply:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
