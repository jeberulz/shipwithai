import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      <AdminHeader email={user.email!} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 bg-white border-r border-neutral-200 min-h-[calc(100vh-48px)] p-4 shrink-0">
          <AdminNav />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
