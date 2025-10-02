
-- Corrected SQL: Use WITH CHECK for INSERT policy

-- 1. Create the job_positions table for admin-manageable careers
CREATE TABLE IF NOT EXISTS public.job_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  salary text NOT NULL,
  experience text NOT NULL,
  posted_date timestamp with time zone NOT NULL DEFAULT now(),
  urgent boolean DEFAULT false,
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  benefits text[] DEFAULT '{}',
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security so only admin can write, public can read
ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone (public) can read active jobs for displaying careers page
DROP POLICY IF EXISTS "Public can read active jobs" ON public.job_positions;
CREATE POLICY "Public can read active jobs" ON public.job_positions
  FOR SELECT
  USING (active = true);

-- 4. Policy: Admin users (identified by having email ending with "@aticom.com") can insert/update/delete

-- INSERT: must use WITH CHECK not USING
DROP POLICY IF EXISTS "Admin can insert jobs" ON public.job_positions;
CREATE POLICY "Admin can insert jobs" ON public.job_positions
  FOR INSERT
  TO authenticated
  WITH CHECK (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');

DROP POLICY IF EXISTS "Admin can update jobs" ON public.job_positions;
CREATE POLICY "Admin can update jobs" ON public.job_positions
  FOR UPDATE
  TO authenticated
  USING (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');

DROP POLICY IF EXISTS "Admin can delete jobs" ON public.job_positions;
CREATE POLICY "Admin can delete jobs" ON public.job_positions
  FOR DELETE
  TO authenticated
  USING (left(split_part(auth.email(), '@', 2), 10) = 'aticom.com');

