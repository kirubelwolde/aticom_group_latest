-- =====================================================
-- ATICOM CRUD SETUP - FINAL VERSION
-- =====================================================
-- Run this script in your Supabase Dashboard SQL Editor
-- This will set up all the necessary fields and policies
-- for Vision & Mission, CSR, and Partners CRUD functionality

-- =====================================================
-- STEP 1: Add missing database fields
-- =====================================================

-- Add hero_image field to vision_mission table
ALTER TABLE public.vision_mission 
ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- Add hero_image field to csr_content table
ALTER TABLE public.csr_content 
ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- Add hero_image field to partners_content table
ALTER TABLE public.partners_content 
ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- =====================================================
-- STEP 2: Create storage buckets for images
-- =====================================================

-- Create hero-cards bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hero-cards', 'hero-cards', true)
ON CONFLICT (id) DO NOTHING;

-- Create csr-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('csr-images', 'csr-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create partner-logos bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STEP 3: Set up storage policies for hero-images
-- =====================================================

-- Public can view hero images
CREATE POLICY "Public can view hero images" ON storage.objects
FOR SELECT USING (bucket_id = 'hero-cards');

-- Admin can upload hero images
CREATE POLICY "Admin can upload hero images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'hero-cards' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can update hero images
CREATE POLICY "Admin can update hero images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'hero-cards' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can delete hero images
CREATE POLICY "Admin can delete hero images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'hero-cards' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- =====================================================
-- STEP 4: Set up storage policies for csr-images
-- =====================================================

-- Public can view CSR images
CREATE POLICY "Public can view CSR images" ON storage.objects
FOR SELECT USING (bucket_id = 'csr-images');

-- Admin can upload CSR images
CREATE POLICY "Admin can upload CSR images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'csr-images' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can update CSR images
CREATE POLICY "Admin can update CSR images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'csr-images' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can delete CSR images
CREATE POLICY "Admin can delete CSR images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'csr-images' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- =====================================================
-- STEP 5: Set up storage policies for partner-logos
-- =====================================================

-- Public can view partner logos
CREATE POLICY "Public can view partner logos" ON storage.objects
FOR SELECT USING (bucket_id = 'partner-logos');

-- Admin can upload partner logos
CREATE POLICY "Admin can upload partner logos" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'partner-logos' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can update partner logos
CREATE POLICY "Admin can update partner logos" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'partner-logos' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Admin can delete partner logos
CREATE POLICY "Admin can delete partner logos" ON storage.objects
FOR DELETE USING (
  bucket_id = 'partner-logos' AND 
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- =====================================================
-- STEP 6: Set default hero images for existing content
-- =====================================================

-- Set default hero image for vision_mission
UPDATE public.vision_mission 
SET hero_image = '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png'
WHERE hero_image IS NULL;

-- Set default hero image for csr_content
UPDATE public.csr_content 
SET hero_image = '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png'
WHERE hero_image IS NULL;

-- =====================================================
-- STEP 7: Enable Row Level Security (RLS)
-- =====================================================

-- Enable RLS on vision_mission table
ALTER TABLE public.vision_mission ENABLE ROW LEVEL SECURITY;

-- Enable RLS on csr_content table
ALTER TABLE public.csr_content ENABLE ROW LEVEL SECURITY;

-- Enable RLS on partners_content table
ALTER TABLE public.partners_content ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 8: Create RLS policies for content tables
-- =====================================================

-- Vision Mission policies
DROP POLICY IF EXISTS "Public can view vision mission" ON public.vision_mission;
CREATE POLICY "Public can view vision mission" ON public.vision_mission
FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admin can manage vision mission" ON public.vision_mission;
CREATE POLICY "Admin can manage vision mission" ON public.vision_mission
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- CSR Content policies
DROP POLICY IF EXISTS "Public can view CSR content" ON public.csr_content;
CREATE POLICY "Public can view CSR content" ON public.csr_content
FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admin can manage CSR content" ON public.csr_content;
CREATE POLICY "Admin can manage CSR content" ON public.csr_content
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- Partners Content policies
DROP POLICY IF EXISTS "Public can view partners content" ON public.partners_content;
CREATE POLICY "Public can view partners content" ON public.partners_content
FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Admin can manage partners content" ON public.partners_content;
CREATE POLICY "Admin can manage partners content" ON public.partners_content
FOR ALL USING (
  auth.role() = 'authenticated' AND 
  auth.jwt() ->> 'email' LIKE '%@aticom.com'
);

-- =====================================================
-- STEP 9: Insert sample data if tables are empty
-- =====================================================

-- Insert sample vision_mission data if none exists
INSERT INTO public.vision_mission (
  vision_title,
  vision_content,
  vision_points,
  mission_title,
  mission_content,
  mission_points,
  core_values,
  hero_image,
  active
) 
SELECT 
  'Our Vision',
  'To be Ethiopia''s premier diversified business group, recognized internationally for excellence, innovation, and sustainable business practices across all our ventures.',
  ARRAY[
    'Establish world-class manufacturing and processing facilities',
    'Lead Ethiopia''s export market with high-quality products',
    'Drive economic growth through innovative business solutions'
  ],
  'Our Mission',
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
  ]'::jsonb,
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.vision_mission);

-- Insert sample csr_content data if none exists
INSERT INTO public.csr_content (
  title,
  subtitle,
  main_title,
  initiatives,
  image_url,
  hero_image,
  cta_text,
  cta_link,
  active
)
SELECT 
  'Corporate Social Responsibility',
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
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  'Learn More About Our CSR Initiatives',
  '/csr',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.csr_content);

-- Insert sample partners_content data if none exists
INSERT INTO public.partners_content (
  title,
  subtitle,
  partners,
  hero_image,
  active
)
SELECT 
  'Our Trusted Partners',
  'Building strong partnerships across Ethiopia and beyond',
  '[
    {
      "name": "Ethiopian Airlines",
      "logo": "/lovable-uploads/c3.jpg"
    },
    {
      "name": "Commercial Bank of Ethiopia", 
      "logo": "/lovable-uploads/commercial_bank.jpg"
    },
    {
      "name": "Ethiopian Investment Commission",
      "logo": "/lovable-uploads/c4.jpg"
    }
  ]'::jsonb,
  '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.partners_content);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- This will show a success message in the SQL editor
SELECT '✅ ATICOM CRUD Setup Completed Successfully!' as status,
       'Your Vision & Mission, CSR, and Partners pages now have full CRUD functionality!' as message,
       'Go to your admin panel to start managing content.' as next_step;
