
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Users, Leaf, ArrowRight } from "lucide-react";

interface CSRInitiative {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface CSRContent {
  title: string;
  subtitle: string;
  main_title: string;
  initiatives: CSRInitiative[];
  image_url: string | null;
  cta_text: string;
  cta_link: string;
}

const CSRSection = () => {
  const [content, setContent] = useState<CSRContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('csr_content')
          .select('*')
          .eq('active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching CSR content:', error);
          return;
        }

        if (data) {
          setContent({
            title: data.title,
            subtitle: data.subtitle,
            main_title: data.main_title,
            initiatives: Array.isArray(data.initiatives) ? (data.initiatives as unknown as CSRInitiative[]) : [],
            image_url: data.image_url,
            cta_text: data.cta_text,
            cta_link: data.cta_link
          });
        }
      } catch (error) {
        console.error('Error fetching CSR content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fallback content
  const fallbackContent: CSRContent = {
    title: "Corporate Social Responsibility",
    subtitle: "Committed to making a positive impact in Ethiopian communities through sustainable development and social initiatives",
    main_title: "We Are Active At Community Development",
    initiatives: [
      {
        icon: "Heart",
        title: "Community Housing Projects",
        description: "Renovating houses for underprivileged residents in Akaki Qaliti Subdistrict 10, improving living conditions and community welfare.",
        color: "green-500"
      },
      {
        icon: "Users",
        title: "Local Employment",
        description: "Creating sustainable employment opportunities for local communities through our diverse business operations.",
        color: "blue-500"
      },
      {
        icon: "Leaf",
        title: "Environmental Sustainability",
        description: "Implementing eco-friendly practices in our agro-processing operations and promoting sustainable farming methods.",
        color: "amber-500"
      }
    ],
    image_url: "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
    cta_text: "Learn More About Our CSR Initiatives",
    cta_link: "/csr"
  };

  const displayContent = content || fallbackContent;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return Heart;
      case 'Users': return Users;
      case 'Leaf': return Leaf;
      default: return Heart;
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'green-500': return 'from-green-500 to-green-600';
      case 'blue-500': return 'from-blue-500 to-blue-600';
      case 'amber-500': return 'from-amber-500 to-amber-600';
      default: return 'from-aticom-green to-aticom-blue';
    }
  };

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-br from-aticom-green/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-aticom-green/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="mb-4 bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold">
              {displayContent.title}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-4">
              {displayContent.main_title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {displayContent.subtitle}
            </p>
            
            <div className="space-y-4 mb-8">
              {displayContent.initiatives.map((initiative, index) => {
                const IconComponent = getIcon(initiative.icon);
                const colorClass = getColorClass(initiative.color);
                
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${colorClass} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-aticom-navy mb-1">
                        {initiative.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {initiative.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button 
              className="bg-gradient-to-r from-aticom-green to-aticom-blue hover:from-aticom-blue hover:to-aticom-green text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => window.location.href = displayContent.cta_link}
            >
              {displayContent.cta_text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {displayContent.image_url && (
            <div className="relative animate-fade-in">
              <img
                src={displayContent.image_url}
                alt="CSR Activities"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CSRSection;
