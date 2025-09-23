
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle } from "lucide-react";

interface BusinessSector {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  route: string;
  order_index: number;
  active: boolean;
}

interface SectionHeaders {
  title: string;
  subtitle: string;
}

// Fallback images for different business sectors - Using simple, reliable sources
const fallbackImages = {
  'bathroom-solutions': [
    'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Bathroom+Solutions',
    'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Sanitary+Ware',
    'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Shower+Systems'
  ],
  'ceramic-tiles': [
    'https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Ceramic+Tiles',
    'https://via.placeholder.com/400x300/06B6D4/FFFFFF?text=Floor+Tiles',
    'https://via.placeholder.com/400x300/84CC16/FFFFFF?text=Wall+Tiles'
  ],
  'avocado-fresh': [
    'https://via.placeholder.com/400x300/16A34A/FFFFFF?text=Fresh+Avocado',
    'https://via.placeholder.com/400x300/059669/FFFFFF?text=Premium+Quality',
    'https://via.placeholder.com/400x300/0D9488/FFFFFF?text=Export+Ready'
  ],
  'avocado-oil': [
    'https://via.placeholder.com/400x300/DC2626/FFFFFF?text=Avocado+Oil',
    'https://via.placeholder.com/400x300/EA580C/FFFFFF?text=Virgin+Oil',
    'https://via.placeholder.com/400x300/D97706/FFFFFF?text=Health+Benefits'
  ],
  'coffee': [
    'https://via.placeholder.com/400x300/92400E/FFFFFF?text=Coffee+Beans',
    'https://via.placeholder.com/400x300/78350F/FFFFFF?text=Arabica+Coffee',
    'https://via.placeholder.com/400x300/451A03/FFFFFF?text=Premium+Export'
  ],
  'cereal-crops': [
    'https://via.placeholder.com/400x300/166534/FFFFFF?text=Cereal+Crops',
    'https://via.placeholder.com/400x300/15803D/FFFFFF?text=Oil+Seeds',
    'https://via.placeholder.com/400x300/14532D/FFFFFF?text=Quality+Grains'
  ],
  'real-estate': [
    'https://via.placeholder.com/400x300/1E40AF/FFFFFF?text=Real+Estate',
    'https://via.placeholder.com/400x300/1D4ED8/FFFFFF?text=Modern+Properties',
    'https://via.placeholder.com/400x300/2563EB/FFFFFF?text=Investment+Opportunities'
  ],
  'agricultural-exports': [
    'https://via.placeholder.com/400x300/16A34A/FFFFFF?text=Agricultural+Exports',
    'https://via.placeholder.com/400x300/059669/FFFFFF?text=Fresh+Produce',
    'https://via.placeholder.com/400x300/0D9488/FFFFFF?text=Global+Markets'
  ],
  'manufacturing': [
    'https://via.placeholder.com/400x300/7C2D12/FFFFFF?text=Manufacturing',
    'https://via.placeholder.com/400x300/9A3412/FFFFFF?text=Quality+Production',
    'https://via.placeholder.com/400x300/C2410C/FFFFFF?text=Innovation'
  ]
};

