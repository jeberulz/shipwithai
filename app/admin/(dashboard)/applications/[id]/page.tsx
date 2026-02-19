import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { StatusBadge } from "@/components/admin/status-badge";
import { ApplicationActions } from "@/components/admin/application-actions";
import { SolarIcon } from "@/components/ui/solar-icon";
import type { ApplicationStatus, ApplicationWithCohort } from "@/types/database";

function DetailField({
  label,
  value,
  href,
}: {
  label: string;
  value: string | null;
  href?: string;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium text-neutral-400 mb-1 font-geist uppercase tracking-wider">
        {label}
      </p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-orange-600 hover:text-orange-500 underline font-geist break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-neutral-900 font-geist whitespace-pre-wrap">
          {value}
        </p>
      )}
    </div>
  );
}

function formatDate(dateString: string | null) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRole(role: string) {
  return role
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("applications")
    .select("*, cohort:cohorts(name, slug)")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const application = data as ApplicationWithCohort;

  return (
    <div>
      {/* Back link + header */}
      <div className="mb-6">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors font-geist mb-4"
        >
          <SolarIcon icon="solar:arrow-left-linear" width={14} height={14} />
          Back to Applications
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
              {application.full_name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-sm text-neutral-500 font-geist">
                {application.email}
              </p>
              <StatusBadge
                status={application.status as ApplicationStatus}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-4">
              About
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <DetailField label="Full Name" value={application.full_name} />
              <DetailField label="Email" value={application.email} />
              <DetailField
                label="LinkedIn"
                value={application.linkedin_url}
                href={application.linkedin_url}
              />
              <DetailField label="Role" value={formatRole(application.role)} />
              <DetailField label="Company" value={application.company} />
              <DetailField
                label="Experience"
                value={application.years_of_experience}
              />
            </div>
          </div>

          {/* AI Experience */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-4">
              AI Experience
            </h3>
            <div className="space-y-5">
              <DetailField
                label="How they use AI in design work"
                value={application.ai_usage}
              />
              <DetailField
                label="Claude experience"
                value={application.claude_experience.replace(/-/g, " ")}
              />
            </div>
          </div>

          {/* Commitment */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-4">
              Commitment
            </h3>
            <div className="space-y-5">
              <DetailField
                label="Attendance"
                value={application.attendance.replace(/-/g, " ")}
              />
              <DetailField
                label="Bootcamp Goals"
                value={application.bootcamp_goals}
              />
              <DetailField
                label="Anything Else"
                value={application.anything_else}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-4">
              Actions
            </h3>
            <ApplicationActions application={application} />
          </div>

          {/* Timeline */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-4">
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-neutral-700 font-geist">
                    Applied
                  </p>
                  <p className="text-xs text-neutral-400 font-geist">
                    {formatDate(application.created_at)}
                  </p>
                </div>
              </div>
              {application.reviewed_at && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-neutral-700 font-geist">
                      Reviewed
                    </p>
                    <p className="text-xs text-neutral-400 font-geist">
                      {formatDate(application.reviewed_at)}
                    </p>
                  </div>
                </div>
              )}
              {application.paid_at && (
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-neutral-700 font-geist">
                      Paid
                    </p>
                    <p className="text-xs text-neutral-400 font-geist">
                      {formatDate(application.paid_at)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {application.reviewer_notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-neutral-900 font-geist mb-2">
                Reviewer Notes
              </h3>
              <p className="text-sm text-neutral-700 font-geist whitespace-pre-wrap">
                {application.reviewer_notes}
              </p>
            </div>
          )}

          {/* Meta */}
          <div className="bg-neutral-100 rounded-2xl p-6">
            <div className="space-y-2 text-xs text-neutral-500 font-geist">
              <p>
                Cohort:{" "}
                <span className="text-neutral-700 font-medium">
                  {application.cohort.name}
                </span>
              </p>
              <p>
                Application ID:{" "}
                <span className="text-neutral-700 font-mono">
                  {application.id.slice(0, 8)}
                </span>
              </p>
              {application.beehiiv_subscriber_id && (
                <p>
                  Beehiiv ID:{" "}
                  <span className="text-neutral-700 font-mono">
                    {application.beehiiv_subscriber_id.slice(0, 8)}
                  </span>
                </p>
              )}
              {application.stripe_payment_id && (
                <p>
                  Stripe Payment:{" "}
                  <span className="text-neutral-700 font-mono">
                    {application.stripe_payment_id.slice(0, 12)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
