
-- 1. Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_position_id uuid NOT NULL REFERENCES public.job_positions(id) ON DELETE CASCADE,
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text,
  experience text,
  cover_letter text,
  resume_url text,
  status text DEFAULT 'pending',
  reviewed_by text,
  reviewed_at timestamp with time zone,
  submitted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Enable RLS for job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 3. Public (for now) can insert new applications (Apply Now).
DROP POLICY IF EXISTS "Anyone can submit job applications" ON public.job_applications;
CREATE POLICY "Anyone can submit job applications"
  ON public.job_applications
  FOR INSERT
  WITH CHECK (true);

-- 4. Only admin (email ending with '@aticom.com') can SELECT, UPDATE, or DELETE
DROP POLICY IF EXISTS "Admin can view all applications" ON public.job_applications;
CREATE POLICY "Admin can view all applications"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');

DROP POLICY IF EXISTS "Admin can update applications" ON public.job_applications;
CREATE POLICY "Admin can update applications"
  ON public.job_applications
  FOR UPDATE
  TO authenticated
  USING (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');

DROP POLICY IF EXISTS "Admin can delete applications" ON public.job_applications;
CREATE POLICY "Admin can delete applications"
  ON public.job_applications
  FOR DELETE
  TO authenticated
  USING (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');
