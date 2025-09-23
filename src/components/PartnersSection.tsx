
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Partner {
  name: string;
  logo: string;
}

interface PartnersContent {
  title: string;
  subtitle: string;
  partners: Partner[];
}

const PartnersSection = () => {
  const [content, setContent] = useState<PartnersContent | null>(null);
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
            partners: Array.isArray(data.partners) ? (data.partners as unknown as Partner[]) : []
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

  // Fallback content
  const fallbackContent: PartnersContent = {
    title: "Our Trusted Partners",
    subtitle: "Building strong partnerships across Ethiopia and beyond",
    partners: [
      { name: "Partner 1", logo: "/lovable-uploads/c1" },
      { name: "Partner 2", logo: "/lovable-uploads/c2.jpg" },
      { name: "Partner 3", logo: "/lovable-uploads/c3.jpg" },
      { name: "Partner 4", logo: "/lovable-uploads/c4.jpg" },
      { name: "Partner 5", logo: "/lovable-uploads/c5.jpg" }
    ]
  };

  const displayContent = content || fallbackContent;

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-br from-aticom-green/5 to-aticom-blue/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-aticom-green/5 to-aticom-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold animate-fade-in">
            PARTNERSHIPS
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3 animate-fade-in">
            {displayContent.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            {displayContent.subtitle}
          </p>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-scroll-x space-x-16">
            {/* First set of logos */}
            {displayContent.partners.map((partner, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-aticom-green/20 to-aticom-blue/20 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-aticom-navy">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-aticom-navy">{partner.name}</p>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {displayContent.partners.map((partner, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-16 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-aticom-green/20 to-aticom-blue/20 rounded-lg flex items-center justify-center mb-2">
                      <span className="text-2xl font-bold text-aticom-navy">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-aticom-navy">{partner.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {displayContent.partners.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No partners available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
