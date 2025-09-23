export interface TileCollection {
  id: string;
  business_sector_id: string;
  name: string;
  category: string;
  sizes: string[];
  finishes: string[];
  colors: string[];
  price?: string;
  image_url?: string;
  description?: string;
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TileApplication {
  id: string;
  business_sector_id: string;
  title: string;
  description?: string;
  image_url?: string;
  suitable_tile_ids: string[];
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TileInstallation {
  id: string;
  business_sector_id: string;
  title: string;
  location?: string;
  description?: string;
  area?: string;
  image_url?: string;
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type TileSize = '20x20cm' | '30x30cm' | '40x40cm' | '60x60cm' | '20x30cm' | '25x40cm' | '30x60cm';
export type TileFinish = 'Polished' | 'Matt' | 'Glossy' | 'Textured' | 'Wooden';
export type TileCategory = 'Floor Tiles' | 'Wall Tiles' | 'Outdoor Tiles' | 'Designer Collection';
