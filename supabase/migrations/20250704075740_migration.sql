
-- Create bathroom products table
CREATE TABLE public.bathroom_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_sector_id UUID REFERENCES public.business_sectors(id),
  name TEXT NOT NULL,
  model TEXT,
  category TEXT NOT NULL,
  price TEXT,
  features TEXT[] DEFAULT '{}',
  description TEXT,
  specifications JSONB DEFAULT '{}',
  image_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bathroom installations table  
CREATE TABLE public.bathroom_installations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_sector_id UUID REFERENCES public.business_sectors(id),
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  area TEXT,
  client_name TEXT,
  image_url TEXT,
  completion_date DATE,
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bathroom categories table
CREATE TABLE public.bathroom_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_sector_id UUID REFERENCES public.business_sectors(id),
  name TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create product inquiries table
CREATE TABLE public.product_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.bathroom_products(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  message TEXT,
  inquiry_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.bathroom_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bathroom_installations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bathroom_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_inquiries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access and admin management
CREATE POLICY "Public can view published bathroom products" 
  ON public.bathroom_products FOR SELECT 
  USING (published = true);

CREATE POLICY "Admin can manage bathroom products"
  ON public.bathroom_products FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view published bathroom installations"
  ON public.bathroom_installations FOR SELECT
  USING (published = true);

CREATE POLICY "Admin can manage bathroom installations"
  ON public.bathroom_installations FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can view active bathroom categories"
  ON public.bathroom_categories FOR SELECT
  USING (active = true);

CREATE POLICY "Admin can manage bathroom categories"
  ON public.bathroom_categories FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can submit product inquiries"
  ON public.product_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can view all inquiries"
  ON public.product_inquiries FOR SELECT
  USING (true);

CREATE POLICY "Admin can manage inquiries"
  ON public.product_inquiries FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert default categories
INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order) 
SELECT bs.id, 'Toilet Suites', 'Complete toilet systems and suites', 1
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Wash Basins', 'Basins and sink solutions', 2
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Bathtubs', 'Luxury bathing solutions', 3
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Shower Systems', 'Complete shower solutions', 4
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Faucets & Taps', 'Water control systems', 5
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Accessories', 'Bathroom accessories and fittings', 6
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';

INSERT INTO public.bathroom_categories (business_sector_id, name, description, sort_order)
SELECT bs.id, 'Mirrors & Cabinets', 'Storage and mirror solutions', 7
FROM public.business_sectors bs 
WHERE bs.route = '/bathroom-solutions';
