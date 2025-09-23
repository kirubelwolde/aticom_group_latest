import React, { useState, useEffect } from "react";
// Removed Layout import to avoid double wrapping
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Users,
  Leaf,
  Home,
  GraduationCap,
  Stethoscope,
  Award,
  Target,
  Globe,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface CSRInitiative {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface CSRData {
  title: string;
  subtitle: string;
  main_title: string;
  initiatives: CSRInitiative[];
  image_url: string | null;
  hero_image?: string;
  cta_text: string;
  cta_link: string;
}

const CSR = () => {
  const [content, setContent] = useState<CSRData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('csr_content')
          .select('*')
          .eq('active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching CSR content:', error);
        }

        if (data) {
          setContent({
            title: data.title || 'Corporate Social Responsibility',
            subtitle: data.subtitle || '',
            main_title: data.main_title || '',
            initiatives: Array.isArray(data.initiatives) ? (data.initiatives as unknown as CSRInitiative[]) : [],
            image_url: data.image_url,
            hero_image: (data as any).hero_image,
            cta_text: data.cta_text || 'Learn More About Our CSR Initiatives',
            cta_link: data.cta_link || '/csr'
          });
        }
      } catch (error) {
        console.error('Error fetching CSR content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Fallback content if no data is found
  const fallbackInitiatives = [
    {
      title: "Community Housing Projects",
      description:
        "Renovating and building homes for underprivileged families in Akaki Qaliti Subdistrict 10, improving living conditions and community welfare.",
      icon: Home,
      image: "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
      impact: "50+ Families Supported",
      color: "from-[#417ABD] to-[#5EB447]",
    },
    {
      title: "Education Support Programs",
      description:
        "Providing educational resources, scholarships, and infrastructure support to local schools and students.",
      icon: GraduationCap,
      image: "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
      impact: "200+ Students Benefited",
      color: "from-[#5EB447] to-[#417ABD]",
    },
    {
      title: "Healthcare Initiatives",
      description:
        "Supporting local healthcare facilities and providing medical assistance to underserved communities.",
      icon: Stethoscope,
      image: "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
      impact: "5 Health Centers Supported",
      color: "from-[#417ABD] to-[#5EB447]",
    },
    {
      title: "Environmental Conservation",
      description:
        "Implementing eco-friendly practices and supporting environmental conservation projects in our operational areas.",
        icon: Leaf,
      image: "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
      impact: "1000+ Trees Planted",
      color: "from-[#5EB447] to-[#417ABD]",
    },
  ];

  const fallbackImpactAreas = [
    {
      icon: Users,
      title: "Local Employment",
      description:
        "Creating sustainable employment opportunities for local communities through our diverse business operations.",
      stats: "300+ Jobs Created",
    },
    {
      icon: Heart,
      title: "Community Welfare",
      description:
        "Supporting community development initiatives that improve quality of life for residents.",
      stats: "15 Communities Served",
    },
    {
      icon: Leaf,
      title: "Environmental Sustainability",
      description:
        "Implementing eco-friendly practices in our agro-processing operations and promoting sustainable farming.",
      stats: "Carbon Neutral Goal",
    },
    {
      icon: Award,
      title: "Skills Development",
      description:
        "Providing training and skill development programs for youth and community members.",
      stats: "500+ People Trained",
    },
  ];

  const displayContent = content || {
    title: 'Corporate Social Responsibility',
    subtitle: 'Committed to making a positive impact in Ethiopian communities through sustainable development and social initiatives',
    main_title: 'We Are Active At Community Development',
    initiatives: [],
    image_url: '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
    hero_image: '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
    cta_text: 'Learn More About Our CSR Initiatives',
    cta_link: '/csr'
  };

  const initiatives = content?.initiatives && content.initiatives.length > 0 
    ? content.initiatives.map(initiative => ({
        ...initiative,
        icon: getIconComponent(initiative.icon),
        image: displayContent.image_url || "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png",
        impact: "Active Project",
        color: `from-[${initiative.color}] to-[${initiative.color}]`
      }))
    : fallbackInitiatives;

  const impactAreas = fallbackImpactAreas;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-aticom-blue"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        {displayContent.hero_image && (
          <div className="absolute inset-0">
            <img 
              src={displayContent.hero_image} 
              alt="CSR Hero" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20'></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-4 animate-fade-in">
              <Heart className="w-3 h-3 mr-1.5" />
              {displayContent.title}
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Creating Positive
              <span className="block bg-gradient-to-r from-[#5EB447] to-[#417ABD] bg-clip-text text-transparent">
                Community Impact
              </span>
            </h1>
            <p
              className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              {displayContent.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <Badge className="mb-4 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-white text-xs px-3 py-1">
                Our Commitment
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {displayContent.main_title}
              </h2>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  At ATICOM Investment Group, we believe that business success
                  goes hand in hand with community development. Our Corporate
                  Social Responsibility initiatives are designed to create
                  lasting positive impact in the communities where we operate.
                </p>
                <p>
                  From housing renovation projects in Akaki Qaliti to
                  environmental conservation efforts, we are committed to
                  being a responsible corporate citizen that contributes to
                  Ethiopia's social and economic development.
                </p>
                <p>
                  Our CSR programs focus on education, healthcare, housing,
                  environmental sustainability, and economic empowerment,
                  creating a comprehensive approach to community development.
                </p>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <Card className="overflow-hidden border-0 shadow-xl bg-white">
                <img
                  src={displayContent.image_url || "/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png"}
                  alt="CSR Activities"
                  className="w-full h-80 object-cover"
                />
              </Card>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center shadow-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white text-xs px-3 py-1">
              Impact Areas
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Where We Make a Difference
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Our comprehensive approach to social responsibility covers
              multiple areas of community development and social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <Card
                key={area.title}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <area.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                    {area.description}
                  </p>
                  <Badge className="bg-gradient-to-r from-[#5EB447]/10 to-[#417ABD]/10 text-white text-xs px-2 py-1">
                    {area.stats}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Initiatives */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-white text-xs px-3 py-1">
              Our Initiatives
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Current CSR Projects
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto">
              Discover our ongoing initiatives that are making a real
              difference in communities across Ethiopia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <Card
                key={initiative.title}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="md:flex">
                  <div className="md:w-1/3 relative overflow-hidden">
                    <div className="aspect-[4/3] md:h-52">
                      <img
                        src={initiative.image}
                        alt={initiative.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${initiative.color} rounded-lg flex items-center justify-center shadow-lg`}
                      >
                        <initiative.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="md:w-2/3 p-5">
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#417ABD] transition-colors">
                          {initiative.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                          {initiative.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-gradient-to-r from-[#5EB447]/10 to-[#417ABD]/10 text-white text-xs px-2 py-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {initiative.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#417ABD]/5 to-[#5EB447]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white text-xs px-3 py-1">
              Get Involved
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Join Our CSR Efforts
            </h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-6">
              Partner with us to create positive change in Ethiopian
              communities. Together, we can build a brighter future for all.
            </p>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white hover:shadow-lg transition-all duration-300 text-sm"
            >
              <Link to={displayContent.cta_link}>{displayContent.cta_text}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Building a Better Ethiopia Together
          </h2>
          <p className="text-base text-white/90 mb-6 leading-relaxed">
            Our commitment to social responsibility drives everything we do.
            Join us in creating lasting positive impact for communities across
            Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="sm"
              className="bg-white text-white bg-gradient-to-br from-aticom-green to-aticom-blue hover:text-aticom-navy text-sm"
            >
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    Heart,
    Users,
    Leaf,
    Home,
    GraduationCap,
    Stethoscope,
    Award,
    Target,
    Globe,
    CheckCircle
  };
  return iconMap[iconName] || Heart;
};

export default CSR;
