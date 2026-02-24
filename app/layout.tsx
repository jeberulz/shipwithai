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
    default: "Obsidian + Claude Code Workshop - Build Your AI Content System",
    template: "%s | Ship With AI",
  },
  description:
    "Free live workshop: Build an AI content system with Obsidian + Claude Code. Turn one idea into a week of content across all your platforms in 60 minutes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Obsidian + Claude Code Workshop - Build Your AI Content System",
    description:
      "Free live workshop: Build an AI content system with Obsidian + Claude Code. Turn one idea into a week of content across all your platforms in 60 minutes.",
    url: "/",
    siteName: "Ship With AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian + Claude Code Workshop - Build Your AI Content System",
    description:
      "Free live workshop: Build an AI content system with Obsidian + Claude Code. Turn one idea into a week of content across all your platforms in 60 minutes.",
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
