
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BusinessContent {
  id: string;
  business_sector_id: string;
  page_title: string;
  hero_section: any;
  about_section: any;
  features_section: any;
  gallery_images: string[];
  cta_section: any;
  meta_description?: string;
  created_at: string;
  updated_at: string;
}

export const useBusinessContent = (sectorRoute: string) => {
  const [content, setContent] = useState<BusinessContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // First get the business sector by route
      const { data: sector, error: sectorError } = await supabase
        .from('business_sectors')
        .select('id')
        .eq('route', sectorRoute)
        .single();

      if (sectorError) {
        throw new Error(`Sector not found for route: ${sectorRoute}`);
      }

      // Then get the business content
      const { data: businessContent, error: contentError } = await supabase
        .from('business_content')
        .select('*')
        .eq('business_sector_id', sector.id)
        .single();

      if (contentError) {
        throw new Error('Content not found');
      }

      setContent(businessContent);
    } catch (err) {
      console.error('Error fetching business content:', err);
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (updates: Partial<BusinessContent>) => {
    if (!content) return;

    try {
      const { data, error } = await supabase
        .from('business_content')
        .update(updates)
        .eq('id', content.id)
        .select()
        .single();

      if (error) throw error;

      setContent(data);
      return data;
    } catch (err) {
      console.error('Error updating content:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (sectorRoute) {
      fetchContent();
    }
  }, [sectorRoute]);

  return {
    content,
    loading,
    error,
    refetch: fetchContent,
    updateContent,
  };
};
