
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Target, Eye, Heart } from "lucide-react";

interface VisionMission {
  vision_title: string;
  vision_content: string;
  vision_points: string[];
  mission_title: string;
  mission_content: string;
  mission_points: string[];
  core_values: { title: string; description: string }[];
}

const VisionMissionSection = () => {
  const [content, setContent] = useState<VisionMission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from('vision_mission')
          .select('*')
          .eq('active', true)
          .order('updated_at', { ascending: false })
          .limit(1);

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching vision mission:', error);
          return;
        }

        const row = Array.isArray(data) ? data[0] : (data as any);
        if (row) {
          setContent({
            vision_title: row.vision_title,
            vision_content: row.vision_content,
            vision_points: row.vision_points || [],
            mission_title: row.mission_title,
            mission_content: row.mission_content,
            mission_points: row.mission_points || [],
            core_values: Array.isArray(row.core_values) ? (row.core_values as { title: string; description: string }[]) : []
          });
        }
      } catch (error) {
        console.error('Error fetching vision mission:', error);
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

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-br from-white to-aticom-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-white to-aticom-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Vision */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Badge className="bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold">
                  {displayContent.vision_title}
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {displayContent.vision_content}
              </p>
              <div className="space-y-3">
                {displayContent.vision_points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-aticom-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <Badge className="bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold">
                  {displayContent.mission_title}
                </Badge>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {displayContent.mission_content}
              </p>
              <div className="space-y-3">
                {displayContent.mission_points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-aticom-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="text-center mb-8">
          <Badge className="mb-3 bg-gradient-to-r from-aticom-green to-aticom-blue text-white px-3 py-1 text-xs font-semibold">
            CORE VALUES
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3">
            What Drives Us Forward
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayContent.core_values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-aticom-green to-aticom-blue rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-aticom-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
