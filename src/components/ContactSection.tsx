import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Laravel backend API
    console.log("Form submission:", formData);
    // This will be connected to Laravel API endpoint
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#417ABD] text-white relative overflow-hidden  "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 brand-heading">
            We're Here to Help! Call Us Today!
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with ATICOM Investment Group for business inquiries,
            partnerships, or any questions about our services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            className="space-y-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 hover-scale transition-all duration-300">
                  <MapPin className="w-6 h-6 text-[#5EB447] mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Address</h4>
                    <p className="text-blue-100">
                      Around Atlas Crossroad (Cape Verde street) WMA Sets
                      <br />
                      Building 1st Floor
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover-scale transition-all duration-300">
                  <Phone className="w-6 h-6 text-[#5EB447] mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Phone Numbers
                    </h4>
                    <div className="text-blue-100 space-y-1">
                      <p
                        className="cursor-pointer hover:text-[#5EB447] transition-colors"
                        onClick={() => window.open("tel:+251946141516")}
                      >
                        +251-09-46-14-15-16
                      </p>
                      <p
                        className="cursor-pointer hover:text-[#5EB447] transition-colors"
                        onClick={() => window.open("tel:+251947141516")}
                      >
                        +251-09-47-14-15-16
                      </p>
                      <p
                        className="cursor-pointer hover:text-[#5EB447] transition-colors"
                        onClick={() => window.open("tel:+251116685859")}
                      >
                        +251-11-6-68-58-59
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover-scale transition-all duration-300">
                  <Mail className="w-6 h-6 text-[#5EB447] mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p
                      className="text-blue-100 cursor-pointer hover:text-[#5EB447] transition-colors"
                      onClick={() =>
                        window.open("mailto:sales@aticomgroup.com")
                      }
                    >
                      sales@aticomgroup.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover-scale transition-all duration-300">
                  <MessageCircle className="w-6 h-6 text-[#5EB447] mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">WhatsApp</h4>
                    <p
                      className="text-blue-100 cursor-pointer hover:text-[#5EB447] transition-colors"
                      onClick={() => {
                        const message = encodeURIComponent("Hello! I'm interested in learning more about ATICOM Investment Group's services.");
                        window.open(`https://wa.me/251946141516?text=${message}`, '_blank');
                      }}
                    >
                      +251-09-46-14-15-16
                    </p>
                    <p className="text-sm text-blue-200">
                      Click to start a WhatsApp conversation
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover-scale transition-all duration-300">
                  <Clock className="w-6 h-6 text-[#5EB447] mt-1" />
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Business Hours
                    </h4>
                    <div className="text-blue-100 space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <Card className="bg-white/10 backdrop-blur border-white/20 hover-scale transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Quick Contact
                </h4>
                <p className="text-blue-100 mb-4">
                  Ready to discuss your project or business needs? Call us
                  directly for immediate assistance.
                </p>
                <div className="space-y-3">
                  <Button
                    className="bg-[#5EB447] hover:bg-[#5EB447]/90 text-white w-full hover-scale transition-all duration-300"
                    onClick={() => window.open("tel:+251946141516")}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    className="bg-green-500 hover:bg-green-600 text-white w-full hover-scale transition-all duration-300"
                    onClick={() => {
                      const message = encodeURIComponent("Hello! I'm interested in learning more about ATICOM Investment Group's services.");
                      window.open(`https://wa.me/251946141516?text=${message}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card
            className="bg-white/10 backdrop-blur border-white/20 animate-fade-in hover-scale transition-all duration-300"
            style={{ animationDelay: "0.4s" }}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-white mb-6">
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#5EB447] transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#5EB447] transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#5EB447] transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#5EB447] transition-all duration-300"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-100 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#5EB447] transition-all duration-300"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#5EB447] hover:bg-[#5EB447]/90 text-white py-3 hover-scale transition-all duration-300"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
