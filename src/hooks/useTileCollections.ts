import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTileCollections, 
  getTileCollection, 
  upsertTileCollection as apiUpsertTileCollection, 
  deleteTileCollection as apiDeleteTileCollection
} from '@/services/ceramicTilesService';
import { TileCollection } from '@/types/ceramic-tiles';
import { useToast } from '@/hooks/use-toast';

export const useTileCollections = (businessSectorId: string) => {
  return useQuery({
    queryKey: ['tileCollections', businessSectorId],
    queryFn: () => getTileCollections(businessSectorId),
    enabled: !!businessSectorId,
  });
};

export const useTileCollection = (id: string) => {
  return useQuery({
    queryKey: ['tileCollection', id],
    queryFn: () => getTileCollection(id),
    enabled: !!id,
  });
};

export const useUpsertTileCollection = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (collection: Omit<Partial<TileCollection>, 'business_sector_id'> & 
      Pick<TileCollection, 'name' | 'category' | 'sizes' | 'finishes' | 'colors'>) => 
      apiUpsertTileCollection({
        ...collection,
        business_sector_id: businessSectorId,
      } as TileCollection),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileCollections', businessSectorId] 
      });
      if (data.id) {
        queryClient.invalidateQueries({
          queryKey: ['tileCollection', data.id]
        });
      }
      toast({
        title: 'Success',
        description: 'Tile collection saved successfully',
      });
    },
    onError: (error) => {
      console.error('Error saving tile collection:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tile collection',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTileCollection = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => apiDeleteTileCollection(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileCollections', businessSectorId] 
      });
      toast({
        title: 'Success',
        description: 'Tile collection deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting tile collection:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete tile collection',
        variant: 'destructive',
      });
    },
  });
};
