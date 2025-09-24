
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building,
  Users,
  Target,
  Award,
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const OrganizationStructure = () => {
  const businessDivisions = [
    {
      name: "Real Estate Development",
      description: "Premium residential and commercial property development",
      sectors: [
        "Residential Projects",
        "Commercial Buildings",
        "Mixed-Use Developments",
      ],
      icon: Building,
      color: "from-[#417ABD] to-[#5EB447]",
    },
    {
      name: "Agricultural Division",
      description: "Sustainable farming and agro-processing operations",
      sectors: ["Avocado Farming", "Coffee Export", "Cereal Crops"],
      icon: Target,
      color: "from-[#5EB447] to-[#417ABD]",
    },
    {
      name: "Manufacturing Division",
      description: "High-quality construction materials and products",
      sectors: ["Ceramic Tiles", "Bathroom Solutions", "Building Materials"],
      icon: Award,
      color: "from-[#417ABD] to-[#5EB447]",
    },
  ];

  const organizationalValues = [
    {
      title: "Strategic Leadership",
      description:
        "Executive team providing vision and direction across all business units",
      icon: Users,
    },
    {
      title: "Operational Excellence",
      description:
        "Streamlined processes ensuring efficiency and quality delivery",
      icon: TrendingUp,
    },
    {
      title: "Global Partnerships",
      description: "International collaborations expanding our market reach",
      icon: Globe,
    },
    {
      title: "Innovation Focus",
      description: "Continuous improvement and technological advancement",
      icon: CheckCircle,
    },
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20'></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-4 animate-fade-in">
                <Building className="w-3 h-3 mr-1.5" />
                Organization Structure
              </div>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                Our Organizational
                <span className="block bg-gradient-to-r from-[#5EB447] to-[#417ABD] bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
              <p
                className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Discover how our structured approach to business organization
                drives success across diverse sectors and enables sustainable
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission Overview */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-[#417ABD] rounded-full text-xs font-semibold mb-4">
                  Our Foundation
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Vision & Mission
                </h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-[#417ABD]/5 to-[#5EB447]/5 p-5 rounded-2xl border border-[#417ABD]/10">
                    <h3 className="text-lg font-bold text-[#417ABD] mb-2">
                      Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      To be Ethiopia's most trusted and innovative investment
                      group, driving sustainable economic growth while creating
                      lasting value for all stakeholders.
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-[#5EB447]/5 to-[#417ABD]/5 p-5 rounded-2xl border border-[#5EB447]/10">
                    <h3 className="text-lg font-bold text-[#5EB447] mb-2">
                      Our Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      To develop and manage diversified businesses that deliver
                      exceptional value through innovation, excellence, and
                      sustainable practices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-right">
                <Card className="overflow-hidden border-0 shadow-xl bg-white">
                  <img
                    src="/lovable-uploads/56713ef0-0734-45b4-8f70-394c8bf7de40.png"
                    alt="Organization Structure"
                    className="w-full h-80 object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Business Divisions */}
        <section
          className="py-16 lg:py-20 relative overflow-hidden bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('/public/lovable-uploads/structure.jpg')` }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white rounded-full text-xs font-semibold mb-4">
                Business Structure
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                Three core divisions working in harmony to drive growth and
                innovation across diverse market sectors.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {businessDivisions.map((division, index) => (
                <Card
                  key={division.name}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${division.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <division.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#417ABD] transition-colors">
                      {division.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {division.description}
                    </p>
                    <div className="space-y-1.5">
                      {division.sectors.map((sector, i) => (
                        <div
                          key={i}
                          className="flex items-center text-xs text-gray-600"
                        >
                          <CheckCircle className="h-3 w-3 text-[#5EB447] mr-1.5 flex-shrink-0" />
                          {sector}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Organizational Values */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-[#417ABD] rounded-full text-xs font-semibold mb-4">
                Core Principles
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Organizational Values
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                The fundamental principles that guide our organizational
                structure and decision-making processes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {organizationalValues.map((value, index) => (
                <div
                  key={value.title}
                  className="text-center group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Structure */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-[#417ABD]/5 to-[#5EB447]/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white rounded-full text-xs font-semibold mb-4">
                Leadership Excellence
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Meet Our Leadership Team
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-6">
                Experienced professionals leading each division with expertise,
                vision, and commitment to excellence.
              </p>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white hover:shadow-lg transition-all duration-300 text-sm"
              >
                <Link to="/team" className="flex items-center">
                  View Leadership Team
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join Our Growing Organization
            </h2>
            <p className="text-base text-white/90 mb-6 leading-relaxed">
              Be part of Ethiopia's most dynamic investment group and contribute
              to our mission of sustainable economic development.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="sm"
                className="bg-white text-white bg-gradient-to-br from-aticom-green to-aticom-blue hover:text-aticom-navy text-sm"
              >
                <Link to="/careers">View Career Opportunities</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default OrganizationStructure;
