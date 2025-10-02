-- =====================================================
-- TEAM DATABASE SETUP - Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  bio text NOT NULL,
  image_url text,
  experience text,
  order_index integer NOT NULL,
  active boolean DEFAULT TRUE,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Step 2: Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies
DROP POLICY IF EXISTS "Allow public read access to active team members" ON team_members;
CREATE POLICY "Allow public read access to active team members" ON team_members
  FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Allow admin full access to team members" ON team_members;
CREATE POLICY "Allow admin full access to team members" ON team_members
  FOR ALL USING (true);

-- Step 4: Create storage bucket for team images (use existing hero-cards bucket)
-- The hero-cards bucket should already exist from other migrations

-- Step 5: Insert sample team members (without images initially)
INSERT INTO team_members (name, position, department, bio, experience, order_index) VALUES
('ABDUREHMAN YASSIN', 'Chief Executive Officer (CEO)', 'Executive Leadership', 'Founder and CEO leading ATICOM Investment Group with a vision for diversified growth and international excellence.', '15+ Years', 1),
('TESFAYE BIRHANU', 'Chief Operating Officer (COO)', 'Operations Management', 'COO driving operational excellence across divisions, ensuring efficiency and delivery at scale.', '12+ Years', 2),
('BIRUK ASMERA', 'Corporate Marketing and Sales', 'Marketing & Sales', 'Leads corporate marketing and sales strategy, strengthening brand presence and revenue growth.', '10+ Years', 3),
('ABDULAZIZ HUSSEIN', 'Corporate Finance and Procurement', 'Finance & Procurement', 'Oversees corporate finance and procurement, enabling sustainable growth through prudent resource management.', '8+ Years', 4)
ON CONFLICT DO NOTHING;

-- Step 6: Verify the setup
SELECT 'Team members table created successfully' as status;
SELECT COUNT(*) as team_member_count FROM team_members;
