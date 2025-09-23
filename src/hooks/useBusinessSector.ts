
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useBusinessSector = (route: string) => {
  return useQuery({
    queryKey: ['businessSector', route],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_sectors')
        .select('*')
        .eq('route', route)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!route,
  });
};
