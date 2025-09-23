import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getTileCollections, 
  getTileCollection, 
  upsertTileCollection as apiUpsertTileCollection, 
  deleteTileCollection as apiDeleteTileCollection,
  getTileApplications,
  getTileApplication,
  upsertTileApplication as apiUpsertTileApplication,
  deleteTileApplication as apiDeleteTileApplication,
  getTileInstallations,
  getTileInstallation,
  upsertTileInstallation as apiUpsertTileInstallation,
  deleteTileInstallation as apiDeleteTileInstallation
} from '@/services/ceramicTilesService';
import { TileCollection, TileApplication, TileInstallation } from '@/types/ceramic-tiles';
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileCollections', businessSectorId] 
      });
      toast({
        title: 'Success',
        description: 'Tile collection deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete tile collection',
        variant: 'destructive',
      });
    },
  });
};

// Tile Applications Hooks
export const useTileApplications = (businessSectorId: string) => {
  return useQuery({
    queryKey: ['tileApplications', businessSectorId],
    queryFn: () => getTileApplications(businessSectorId),
    enabled: !!businessSectorId,
  });
};

export const useTileApplication = (id: string) => {
  return useQuery({
    queryKey: ['tileApplication', id],
    queryFn: () => getTileApplication(id),
    enabled: !!id,
  });
};

export const useUpsertTileApplication = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (application: Omit<Partial<TileApplication>, 'business_sector_id'> & 
      Pick<TileApplication, 'title' | 'image_url' | 'description' | 'suitable_tile_ids'>) => 
      apiUpsertTileApplication({
        ...application,
        business_sector_id: businessSectorId,
      } as TileApplication),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileApplications', businessSectorId] 
      });
      if (data.id) {
        queryClient.invalidateQueries({
          queryKey: ['tileApplication', data.id]
        });
      }
      toast({
        title: 'Success',
        description: 'Tile application saved successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to save tile application',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTileApplication = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => apiDeleteTileApplication(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileApplications', businessSectorId] 
      });
      toast({
        title: 'Success',
        description: 'Tile application deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete tile application',
        variant: 'destructive',
      });
    },
  });
};

// Tile Installations Hooks
export const useTileInstallations = (businessSectorId: string) => {
  return useQuery({
    queryKey: ['tileInstallations', businessSectorId],
    queryFn: () => getTileInstallations(businessSectorId),
    enabled: !!businessSectorId,
  });
};

export const useTileInstallation = (id: string) => {
  return useQuery({
    queryKey: ['tileInstallation', id],
    queryFn: () => getTileInstallation(id),
    enabled: !!id,
  });
};

export const useUpsertTileInstallation = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (installation: Omit<Partial<TileInstallation>, 'business_sector_id'> & 
      Pick<TileInstallation, 'title' | 'location' | 'image_url' | 'description'>) => 
      apiUpsertTileInstallation({
        ...installation,
        business_sector_id: businessSectorId,
      } as TileInstallation),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileInstallations', businessSectorId] 
      });
      if (data.id) {
        queryClient.invalidateQueries({
          queryKey: ['tileInstallation', data.id]
        });
      }
      toast({
        title: 'Success',
        description: 'Tile installation saved successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to save tile installation',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTileInstallation = (businessSectorId: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => apiDeleteTileInstallation(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ 
        queryKey: ['tileInstallations', businessSectorId] 
      });
      toast({
        title: 'Success',
        description: 'Tile installation deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete tile installation',
        variant: 'destructive',
      });
    },
  });
};
