import Link from "next/link";
import { SolarIcon } from "@/components/ui/solar-icon";

type LegalPageLayoutProps = {
  children: React.ReactNode;
};

export function LegalPageLayout({ children }: LegalPageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl border-l border-r border-dashed border-neutral-300 relative bg-white/50 min-h-screen">
      {/* Vertical Grid Lines Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4 opacity-20 z-0">
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
        <div className="w-px h-full bg-neutral-300" />
      </div>

      <main className="z-10 relative p-4 md:p-6 lg:p-8">
        <nav className="flex items-center justify-between mb-8 relative z-20">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight text-neutral-900 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-sm hover:border-orange-200 transition-colors"
          >
            <SolarIcon
              icon="solar:ufo-3-outline"
              className="text-lg text-orange-500"
              width={18}
              height={18}
            />
            ShipWithAI
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 bg-white px-4 py-2 rounded-full border border-neutral-200 transition-colors"
          >
            <SolarIcon icon="solar:arrow-left-linear" width={14} height={14} />
            Back to Home
          </Link>
        </nav>

        {children}
      </main>
    </div>
  );
}
