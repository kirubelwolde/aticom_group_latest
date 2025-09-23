
import { supabase } from '@/integrations/supabase/client';
import { 
  type TileCollection, 
  type TileApplication, 
  type TileInstallation,
  type TileSize,
  type TileFinish,
  type TileCategory
} from '@/types/ceramic-tiles';

// Tile Collections
export const getTileCollections = async (businessSectorId: string): Promise<TileCollection[]> => {
  const { data, error } = await supabase
    .from('ceramic_tile_collections')
    .select('*')
    .eq('business_sector_id', businessSectorId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getTileCollection = async (id: string): Promise<TileCollection | null> => {
  const { data, error } = await supabase
    .from('ceramic_tile_collections')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const upsertTileCollection = async (
  collection: Partial<TileCollection> & Pick<TileCollection, 'business_sector_id' | 'name' | 'category' | 'sizes' | 'finishes' | 'colors'>
): Promise<TileCollection> => {
  const payload: Partial<TileCollection> = {
    ...collection,
    updated_at: new Date().toISOString(),
  };

  // Remove undefined values to avoid type errors
  Object.keys(payload).forEach(key => {
    if (payload[key as keyof TileCollection] === undefined) {
      delete payload[key as keyof TileCollection];
    }
  });

  const { data, error } = await supabase
    .from('ceramic_tile_collections')
    .upsert(payload as any) // Type assertion needed due to Supabase type limitations
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTileCollection = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('ceramic_tile_collections')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Tile Applications
export const getTileApplications = async (businessSectorId: string): Promise<TileApplication[]> => {
  const { data, error } = await supabase
    .from('ceramic_tile_applications')
    .select('*')
    .eq('business_sector_id', businessSectorId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getTileApplication = async (id: string): Promise<TileApplication | null> => {
  const { data, error } = await supabase
    .from('ceramic_tile_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const upsertTileApplication = async (
  application: Partial<TileApplication> & Pick<TileApplication, 'business_sector_id' | 'title' | 'description' | 'suitable_tile_ids'>
): Promise<TileApplication> => {
  const payload: Partial<TileApplication> = {
    ...application,
    updated_at: new Date().toISOString(),
  };

  Object.keys(payload).forEach(key => {
    if (payload[key as keyof TileApplication] === undefined) {
      delete payload[key as keyof TileApplication];
    }
  });

  const { data, error } = await supabase
    .from('ceramic_tile_applications')
    .upsert(payload as any)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTileApplication = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('ceramic_tile_applications')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Tile Installations
export const getTileInstallations = async (businessSectorId: string): Promise<TileInstallation[]> => {
  const { data, error } = await supabase
    .from('ceramic_tile_installations')
    .select('*')
    .eq('business_sector_id', businessSectorId)
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getTileInstallation = async (id: string): Promise<TileInstallation | null> => {
  const { data, error } = await supabase
    .from('ceramic_tile_installations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const upsertTileInstallation = async (
  installation: Partial<TileInstallation> & Pick<TileInstallation, 'business_sector_id' | 'title' | 'location' | 'description'>
): Promise<TileInstallation> => {
  const payload: Partial<TileInstallation> = {
    ...installation,
    updated_at: new Date().toISOString(),
  };

  Object.keys(payload).forEach(key => {
    if (payload[key as keyof TileInstallation] === undefined) {
      delete payload[key as keyof TileInstallation];
    }
  });

  const { data, error } = await supabase
    .from('ceramic_tile_installations')
    .upsert(payload as any)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteTileInstallation = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('ceramic_tile_installations')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Constants
export const TILE_SIZES: TileSize[] = [
  '20x20cm', '30x30cm', '40x40cm', '60x60cm', '20x30cm', '25x40cm', '30x60cm'
];

export const TILE_FINISHES: TileFinish[] = [
  'Polished', 'Matt', 'Glossy', 'Textured', 'Wooden'
];

export const TILE_CATEGORIES: TileCategory[] = [
  'Floor Tiles', 'Wall Tiles', 'Outdoor Tiles', 'Designer Collection'
];
