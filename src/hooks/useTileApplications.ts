import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TileApplication {
  id: string;
  business_sector_id: string;
  title: string;
  description?: string;
  icon?: string;
  suitable_tile_ids: string[];
  sort_order?: number;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const useTileApplications = (businessSectorId: string) => {
  return useQuery({
    queryKey: ['tile-applications', businessSectorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ceramic_tile_applications')
        .select('*')
        .eq('business_sector_id', businessSectorId)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!businessSectorId,
  });
};

interface UpsertTileApplicationParams {
  id?: string;
  title: string;
  description?: string;
  icon?: string;
  suitable_tile_ids?: string[];
  sort_order?: number;
  published?: boolean;
}

export const useUpsertTileApplication = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (application: UpsertTileApplicationParams) => {
      if (!businessSectorId) throw new Error('Business sector ID is required');
      
      const data = {
        ...application,
        business_sector_id: businessSectorId,
        suitable_tile_ids: application.suitable_tile_ids || [],
        sort_order: application.sort_order || 0,
        published: application.published ?? true,
      };
      
      if (application.id) {
        const { data: updated, error } = await supabase
          .from('ceramic_tile_applications')
          .update(data)
          .eq('id', application.id)
          .select()
          .single();
          
        if (error) throw error;
        return updated as TileApplication;
      } else {
        const { data: created, error } = await supabase
          .from('ceramic_tile_applications')
          .insert([data])
          .select()
          .single();
          
        if (error) throw error;
        return created as TileApplication;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tile-applications', businessSectorId] });
    },
  });
};

export const useDeleteTileApplication = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('ceramic_tile_applications')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tile-applications', businessSectorId] });
    },
  });
};
