-- Add hero_image field to vision_mission table
ALTER TABLE public.vision_mission 
ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- Add hero_image field to csr_content table
ALTER TABLE public.csr_content 
ADD COLUMN IF NOT EXISTS hero_image TEXT;

-- Add hero_image field to partners_content table
ALTER TABLE public.partners_content 
ADD COLUMN IF NOT EXISTS hero_image TEXT;
