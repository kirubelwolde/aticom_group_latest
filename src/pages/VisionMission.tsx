import React, { useState, useEffect } from "react";
// Removed Layout to avoid double wrapping
import VisionMissionSection from "@/components/VisionMissionSection";
import SeoHead from "@/components/SeoHead";
import { supabase } from "@/integrations/supabase/client";

interface VisionMissionData {
  vision_title: string;
  vision_content: string;
  vision_points: string[];
  mission_title: string;
  mission_content: string;
  mission_points: string[];
  core_values: { title: string; description: string }[];
  hero_image?: string;
}

const VisionMission = () => {
  const [content, setContent] = useState<VisionMissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('vision_mission')
          .select('*')
          .eq('active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching vision mission:', error);
        }

        if (data) {
          setContent({
            vision_title: data.vision_title || 'Our Vision',
            vision_content: data.vision_content || '',
            vision_points: data.vision_points || [],
            mission_title: data.mission_title || 'Our Mission',
            mission_content: data.mission_content || '',
            mission_points: data.mission_points || [],
            core_values: Array.isArray(data.core_values) ? data.core_values as { title: string; description: string }[] : [],
            hero_image: (data as any).hero_image
          });
        }
      } catch (error) {
        console.error('Error fetching vision mission:', error);
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
        title="Vision & Mission - ATICOM Investment Group"
        description="Discover ATICOM's vision for Ethiopia's future and our mission to drive sustainable economic growth through diversified business excellence."
        keywords="ATICOM vision, ATICOM mission, Ethiopia business group, sustainable development, economic growth"
        pageRoute="/vision-mission"
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-aticom-blue to-aticom-green text-white overflow-hidden">
        {content?.hero_image && (
          <div className="absolute inset-0">
            <img 
              src={content.hero_image} 
              alt="Vision & Mission Hero" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Vision & Mission
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
              Driving Ethiopia's economic growth through sustainable business excellence
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Vision</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Mission</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-white/90">
                <span className="font-semibold">Core Values</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Content */}
      <VisionMissionSection />
    </>
  );
};

export default VisionMission;
