import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Ship With AI - The Product Designer's Bootcamp",
  description:
    "6 live sessions. 12 production-ready AI workflows. A repeatable system for product designers and PMs who want to stop doing busywork and start shipping faster.",
  openGraph: {
    title: "Ship With AI - The Product Designer's Bootcamp",
    description:
      "6 live sessions. 12 production-ready AI workflows. A repeatable system for product designers and PMs who want to stop doing busywork and start shipping faster.",
    url: "/bootcamp",
    siteName: "Ship With AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ship With AI - The Product Designer's Bootcamp",
    description:
      "6 live sessions. 12 production-ready AI workflows. A repeatable system for product designers and PMs who want to stop doing busywork and start shipping faster.",
  },
};

export default function BootcampPage() {
  return <LandingPage />;
}
