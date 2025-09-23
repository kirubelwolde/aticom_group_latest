import React, { useState, useEffect } from "react";
// Removed Layout to avoid double wrapping
import PartnersSection from "@/components/PartnersSection";
import SeoHead from "@/components/SeoHead";
import { supabase } from "@/integrations/supabase/client";

interface Partner {
  name: string;
  logo: string;
}

interface PartnersData {
  title: string;
  subtitle: string;
  partners: Partner[];
  hero_image?: string;
}

const Partners = () => {
  const [content, setContent] = useState<PartnersData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('partners_content')
          .select('*')
          .eq('active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching partners content:', error);
        }

        if (data) {
          setContent({
            title: data.title || 'Our Trusted Partners',
            subtitle: data.subtitle || 'Building strong partnerships across Ethiopia and beyond',
            partners: Array.isArray(data.partners) ? (data.partners as unknown as Partner[]) : [],
            hero_image: (data as any).hero_image
          });
        }
      } catch (error) {
        console.error('Error fetching partners content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-aticom-blue"></div>
      </div>
    );
  }

  return (
    <>
      <SeoHead 
        title="Our Partners - ATICOM Investment Group"
        description="Meet ATICOM's trusted partners and collaborators who share our vision for Ethiopia's economic development and sustainable growth."
        keywords="ATICOM partners, business partnerships, Ethiopia collaboration, strategic alliances, business network"
        pageRoute="/partners"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-aticom-green to-aticom-blue text-white overflow-hidden">
        {content?.hero_image && (
          <div className="absolute inset-0">
            <img 
              src={content.hero_image} 
              alt="Partners Hero" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              {content?.title || 'Our Partners'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
              {content?.subtitle || 'Building strong partnerships across Ethiopia and beyond to drive sustainable development'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Strategic Alliances</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Business Network</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Content */}
      <PartnersSection />
    </>
  );
};

export default Partners;
