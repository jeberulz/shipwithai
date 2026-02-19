import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import { MetaPixelProvider } from "@/components/meta-pixel-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Ship With AI - The Product Designer's Bootcamp",
    template: "%s | Ship With AI",
  },
  description:
    "6 live sessions. 12 production-ready AI workflows. A repeatable system for product designers and PMs who want to stop doing busywork and start shipping faster.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ship With AI - The Product Designer's Bootcamp",
    description:
      "6 live sessions. 12 production-ready AI workflows. A repeatable system for product designers and PMs who want to stop doing busywork and start shipping faster.",
    url: "/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${newsreader.variable} antialiased`}>
        <MetaPixelProvider />
        {children}
      </body>
    </html>
  );
}
