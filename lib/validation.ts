export const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateCohortPayload(payload: {
  name?: string;
  slug?: string;
  spots_total?: number;
  start_date?: string | null;
  end_date?: string | null;
}): string | null {
  if (payload.name !== undefined && !payload.name.trim()) {
    return "Name is required";
  }

  if (payload.slug !== undefined) {
    if (!payload.slug.trim()) return "Slug is required";
    if (!SLUG_REGEX.test(payload.slug)) {
      return "Slug must be lowercase letters, numbers, and hyphens only";
    }
  }

  if (payload.spots_total !== undefined) {
    if (!Number.isInteger(payload.spots_total) || payload.spots_total < 1) {
      return "Total spots must be a positive integer";
    }
  }

  if (payload.start_date && payload.end_date) {
    if (new Date(payload.end_date) <= new Date(payload.start_date)) {
      return "End date must be after start date";
    }
  }

  return null;
}
