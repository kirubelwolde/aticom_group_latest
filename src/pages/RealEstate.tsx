
import React from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building,
  MapPin,
  Home,
  Calendar,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const RealEstate = () => {
  const projects = [
    {
      id: 1,
      name: "Skyline Residential Complex",
      location: "Bole, Addis Ababa",
      type: "Residential",
      units: 150,
      status: "Under Construction",
      completion: "2024",
      image: "/lovable-uploads/f1ef7567-961b-44fa-b854-bad7ff2baf88.png",
      description:
        "Modern residential complex featuring luxury apartments with contemporary amenities",
    },
    {
      id: 2,
      name: "Atlas Business Center",
      location: "Kazanchis, Addis Ababa",
      type: "Commercial",
      units: 50,
      status: "Completed",
      completion: "2023",
      image: "/lovable-uploads/6b5e8939-7f8d-4757-b9f3-3e162e42798e.png",
      description:
        "Premium office spaces designed for modern businesses with state-of-the-art facilities",
    },
    {
      id: 3,
      name: "Green Valley Villas",
      location: "CMC, Addis Ababa",
      type: "Residential",
      units: 25,
      status: "Planning",
      completion: "2025",
      image: "/lovable-uploads/73042c01-6da8-4166-9f4b-6a728e42d3fb.png",
      description:
        "Exclusive villa community with private gardens and premium finishes",
    },
  ];

  const services = [
    {
      icon: Building,
      title: "Property Development",
      description:
        "End-to-end development services from land acquisition to project completion",
    },
    {
      icon: Home,
      title: "Construction Management",
      description:
        "Professional construction oversight ensuring quality and timely delivery",
    },
    {
      icon: Users,
      title: "Investment Consulting",
      description:
        "Expert guidance on real estate investment opportunities and market analysis",
    },
    {
      icon: TrendingUp,
      title: "Property Management",
      description:
        "Comprehensive property management services for residential and commercial properties",
    },
  ];

  return (
    <DynamicBusinessPage 
      sectorRoute="/real-estate"
      fallbackTitle="Real Estate Development"
      fallbackDescription="Building Ethiopia's Future with Modern residential and commercial properties that shape Ethiopia's urban landscape with quality and innovation."
    >
      {/* Current Projects */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-br from-aticom-green to-aticom-blue text-white text-xs px-3 py-1">
              Current Projects
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Our Development Portfolio
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Discover our flagship projects that are reshaping Ethiopia's
              urban landscape
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={`${
                        project.status === "Completed"
                          ? "bg-[#5EB447]"
                          : project.status === "Under Construction"
                          ? "bg-[#417ABD]"
                          : "bg-amber-500"
                      } text-white text-xs px-2 py-1`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#417ABD] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="text-xs">{project.location}</span>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                    {project.description}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-semibold text-[#417ABD]">
                        {project.type}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Units:</span>
                      <span className="font-semibold">{project.units}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Completion:</span>
                      <span className="font-semibold">
                        {project.completion}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white hover:shadow-lg transition-all duration-300 text-xs"
                  >
                    View Project Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#417ABD]/5 to-[#5EB447]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white text-xs px-3 py-1">
              Our Services
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Comprehensive Real Estate Solutions
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              From concept to completion, we provide end-to-end real estate
              development services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <Badge className="mb-4 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white text-xs px-3 py-1">
                Why Choose ATICOM
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Excellence in Every Development
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-[#5EB447] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      15+ Years of Experience
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Proven track record in delivering successful real estate
                      projects across Ethiopia.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-[#5EB447] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      Quality Construction
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We use premium materials and modern construction
                      techniques for lasting quality.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-[#5EB447] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      Sustainable Development
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Committed to environmentally responsible development
                      practices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 bg-[#5EB447] rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                      Customer-Centric Approach
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Dedicated to exceeding client expectations at every
                      project phase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <Card className="overflow-hidden border-0 shadow-xl bg-white">
                <img
                  src="/lovable-uploads/f1ef7567-961b-44fa-b854-bad7ff2baf88.png"
                  alt="Real Estate Development"
                  className="w-full h-80 object-cover"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </DynamicBusinessPage>
  );
};

export default RealEstate;
