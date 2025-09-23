import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfessionalButton } from "@/components/ui/professional-button";
import { ProfessionalBadge } from "@/components/ui/professional-badge";
import {
  Users,
  Briefcase,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VisionMission {
  vision_title: string;
  vision_content: string;
  vision_points: string[];
  mission_title: string;
  mission_content: string;
  mission_points: string[];
  core_values: { title: string; description: string }[];
}

const About = () => {
  const [content, setContent] = useState<VisionMission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('vision_mission')
          .select('*')
          .eq('active', true)
          .maybeSingle();

        if (!data) {
          setContent(null);
        } else {
          setContent({
            vision_title: data.vision_title,
            vision_content: data.vision_content,
            vision_points: data.vision_points || [],
            mission_title: data.mission_title,
            mission_content: data.mission_content,
            mission_points: data.mission_points || [],
            core_values: Array.isArray(data.core_values)
              ? data.core_values as { title: string; description: string }[]
              : [],
          });
        }
      } catch (error) {
        setContent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Fallback content if no data is found
  const fallbackContent: VisionMission = {
    vision_title: "Our Vision",
    vision_content: "To be Ethiopia's premier diversified business group, recognized internationally for excellence, innovation, and sustainable business practices across all our ventures.",
    vision_points: [
      "Establish world-class manufacturing and processing facilities",
      "Lead Ethiopia's export market with high-quality products",
      "Drive economic growth through innovative business solutions"
    ],
    mission_title: "Our Mission",
    mission_content: "To deliver exceptional value to customers, employees, shareholders, and communities through sustainable business operations that drive Ethiopia's economic growth.",
    mission_points: [
      "Produce high-quality products that meet international standards",
      "Create employment opportunities and develop local skills",
      "Implement sustainable practices across all business operations"
    ],
    core_values: [
      { title: "Excellence", description: "Striving for the highest standards in everything we do" },
      { title: "Integrity", description: "Conducting business with honesty, transparency and accountability" },
      { title: "Innovation", description: "Continuously seeking better ways to serve our stakeholders" },
      { title: "Sustainability", description: "Creating lasting positive impact for communities and environment" }
    ]
  };

  const displayContent = content || fallbackContent;

  return (
      <div className="animate-fade-in-up">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className='absolute inset-0 bg-[url(&apos;data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&apos;)] opacity-20'></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-4">
              About ATICOM Investment Group
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Driving Ethiopia's Growth
              <span className="block mt-2 bg-gradient-to-r from-[#5EB447] to-[#417ABD] bg-clip-text text-transparent">Through Innovation</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-4xl mx-auto leading-relaxed">
              Learn about our mission, values, and the diverse sectors we
              operate in to build a sustainable future for Ethiopia.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#5EB447]/20 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-[#417ABD]/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-[#417ABD] rounded-full text-xs font-semibold mb-4">
                Our Guiding Principles
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Core Values
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
                These values define our culture, guide our decisions, and drive
                our commitment to excellence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayContent.core_values.map((value, index) => (
                <div
                  key={value.title}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-aticom-green to-aticom-blue rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {/* Provide static icons based on index, fallback to Users */}
                      {index === 0 ? <Users className="h-6 w-6 text-white" /> :
                        index === 1 ? <Briefcase className="h-6 w-6 text-white" /> :
                        index === 2 ? <Lightbulb className="h-6 w-6 text-white" /> :
                        index === 3 ? <TrendingUp className="h-6 w-6 text-white" /> :
                        index === 4 ? <ShieldCheck className="h-6 w-6 text-white" /> :
                        <Users className="h-6 w-6 text-white" />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision & Mission Section - use admin content */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Vision */}
              <div className="animate-fade-in-left">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#417ABD]/10 to-[#5EB447]/10 text-[#417ABD] rounded-full text-xs font-semibold mb-4">
                  Our Commitment
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  {displayContent.vision_title || "Our Vision"}
                </h2>
                <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                  <p>{displayContent.vision_content}</p>
                  {displayContent.vision_points && displayContent.vision_points.length > 0 && (
                    <ul className="list-disc ml-5 mt-2">
                      {displayContent.vision_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/* Mission */}
              <div className="relative animate-fade-in-right">
                <div className="overflow-hidden border-0 shadow-xl bg-white rounded-2xl">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 px-4 pt-6">
                    {displayContent.mission_title || "Our Mission"}
                  </h2>
                  <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed px-4 pb-6">
                    <p>{displayContent.mission_content}</p>
                    {displayContent.mission_points && displayContent.mission_points.length > 0 && (
                      <ul className="list-disc ml-5 mt-2">
                        {displayContent.mission_points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Sectors Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white rounded-full text-xs font-semibold mb-4">
                Diverse Business Areas
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                Our Sectors
              </h2>
              <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
                We operate across key sectors of the Ethiopian economy, driving
                growth and innovation in each.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Real Estate */}
              <div className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <rect width="20" height="12" x="2" y="9" rx="2" />
                      <path d="M4 9V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                      <line x1="10" x2="10" y1="3" y2="9" />
                      <line x1="14" x2="14" y1="3" y2="9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
                    Real Estate
                  </h3>
                  <p className="text-sm text-slate-600 text-center leading-relaxed">
                    Developing modern residential and commercial properties that
                    meet the evolving needs of Ethiopia's urban landscape.
                  </p>
                </div>
              </div>

              {/* Agriculture */}
              <div className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M3 3v18h18" />
                      <path d="M11 3v18" />
                      <path d="M3 11h18" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
                    Agriculture
                  </h3>
                  <p className="text-sm text-slate-600 text-center leading-relaxed">
                    Cultivating high-quality avocado and coffee for local
                    consumption and export, promoting sustainable farming
                    practices.
                  </p>
                </div>
              </div>

              {/* Manufacturing */}
              <div className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#5EB447] to-[#417ABD] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <rect width="14" height="12" x="5" y="8" rx="2" ry="2" />
                      <path d="M12 22v-4" />
                      <path d="M5 8H2" />
                      <path d="M19 8h3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
                    Manufacturing
                  </h3>
                  <p className="text-sm text-slate-600 text-center leading-relaxed">
                    Producing essential construction materials and industrial
                    products, contributing to Ethiopia's infrastructure
                    development.
                  </p>
                </div>
              </div>

              {/* Trading */}
              <div className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white rounded-2xl">
                <div className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#417ABD] to-[#5EB447] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M21 12H7" />
                      <path d="M18 9l3 3-3 3" />
                      <path d="M3 12h14" />
                      <path d="M6 9l-3 3 3 3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 text-center">
                    Trading
                  </h3>
                  <p className="text-sm text-slate-600 text-center leading-relaxed">
                    Facilitating international trade and commerce, connecting
                    Ethiopian businesses with global markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative animate-fade-in-left">
                <div className="overflow-hidden border-0 shadow-xl bg-white rounded-2xl">
                  <img
                    src="/lovable-uploads/56713ef0-0734-45b4-8f70-394c8bf7de40.png"
                    alt="ATICOM Team"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
              <div className="animate-fade-in-right">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-aticom-green to-aticom-blue text-white rounded-full text-xs font-semibold mb-4">
                  Meet Our Leaders
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                  Driven by Passion, Guided by Expertise
                </h2>
                <div className="space-y-3 text-sm md:text-base text-slate-700 leading-relaxed">
                  <p>
                    Our team comprises seasoned professionals with diverse
                    backgrounds and a shared commitment to excellence.
                  </p>
                  <p>
                    From experienced executives to innovative thinkers, we bring
                    together the best minds to drive our mission forward.
                  </p>
                  <p>
                    Together, we are dedicated to creating lasting value for our
                    stakeholders and contributing to Ethiopia's sustainable
                    development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Partner with Us?
            </h2>
            <p className="text-base text-white/90 mb-6 leading-relaxed">
              Contact ATICOM Investment Group today and explore how we can
              collaborate to build a brighter future for Ethiopia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium">
                <Link to="/contact" className="block">Get In Touch</Link>
              </button>
              <button className="border border-white/30 text-white hover:bg_WHITE/10 px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium">
                <Link to="/team" className="block">Meet Our Team</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
  );
};

export default About;
