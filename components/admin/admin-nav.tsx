"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SolarIcon } from "@/components/ui/solar-icon";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "solar:chart-square-linear",
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: "solar:document-text-linear",
  },
  {
    label: "Cohorts",
    href: "/admin/cohorts",
    icon: "solar:users-group-rounded-linear",
  },
  {
    label: "Workshops",
    href: "/admin/workshops",
    icon: "solar:presentation-graph-linear",
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-geist transition-colors",
              isActive
                ? "bg-orange-50 text-orange-700 border border-orange-200"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
          >
            <SolarIcon
              icon={item.icon}
              className={isActive ? "text-orange-500" : "text-neutral-400"}
              width={18}
              height={18}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
