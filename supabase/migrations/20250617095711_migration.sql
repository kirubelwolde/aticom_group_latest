-- Enable Row Level Security
ALTER TABLE IF EXISTS public.ceramic_tile_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ceramic_tile_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ceramic_tile_installations ENABLE ROW LEVEL SECURITY;

-- Create tile_collections table
CREATE TABLE IF NOT EXISTS public.ceramic_tile_collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_sector_id TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  price TEXT,
  sizes TEXT[] DEFAULT '{}'::TEXT[],
  finishes TEXT[] DEFAULT '{}'::TEXT[],
  colors TEXT[] DEFAULT '{}'::TEXT[],
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_business_sector
    FOREIGN KEY (business_sector_id)
    REFERENCES public.business_sectors(id)
    ON DELETE CASCADE
);

-- Create tile_applications table
CREATE TABLE IF NOT EXISTS public.ceramic_tile_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_sector_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  suitable_tile_ids UUID[] DEFAULT '{}'::UUID[],
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_business_sector
    FOREIGN KEY (business_sector_id)
    REFERENCES public.business_sectors(id)
    ON DELETE CASCADE
);

-- Create tile_installations table
CREATE TABLE IF NOT EXISTS public.ceramic_tile_installations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_sector_id TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  description TEXT,
  area TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT fk_business_sector
    FOREIGN KEY (business_sector_id)
    REFERENCES public.business_sectors(id)
    ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_collections_business_sector_id ON public.ceramic_tile_collections(business_sector_id);
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_collections_published ON public.ceramic_tile_collections(published);
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_applications_business_sector_id ON public.ceramic_tile_applications(business_sector_id);
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_applications_published ON public.ceramic_tile_applications(published);
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_installations_business_sector_id ON public.ceramic_tile_installations(business_sector_id);
CREATE INDEX IF NOT EXISTS idx_ceramic_tile_installations_published ON public.ceramic_tile_installations(published);

-- Create RLS policies for tile_collections
CREATE POLICY "Enable read access for all users" 
ON public.ceramic_tile_collections 
FOR SELECT 
USING (published = true);

CREATE POLICY "Enable all access for authenticated users based on user_id"
ON public.ceramic_tile_collections
FOR ALL
USING (auth.role() = 'authenticated');

-- Create RLS policies for tile_applications
CREATE POLICY "Enable read access for all users" 
ON public.ceramic_tile_applications 
FOR SELECT 
USING (published = true);

CREATE POLICY "Enable all access for authenticated users based on user_id"
ON public.ceramic_tile_applications
FOR ALL
USING (auth.role() = 'authenticated');

-- Create RLS policies for tile_installations
CREATE POLICY "Enable read access for all users" 
ON public.ceramic_tile_installations 
FOR SELECT 
USING (published = true);

CREATE POLICY "Enable all access for authenticated users based on user_id"
ON public.ceramic_tile_installations
FOR ALL
USING (auth.role() = 'authenticated');

-- Create trigger functions for updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_collections
BEFORE UPDATE ON public.ceramic_tile_collections
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_applications
BEFORE UPDATE ON public.ceramic_tile_applications
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER set_updated_at_installations
BEFORE UPDATE ON public.ceramic_tile_installations
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Create storage bucket for tile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('tile-images', 'tile-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'tile-images');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'tile-images' AND
  auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'tile-images' AND
  auth.role() = 'authenticated' AND
  auth.uid() = owner
);

CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'tile-images' AND
  auth.role() = 'authenticated' AND
  auth.uid() = owner
);
