
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Apple,
  Calendar,
  Scale,
  TrendingUp,
  Globe,
  Shield,
  Leaf,
  Users,
  Truck,
  Award,
  Thermometer,
  Package,
} from "lucide-react";

const AvocadoFresh = () => {
  const avocadoVarieties = [
    {
      name: "Hass Avocados",
      type: "Premium Export",
      description: "The world's most popular avocado variety with rich, creamy texture",
      season: "Year-round",
      weight: "150-300g",
      shelfLife: "7-14 days",
      skin: "Dark, pebbly",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Apple,
      benefits: ["Rich flavor", "Export favorite", "Long shelf life", "Premium quality"]
    },
    {
      name: "Fuerte Avocados",
      type: "Classic Variety",
      description: "Traditional smooth-skinned avocado with excellent taste profile",
      season: "Oct - May", 
      weight: "200-400g",
      shelfLife: "5-10 days",
      skin: "Green, smooth",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Leaf,
      benefits: ["Smooth skin", "Classic taste", "Large size", "Traditional variety"]
    },
    {
      name: "Pinkerton Avocados",
      type: "Large Premium",
      description: "Pear-shaped avocados with exceptional size and creamy texture",
      season: "Nov - Apr",
      weight: "300-500g",
      shelfLife: "7-12 days",
      skin: "Green, pebbly",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Scale,
      benefits: ["Extra large", "Pear shaped", "Creamy texture", "High yield"]
    },
    {
      name: "Reed Avocados",
      type: "Summer Variety",
      description: "Round, large avocados perfect for summer harvest seasons",
      season: "May - Sep",
      weight: "250-450g", 
      shelfLife: "6-10 days",
      skin: "Green, thick",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Calendar,
      benefits: ["Round shape", "Summer harvest", "Thick skin", "Good shipping"]
    }
  ];

  const qualityStandards = [
    {
      icon: Award,
      title: "GlobalGAP Certified",
      description: "International standard for good agricultural practices and food safety"
    },
    {
      icon: Leaf,
      title: "Organic Certification",
      description: "USDA and EU organic certified farms ensuring pesticide-free production"
    },
    {
      icon: Shield,
      title: "Export Quality Grades",
      description: "Strict grading standards meeting international export requirements"
    },
    {
      icon: Package,
      title: "Packaging Standards",
      description: "Food-grade packaging with cold chain management for freshness"
    }
  ];

  const statistics = [
    {
      icon: TrendingUp,
      number: "15,000",
      label: "Tons Annually",
      description: "Fresh avocado production capacity"
    },
    {
      icon: Users,
      number: "2,500+",
      label: "Partner Farmers",
      description: "Smallholder farmers in our network"
    },
    {
      icon: Globe,
      number: "20+",
      label: "Export Markets",
      description: "Countries receiving our fresh avocados"
    },
    {
      icon: Award,
      number: "98%",
      label: "Quality Grade",
      description: "Export quality standards achieved"
    }
  ];

  const farmToExportProcess = [
    {
      step: 1,
      title: "Sustainable Farming",
      description: "Organic practices, soil management, and integrated pest management systems"
    },
    {
      step: 2,
      title: "Harvest Timing",
      description: "Optimal ripeness indicators and careful hand-harvesting by trained workers"
    },
    {
      step: 3,
      title: "Post-Harvest Handling",
      description: "Immediate cooling, careful sorting, and quality grading processes"
    },
    {
      step: 4,
      title: "Cold Chain Management",
      description: "Temperature-controlled storage and transportation maintaining 4-6°C"
    },
    {
      step: 5,
      title: "Export Logistics",
      description: "International shipping coordination and customs clearance management"
    }
  ];

  const nutritionalBenefits = [
    "Rich in healthy monounsaturated fats",
    "High fiber content supporting digestion",
    "Potassium for heart health",
    "Folate and vitamin K",
    "Antioxidants including lutein",
    "Natural source of vitamin E",
    "Supports nutrient absorption",
    "Zero cholesterol and sodium"
  ];

  return (
    <DynamicBusinessPage 
      sectorRoute="/avocado-fresh"
      fallbackTitle="ATICADO Fresh Avocado"
      fallbackDescription="Premium Ethiopian avocados cultivated with sustainable farming practices and exported globally to discerning markets"
    >
      {/* Avocado Varieties Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              OUR VARIETIES
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Premium Avocado Varieties
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From the world-famous Hass to traditional Fuerte varieties, our fresh avocados 
              meet the highest quality standards for global markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {avocadoVarieties.map((variety, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={variety.image}
                    alt={variety.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center">
                      <variety.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#417ABD] transition-colors">
                    {variety.name}
                  </h3>
                  <p className="text-xs text-[#5EB447] mb-2 font-semibold">{variety.type}</p>
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">{variety.description}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Season:</span>
                      <span className="font-semibold text-gray-700">{variety.season}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Weight:</span>
                      <span className="font-semibold text-[#5EB447]">{variety.weight}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Shelf Life:</span>
                      <span className="font-semibold text-[#417ABD]">{variety.shelfLife}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Skin:</span>
                      <span className="font-semibold text-gray-700">{variety.skin}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {variety.benefits.slice(0, 2).map((benefit, i) => (
                        <Badge key={i} className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 text-xs px-2 py-0.5">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gray-100 hover:bg-gradient-to-r hover:from-[#417ABD] hover:to-[#5EB447] hover:text-white text-gray-700 transition-all duration-300 text-sm py-2">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-3 py-1 text-xs font-semibold">
              OUR IMPACT
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Global Reach & Quality
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our commitment to sustainable farming and quality excellence drives 
              exceptional results in fresh avocado production and export
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-base font-bold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              QUALITY ASSURANCE
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              International Quality Standards
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Meeting and exceeding global quality standards through certified 
              processes and rigorous quality control measures
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <div
                key={standard.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <standard.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {standard.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutritional Benefits Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                NUTRITIONAL VALUE
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Nature's Perfect Superfood
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our fresh avocados are packed with essential nutrients that support 
                overall health and wellness. Each avocado delivers a powerful 
                combination of healthy fats, vitamins, and minerals.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {nutritionalBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#5EB447] to-[#417ABD] rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                alt="Fresh Avocado Nutrition"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farm to Export Process Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative animate-fade-in">
              <img
                src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                alt="Farm to Export Process"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                OUR PROCESS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                From Farm to Global Markets
              </h2>
              <div className="space-y-4">
                {farmToExportProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{step.step}</span>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DynamicBusinessPage>
  );
};

export default AvocadoFresh;
