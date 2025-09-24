import React, { useState } from 'react';
import Map from "@/components/Map";
import { ProfessionalButton } from "@/components/ui/professional-button";
import { ProfessionalBadge } from "@/components/ui/professional-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Building,
  Leaf,
  Factory,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  MessageSquare,
} from "lucide-react";

const Contact: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Here you would typically send the form data to a backend API or a service like EmailJS
    // For now, we'll just log the data to the console.
    console.log({
      fullName,
      email,
      phoneNumber,
      company,
      areaOfInterest,
      message,
    });

    // In a real application, you would add logic here to send the email
    // For example, using a fetch request to your backend:
    /*
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'admin_assistant@aticomgroup.com',
          subject: 'New Contact Form Submission',
          body: `
            Full Name: ${fullName}
            Email: ${email}
            Phone Number: ${phoneNumber}
            Company: ${company}
            Area of Interest: ${areaOfInterest}
            Message: ${message}
          `,
        }),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        // Optionally reset form fields
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setCompany('');
        setAreaOfInterest('');
        setMessage('');
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message.');
    }
    */

    alert('Form submitted! (Email sending is simulated)');
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Main Office",
      primary: "+251-11-6-68-58-59",
      secondary: "info@aticomgroup.com",
      description: "General lines and information",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Users,
      title: "COO",
      primary: "+251-09-46-14-15-16",
      secondary: "coo@aticomgroup.com",
      description: "Chief Operations Office",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Users,
      title: "Sales Manager (Beruke)",
      primary: "+251-09-47-14-15-16",
      secondary: "sales@aticomgroup.com",
      description: "Sales inquiries and support",
      color: "from-amber-600 to-amber-700",
    },
    {
      icon: Users,
      title: "CEO Office",
      primary: "",
      secondary: "ceo@aticomgroup.com",
      description: "Executive communications",
      color: "from-purple-600 to-purple-700",
    },
  ];

  const departments = [
    {
      icon: Users,
      name: "General Inquiries",
      email: "info@aticomgroup.com",
      phone: "+251-11-6-68-58-59",
      description: "For general questions and information",
    },
    {
      icon: Building,
      name: "Real Estate",
      email: "info@aticomgroup.com",
      phone: "+251-11-6-68-58-59",
      description: "Property development and investment",
    },
    {
      icon: Leaf,
      name: "Agriculture",
      email: "info@aticomgroup.com",
      phone: "+251-11-6-68-58-59",
      description: "ATICADO products and farming",
    },
    {
      icon: Factory,
      name: "Manufacturing",
      email: "info@aticomgroup.com",
      phone: "+251-11-6-68-58-59",
      description: "Industrial and manufacturing solutions",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      name: "Facebook",
      url: "#",
      color: "hover:text-slate-700",
    },
    { icon: Twitter, name: "Twitter", url: "#", color: "hover:text-slate-700" },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "#",
      color: "hover:text-slate-700",
    },
    {
      icon: Instagram,
      name: "Instagram",
      url: "#",
      color: "hover:text-slate-800",
    },
  ];

  return (
      <div className="animate-fade-in-up">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white py-16 lg:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 to-slate-800/80"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-float"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <ProfessionalBadge variant="glass" size="default" className="mb-2">
              BEYOND EXCELLENCE
            </ProfessionalBadge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-shadow-strong">
              Get In Touch with ATICOM
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
              Around Atlas Crossroad (Cape Verde street), WMA Sets Building 1st Floor, Addis Ababa
            </p>
            <p className="text-sm text-white/70">P.O.Box: 26932/1000</p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-slate-600/20 rounded-full blur-xl animate-float"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-slate-600/20 rounded-full blur-xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </section>

        {/* Contact Methods */}
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <ProfessionalBadge
                variant="premium"
                className="mb-3 bg-slate-700 text-white"
              >
                Multiple Ways to Connect
              </ProfessionalBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                How Can We Help You?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={method.title}
                  className="card-premium group hover-lift text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-colored`}
                    >
                      <method.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {method.title}
                    </h3>
                    {method.primary && (
                      <p className="text-slate-700 font-semibold mb-1 text-sm">
                        {method.primary}
                      </p>
                    )}
                    <p className="text-slate-600 mb-2 text-sm">
                      {method.secondary}
                    </p>
                    <p className="text-xs text-slate-500">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-100 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <ProfessionalBadge
                variant="outline"
                className="mb-3 border-slate-700 text-slate-700"
              >
                📍 Find Us Here
              </ProfessionalBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Visit Our Office
              </h2>
              <p className="text-base text-slate-600 max-w-3xl mx-auto">
                Located in the heart of Addis Ababa, our office is easily
                accessible and welcoming to all visitors and partners.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <Card className="card-premium">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-5">
                      Office Information
                    </h3>

                    <div className="space-y-5">
                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1 text-sm">
                            Address
                          </h4>
                          <p className="text-slate-600 leading-relaxed text-sm">
                            Around Atlas Crossroad (Cape Verde street)
                            <br />
                            WMA Sets Building, 1st Floor
                            <br />
                            Addis Ababa, Ethiopia
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1 text-sm">
                            Office Hours
                          </h4>
                          <div className="text-slate-600 space-y-1 text-sm">
                            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                            <p>Saturday: 9:00 AM - 2:00 PM</p>
                            <p>Sunday: Closed</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Phone className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1 text-sm">
                            Direct Contact
                          </h4>
                          <div className="text-slate-600 space-y-1 text-sm">
                            <p>+251-11-6-68-58-59</p>
                            <p>+251-09-46-14-15-16 (COO)</p>
                            <p>+251-09-47-14-15-16 (Sales Manager)</p>
                            <p>P.O.Box: 26932/1000</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1 text-sm">
                            Emails
                          </h4>
                          <div className="text-slate-600 space-y-1 text-sm">
                            <p>info@aticomgroup.com</p>
                            <p>sales@aticomgroup.com</p>
                            <p>coo@aticomgroup.com</p>
                            <p>ceo@aticomgroup.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Map height="500px" showTokenInput={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Showrooms Section */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <ProfessionalBadge
                variant="outline"
                className="mb-3 border-amber-500 text-amber-600"
              >
                🏢 Our Showrooms
              </ProfessionalBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Visit Our Showrooms
              </h2>
              <p className="text-base text-slate-600 max-w-3xl mx-auto">
                Explore our products and experience quality firsthand at our conveniently located showrooms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Showroom 1 - Jomoo Sanitaryware Gallery (Main Showroom) */}
              <Card className="card-premium group hover-lift">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 text-center">
                    Jomoo Sanitaryware Gallery
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 mt-1 mr-2 text-emerald-500 flex-shrink-0" />
                      <span>Ethio China Road / Welo Sefer: In front of Ethio Telecom / INSA.</span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                      Mon-Sat: 8:30 AM - 7:00 PM
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-emerald-500 flex-shrink-0" />
                      +251-11-6-68-58-59
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Showroom 2 - Head Office ATICOM */}
              <Card className="card-premium group hover-lift">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 text-center">
                    Head Office ATICOM
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 mt-1 mr-2 text-blue-500 flex-shrink-0" />
                      <span>Atlas Traffic Light, WMA Building, First Floor, Addis Ababa</span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      Mon-Sat: 9:00 AM - 6:30 PM
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      +251-09-47-14-15-16
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Showroom 3 - Main Showroom */}
              <Card className="card-premium group hover-lift">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 text-center">
                    Main Showroom
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p className="flex items-start">
                      <MapPin className="w-4 h-4 mt-1 mr-2 text-amber-500 flex-shrink-0" />
                      <span>Ethio China Road / Welo Sefer: In front of Ethio Telecom / INSA.</span>
                    </p>
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
                      Mon-Sat: 8:30 AM - 7:00 PM
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-amber-500 flex-shrink-0" />
                      +251-11-6-68-58-59
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Consultation Form */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-100 to-slate-50">
          <div className="max-w-4xl mx_auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <ProfessionalBadge
                variant="success"
                className="mb-3 bg-slate-700 text-white"
              >
                Free Consultation
              </ProfessionalBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Schedule Your Consultation
              </h2>
              <p className="text-base text-slate-600">
                Tell us about your project and let's explore how we can work
                together
              </p>
            </div>

            <Card className="card-premium">
              <CardContent className="p-6">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">
                        Full Name *
                      </label>
                      <Input
                        placeholder="Enter your full name"
                        className="w-full focus:ring-slate-700 focus:border-slate-700"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        
                        className="w-full focus:ring-slate-700 focus:border-slate-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">
                        Phone Number
                      </label>
                      <Input
                        placeholder="Enter your phone number"
                        className="w-full focus:ring-slate-700 focus:border-slate-700"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        placeholder="Enter company name"
                        className="w-full focus:ring-slate-700 focus:border-slate-700"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Area of Interest
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-slate-700 text-sm"
                      value={areaOfInterest}
                      onChange={(e) => setAreaOfInterest(e.target.value)}
                    >
                      <option>Select an area of interest</option>
                      <option>Real Estate Development</option>
                      <option>Agriculture & Avocado Products</option>
                      <option>Manufacturing & Construction Materials</option>
                      <option>International Trading</option>
                      <option>Investment Opportunities</option>
                      <option>Partnership Opportunities</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-800 mb-2">
                      Message *
                    </label>
                    <Textarea
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full h-28 focus:ring-slate-700 focus:border-slate-700"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="text-center">
                    <ProfessionalButton
                      variant="premium"
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-slate-700 to-slate-800 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </ProfessionalButton>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Department Contacts */}
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <ProfessionalBadge
                variant="gold"
                className="mb-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white"
              >
                Department Contacts
              </ProfessionalBadge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                Reach the Right Team
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <Card
                  key={dept.name}
                  className="card-professional group hover-lift text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <dept.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">
                      {dept.description}
                    </p>
                    <div className="space-y-1 text-xs">
                      <p className="text-slate-700 font-medium">{dept.email}</p>
                      <p className="text-slate-600">{dept.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-slate-100 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in-left">
                <ProfessionalBadge
                  variant="outline"
                  className="mb-3 border-slate-700 text-slate-700"
                >
                  Why Choose ATICOM
                </ProfessionalBadge>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                  Your Trusted Partner in Growth
                </h2>
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    With over 15 years of experience in Ethiopia's market,
                    ATICOM Investment Group has established itself as a reliable
                    partner for businesses and investors looking to create
                    lasting impact.
                  </p>
                  <p>
                    Our diverse portfolio across real estate, agriculture,
                    manufacturing, and trading gives us unique insights into
                    market opportunities and challenges.
                  </p>
                  <p>
                    When you partner with ATICOM, you're not just working with a
                    company – you're joining a mission to build Ethiopia's
                    sustainable future.
                  </p>
                </div>
              </div>
              <div className="relative animate-fade-in-right">
                <div className="card-premium p-6 rounded-3xl">
                  <img
                    src="/lovable-uploads/56713ef0-0734-45b4-8f70-394c8bf7de40.png"
                    alt="ATICOM Team"
                    className="w-full rounded-2xl shadow-strong"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Hours & Social */}
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Office Hours */}
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mr-3">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Office Hours
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Monday - Friday</span>
                      <span className="text-slate-700">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Saturday</span>
                      <span className="text-slate-700">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Sunday</span>
                      <span className="text-slate-500">Closed</span>
                    </div>
                    <div className="pt-3 border-t">
                      <p className="text-xs text-slate-600">
                        Emergency contacts available 24/7 for urgent matters
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="card-premium">
                <CardContent className="p-6">
                  <div className="flex items-center mb-5">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center mr-3">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">
                      Follow Us
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-5 text-sm">
                    Stay connected with ATICOM Investment Group for the latest
                    updates, news, and opportunities.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className={`flex items-center p-3 rounded-lg border hover:shadow-md transition-all duration-300 group ${social.color} hover:border-slate-700`}
                      >
                        <social.icon className="h-4 w-4 text-slate-600 group-hover:scale-110 transition-transform duration-300 mr-2" />
                        <span className="font-medium text-slate-700 text-sm">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <div className="max-w-4xl mx_auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-shadow-strong">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base text-white/90 mb-5 leading-relaxed">
              Don't wait – opportunity is calling. Contact ATICOM Investment
              Group today and let's build something extraordinary together.
            </p>
            <ProfessionalButton
              variant="floating"
              size="lg"
              className="bg-white text-slate-800 hover:bg-gray-100"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now: +251-11-6-68-58-59
            </ProfessionalButton>
          </div>
        </section>
      </div>
  );
};

export default Contact;
