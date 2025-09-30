
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";
import { getTeamMembers, TeamMember } from "@/services/teamService";

interface SectionHeaders {
  title: string;
  subtitle: string;
}

const TeamSection = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [headers, setHeaders] = useState<SectionHeaders>({
    title: "Our Leadership Team",
    subtitle: "Meet the experienced professionals leading ATICOM Investment Group"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch team members
        const membersData = await getTeamMembers(3);
        setMembers(membersData || []);

        // Fetch section headers from site_settings
        const { data: settingsData, error: settingsError } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['team_section_title', 'team_section_subtitle']);

        if (!settingsError && settingsData) {
          const titleSetting = settingsData.find(s => s.key === 'team_section_title');
          const subtitleSetting = settingsData.find(s => s.key === 'team_section_subtitle');
          
          setHeaders({
            title: titleSetting?.value || "Our Leadership Team",
            subtitle: subtitleSetting?.value || "Meet the experienced professionals leading ATICOM Investment Group"
          });
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-12 lg:py-16 bg-gradient-to-br from-aticom-blue/5 to-aticom-green/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-aticom-blue/5 to-aticom-green/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-gradient-to-r from-aticom-blue to-aticom-green text-white px-3 py-1 text-xs font-semibold animate-fade-in">
            LEADERSHIP
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-aticom-navy mb-3 animate-fade-in">
            {headers.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            {headers.subtitle}
          </p>
        </div>


        {members.length > 0 ? (
  <>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {members.map((member, index) => (
        <Card
          key={member.id}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6 text-center">
            <div className="relative mb-4">
              {/* Image or initials placeholder removed */}
            </div>
            <h3 className="text-lg font-bold text-aticom-navy mb-1">
              {member.name}
            </h3>
            <p className="text-aticom-green font-semibold text-sm mb-1">
              {member.position}
            </p>
            <p className="text-gray-500 text-xs mb-3">
            </p>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {member.bio}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="text-center">
      <Link to="/team">
        <Button className="bg-gradient-to-r from-aticom-blue to-aticom-green hover:from-aticom-green hover:to-aticom-blue text-white px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Meet Our Full Team
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  </>
) : (
  <div className="text-center py-12">
    <p className="text-gray-600">No team members available to display.</p>
  </div>
)}


          </div>
    </section>
  );
};

export default TeamSection;
