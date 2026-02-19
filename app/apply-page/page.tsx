import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { ApplyPage } from "@/components/apply/apply-page";
import { MetaPixelViewContent } from "@/components/meta-pixel-events";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createAdminClient();
  const { data: cohort } = await supabase
    .from("cohorts")
    .select("name")
    .eq("status", "open")
    .maybeSingle();

  return {
    title: cohort
      ? `Apply for ${cohort.name} - Ship With AI`
      : "Applications Closed - Ship With AI",
    description: cohort
      ? `Apply to join Ship With AI ${cohort.name}. Limited spots available for product designers and PMs building real AI workflows.`
      : "Applications are currently closed. Join our newsletter for updates.",
  };
}

export default async function ApplyPageRoute() {
  const supabase = createAdminClient();
  const { data: cohort } = await supabase
    .from("cohorts")
    .select("id, name, slug, spots_total, start_date, end_date, status")
    .eq("status", "open")
    .maybeSingle();

  return (
    <>
      <MetaPixelViewContent
        contentName="Apply Page"
        contentCategory="application"
      />
      <ApplyPage cohort={cohort} />
    </>
  );
}