const BusinessSectors = () => {
  const [sectors, setSectors] = useState<BusinessSector[]>([]);
  const [headers, setHeaders] = useState<SectionHeaders>({
    title: "Our Business Sectors",
    subtitle: ""
  });
  const [loading, setLoading] = useState(true);
  const [imageStates, setImageStates] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch business sectors
        const { data: sectorsData, error: sectorsError } = await supabase
          .from('business_sectors')
          .select('*')
          .eq('active', true)
          .order('order_index');

        if (sectorsError) throw sectorsError;
        setSectors(sectorsData || []);

        // Initialize image states for each sector
        const initialImageStates: { [key: string]: number } = {};
        sectorsData?.forEach(sector => {
          initialImageStates[sector.id] = 0;
        });
        setImageStates(initialImageStates);

        // Fetch section headers from site_settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['business_sectors_title', 'business_sectors_subtitle']);

        if (!settingsError && settingsData) {
          const titleSetting = settingsData.find(s => s.key === 'business_sectors_title');
          const subtitleSetting = settingsData.find(s => s.key === 'business_sectors_subtitle');
          
          setHeaders({
            title: titleSetting?.value || "Our Business Sectors",
            subtitle: subtitleSetting?.value || ""
          });
        }
      } catch (error) {
        console.error('Error fetching business sectors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-rotate images for each sector
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    sectors.forEach(sector => {
      const interval = setInterval(() => {
        setImageStates(prev => {
          const fallbackImagesForSector = fallbackImages[sector.route as keyof typeof fallbackImages] || fallbackImages['bathroom-solutions'];
          return {
            ...prev,
            [sector.id]: (prev[sector.id] + 1) % fallbackImagesForSector.length
          };
        });
      }, 4000); // Change every 4 seconds
      
      intervals.push(interval);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [sectors]);

  const getCurrentImage = (sector: BusinessSector) => {
    // If image_url is available from the database, use it.
    if (sector.image_url) {
      return sector.image_url;
    }
    
    // Try to find exact route match first
    let fallbackImagesForSector = fallbackImages[sector.route as keyof typeof fallbackImages];
    
    // If no exact match, try to find partial matches
    if (!fallbackImagesForSector) {
      if (sector.route.includes('agriculture') || sector.route.includes('export')) {
        fallbackImagesForSector = fallbackImages['agricultural-exports'];
      } else if (sector.route.includes('bathroom') || sector.route.includes('sanitary')) {
        fallbackImagesForSector = fallbackImages['bathroom-solutions'];
      } else if (sector.route.includes('ceramic') || sector.route.includes('tile')) {
        fallbackImagesForSector = fallbackImages['ceramic-tiles'];
      } else if (sector.route.includes('avocado')) {
        fallbackImagesForSector = fallbackImages['avocado-fresh'];
      } else if (sector.route.includes('coffee')) {
        fallbackImagesForSector = fallbackImages['coffee'];
      } else if (sector.route.includes('real-estate') || sector.route.includes('estate')) {
        fallbackImagesForSector = fallbackImages['real-estate'];
      } else if (sector.route.includes('manufacturing') || sector.route.includes('factory')) {
        fallbackImagesForSector = fallbackImages['manufacturing'];
      }
    }
    
    // Default fallback if still no match
    if (!fallbackImagesForSector) {
      fallbackImagesForSector = fallbackImages['bathroom-solutions'];
    }
    
    const currentImageIndex = imageStates[sector.id] || 0;
    
    // Always use fallback images for now to ensure consistent appearance
    // The original image_url from database might be broken or missing
    return fallbackImagesForSector[currentImageIndex];
  };

  if (loading) {
    return (
      <div className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center mt-6 py-2 lg:py-4"> 
    <div className="max-w-4xl mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8"> {/* Narrower container */}
      <div className="text-center mb-6"> {/* Less margin */}
        <Badge className="mb-1 bg-gradient-to-r from-aticom-blue to-aticom-green text-white px-3 py-1 text-xs font-semibold animate-fade-in">
          BUSINESS PORTFOLIO
        </Badge>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-aticom-navy mb-4 animate-fade-in">
          {headers.title}
        </h2>

      </div>
    </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mt-0">
          {sectors.map((sector, index) => (
            <Card
              key={sector.id}
              className="group relative hover:shadow-xl transition-all duration-300 border border-gray-100 rounded-xl overflow-hidden animate-fade-in transform hover:-translate-y-1 hover:scale-102 bg-white shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                <img
                  src={getCurrentImage(sector)}
                  alt={sector.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700 ease-in-out group-hover:grayscale-0 grayscale"
                  onError={(e) => {
                    // If the image fails to load, try the next fallback image
                    const target = e.target as HTMLImageElement;
                    const fallbackImagesForSector = fallbackImages[sector.route as keyof typeof fallbackImages] || fallbackImages['bathroom-solutions'];
                    const currentImageIndex = (imageStates[sector.id] || 0) + 1;
                    const nextImageIndex = currentImageIndex % fallbackImagesForSector.length;
                    
                    // Update the image state to the next image
                    setImageStates(prev => ({
                      ...prev,
                      [sector.id]: nextImageIndex
                    }));
                    
                    // Set the next image
                    target.src = fallbackImagesForSector[nextImageIndex];
                  }}
                  onLoad={() => {
                    // Image loaded successfully
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Image rotation indicator */}
                <div className="absolute top-2 right-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md mb-1">
                    {sector.title}
        
                  </h3>
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-3">
                  {sector.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {sector.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-aticom-green flex-shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={sector.route}>
                  <Button className="w-full bg-gradient-to-r from-aticom-blue to-aticom-green hover:from-aticom-green hover:to-aticom-blue text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      
    </section>
  );
};

export default BusinessSectors;
