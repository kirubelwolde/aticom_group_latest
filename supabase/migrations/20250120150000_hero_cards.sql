-- Create hero_cards table for admin-managed hero section cards
CREATE TABLE IF NOT EXISTS hero_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  route TEXT NOT NULL,
  primary_image TEXT NOT NULL,
  secondary_image TEXT,
  tertiary_image TEXT,
  gradient_from TEXT DEFAULT 'blue-900/20',
  gradient_to TEXT DEFAULT 'blue-800/10',
  order_index INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hero_cards ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
-- CREATE POLICY "Public can read active hero cards" ON hero_cards
--   FOR SELECT USING (active = true);

-- Create policy for admin access (authenticated users with aticom.com email)
-- CREATE POLICY "Admin can manage hero cards" ON hero_cards
--   FOR ALL USING (
--     auth.role() = 'authenticated' AND 
--     auth.jwt() ->> 'email' LIKE '%@aticom.com'
--   );

-- Insert default hero cards
INSERT INTO hero_cards (title, subtitle, route, primary_image, secondary_image, tertiary_image, gradient_from, gradient_to, order_index) VALUES
(
  'Bathroom Solutions',
  'Premium sanitary ware',
  '/bathroom-solutions',
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1584622781564-1d987ac39c55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1631048831231-2bb579c7e4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'blue-900/20',
  'blue-800/10',
  1
),
(
  'Ceramic Tiles',
  'Porcelane & ceramic solutions',
  '/ceramic-tiles',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'amber-900/20',
  'orange-800/10',
  2
),
(
  'Agricultural Exports',
  'Coffee, avocado & more',
  '/coffee',
  'https://images.unsplash.com/photo-1559077217-0ca3268e8425?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1587049016823-80e4c95fa610?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1586020347718-99befd5ea4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'green-900/20',
  'emerald-800/10',
  3
),
(
  'Latest News',
  'Stay updated with ATICOM',
  '/news',
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
  'purple-900/20',
  'violet-800/10',
  4
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_hero_cards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
-- CREATE TRIGGER update_hero_cards_updated_at
--   BEFORE UPDATE ON hero_cards
--   FOR EACH ROW
--   EXECUTE FUNCTION update_hero_cards_updated_at();

-- Create storage bucket for hero card images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hero-cards', 'hero-cards', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
-- CREATE POLICY "Public can view hero card images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'hero-cards');
--
-- CREATE POLICY "Admin can upload hero card images" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'hero-cards' AND 
--     auth.role() = 'authenticated' AND 
--     auth.jwt() ->> 'email' LIKE '%@aticom.com'
--   );
--
-- CREATE POLICY "Admin can update hero card images" ON storage.objects
--   FOR UPDATE USING (
--     bucket_id = 'hero-cards' AND 
--     auth.role() = 'authenticated' AND 
--     auth.jwt() ->> 'email' LIKE '%@aticom.com'
--   );
--
-- CREATE POLICY "Admin can delete hero card images" ON storage.objects
--   FOR DELETE USING (
--     bucket_id = 'hero-cards' AND 
--     auth.role() = 'authenticated' AND 
--     auth.jwt() ->> 'email' LIKE '%@aticom.com'
--   );
