
-- First, let's create the business_content table for detailed page content
CREATE TABLE public.business_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_sector_id UUID REFERENCES public.business_sectors(id) NOT NULL,
  page_title TEXT NOT NULL,
  hero_section JSONB DEFAULT '{}',
  about_section JSONB DEFAULT '{}',
  features_section JSONB DEFAULT '{}',
  gallery_images TEXT[] DEFAULT '{}',
  cta_section JSONB DEFAULT '{}',
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for business_content
ALTER TABLE public.business_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON public.business_content FOR ALL USING (true);

-- Update hero_slides to have a business_sector_id reference
ALTER TABLE public.hero_slides ADD COLUMN business_sector_id UUID REFERENCES public.business_sectors(id);

-- Create a function to ensure we always have exactly 7 hero slides and 7 business sectors
CREATE OR REPLACE FUNCTION ensure_seven_business_sectors()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
  sector_count INTEGER;
  slide_count INTEGER;
BEGIN
  -- Check business sectors count
  SELECT COUNT(*) INTO sector_count FROM public.business_sectors;
  
  -- If we don't have exactly 7 sectors, let's ensure we have the right ones
  IF sector_count != 7 THEN
    -- First, delete any existing sectors to start fresh
    DELETE FROM public.business_sectors;
    
    -- Insert the 7 predefined business sectors
    INSERT INTO public.business_sectors (title, description, image_url, features, route, order_index, active) VALUES
    ('Real Estate Development', 'Modern residential and commercial properties that shape Ethiopia''s urban landscape with quality and innovation.', 'https://nairametrics.com/wp-content/uploads/2022/03/Property-Development.jpg', '{"https://nairametrics.com/wp-content/uploads/2022/03/Property-Development.jpg"}', '/real-estate', 1, true),
    ('ATICADO Fresh Avocado', 'Premium Ethiopian avocados cultivated with sustainable farming practices and exported globally.', 'https://www.bda.uk.com/static/3f0121a6-68e0-4a0f-867102c9da2f0763/avocadoes.jpg', '{"Organic Farming","Global Export","Quality Control"}', '/avocado-fresh', 2, true),
    ('ATICADO Oil Production', 'Cold-pressed avocado oil delivering exceptional quality and nutritional value for health-conscious consumers.', 'https://arabianorganics.com/cdn/shop/files/9664-2057.png?v=1701342553', '{"Cold-Pressed","Premium Quality","Health Benefits"}', '/avocado-oil', 3, true),
    ('Cereal Crops Export', 'High-quality Ethiopian cereal crops including wheat, barley, and specialty grains for international markets.', 'https://millingmea.com/wp-content/uploads/2023/05/cereal-crops.jpg', '{"Wheat & Barley","Quality Assurance","Global Trading"}', '/cereal-crops', 4, true),
    ('Ethiopian Coffee Export', 'Premium Ethiopian coffee beans sourced from highlands, renowned for exceptional flavor and rich heritage.', 'https://coffeehunter.com/wp-content/uploads/2022/10/Ethiopia-square-2.jpg', '{"Highland Sourced","Premium Quality","Rich Heritage"}', '/coffee', 5, true),
    ('Bathroom Solutions', 'Modern bathroom fittings, sanitary ware, and complete bathroom solutions for residential and commercial projects.', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80', '{"Sanitary Ware","Complete Solutions","Modern Design"}', '/bathroom-solutions', 6, true),
    ('Ceramic Tiles', 'High-quality ceramic tiles for flooring and wall applications, combining durability with aesthetic appeal.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80', '{"Floor & Wall Tiles","Durable Materials","Aesthetic Design"}', '/ceramic-tiles', 7, true);
  END IF;

  -- Now ensure we have exactly 7 hero slides, one for each business sector
  DELETE FROM public.hero_slides;
  
  -- Insert hero slides linked to business sectors
  INSERT INTO public.hero_slides (title, subtitle, description, image_url, order_index, active, business_sector_id)
  SELECT 
    bs.title,
    CASE 
      WHEN bs.title = 'Real Estate Development' THEN 'Building Ethiopia''s Future'
      WHEN bs.title = 'ATICADO Fresh Avocado' THEN 'Premium Ethiopian Avocados'
      WHEN bs.title = 'ATICADO Oil Production' THEN 'Cold-Pressed Excellence'
      WHEN bs.title = 'Cereal Crops Export' THEN 'Quality Ethiopian Grains'
      WHEN bs.title = 'Ethiopian Coffee Export' THEN 'Rich Heritage Coffee'
      WHEN bs.title = 'Bathroom Solutions' THEN 'Complete Sanitary Solutions'
      WHEN bs.title = 'Ceramic Tiles' THEN 'Premium Tile Manufacturing'
    END as subtitle,
    bs.description,
    bs.image_url,
    bs.order_index,
    bs.active,
    bs.id
  FROM public.business_sectors bs
  ORDER BY bs.order_index;

  -- Create default business content for each sector
  INSERT INTO public.business_content (business_sector_id, page_title, hero_section, about_section, features_section, cta_section, meta_description)
  SELECT 
    bs.id,
    bs.title,
    jsonb_build_object(
      'title', bs.title,
      'subtitle', CASE 
        WHEN bs.title = 'Real Estate Development' THEN 'Building Ethiopia''s Future'
        WHEN bs.title = 'ATICADO Fresh Avocado' THEN 'Premium Ethiopian Avocados'
        WHEN bs.title = 'ATICADO Oil Production' THEN 'Cold-Pressed Excellence'
        WHEN bs.title = 'Cereal Crops Export' THEN 'Quality Ethiopian Grains'
        WHEN bs.title = 'Ethiopian Coffee Export' THEN 'Rich Heritage Coffee'
        WHEN bs.title = 'Bathroom Solutions' THEN 'Complete Sanitary Solutions'
        WHEN bs.title = 'Ceramic Tiles' THEN 'Premium Tile Manufacturing'
      END,
      'description', bs.description,
      'background_image', bs.image_url
    ),
    jsonb_build_object(
      'title', 'About Our ' || bs.title,
      'content', 'Learn more about our ' || bs.title || ' services and how we deliver excellence in this sector.',
      'image', bs.image_url
    ),
    jsonb_build_object(
      'title', 'Key Features',
      'features', bs.features
    ),
    jsonb_build_object(
      'title', 'Get Started Today',
      'description', 'Ready to explore our ' || bs.title || ' solutions?',
      'button_text', 'Contact Us',
      'button_link', '/contact'
    ),
    bs.description
  FROM public.business_sectors bs;
END;
$$;

-- Run the function to set up our data
SELECT ensure_seven_business_sectors();

-- Create indexes for better performance
CREATE INDEX idx_business_content_sector_id ON public.business_content(business_sector_id);
CREATE INDEX idx_hero_slides_sector_id ON public.hero_slides(business_sector_id);
