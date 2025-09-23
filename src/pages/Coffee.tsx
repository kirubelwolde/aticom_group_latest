
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee as CoffeeIcon, Globe, Award, TrendingUp, Mountain, Droplets, Sun, Leaf, Phone, Download } from "lucide-react";

const Coffee = () => {
  const coffeeOrigins = [
    {
      region: "Yirgacheffe",
      profile: "Floral, citrusy, wine-like acidity",
      altitude: "1,700-2,200m",
      grade: "Grade 1",
      cupping: "88-92 points",
      processing: "Washed & Natural",
      icon: CoffeeIcon
    },
    {
      region: "Sidamo",
      profile: "Full-bodied, wine-like, complex",
      altitude: "1,400-2,200m",
      grade: "Grade 2",
      cupping: "85-88 points",
      processing: "Washed & Natural",
      icon: Sun
    },
    {
      region: "Harrar",
      profile: "Wine-like, fruity, chocolate notes",
      altitude: "1,500-2,100m",
      grade: "Grade 4",
      cupping: "83-86 points",
      processing: "Natural (Dry)",
      icon: Droplets
    }
  ];

  const exportStats = [
    {
      icon: Globe,
      number: "40+",
      label: "Export Countries",
      description: "Global reach across continents"
    },
    {
      icon: Award,
      number: "95%",
      label: "Premium Grade",
      description: "Specialty coffee quality"
    },
    {
      icon: TrendingUp,
      number: "500T",
      label: "Annual Export",
      description: "Consistent supply capacity"
    },
    {
      icon: CoffeeIcon,
      number: "15+",
      label: "Coffee Varieties",
      description: "Diverse flavor profiles"
    }
  ];

  const qualityFeatures = [
    {
      icon: Award,
      title: "Specialty Grade",
      description: "Cupping scores above 80 points meeting SCA standards",
      highlight: "SCA Certified"
    },
    {
      icon: Leaf,
      title: "Sustainable Sourcing",
      description: "Direct relationships with farmers ensuring fair trade practices",
      highlight: "Fair Trade"
    },
    {
      icon: Globe,
      title: "Traceability",
      description: "Full supply chain transparency from farm to export",
      highlight: "100% Traceable"
    },
    {
      icon: CoffeeIcon,
      title: "High Altitude",
      description: "Grown at optimal elevations for complex flavor development",
      highlight: "1,400-2,200m"
    }
  ];

  return (
    <DynamicBusinessPage 
      sectorRoute="/coffee"
      fallbackTitle="Ethiopian Coffee Export"
      fallbackDescription="From the birthplace of coffee to your cup - premium Ethiopian coffee beans for discerning global markets"
    >
      {/* Coffee Origins */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              COFFEE ORIGINS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Premium Ethiopian Regions
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Exceptional coffee beans from Ethiopia's most renowned 
              coffee-growing regions, each with unique flavor characteristics
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {coffeeOrigins.map((coffee, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <coffee.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#417ABD] transition-colors">
                    {coffee.region}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-xs text-gray-500">Flavor Profile:</span>
                      <p className="font-semibold text-gray-900 text-sm">{coffee.profile}</p>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Altitude:</span>
                      <span className="font-semibold text-[#417ABD]">{coffee.altitude}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Cupping Score:</span>
                      <span className="font-semibold text-[#5EB447]">{coffee.cupping}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Processing:</span>
                      <span className="font-semibold text-gray-700">{coffee.processing}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white mb-3 w-full text-center py-1.5 text-xs">
                    {coffee.grade}
                  </Badge>
                  <Button className="w-full bg-gray-100 hover:bg-gradient-to-r hover:from-[#417ABD] hover:to-[#5EB447] hover:text-white text-gray-700 transition-all duration-300 text-sm py-2">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-xl p-6 lg:p-8 text-white text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Specialty Coffee Export
              </h3>
              <p className="text-base text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
                Partner with us for premium Ethiopian coffee beans that meet the 
                highest international standards and exceed customer expectations.
              </p>
              <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] hover:from-[#5EB447] hover:to-[#417ABD] text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Phone className="w-4 h-4 mr-2" />
                Contact Coffee Division: +251-946-14-15-16
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Export Statistics */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-3 py-1 text-xs font-semibold">
              EXPORT PERFORMANCE
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Global Impact
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Our coffee export achievements reflect our commitment to 
              quality and sustainable global coffee trade
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {exportStats.map((stat, index) => (
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

      {/* Quality Features */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
                QUALITY EXCELLENCE
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Coffee
              </h2>
              <div className="space-y-4">
                {qualityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-gray-900">
                          {feature.title}
                        </h4>
                        <Badge className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white text-xs px-2 py-0.5">
                          {feature.highlight}
                        </Badge>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <img
                src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                alt="Quality Ethiopian Coffee"
                className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </DynamicBusinessPage>
  );
};

export default Coffee;
