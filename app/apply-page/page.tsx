import type { Metadata } from "next";
import { ApplyPage } from "@/components/apply/apply-page";

export const metadata: Metadata = {
  title: "Apply for Cohort I - Ship With AI",
  description:
    "Apply to join Ship With AI Cohort I. 20 spots available for product designers and PMs building real AI workflows.",
};

export default function ApplyPageRoute() {
  return <ApplyPage />;
}
