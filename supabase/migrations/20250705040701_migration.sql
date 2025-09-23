
-- Create SEO settings table for managing SEO data per page/business sector
CREATE TABLE public.seo_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_route text NOT NULL UNIQUE,
  business_sector_id uuid REFERENCES public.business_sectors(id),
  title text NOT NULL,
  meta_description text NOT NULL,
  meta_keywords text[] DEFAULT '{}',
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  og_type text DEFAULT 'website',
  twitter_title text,
  twitter_description text,
  twitter_image text,
  twitter_card text DEFAULT 'summary_large_image',
  structured_data jsonb DEFAULT '{}',
  focus_keywords text[] DEFAULT '{}',
  seo_score integer DEFAULT 0,
  index_status boolean DEFAULT true,
  follow_status boolean DEFAULT true,
  sitemap_priority numeric(2,1) DEFAULT 0.5,
  sitemap_changefreq text DEFAULT 'weekly',
  custom_robots_txt text,
  h1_tag text,
  alt_texts jsonb DEFAULT '{}',
  internal_links text[] DEFAULT '{}',
  external_links text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create SEO analytics table for tracking performance
CREATE TABLE public.seo_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_route text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  impressions integer DEFAULT 0,
  clicks integer DEFAULT 0,
  ctr numeric(5,2) DEFAULT 0,
  average_position numeric(5,2) DEFAULT 0,
  keywords_ranking jsonb DEFAULT '{}',
  backlinks_count integer DEFAULT 0,
  organic_traffic integer DEFAULT 0,
  bounce_rate numeric(5,2) DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(page_route, date)
);

