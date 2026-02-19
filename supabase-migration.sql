-- ═══════════════════════════════════════════
-- ShipWithAI Application Funnel
-- Run this in Supabase SQL Editor
-- ═══════════════════════════════════════════

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════
-- COHORTS TABLE
-- ═══════════════════════════════════════════
CREATE TABLE public.cohorts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  spots_total INTEGER NOT NULL DEFAULT 20,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════
-- APPLICATIONS TABLE
-- ═══════════════════════════════════════════
CREATE TABLE public.applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE RESTRICT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  years_of_experience TEXT NOT NULL,
  ai_usage TEXT NOT NULL,
  claude_experience TEXT NOT NULL,
  attendance TEXT NOT NULL,
  bootcamp_goals TEXT NOT NULL,
  anything_else TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (
    status IN ('submitted', 'under_review', 'accepted', 'payment_sent', 'paid', 'rejected', 'waitlisted')
  ),
  payment_url TEXT,
  paid_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewer_notes TEXT,
  beehiiv_subscriber_id TEXT,
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_applications_cohort_id ON public.applications(cohort_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_email ON public.applications(email);

-- ═══════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = '';

CREATE TRIGGER set_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_cohorts_updated_at
  BEFORE UPDATE ON public.cohorts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Public can read open cohorts (for form to check availability)
CREATE POLICY "Public can read open cohorts"
  ON public.cohorts FOR SELECT
  USING (status = 'open');

-- Public can insert applications (form submission, must be 'submitted' status)
CREATE POLICY "Public can insert applications"
  ON public.applications FOR INSERT
  WITH CHECK (status = 'submitted');

-- Service role key (used by admin API routes) bypasses RLS automatically

-- ═══════════════════════════════════════════
-- SEED: First cohort
-- ═══════════════════════════════════════════
INSERT INTO public.cohorts (name, slug, spots_total, status, start_date, end_date)
VALUES ('Cohort I', 'cohort-1', 20, 'open', '2026-03-17', '2026-03-28');
