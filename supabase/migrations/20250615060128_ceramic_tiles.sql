
-- Create table for vision and mission content
CREATE TABLE public.vision_mission (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vision_title TEXT NOT NULL DEFAULT 'Our Vision',
  vision_content TEXT NOT NULL,
  vision_points TEXT[] DEFAULT '{}',
  mission_title TEXT NOT NULL DEFAULT 'Our Mission', 
  mission_content TEXT NOT NULL,
  mission_points TEXT[] DEFAULT '{}',
  core_values JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for CSR content
CREATE TABLE public.csr_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Corporate Social Responsibility',
  subtitle TEXT NOT NULL,
  main_title TEXT NOT NULL,
  initiatives JSONB DEFAULT '[]',
  image_url TEXT,
  cta_text TEXT DEFAULT 'Learn More About Our CSR Initiatives',
  cta_link TEXT DEFAULT '/csr',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create table for partners content
CREATE TABLE public.partners_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Our Trusted Partners',
  subtitle TEXT NOT NULL DEFAULT 'Building strong partnerships across Ethiopia and beyond',
  partners JSONB DEFAULT '[]',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default vision and mission content
INSERT INTO public.vision_mission (
  vision_content,
  vision_points,
  mission_content,
  mission_points,
  core_values
) VALUES (
  'To be Ethiopia''s premier diversified business group, recognized internationally for excellence, innovation, and sustainable business practices across all our ventures.',
  ARRAY[
    'Establish world-class manufacturing and processing facilities',
    'Lead Ethiopia''s export market with high-quality products',
    'Drive economic growth through innovative business solutions'
  ],
  'To deliver exceptional value to customers, employees, shareholders, and communities through sustainable business operations that drive Ethiopia''s economic growth.',
  ARRAY[
    'Produce high-quality products that meet international standards',
    'Create employment opportunities and develop local skills',
    'Implement sustainable practices across all business operations'
  ],
  '[
    {"title": "Excellence", "description": "Striving for the highest standards in everything we do"},
    {"title": "Integrity", "description": "Conducting business with honesty, transparency and accountability"},
    {"title": "Innovation", "description": "Continuously seeking better ways to serve our stakeholders"},
    {"title": "Sustainability", "description": "Creating lasting positive impact for communities and environment"}
  ]'::jsonb
);

-- Insert default CSR content
INSERT INTO public.csr_content (
  subtitle,
  main_title,
  initiatives,
  image_url
) VALUES (
  'Committed to making a positive impact in Ethiopian communities through sustainable development and social initiatives',
  'We Are Active At Community Development',
  '[
    {
      "icon": "Heart",
      "title": "Community Housing Projects",
      "description": "Renovating houses for underprivileged residents in Akaki Qaliti Subdistrict 10, improving living conditions and community welfare.",
      "color": "green-500"
    },
    {
      "icon": "Users", 
      "title": "Local Employment",
      "description": "Creating sustainable employment opportunities for local communities through our diverse business operations.",
      "color": "blue-500"
    },
    {
      "icon": "Leaf",
      "title": "Environmental Sustainability", 
      "description": "Implementing eco-friendly practices in our agro-processing operations and promoting sustainable farming methods.",
      "color": "amber-500"
    }
  ]'::jsonb,
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png'
);

-- Insert default partners content
INSERT INTO public.partners_content (
  partners
) VALUES (
  '[
    {
      "name": "Ethiopian Airlines",
      "logo": "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png"
    },
    {
      "name": "Commercial Bank of Ethiopia", 
      "logo": "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
    },
    {
      "name": "Ethiopian Investment Commission",
      "logo": "/lovable-uploads/914150f2-c3e2-41f8-a334-a1c78c6c7692.png"
    },
    {
      "name": "Ministry of Agriculture",
      "logo": "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png"
    },
    {
      "name": "Export Development Bank",
      "logo": "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
    },
    {
      "name": "Ethiopian Chamber of Commerce", 
      "logo": "/lovable-uploads/914150f2-c3e2-41f8-a334-a1c78c6c7692.png"
    }
  ]'::jsonb
);

-- Add section header settings to site_settings
INSERT INTO public.site_settings (key, value, description) VALUES
('business_sectors_title', 'Our Business Sectors', 'Title for business sectors section'),
('news_section_title', 'Latest News & Updates', 'Main title for news section'),
('team_section_title', 'Our Leadership Team', 'Main title for team section'),
('team_section_subtitle', 'Meet the experienced professionals leading ATICOM Investment Group', 'Subtitle for team section')
ON CONFLICT (key) DO NOTHING;
