import * as React from "react";
import { Link } from "react-router-dom";
// Removed Layout to avoid double wrapping on homepage
import HeroSection from "@/components/HeroSection";
import BusinessSectors from "@/components/BusinessSectors";
import NewsSection from "@/components/NewsSection";
import TeamSection from "@/components/TeamSection";
import PartnersSection from "@/components/PartnersSection";
import VisionMissionSection from "@/components/VisionMissionSection";
import CSRSection from "@/components/CSRSection";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  
  // Slideshow functionality
  const showSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-rotate slides
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Update slideshow position
  React.useEffect(() => {
    const slideshow = document.getElementById('bathroom-slideshow');
    if (slideshow) {
      slideshow.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section data-section>
          <HeroSection />
        </section>

        {/* Business Sectors */}
        <section id="business" data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-blue/5 to-aticom-green/5"></div>
          <div className="relative">
            <BusinessSectors />
          </div>
        </section>

        {/* Bathroom Solutions Section */}
        <section data-section className="relative py-16 lg:py-20 bg-white">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-blue/5 to-aticom-green/5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-gradient-to-r from-aticom-blue to-aticom-green text-white px-3 py-1 text-xs font-semibold">
                BATHROOM SOLUTIONS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3">
                Complete Bathroom Solutions
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Premium JOMOO brand bathroom products for modern living spaces
              </p>
            </div>
            
            <div className="relative overflow-hidden rounded-xl shadow-2xl">
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Play/Pause Button */}
              <button 
                onClick={toggleAutoPlay}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              >
                {isAutoPlaying ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              <div className="flex transition-transform duration-1000 ease-in-out" id="bathroom-slideshow">
                <div className="min-w-full relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1720486620020-c70516e9b69f?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sanitary Ware"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Sanitary Ware</h3>
                    <p className="text-white/90">Premium toilets, basins, and bidets</p>
                  </div>
                </div>
                
                <div className="min-w-full relative">
                  <img
                    src="https://images.unsplash.com/photo-1573219071651-f1937d0ec94b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Faucets & Hardware"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Faucets & Hardware</h3>
                    <p className="text-white/90">Stylish and functional bathroom fixtures</p>
                  </div>
                </div>
                
                <div className="min-w-full relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1733864821605-4cbcc2095dcb?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Shower Systems"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Shower Systems</h3>
                    <p className="text-white/90">Complete shower solutions and enclosures</p>
                  </div>
                </div>
                
                <div className="min-w-full relative">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1674035037186-d5e21716cc16?q=80&w=831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Bathroom Accessories"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Accessories</h3>
                    <p className="text-white/90">Mirrors, towel racks, and essential items</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === 0 ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => showSlide(0)}
                ></button>
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === 1 ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => showSlide(1)}
                ></button>
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === 2 ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => showSlide(2)}
                ></button>
                <button 
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === 3 ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                  }`}
                  onClick={() => showSlide(3)}
                ></button>
              </div>
            </div>
          </div>
        </section>

        {/* Agricultural Exports Section */}
        <section data-section className="relative py-16 lg:py-20 bg-gradient-to-br from-aticom-green/5 to-aticom-blue/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold">
                AGRICULTURAL EXPORTS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3">
                Premium Agricultural Products
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                High-quality Ethiopian agricultural products for global markets
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="https://www.bda.uk.com/static/3f0121a6-68e0-4a0f-867102c9da2f0763/avocadoes.jpg"
                    alt="Fresh Avocado"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white">Fresh Avocado</h3>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="https://arabianorganics.com/cdn/shop/files/9664-2057.png?v=1701342553"
                    alt="Avocado Oil"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white">Aticado Oil</h3>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="/lovable-uploads/raw_coffee.jpg"
                    alt="Coffee Beans"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white">Coffee Beans</h3>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Cereal Crops"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold text-white">Cereal Crops</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-gray/50 to-white"></div>
          <div className="relative">
            <VisionMissionSection />
          </div>
        </section>

        {/* Partners Section */}
        <section data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-green/5 to-aticom-blue/5"></div>
          <div className="relative">
            <PartnersSection />
          </div>
        </section>

        {/* News Section */}
        <section id="news" data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-aticom-gray/30"></div>
          <div className="relative">
            <NewsSection />
          </div>
        </section>

        {/* Team Section */}
        <section id="team" data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-blue/5 to-aticom-green/5"></div>
          <div className="relative">
            <TeamSection />
          </div>
        </section>

        {/* CSR Section */}
        <section data-section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-green/5 to-white"></div>
          <div className="relative">
            <CSRSection />
          </div>
        </section>

        {/* Background Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-aticom-blue/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-aticom-green/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-aticom-gold/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
  );
};

export default Index;
