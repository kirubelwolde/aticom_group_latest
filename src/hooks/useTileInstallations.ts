import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type TileInstallation = {
  id: string;
  business_sector_id: string;
  title: string;
  location?: string | null;
  description?: string | null;
  area?: string | null;
  image_url?: string | null;
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
};

export const useTileInstallations = (businessSectorId: string) => {
  return useQuery({
    queryKey: ['tile-installations', businessSectorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ceramic_tile_installations')
        .select('*')
        .eq('business_sector_id', businessSectorId)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!businessSectorId,
  });
};

export const useUpsertTileInstallation = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (installation: Partial<TileInstallation>) => {
      if (!businessSectorId) throw new Error('Business sector ID is required');
      
      const data = {
        ...installation,
        business_sector_id: businessSectorId,
        sort_order: installation.sort_order || 0,
        published: installation.published ?? true,
      };
      
      if (installation.id) {
        const { data: updated, error } = await supabase
          .from('ceramic_tile_installations')
          .update(data)
          .eq('id', installation.id)
          .select()
          .single();
          
        if (error) throw error;
        return updated;
      } else {
        if (!data.title) {
          throw new Error('Title is required');
        }
        
        const { data: created, error } = await supabase
          .from('ceramic_tile_installations')
          .insert([{
            ...data,
            title: data.title, // Ensure title is included
            business_sector_id: businessSectorId,
          }])
          .select()
          .single();
          
        if (error) throw error;
        return created;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tile-installations', businessSectorId] });
    },
  });
};

export const useDeleteTileInstallation = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ceramic_tile_installations')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tile-installations', businessSectorId] });
    },
  });
};
