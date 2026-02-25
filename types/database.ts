export type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "accepted"
  | "payment_sent"
  | "paid"
  | "rejected"
  | "waitlisted";

export type CohortStatus = "open" | "closed" | "archived";

export type Cohort = {
  id: string;
  name: string;
  slug: string;
  spots_total: number;
  status: CohortStatus;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
};

export type Application = {
  id: string;
  cohort_id: string;
  full_name: string;
  email: string;
  linkedin_url: string;
  role: string;
  company: string | null;
  years_of_experience: string;
  ai_usage: string;
  claude_experience: string;
  attendance: string;
  bootcamp_goals: string;
  anything_else: string | null;
  status: ApplicationStatus;
  payment_url: string | null;
  paid_at: string | null;
  reviewed_at: string | null;
  reviewer_notes: string | null;
  beehiiv_subscriber_id: string | null;
  stripe_payment_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ApplicationWithCohort = Application & {
  cohort: Pick<Cohort, "name" | "slug">;
};

export type ApplicationFormData = {
  fullName: string;
  email: string;
  linkedinUrl: string;
  selectedRole: string;
  company: string;
  yearsOfExperience: string;
  aiUsage: string;
  claudeExperience: string;
  attendance: string;
  bootcampGoals: string;
  anythingElse: string;
  cohortSlug: string;
  _meta?: {
    leadEventId?: string;
    completeRegEventId?: string;
    fbp?: string;
    fbc?: string;
  };
};

export type CohortCreatePayload = {
  name: string;
  slug: string;
  spots_total: number;
  start_date?: string | null;
  end_date?: string | null;
};

export type CohortUpdatePayload = {
  id: string;
  name?: string;
  slug?: string;
  spots_total?: number;
  status?: CohortStatus;
  start_date?: string | null;
  end_date?: string | null;
};

export type CohortWithCount = Cohort & {
  applications: [{ count: number }];
};

export type DashboardStats = {
  total: number;
  submitted: number;
  under_review: number;
  accepted: number;
  payment_sent: number;
  paid: number;
  rejected: number;
  waitlisted: number;
  spots_remaining: number;
};

export type WorkshopStatus = "upcoming" | "live" | "completed" | "archived";

export type Workshop = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  date_time: string;
  end_time: string | null;
  status: WorkshopStatus;
  capacity: number | null;
  location: string;
  created_at: string;
  updated_at: string;
};

export type WorkshopWithCount = Workshop & {
  workshop_registrations: [{ count: number }];
};

export type WorkshopCreatePayload = {
  name: string;
  slug: string;
  description?: string | null;
  date_time: string;
  end_time?: string | null;
  capacity?: number | null;
  location?: string;
};

export type WorkshopUpdatePayload = {
  id: string;
  name?: string;
  slug?: string;
  description?: string | null;
  date_time?: string;
  end_time?: string | null;
  status?: WorkshopStatus;
  capacity?: number | null;
  location?: string;
};

export type WorkshopRegistration = {
  id: string;
  email: string;
  full_name: string;
  workshop_slug: string;
  beehiiv_subscriber_id: string | null;
  registered_at: string;
};

export type WorkshopSignupFormData = {
  fullName: string;
  email: string;
  workshopSlug: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  _meta?: {
    leadEventId?: string;
    completeRegEventId?: string;
    fbp?: string;
    fbc?: string;
  };
};