-- Create SEO redirects table for managing URL redirects
CREATE TABLE public.seo_redirects (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  from_url text NOT NULL UNIQUE,
  to_url text NOT NULL,
  redirect_type integer DEFAULT 301,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS for all SEO tables
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_redirects ENABLE ROW LEVEL SECURITY;

-- Create policies for SEO settings (public read, admin write)
CREATE POLICY "Public can view SEO settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Admin can manage SEO settings" ON public.seo_settings FOR ALL USING (true);

-- Create policies for SEO analytics (admin only)
CREATE POLICY "Admin can manage SEO analytics" ON public.seo_analytics FOR ALL USING (true);

-- Create policies for SEO redirects (public read, admin write)
CREATE POLICY "Public can view redirects" ON public.seo_redirects FOR SELECT USING (active = true);
CREATE POLICY "Admin can manage redirects" ON public.seo_redirects FOR ALL USING (true);

-- Insert pre-populated SEO data for all 7 business sectors
INSERT INTO public.seo_settings (page_route, business_sector_id, title, meta_description, meta_keywords, focus_keywords, h1_tag, og_title, og_description, structured_data, sitemap_priority) 
SELECT 
  bs.route,
  bs.id,
  CASE 
    WHEN bs.route = '/real-estate' THEN 'Premium Real Estate Development in Ethiopia | ATICOM'
    WHEN bs.route = '/avocado-fresh' THEN 'Premium Ethiopian Avocados Export | ATICADO Fresh Avocados'
    WHEN bs.route = '/avocado-oil' THEN 'Cold-Pressed Avocado Oil Ethiopia | ATICADO Premium Oil'
    WHEN bs.route = '/cereal-crops' THEN 'Ethiopian Cereal Crops Export | Premium Wheat & Barley'
    WHEN bs.route = '/coffee' THEN 'Premium Ethiopian Coffee Export | Highland Coffee Beans'
    WHEN bs.route = '/bathroom-solutions' THEN 'Modern Bathroom Solutions Ethiopia | Sanitary Ware & Fittings'
    WHEN bs.route = '/ceramic-tiles' THEN 'Premium Ceramic Tiles Ethiopia | Floor & Wall Tiles'
  END,
  CASE 
    WHEN bs.route = '/real-estate' THEN 'Leading real estate development company in Ethiopia. Modern residential and commercial properties in Addis Ababa. Quality construction and urban planning services.'
    WHEN bs.route = '/avocado-fresh' THEN 'Export quality Ethiopian avocados. Hass, Fuerte, and premium varieties grown sustainably. GlobalGAP certified fresh avocados for international markets.'
    WHEN bs.route = '/avocado-oil' THEN 'Premium cold-pressed avocado oil from Ethiopia. Extra virgin, organic, and refined varieties. Rich in healthy fats and vitamins for cooking and skincare.'
    WHEN bs.route = '/cereal-crops' THEN 'Premium Ethiopian cereal crops for export. High-quality wheat, barley, and specialty grains. Sustainable farming and international quality standards.'
    WHEN bs.route = '/coffee' THEN 'Premium Ethiopian coffee beans from highland regions. Single origin arabica coffee with rich heritage and exceptional flavor profiles for global export.'
    WHEN bs.route = '/bathroom-solutions' THEN 'Complete modern bathroom solutions in Ethiopia. Premium sanitary ware, fixtures, and fittings for residential and commercial projects in Addis Ababa.'
    WHEN bs.route = '/ceramic-tiles' THEN 'High-quality ceramic tiles in Ethiopia. Durable floor and wall tiles with aesthetic designs for residential and commercial applications.'
  END,
  CASE 
    WHEN bs.route = '/real-estate' THEN ARRAY['Ethiopian real estate', 'Addis Ababa property', 'residential development', 'commercial buildings', 'property investment Ethiopia']
    WHEN bs.route = '/avocado-fresh' THEN ARRAY['Ethiopian avocados', 'Hass avocado export', 'fresh avocados', 'organic avocados', 'avocado farming Ethiopia']
    WHEN bs.route = '/avocado-oil' THEN ARRAY['avocado oil Ethiopia', 'cold pressed avocado oil', 'organic avocado oil', 'healthy cooking oil', 'skincare oil']
    WHEN bs.route = '/cereal-crops' THEN ARRAY['Ethiopian wheat', 'barley export', 'cereal crops Ethiopia', 'grain export', 'sustainable farming']
    WHEN bs.route = '/coffee' THEN ARRAY['Ethiopian coffee', 'arabica coffee', 'highland coffee', 'coffee export', 'single origin coffee']
    WHEN bs.route = '/bathroom-solutions' THEN ARRAY['bathroom solutions Ethiopia', 'sanitary ware Addis Ababa', 'bathroom fixtures', 'modern bathrooms', 'bathroom fittings']
    WHEN bs.route = '/ceramic-tiles' THEN ARRAY['ceramic tiles Ethiopia', 'floor tiles', 'wall tiles', 'bathroom tiles', 'kitchen tiles']
  END,
  CASE 
    WHEN bs.route = '/real-estate' THEN ARRAY['Ethiopian real estate', 'Addis Ababa property', 'residential development']
    WHEN bs.route = '/avocado-fresh' THEN ARRAY['Ethiopian avocados', 'fresh avocado export', 'Hass avocados']
    WHEN bs.route = '/avocado-oil' THEN ARRAY['avocado oil Ethiopia', 'cold pressed oil', 'organic oil']
    WHEN bs.route = '/cereal-crops' THEN ARRAY['Ethiopian wheat', 'cereal crops export', 'barley Ethiopia']
    WHEN bs.route = '/coffee' THEN ARRAY['Ethiopian coffee', 'arabica coffee beans', 'highland coffee']
    WHEN bs.route = '/bathroom-solutions' THEN ARRAY['bathroom solutions', 'sanitary ware Ethiopia', 'bathroom fixtures']
    WHEN bs.route = '/ceramic-tiles' THEN ARRAY['ceramic tiles', 'floor tiles Ethiopia', 'wall tiles']
  END,
  bs.title,
  bs.title,
  bs.description,
  jsonb_build_object(
    '@context', 'https://schema.org',
    '@type', 'Organization',
    'name', 'ATICOM',
    'description', bs.description,
    'url', 'https://aticom.com' || bs.route
  ),
  CASE 
    WHEN bs.route IN ('/real-estate', '/avocado-fresh', '/coffee') THEN 0.9
    WHEN bs.route IN ('/avocado-oil', '/cereal-crops') THEN 0.8
    ELSE 0.7
  END
FROM public.business_sectors bs;

-- Insert homepage SEO settings
INSERT INTO public.seo_settings (page_route, title, meta_description, meta_keywords, focus_keywords, h1_tag, og_title, og_description, sitemap_priority) VALUES
('/', 'ATICOM Ethiopia | Leading Business Conglomerate | Real Estate, Agriculture, Manufacturing', 'ATICOM is Ethiopia''s premier business conglomerate specializing in real estate development, premium agriculture exports, and modern manufacturing solutions across multiple sectors.', 
ARRAY['ATICOM Ethiopia', 'Ethiopian business', 'real estate Ethiopia', 'agriculture export', 'manufacturing Ethiopia', 'Addis Ababa business'], 
ARRAY['ATICOM Ethiopia', 'Ethiopian conglomerate', 'business Ethiopia'], 
'ATICOM - Leading Ethiopian Business Conglomerate', 
'ATICOM Ethiopia | Leading Business Conglomerate', 
'Premier Ethiopian business conglomerate in real estate, agriculture, and manufacturing. Quality solutions across multiple sectors.', 
1.0);

-- Insert other important pages SEO settings
INSERT INTO public.seo_settings (page_route, title, meta_description, meta_keywords, focus_keywords, h1_tag, sitemap_priority) VALUES
('/about', 'About ATICOM | Ethiopian Business Leader | Our Story & Vision', 'Learn about ATICOM''s journey as Ethiopia''s leading business conglomerate. Our vision, mission, and commitment to excellence across real estate, agriculture, and manufacturing.', 
ARRAY['about ATICOM', 'Ethiopian company history', 'business vision Ethiopia', 'company mission'], 
ARRAY['about ATICOM', 'company vision', 'Ethiopian business leader'], 
'About ATICOM - Our Story & Vision', 
0.8),
('/contact', 'Contact ATICOM Ethiopia | Get in Touch | Business Inquiries', 'Contact ATICOM for business inquiries, partnerships, and service requests. Located in Addis Ababa, serving Ethiopia and international markets.', 
ARRAY['contact ATICOM', 'business inquiries Ethiopia', 'Addis Ababa contact', 'Ethiopian company contact'], 
ARRAY['contact ATICOM', 'business inquiries', 'get in touch'], 
'Contact ATICOM - Get in Touch', 
0.6),
('/admin/hero-cards', 'Hero Cards Admin | ATICOM Dashboard', 'Manage hero section cards for the ATICOM website. Edit, create, and delete hero cards.',
ARRAY['ATICOM admin', 'hero cards management', 'dashboard', 'Supabase admin'],
ARRAY['hero cards admin', 'ATICOM dashboard', 'manage hero section'],
'Hero Cards Management',
0.5);
