
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { SlideIndicators } from "./hero/SlideIndicators";
import { supabase } from "@/integrations/supabase/client";
import { BusinessSlide } from "./hero/BusinessSlide";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  order_index: number;
  active: boolean;
}

interface HeroCard {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  primary_image: string;
  secondary_image?: string;
  tertiary_image?: string;
  gradient_from: string;
  gradient_to: string;
  order_index: number;
  active: boolean;
}

const HeroSection = () => {
  const [slides, setSlides] = useState<BusinessSlide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroCards, setHeroCards] = useState<HeroCard[]>([]);

  // Utility to ensure a usable image URL
  const getFallbackImageForTitle = (title: string): string => {
    const normalized = title.toLowerCase();
    if (normalized.includes('bathroom')) {
      return 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
    }
    if (normalized.includes('ceramic') || normalized.includes('tile')) {
      return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
    }
    if (normalized.includes('agric') || normalized.includes('coffee') || normalized.includes('avocado')) {
      return 'https://images.unsplash.com/photo-1559077217-0ca3268e8425?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
    }
    if (normalized.includes('news')) {
      return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
    }
    // Local placeholder as last resort
    return '/placeholder.svg';
  };

  const withImageFallbacks = (card: HeroCard): HeroCard => {
    const backup = getFallbackImageForTitle(card.title || '');
    const primary = card.primary_image && card.primary_image.trim().length > 0 ? card.primary_image : backup;
    const secondary = card.secondary_image && card.secondary_image.trim().length > 0 ? card.secondary_image : primary;
    const tertiary = card.tertiary_image && card.tertiary_image.trim().length > 0 ? card.tertiary_image : secondary;
    return {
      ...card,
      primary_image: primary,
      secondary_image: secondary,
      tertiary_image: tertiary,
    };
  };

  // Fallback images for when database is empty
  const fallbackCards: HeroCard[] = [
    {
      id: '1',
      title: 'Bathroom Solutions',
      subtitle: 'Premium sanitary ware',
      route: '/bathroom-solutions',
      primary_image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      secondary_image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tertiary_image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      gradient_from: 'blue-900/20',
      gradient_to: 'blue-800/10',
      order_index: 1,
      active: true
    },
    {
      id: '2',
      title: 'Ceramic Tiles',
      subtitle: 'Porcelane & ceramic solutions',
      route: '/ceramic-tiles',
      primary_image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      secondary_image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tertiary_image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      gradient_from: 'amber-900/20',
      gradient_to: 'orange-800/10',
      order_index: 2,
      active: true
    },
    {
      id: '3',
      title: 'Agricultural Exports',
      subtitle: 'Coffee, avocado & more',
      route: '/coffee',
      primary_image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      secondary_image: 'https://www.questcoffee.com.au/wp-content/uploads/2016/08/green-beans.png',
      tertiary_image: 'https://www.world-grain.com/ext/resources/2022/05/10/Cereal-grains_cr-Adobe-Stock_E.webp?height=667&t=1696274291&width=1080',
      gradient_from: 'green-900/20',
      gradient_to: 'emerald-800/10',
      order_index: 3,
      active: true
    },
    {
      id: '4',
      title: 'Latest News',
      subtitle: 'Stay updated with ATICOM',
      route: '/news',
      primary_image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      secondary_image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      tertiary_image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      gradient_from: 'purple-900/20',
      gradient_to: 'violet-800/10',
      order_index: 4,
      active: true
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hero cards
        // Using untyped query because generated types may not include this new table yet
        const { data: cardsData, error: cardsError } = await supabase
          .from('hero_cards' as any)
          .select('*')
          .eq('active', true)
          .order('order_index');

        if (cardsError) throw cardsError;
        
        // Use database data or fallback, applying per-card image fallbacks
        if (cardsData && (cardsData as any[]).length > 0) {
          setHeroCards((cardsData as unknown as HeroCard[]).map(withImageFallbacks));
        } else {
          setHeroCards(fallbackCards.map(withImageFallbacks));
        }

        // Fetch hero slides (for backward compatibility)
        const { data: slidesData, error: slidesError } = await supabase
          .from('hero_slides')
          .select('*')
          .eq('active', true)
          .order('order_index');

        if (slidesError) throw slidesError;
        
        // Transform database data to BusinessSlide format
        const transformedSlides: BusinessSlide[] = (slidesData || []).map((slide: HeroSlide) => ({
          title: slide.title,
          subtitle: slide.subtitle,
          description: slide.description,
          image: slide.image_url,
          route: getRouteForSlide(slide.title),
          buttonText: getButtonTextForSlide(slide.title)
        }));
        
        setSlides(transformedSlides);
      } catch (error) {
        console.error('Error fetching hero data:', error);
        // Use fallback data
        setHeroCards(fallbackCards);
        setSlides([{
          title: 'ATICOM Investment Group',
          subtitle: 'Diversified Investment Excellence',
          description: 'Leading Ethiopian investment group with diversified portfolio spanning real estate, agriculture, manufacturing, and international trade',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3',
          route: '/about',
          buttonText: 'Learn More About Us'
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper function to determine route based on slide title
  const getRouteForSlide = (title: string): string => {
    if (title.toLowerCase().includes('real estate')) return '/real-estate';
    if (title.toLowerCase().includes('avocado') && title.toLowerCase().includes('fresh')) return '/avocado-fresh';
    if (title.toLowerCase().includes('avocado') && title.toLowerCase().includes('oil')) return '/avocado-oil';
    if (title.toLowerCase().includes('coffee')) return '/coffee';
    if (title.toLowerCase().includes('cereal')) return '/cereal-crops';
    if (title.toLowerCase().includes('ceramic') || title.toLowerCase().includes('tile')) return '/ceramic-tiles';
    if (title.toLowerCase().includes('bathroom')) return '/bathroom-solutions';
    if (title.toLowerCase().includes('manufacturing')) return '/manufacturing';
    return '/about';
  };

  // Helper function to determine button text based on slide title
  const getButtonTextForSlide = (title: string): string => {
    if (title.toLowerCase().includes('real estate')) return 'Explore Real Estate';
    if (title.toLowerCase().includes('avocado')) return 'Explore Avocado Business';
    if (title.toLowerCase().includes('coffee')) return 'Explore Coffee Export';
    if (title.toLowerCase().includes('cereal')) return 'Explore Cereal Export';
    if (title.toLowerCase().includes('ceramic') || title.toLowerCase().includes('tile')) return 'Explore Ceramic Tiles';
    if (title.toLowerCase().includes('bathroom')) return 'Explore Bathroom Solutions';
    if (title.toLowerCase().includes('manufacturing')) return 'Explore Manufacturing';
    return 'Learn More';
  };

  // Auto-slide functionality
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Image rotation effect for cards
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % 3); // Cycle through 3 images
    }, 2500); // Change image every 2.5 seconds

    return () => clearInterval(imageTimer);
  }, []);

  if (loading) {
    return (
      <section
        id="home"
        className="relative text-white overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-aticom-blue to-aticom-green"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-20">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section
        id="home"
        className="relative text-white overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-aticom-blue to-aticom-green"
      >
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">ATICOM Investment Group</h1>
            <p className="text-xl md:text-2xl mb-8">Diversified Investment Excellence</p>
          </div>
        </div>
      </section>
    );
  }

  const currentBusiness = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative text-white overflow-hidden min-h-screen bg-black"
    >
      {/* Dark background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-8 lg:pb-12 z-20">
        
        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16">
          {heroCards.map((card) => {
            const safeCard = withImageFallbacks(card);
            const images = [
              safeCard.primary_image,
              safeCard.secondary_image || safeCard.primary_image,
              safeCard.tertiary_image || safeCard.secondary_image || safeCard.primary_image
            ];
            
            return (
              <Link 
                key={card.id}
                to={card.route} 
                className={`group relative bg-gradient-to-br from-${card.gradient_from} to-${card.gradient_to} rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 block shadow-2xl hover:shadow-3xl`}
              >
                <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[5/6] relative">
                  <img 
                    src={images[currentImageIndex]}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src !== '/placeholder.svg') {
                        target.src = '/placeholder.svg';
                      }
                    }}
                  />
                  
                  {/* Enhanced gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Subtle top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/30 via-white/50 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content container with better spacing */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6">
                    {/* Badge/Indicator */}
                    <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <span className="text-white/90 text-xs font-medium">Explore</span>
                    </div>
                    
                    {/* Title and subtitle with enhanced typography */}
                    <div className="space-y-2">
                      <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 leading-tight drop-shadow-lg">
                        {card.title}
                      </div>
                      <div className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow-md">
                        {card.subtitle}
                      </div>
                    </div>
                    
                    {/* Hover effect indicator */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover state background enhancement */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Brand Logos Section */}
        <div className="text-center">
          <div className="flex justify-between items-center max-w-6xl mx-auto gap-4">
            {/* JOMOO */}
            <div className="group animate-fade-in-up w-full" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md rounded-3xl p-3 sm:p-4 lg:p-5 hover:from-white/10 hover:to-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 w-full">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                    <img 
                      src="/brands/jomoo.jpg" 
                      alt="JOMOO" 
                      className="w-full h-full object-contain brightness-110 contrast-125 group-hover:scale-110 transition-transform duration-500 rounded-xl animate-pulse" 
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white/95 group-hover:text-white transition-colors duration-500 text-center tracking-wide animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    JOMOO
                  </div>
                </div>
              </div>
            </div>

            {/* ARERTI */}
            <div className="group animate-fade-in-up w-full" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md rounded-3xl p-3 sm:p-4 lg:p-5 hover:from-white/10 hover:to-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 w-full">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/c4.jpg" 
                      alt="ARERTI" 
                      className="w-full h-full object-contain brightness-110 contrast-125 group-hover:scale-110 transition-transform duration-500 rounded-xl animate-pulse" 
                      style={{ animationDelay: '0.5s' }}
                    />
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white/95 group-hover:text-white transition-colors duration-500 text-center tracking-wide animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    ARERTI
                  </div>
                </div>
              </div>
            </div>

            {/* PISLANDO */}
            
            {/* its does not need for now  */}
            {/* <div className="group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md rounded-3xl p-3 sm:p-4 lg:p-5 hover:from-white/10 hover:to-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-400/80 to-green-600/80 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg animate-pulse animate-bounce" style={{ animationDelay: '0.6s' }}>
                      <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl animate-pulse">P</span>
                    </div>
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white/95 group-hover:text-white transition-colors duration-500 text-center tracking-wide animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                    PEACELANDO
                  </div>
                </div>
              </div>
            </div> */}

            {/* ATICOM COFFEE */}
            <div className="group animate-fade-in-up w-full" style={{ animationDelay: '0.5s' }}>
              <div className="bg-gradient-to-br from-white/5 to-white/15 backdrop-blur-md rounded-3xl p-3 sm:p-4 lg:p-5 hover:from-white/10 hover:to-white/25 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-white/10 w-full">
                <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 flex items-center justify-center">
                    <a href="https://aticomcoffee.com/" target="_blank" rel="noopener noreferrer">
                      <a href="https://aticomcoffee.com/" target="_blank" rel="noopener noreferrer">
                        <img src="/lovable-uploads/atina.png" alt="ATICOM-Coffee" className="w-36 h-36 sm:w-44 sm:h-44 lg:w-56 lg:h-56 object-contain brightness-110 contrast-125 group-hover:scale-110 transition-transform duration-500 rounded-xl animate-pulse" style={{ animationDelay: '0.7s' }}/>
                      </a>
                    </a>
                  </div>                  
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white/95 group-hover:text-white transition-colors duration-500 text-center tracking-wide animate-fade-in-up" style={{ animationDelay: '1s' }}>
                    ATICOM-COFFEE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
