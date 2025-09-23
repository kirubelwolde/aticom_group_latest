
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Thermometer,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Leaf,
  Users,
  Heart,
  Sparkles,
  FlaskConical,
  Package,
} from "lucide-react";

const AvocadoOil = () => {
  
  const oilVarieties = [
    {
      name: "Cold-Pressed Extra Virgin",
      grade: "Premium Grade",
      description: "First extraction, unrefined avocado oil with maximum nutrients",
      smokePoint: "375°F (190°C)",
      extraction: "Cold-pressed",
      acidity: "< 0.5%",
      color: "Deep Green",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Droplets,
      benefits: ["Maximum nutrients", "Rich flavor", "Antioxidant-rich", "Premium quality"]
    },
    {
      name: "Refined Avocado Oil",
      grade: "Cooking Grade",
      description: "High smoke point oil perfect for cooking and frying",
      smokePoint: "520°F (271°C)",
      extraction: "Refined",
      acidity: "< 0.3%",
      color: "Light Golden",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Thermometer,
      benefits: ["High smoke point", "Neutral taste", "Versatile cooking", "Heat stable"]
    },
    {
      name: "Organic Aticado Oil",
      grade: "Certified Organic",
      description: "USDA organic certified avocado oil from sustainable farms",
      smokePoint: "375°F (190°C)",
      extraction: "Cold-pressed",
      acidity: "< 0.5%",
      color: "Natural Green",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Leaf,
      benefits: ["USDA certified", "Pesticide-free", "Sustainable", "Pure organic"]
    },
    {
      name: "Cosmetic Grade",
      grade: "Beauty Application",
      description: "Pure avocado oil specially processed for skincare and hair care",
      smokePoint: "N/A",
      extraction: "Cold-pressed",
      acidity: "< 0.1%",
      color: "Light Green",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Sparkles,
      benefits: ["Skincare grade", "Hair treatment", "Pure formula", "Non-comedogenic"]
    }
  ];

  const healthBenefits = [
    {
      icon: Heart,
      title: "Heart Healthy Fats",
      description: "Rich in monounsaturated fats that support cardiovascular health"
    },
    {
      icon: Shield,
      title: "Antioxidant Power",
      description: "High vitamin E content provides natural antioxidant protection"
    },
    {
      icon: Thermometer,
      title: "High Smoke Point",
      description: "Stable at high temperatures, perfect for healthy cooking"
    },
    {
      icon: Sparkles,
      title: "Beauty Benefits",
      description: "Naturally moisturizing for skin and hair care applications"
    }
  ];

  const statistics = [
    {
      icon: TrendingUp,
      number: "500,000",
      label: "Liters Annually",
      description: "Total avocado oil production capacity"
    },
    {
      icon: Award,
      number: "99.5%",
      label: "Quality Grade",
      description: "Premium quality standards achieved"
    },
    {
      icon: Globe,
      number: "25+",
      label: "Export Markets",
      description: "Countries receiving our avocado oil"
    },
    {
      icon: Users,
      number: "1,200+",
      label: "Partner Farmers",
      description: "Avocado growers in our network"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Premium Fruit Selection",
      description: "Hand-picked ripe avocados with optimal oil content and quality indicators"
    },
    {
      step: 2,
      title: "Cold-Press Extraction",
      description: "Temperature-controlled pressing to preserve nutrients and natural flavors"
    },
    {
      step: 3,
      title: "Filtration & Purification",
      description: "Multi-stage filtering process to ensure clarity and purity"
    },
    {
      step: 4,
      title: "Quality Testing",
      description: "Laboratory analysis for acidity, peroxide value, and nutritional content"
    },
    {
      step: 5,
      title: "Bottling & Packaging",
      description: "Food-grade bottling with nitrogen flush to preserve freshness"
    }
  ];

  return (
    <DynamicBusinessPage 
      sectorRoute="/avocado-oil"
      fallbackTitle="ATICADO Oil Production"
      fallbackDescription="Cold-pressed avocado oil delivering exceptional quality and nutritional value for health-conscious consumers worldwide"
    >
      {/* Oil Varieties Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              OUR PRODUCTS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Premium Avocado Oil Varieties
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From cold-pressed extra virgin to cosmetic grade, our avocado oils meet 
              the highest quality standards for every application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {oilVarieties.map((variety, index) => (
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
                  <p className="text-xs text-[#5EB447] mb-2 font-semibold">{variety.grade}</p>
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">{variety.description}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Smoke Point:</span>
                      <span className="font-semibold text-gray-700">{variety.smokePoint}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Extraction:</span>
                      <span className="font-semibold text-[#5EB447]">{variety.extraction}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Acidity:</span>
                      <span className="font-semibold text-[#417ABD]">{variety.acidity}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Color:</span>
                      <span className="font-semibold text-gray-700">{variety.color}</span>
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
              Production Excellence
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our commitment to quality drives exceptional results in avocado oil 
              production and global distribution
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

      {/* Health Benefits Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              HEALTH BENEFITS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Nature's Nutritional Powerhouse
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover the exceptional health benefits of premium avocado oil for 
              cooking, nutrition, and personal care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthBenefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                OUR PROCESS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                From Fruit to Premium Oil
              </h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
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
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                alt="Avocado Oil Production Process"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </DynamicBusinessPage>
  );
};

export default AvocadoOil;
