
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Phone, Download } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// Use the actual database types
type BusinessContentRow = Database['public']['Tables']['business_content']['Row'];

interface BusinessContent {
  id: string;
  page_title: string;
  hero_section: any;
  about_section: any;
  features_section: any;
  gallery_images: string[];
  cta_section: any;
  meta_description?: string;
}

interface DynamicBusinessPageProps {
  sectorRoute: string;
  fallbackTitle: string;
  fallbackDescription: string;
  children?: React.ReactNode;
}

const DynamicBusinessPage = ({ 
  sectorRoute, 
  fallbackTitle, 
  fallbackDescription,
  children 
}: DynamicBusinessPageProps) => {
  const [content, setContent] = useState<BusinessContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // First get the business sector by route
        const { data: sector, error: sectorError } = await supabase
          .from("business_sectors")
          .select("id")
          .eq("route", sectorRoute)
          .single();

        if (sectorError) {
          throw new Error(`Sector not found for route: ${sectorRoute}`);
        }

        // Then get the business content
        const { data: businessContent, error: contentError } = await supabase
          .from("business_content")
          .select("*")
          .eq("business_sector_id", sector.id)
          .single();

        if (contentError) {
          throw new Error("Content not found");
        }

        // Transform the data to match our interface
        const transformedContent: BusinessContent = {
          id: businessContent.id,
          page_title: businessContent.page_title,
          hero_section: businessContent.hero_section || {},
          about_section: businessContent.about_section || {},
          features_section: businessContent.features_section || {},
          gallery_images: businessContent.gallery_images || [],
          cta_section: businessContent.cta_section || {},
          meta_description: businessContent.meta_description || undefined
        };

        setContent(transformedContent);
      } catch (err) {
        console.error("Error fetching business content:", err);
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [sectorRoute]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#417ABD]" />
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !content) {
    return (
      <Layout>
        <div className="bg-white">
          {/* Fallback Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {fallbackTitle}
                </h1>
                <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                  {fallbackDescription}
                </p>
              </div>
            </div>
          </section>
          
          {/* Error Message */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Currently Unavailable</h2>
              <p className="text-gray-600 mb-8">
                We're working on updating this page. Please check back soon or contact us for more information.
              </p>
              <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </section>
          
          {/* Render custom children if provided */}
          {children}
        </div>
      </Layout>
    );
  }

  const {
    hero_section = {},
    about_section = {},
    features_section = {},
    gallery_images = [],
    cta_section = {}
  } = content;

  return (
    <Layout>
      <div className="bg-white">
        {/* Dynamic Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: hero_section.background_image 
                ? `url(${hero_section.background_image})` 
                : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent animate-fade-in">
                {hero_section.title || fallbackTitle}
                {hero_section.subtitle && (
                  <span className="block bg-gradient-to-r from-[#5EB447] to-[#417ABD] bg-clip-text text-transparent">
                    {hero_section.subtitle}
                  </span>
                )}
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in mb-6">
                {hero_section.description || fallbackDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in">
                <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] hover:from-[#5EB447] hover:to-[#417ABD] text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Download className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
                <Button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-slate-900 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic About Section */}
        {about_section.title && (
          <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="animate-fade-in">
                  <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                    ABOUT US
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {about_section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {about_section.content}
                  </p>
                </div>
                {about_section.image && (
                  <div className="relative animate-fade-in">
                    <img
                      src={about_section.image}
                      alt={about_section.title}
                      className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic Features Section */}
        {features_section.features && features_section.features.length > 0 && (
          <section className="py-12 lg:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-3 py-1 text-xs font-semibold">
                  KEY FEATURES
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  {features_section.title || "Our Key Features"}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features_section.features.map((feature: string, index: number) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-xl">✓</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {feature}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {gallery_images.length > 0 && (
          <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                  GALLERY
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Our Work
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery_images.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Render custom children if provided */}
        {children}
        {/* Dynamic CTA Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {cta_section.title || "Ready to Get Started?"}
            </h2>
            <p className="text-base text-white/90 mb-6 leading-relaxed">
              {cta_section.description || "Contact us today to learn more about our services."}
            </p>
            <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] hover:from-[#5EB447] hover:to-[#417ABD] text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              {cta_section.button_text || "Contact Us"}
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DynamicBusinessPage;
