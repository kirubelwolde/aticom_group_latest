
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wheat,
  Droplets,
  Sun,
  Award,
  TrendingUp,
  Globe,
  Shield,
  Leaf,
  Users,
  MapPin,
  Calendar,
  Package,
} from "lucide-react";

const CerealCrops = () => {
  const crops = [
    {
      name: "Teff",
      scientificName: "Eragrostis tef",
      description: "Ethiopia's ancient super grain, naturally gluten-free",
      season: "June - November",
      yield: "800-1200 kg/ha",
      protein: "13-15%",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Wheat,
      benefits: ["Gluten-free", "High protein", "Rich in iron", "Complete amino acids"]
    },
    {
      name: "Wheat",
      scientificName: "Triticum aestivum",
      description: "High-quality wheat varieties for bread and pasta production",
      season: "October - February",
      yield: "2000-3500 kg/ha",
      protein: "11-14%",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Wheat,
      benefits: ["High gluten", "Versatile use", "Good storage", "Export quality"]
    },
    {
      name: "Barley",
      scientificName: "Hordeum vulgare",
      description: "Premium barley for brewing and food processing",
      season: "June - November",
      yield: "1500-2500 kg/ha",
      protein: "10-12%",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Wheat,
      benefits: ["Brewing quality", "High fiber", "Drought tolerant", "Malting grade"]
    },
    {
      name: "Maize",
      scientificName: "Zea mays",
      description: "Yellow and white maize varieties for food and feed",
      season: "April - November",
      yield: "3000-5000 kg/ha",
      protein: "8-10%",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      icon: Wheat,
      benefits: ["High yield", "Versatile crop", "Food security", "Animal feed"]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control from field to export"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Meeting international quality and safety requirements"
    },
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Environmentally responsible agricultural practices"
    },
    {
      icon: Users,
      title: "Farmer Support",
      description: "Training and support for smallholder farmers"
    }
  ];

  const statistics = [
    {
      icon: TrendingUp,
      number: "25,000",
      label: "Tons Annually",
      description: "Total cereal production capacity"
    },
    {
      icon: Users,
      number: "5,000+",
      label: "Partner Farmers",
      description: "Smallholder farmers in our network"
    },
    {
      icon: Globe,
      number: "15+",
      label: "Export Markets",
      description: "Countries receiving our cereals"
    },
    {
      icon: Award,
      number: "95%",
      label: "Quality Grade",
      description: "Export quality standards met"
    }
  ];

  return (
    <DynamicBusinessPage 
      sectorRoute="/cereal-crops"
      fallbackTitle="Cereal Crops Export"
      fallbackDescription="From ancient grains to modern varieties, delivering Ethiopia's finest cereal crops to global markets with uncompromising quality"
    >
      {/* Crop Varieties */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              OUR CROPS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Premium Cereal Varieties
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Exceptional cereal grains cultivated using sustainable practices 
              and meeting international quality standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crops.map((crop, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center">
                      <crop.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#417ABD] transition-colors">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 italic">{crop.scientificName}</p>
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">{crop.description}</p>
                  
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Season:</span>
                      <span className="font-semibold text-gray-700">{crop.season}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Yield:</span>
                      <span className="font-semibold text-[#5EB447]">{crop.yield}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Protein:</span>
                      <span className="font-semibold text-[#417ABD]">{crop.protein}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {crop.benefits.slice(0, 2).map((benefit, i) => (
                        <Badge key={i} className="bg-white text-aticom-navy hover:bg-none text-xs px-2 py-0.5">
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

      {/* Statistics */}
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
              Our commitment to quality and sustainability drives exceptional 
              results in cereal crop production and export
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

      {/* Features */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              OUR ADVANTAGE
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose Our Cereals
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Excellence in every aspect of cereal production, processing, 
              and export to global markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
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
                From Seed to Export
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Seed Selection & Planting
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Premium seed varieties selected for optimal yield and quality characteristics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Sustainable Farming
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Environmentally responsible farming practices ensuring soil health and productivity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Quality Processing
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Modern processing facilities ensuring optimal cleaning, grading, and packaging.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">
                      Export & Distribution
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Efficient logistics and quality assurance for global market delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                alt="Cereal Crops Processing"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </DynamicBusinessPage>
  );
};

export default CerealCrops;
