
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type SeoSetting = Tables<'seo_settings'>;
type SeoSettingInsert = TablesInsert<'seo_settings'>;
type SeoSettingUpdate = TablesUpdate<'seo_settings'>;

export const useSeoSettings = () => {
  return useQuery({
    queryKey: ['seoSettings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('sitemap_priority', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useSeoSettingByRoute = (route: string) => {
  return useQuery({
    queryKey: ['seoSetting', route],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('page_route', route)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
  });
};

export const useCreateSeoSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SeoSettingInsert) => {
      const { data: result, error } = await supabase
        .from('seo_settings')
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seoSettings'] });
    },
  });
};

export const useUpdateSeoSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: SeoSettingUpdate & { id: string }) => {
      const { data: result, error } = await supabase
        .from('seo_settings')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seoSettings'] });
    },
  });
};

export const useDeleteSeoSetting = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('seo_settings')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seoSettings'] });
    },
  });
};
