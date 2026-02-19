import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/database";

const statusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  submitted: {
    label: "Submitted",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  under_review: {
    label: "Under Review",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  accepted: {
    label: "Accepted",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  payment_sent: {
    label: "Payment Sent",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  paid: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-50 text-red-700 border-red-200",
  },
  waitlisted: {
    label: "Waitlisted",
    className: "bg-neutral-50 text-neutral-600 border-neutral-200",
  },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium font-geist",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
