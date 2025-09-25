import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Building,
  DollarSign,
  Calendar,
  ArrowRight,
  Filter,
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  Award,
  Target,
  Coffee,
  Car,
  Shield,
  Star,
  X,
  Upload,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const fetchPositions = async () => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("*")
    .order("posted_date", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

const OpenPositions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const departments = [
    "All Departments",
    "Real Estate",
    "Agriculture",
    "Manufacturing",
    "Finance & Administration",
    "Marketing & Sales",
    "Operations",
    "Human Resources",
  ];

  const jobTypes = [
    "All Types",
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
  ];

  const { data: positions, isLoading, error } = useQuery({
    queryKey: ["job_positions"],
    queryFn: fetchPositions,
  });

  const filteredPositions = (positions || []).filter((position: any) => {
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      position.department === selectedDepartment;
    const matchesType =
      selectedType === "All Types" || position.type === selectedType;
    const matchesSearch =
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesType && matchesSearch;
  });

  const benefits = [
    {
      icon: Shield,
      title: "Comprehensive Health Insurance",
      description: "Full medical coverage for you and your family",
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Training programs and skill enhancement opportunities",
    },
    {
      icon: TrendingUp,
      title: "Performance Bonuses",
      description:
        "Competitive bonuses based on individual and company performance",
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Flexible working arrangements and wellness programs",
    },
    {
      icon: Car,
      title: "Transportation Benefits",
      description: "Company vehicle or transportation allowance",
    },
    {
      icon: Heart,
      title: "Team Building",
      description: "Regular team events and company retreats",
    },
  ];

  const handleApplyNow = (position) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
  };

  const handleViewDetails = (position) => {
    setSelectedPosition(position);
    setShowDetailsModal(true);
  };

  const { toast } = useToast();

  // Form state for application
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    resume: null as File | null,
  });
  const [resumeUploading, setResumeUploading] = useState(false);

  // Handle file upload to Supabase storage
  async function uploadResume(file: File): Promise<string | null> {
    setResumeUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `resume_${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage
      .from("aticom")
      .upload(`resumes/${fileName}`, file);
    setResumeUploading(false);
    if (error) {
      toast({ variant: "destructive", title: "Upload failed", description: error.message });
      return null;
    }
    // Return the public URL
    return supabase.storage.from("aticom").getPublicUrl(`resumes/${fileName}`).data.publicUrl;
  }

  const handleAppInput = (e) => {
    const { name, value, files } = e.target;
    setAppForm(f => ({
      ...f,
      [name]: files ? files[0] : value,
    }));
  };

  // Update application submission to Supabase
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedPosition?.id || !appForm.name || !appForm.email) {
      toast({ variant: "destructive", title: "Missing required fields", description: "Please fill in all required fields." });
      return;
    }

    let resumeUrl: string | null = null;
    if (appForm.resume) {
      resumeUrl = await uploadResume(appForm.resume);
      if (!resumeUrl) return;
    }

    const { error } = await supabase.from("job_applications").insert([
      {
        job_position_id: selectedPosition.id,
        applicant_name: appForm.name,
        email: appForm.email,
        phone: appForm.phone,
        experience: appForm.experience,
        cover_letter: appForm.coverLetter,
        resume_url: resumeUrl,
      }
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      toast({ variant: "destructive", title: "Application failed", description: error.message });
      return;
    }

    // After saving the application, notify HR via Supabase Edge Function
    try {
      const { error: emailError } = await supabase.functions.invoke('send-application-email', {
        body: {
          recipient: 'hr@aticomgroup.com', // test HR email; can be configured later
          applicant: {
            name: appForm.name,
            email: appForm.email,
            phone: appForm.phone,
            experience: appForm.experience,
            coverLetter: appForm.coverLetter,
            resumeUrl: resumeUrl,
          },
          position: {
            id: selectedPosition.id,
            title: selectedPosition.title,
            department: selectedPosition.department,
            location: selectedPosition.location,
            type: selectedPosition.type,
          },
        },
      });
      if (emailError) {
        console.error('Email notify error:', emailError);
        // Inform but do not block success flow
        toast({ title: 'Application Saved', description: 'We could not notify HR by email at this time.' });
      }
    } catch (err) {
      console.error('Email invoke exception:', err);
      // Do not block success flow
    }

    setShowApplicationModal(false);
    setSelectedPosition(null);
    setAppForm({
      name: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      resume: null,
    });
    toast({ title: "Application Sent", description: "Your application was submitted." });
  };

  return (
    <div className="animate-fade-in bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-slate-600 text-white mb-4 animate-bounce-in backdrop-blur-sm border border-white/30">
            💼 JOIN OUR TEAM
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            Build Your Career with ATICOM
          </h1>
          <p
            className="text-base md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Join Ethiopia's leading investment group and be part of our
            mission to drive sustainable economic growth across multiple
            sectors
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-10 bg-gradient-to-br from-slate-100 to-slate-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent bg-white"
              />
            </div>

            <div className="relative">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-600 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge className="bg-slate-600 text-white mb-3">
              ✨ OPEN POSITIONS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              {isLoading ? "Loading..." : `${filteredPositions.length} Opportunities Available`}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Discover exciting career opportunities across our diverse
              business sectors
            </p>
          </div>

          {/* Loading/Error UI */}
          {isLoading ? (
            <div className="text-center py-20 animate-bounce-in">
              <div className="text-4xl mb-4">⌛</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                Loading job opportunities...
              </h3>
            </div>
          ) : error ? (
            <div className="text-center py-20 animate-bounce-in">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-700 mb-2">
                Failed to load jobs
              </h3>
              <p className="text-red-500 mb-4">{error.message}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          ) : filteredPositions.length === 0 ? (
            <div className="text-center py-20 animate-bounce-in">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-4">
                No matching positions found
              </h3>
              <p className="text-slate-500 mb-8 text-lg">
                Try adjusting your search criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All Departments");
                  setSelectedType("All Types");
                }}
                className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white px-8 py-3"
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPositions.map((position: any, index: number) => (
                <Card
                  key={position.id}
                  className="group hover:shadow-xl transition-all duration-500 bg-white border-slate-100 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-slate-800 group-hover:text-slate-600 transition-colors">
                                {position.title}
                              </h3>
                              {position.urgent && (
                                <Badge className="bg-red-500 text-white text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                {position.department}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {position.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {position.type}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {position.salary}
                              </div>
                              <div className="flex items-center">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {position.experience}
                              </div>
                            </div>
                            <p className="text-slate-700 mb-3">
                              {position.description}
                            </p>
                            <div className="flex items-center text-xs text-slate-500">
                              <Calendar className="w-3 h-3 mr-1" />
                              Posted {position.posted_date
                                ? new Date(position.posted_date).toLocaleDateString()
                                : "(Date N/A)"}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:text-right">
                        <Button
                          onClick={() => handleApplyNow(position)}
                          className="bg-slate-800 hover:bg-slate-700 mr-2 text-white px-6 py-3 mb-2 w-full lg:w-auto"
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleViewDetails(position)}
                          className="border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white px-6 py-3 w-full lg:w-auto"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge className="bg-slate-600 text-white mb-3">
              💫 EMPLOYEE BENEFITS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Why Work With Us?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We believe in taking care of our employees with comprehensive
              benefits and growth opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={benefit.title}
                className="group hover:shadow-xl transition-all duration-500 bg-white border-0 shadow-lg animate-scale-in text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <Badge className="bg-slate-600 text-white mb-3">
              📋 APPLICATION PROCESS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              How to Apply
            </h2>
            <p className="text-lg text-slate-600">
              Follow these simple steps to join our team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "01",
                title: "Find Your Role",
                description:
                  "Browse our open positions and find the role that matches your skills and interests.",
              },
              {
                step: "02",
                title: "Submit Application",
                description:
                  "Complete our online application form with your resume and cover letter.",
              },
              {
                step: "03",
                title: "Interview Process",
                description:
                  "Participate in our interview process and meet with our team members.",
              },
            ].map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <Dialog
        open={showApplicationModal}
        onOpenChange={setShowApplicationModal}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Apply for {selectedPosition?.title}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmitApplication} className="space-y-4 mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <Input
                  required
                  name="name"
                  placeholder="Enter your full name"
                  value={appForm.name}
                  onChange={handleAppInput}
                  className="border-slate-200 focus:ring-slate-600 focus:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  required
                  name="email"
                  placeholder="your.email@example.com"
                  value={appForm.email}
                  onChange={handleAppInput}
                  className="border-slate-200 focus:ring-slate-600 focus:border-slate-600"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <Input
                  required
                  name="phone"
                  placeholder="+251 9XX XXX XXX"
                  value={appForm.phone}
                  onChange={handleAppInput}
                  className="border-slate-200 focus:ring-slate-600 focus:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Years of Experience
                </label>
                <Input
                  name="experience"
                  placeholder="e.g., 3 years"
                  value={appForm.experience}
                  onChange={handleAppInput}
                  className="border-slate-200 focus:ring-slate-600 focus:border-slate-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cover Letter *
              </label>
              <Textarea
                required
                name="coverLetter"
                placeholder=" us why you're interested in this position and why you'd be a great fit..."
                value={appForm.coverLetter}
                onChange={handleAppInput}
                className="h-32 border-slate-200 focus:ring-slate-600 focus:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Resume/CV *
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600">
                  Click to upload your resume or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PDF, DOC, or DOCX (max 5MB)
                </p>
                <Input
                  required
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleAppInput}
                  className="mt-2"
                />
                {resumeUploading && <div className="text-xs text-blue-700 mt-1">Uploading...</div>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                disabled={resumeUploading}
              >
                Submit Application
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              {selectedPosition?.title}
            </DialogTitle>
          </DialogHeader>

          {selectedPosition && (
            <div className="space-y-6 mt-4">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="font-medium">Department:</span>
                  <span className="ml-2">{selectedPosition.department}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{selectedPosition.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{selectedPosition.type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="font-medium">Salary:</span>
                  <span className="ml-2">{selectedPosition.salary}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Job Description
                </h3>
                <p className="text-slate-700">{selectedPosition.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedPosition.requirements?.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-slate-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedPosition.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-slate-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleApplyNow(selectedPosition);
                  }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white"
                >
                  
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsModal(false)}
                  className="border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpenPositions;
