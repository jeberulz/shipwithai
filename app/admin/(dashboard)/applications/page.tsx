import { ApplicationTable } from "@/components/admin/application-table";

export default function ApplicationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-light text-neutral-900 tracking-tight font-newsreader">
          Applications
        </h1>
        <p className="text-sm text-neutral-500 font-geist">
          Review and manage cohort applications
        </p>
      </div>

      <ApplicationTable />
    </div>
  );
}
