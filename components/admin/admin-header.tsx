"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { SolarIcon } from "@/components/ui/solar-icon";

export function AdminHeader({ email }: { email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <header className="bg-[#08090a] text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <SolarIcon
          icon="solar:ufo-3-outline"
          className="text-orange-400"
          width={22}
          height={22}
        />
        <span className="text-sm font-semibold font-geist tracking-tight">
          ShipWithAI
        </span>
        <span className="text-xs text-neutral-500 font-geist">Admin</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-neutral-400 font-geist">{email}</span>
        <button
          onClick={handleSignOut}
          className="text-xs text-neutral-400 hover:text-white transition-colors font-geist flex items-center gap-1.5"
        >
          <SolarIcon icon="solar:logout-2-linear" width={14} height={14} />
          Sign Out
        </button>
      </div>
    </header>
  );
}
