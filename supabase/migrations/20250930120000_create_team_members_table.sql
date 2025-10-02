CREATE TABLE team_members (
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

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access to active team members" ON team_members
  FOR SELECT USING (active = true);

CREATE POLICY "Allow admin full access to team members" ON team_members
  FOR ALL USING (true);

-- Insert sample team members (without images initially - they can be uploaded via admin)
INSERT INTO team_members (name, position, department, bio, experience, order_index) VALUES
('ABDUREHMAN YASSIN', 'Chief Executive Officer (CEO)', 'Executive Leadership', 'Founder and CEO leading ATICOM Investment Group with a vision for diversified growth and international excellence.', '15+ Years', 1),
('TESFAYE BIRHANU', 'Chief Operating Officer (COO)', 'Operations Management', 'COO driving operational excellence across divisions, ensuring efficiency and delivery at scale.', '12+ Years', 2),
('BIRUK ASMERA', 'Corporate Marketing and Sales', 'Marketing & Sales', 'Leads corporate marketing and sales strategy, strengthening brand presence and revenue growth.', '10+ Years', 3),
('ABDULAZIZ HUSSEIN', 'Corporate Finance and Procurement', 'Finance & Procurement', 'Oversees corporate finance and procurement, enabling sustainable growth through prudent resource management.', '8+ Years', 4);