import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  LinkedinIcon,
  Users,
  Building,
  Target,
  Award,
  CheckCircle,
  ArrowRight,
  MapPin,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getTeamMembers, TeamMember } from "@/services/teamService";

const Team = () => {
  const [activeTab, setActiveTab] = useState("team");
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch team members from database
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members = await getTeamMembers();
        console.log('Fetched team members:', members); // Debug log
        setTeamMembers(members);
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Set empty array on error to show the "no members" state
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // Organization structure data
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
      icon: CheckCircle,
    },
    {
      title: "Global Partnerships",
      description: "International collaborations expanding our market reach",
      icon: ArrowRight,
    },
    {
      title: "Innovation Focus",
      description: "Continuous improvement and technological advancement",
      icon: Target,
    },
  ];

  const directors = [];

  const companyStats = [
    {
      icon: Users,
      label: "Team Members",
      value: `${teamMembers.length}+`,
      color: "text-[#417ABD]",
    },
    {
      icon: Award,
      label: "Years Experience",
      value: "10+",
      color: "text-[#5EB447]",
    },
    {
      icon: Globe,
      label: "Countries Served",
      value: "15+",
      color: "text-[#417ABD]",
    },
    {
      icon: TrendingUp,
      label: "Business Sectors",
      value: "7",
      color: "text-[#5EB447]",
    },
  ];

  const culturalValues = [
    {
      title: "Excellence in Everything",
      description:
        "We pursue the highest standards in all our endeavors, from product quality to customer service.",
      icon: "🎯",
    },
    {
      title: "Collaborative Innovation",
      description:
        "We foster an environment where diverse ideas converge to create breakthrough solutions.",
      icon: "💡",
    },
    {
      title: "Sustainable Growth",
      description:
        "We balance business success with environmental responsibility and community development.",
      icon: "🌱",
    },
    {
      title: "Integrity & Trust",
      description:
        "We build lasting relationships through transparency, honesty, and ethical business practices.",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-aticom-blue to-aticom-green text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-4">
              <Users className="w-3 h-3 mr-1.5" />
              Our Organization
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our Team & Structure
              <span className="block text-2xl md:text-3xl font-medium mt-2">
                Driving Innovation & Excellence
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
              Meet our leadership team and explore our organizational structure that powers ATICOM Group&apos;s success across diverse business sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10 relative">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-white shadow-md rounded-lg p-1">
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:bg-aticom-blue data-[state=active]:text-white rounded-md py-2 px-4 transition-all"
            >
              Our Team
            </TabsTrigger>
            <TabsTrigger 
              value="structure" 
              className="data-[state=active]:bg-aticom-blue data-[state=active]:text-white rounded-md py-2 px-4 transition-all"
            >
              Organization Structure
            </TabsTrigger>
          </TabsList>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-8">
            {/* Company Stats */}
            <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-6">
                  {companyStats.map((stat, index) => (
                    <Card
                      key={index}
                      className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardContent className="p-6">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-3 ${stat.color}`}
                        >
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-gray-600 font-medium text-sm">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Executive Leadership */}
            <section className="py-16 lg:py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <Badge className="mb-3 text-xs px-3 py-1">LEADERSHIP TEAM</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#417ABD] mb-3">
                    Executive Leadership
                  </h2>
                  <p className="text-sm text-gray-600 max-w-3xl mx-auto">
                    Meet the visionary leaders who guide ATICOM's strategic
                    direction and drive our continued growth and success
                  </p>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="text-gray-600">Loading team members...</div>
                  </div>
                ) : teamMembers.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                      <Card
                        key={member.id}
                        className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-none"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative overflow-hidden h-64">
                          {member.image_url ? (
                            <img
                              src={member.image_url}
                              alt={member.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                              onError={(e) => {
                                console.log('Image failed to load:', member.image_url);
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full bg-gradient-to-br from-aticom-blue to-aticom-green flex items-center justify-center ${member.image_url ? 'hidden' : ''}`}>
                            <div className="text-center text-white">
                              <Users className="w-12 h-12 mx-auto mb-2 opacity-80" />
                              <p className="text-sm font-medium">{member.name.split(' ')[0]}</p>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 w-full p-3 text-white">
                            <h3 className="font-bold text-base">{member.name}</h3>
                            <p className="text-white/80 text-xs">
                              {member.position}
                            </p>
                            {member.experience && (
                              <p className="text-white/70 text-xs mt-1">
                                {member.experience}
                              </p>
                            )}
                          </div>
                          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-6 h-6 bg-white/20 hover:bg-white/30 text-white"
                              >
                                <Mail className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="w-6 h-6 bg-white/20 hover:bg-white/30 text-white"
                              >
                                <LinkedinIcon className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-gray-600 text-xs">{member.bio}</p>
                          <div className="mt-2">
                            <span className="text-xs text-aticom-blue font-medium">
                              {member.department}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
                    <p className="text-gray-600">Team members will appear here once they are added.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Company Culture */}
            <section className="py-16 lg:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-fade-in">
                    <Badge className="mb-4 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-3 py-1 text-xs">
                      OUR CULTURE
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Excellence Through
                      <span className="block text-[#417ABD]">Collaboration</span>
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      At ATICOM, we've built a culture that celebrates innovation,
                      embraces diversity, and empowers every team member to
                      contribute to our shared vision of sustainable growth and
                      community development.
                    </p>
                    <div className="space-y-4">
                      {culturalValues.map((value, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#417ABD]/10 to-[#5EB447]/10 rounded-lg flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                            {value.icon}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">
                              {value.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-xs">
                              {value.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="grid grid-cols-2 gap-4 animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div className="space-y-4">
                      <img
                        src="/lovable-uploads/56713ef0-0734-45b4-8f70-394c8bf7de40.png"
                        alt="Team collaboration"
                        className="rounded-xl shadow-lg w-full h-36 object-cover hover:shadow-xl transition-shadow duration-300"
                      />
                      <img
                        src="/lovable-uploads/6b5e8939-7f8d-4757-b9f3-3e162e42798e.png"
                        alt="Innovation meeting"
                        className="rounded-xl shadow-lg w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                    <div className="space-y-4 mt-6">
                      <img
                        src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png"
                        alt="Factory operations"
                        className="rounded-xl shadow-lg w-full h-48 object-cover hover:shadow-xl transition-shadow duration-300"
                      />
                      <img
                        src="/lovable-uploads/470bc52a-2c54-4485-943c-925bbafb6c90.png"
                        alt="Team excellence"
                        className="rounded-xl shadow-lg w-full h-36 object-cover hover:shadow-xl transition-shadow duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          {/* Organization Structure Tab */}
          <TabsContent value="structure" className="mt-8">
            <div className="py-8">
              {/* Business Divisions */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Our Business Divisions
                </h2>
                <img src="/lovable-uploads/structure.jpg" alt="Organization Structure" className="rounded-xl shadow-lg w-full h-auto object-cover hover:shadow-xl transition-shadow duration-300" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {businessDivisions.map((division, index) => {
                    const Icon = division.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div className={`h-2 bg-gradient-to-r ${division.color}`}></div>
                        <div className="p-6">
                          <div className="w-12 h-12 rounded-full bg-aticom-blue/10 flex items-center justify-center mb-4 mx-auto">
                            <Icon className={`w-6 h-6 ${division.color.includes('from-[#5EB447]') ? 'text-aticom-green' : 'text-aticom-blue'}`} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{division.name}</h3>
                          <p className="text-gray-600 mb-4">{division.description}</p>
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">SECTORS</h4>
                            <div className="flex flex-wrap gap-2">
                              {division.sectors.map((sector, i) => (
                                <span 
                                  key={i}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                >
                                  {sector}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Organizational Values */}
              <div className="bg-gray-50 py-16 rounded-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Our Core Values
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-aticom-blue to-aticom-green mx-auto mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                      {organizationalValues.map((value, index) => {
                        const Icon = value.icon;
                        return (
                          <div key={index} className="text-center px-4">
                            <div className="w-16 h-16 bg-aticom-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Icon className="w-8 h-8 text-aticom-blue" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {value.title}
                            </h3>
                            <p className="text-gray-600">
                              {value.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Team;
