
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  ArrowUp,
  Building,
  Leaf,
  Globe,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import Map from "./Map";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    
    { name: "Agriculture", path: "/agriculture" },
    // { name: "Real Estate", path: "/real-estate" },
    { name: "News", path: "/news" },
    { name: "Careers", path: "/open-positions" },
    { name: "Contact", path: "/contact" },
  ];

  const businessSectors = [
    { name: "Fresh Avocado", path: "/avocado-fresh" },
    { name: "Aticado Oil", path: "/avocado-oil" },
    { name: "Cereal Crops", path: "/cereal-crops" },
    { name: "Coffee Export", path: "/coffee" },
    // { name: "Real Estate", path: "/real-estate" },
    
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <img
                    src="/lovable-uploads/19dd7868-19b3-4400-b881-1d6834e52292.png"
                    alt="ATICOM Logo"
                    className="h-12 w-auto"
                  />
                </div>
                <p className="text-gray-600 leading-relaxed mb-2 font-semibold">
                  BEYOND EXCELLENCE
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Leading Ethiopia's economic growth through excellence in trading, 
                  manufacturing, agriculture, and real estate development.
                </p>
                
                {/* Social Media */}
                <div className="flex space-x-4 mb-8">
                  <Button variant="outline" size="icon" className="hover:bg-[#417ABD] hover:text-white hover:border-[#417ABD]">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#417ABD] hover:text-white hover:border-[#417ABD]">
                    <span className="text-sm font-bold">X</span>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#417ABD] hover:text-white hover:border-[#417ABD]">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="hover:bg-green-500 hover:text-white hover:border-green-500"
                    onClick={() => {
                      const message = encodeURIComponent("Hello! I'm interested in learning more about ATICOM Investment Group's services.");
                      window.open(`https://wa.me/251946141516?text=${message}`, '_blank');
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-start text-gray-600">
                    <Phone className="w-4 h-4 mr-3 text-[#5EB447] mt-0.5" />
                    <div className="space-y-1">
                      <a href="tel:+251116685859" className="hover:text-[#417ABD] transition-colors block">+251-11-6-68-58-59</a>
                      <a href="tel:+2510946141516" className="hover:text-[#417ABD] transition-colors block">+251-09-46-14-15-16 (COO)</a>
                      <a href="tel:+2510947141516" className="hover:text-[#417ABD] transition-colors block">+251-09-47-14-15-16 (Sales Manager)</a>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-600">*
                    <Mail className="w-4 h-4 mr-3 text-[#5EB447] mt-0.5" />
                    <div className="space-y-1">
                      <a href="mailto:info@aticomgroup.com" className="hover:text-[#417ABD] transition-colors block">info@aticomgroup.com</a>
                      <a href="mailto:sales@aticomgroup.com" className="hover:text-[#417ABD] transition-colors block">sales@aticomgroup.com</a>
                      <a href="mailto:coo@aticomgroup.com" className="hover:text-[#417ABD] transition-colors block">coo@aticomgroup.com</a>
                      <a href="mailto:ceo@aticomgroup.com" className="hover:text-[#417ABD] transition-colors block">ceo@aticomgroup.com</a>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-4 h-4 mr-3 text-[#5EB447] mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <p>Around Atlas Crossroad (Cape Verde street)</p>
                      <p>WMA Sets Building, 1st Floor</p>
                      <p>Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <Globe className="w-4 h-4 mr-3 text-[#5EB447] mt-0.5 flex-shrink-0" />
                    <div>
                      <p>P.O.Box: 26932/1000</p>
                      <a href="https://www.aticomgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#417ABD] transition-colors">www.aticomgroup.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-[#417ABD] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business Sectors */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Sectors</h3>
              <ul className="space-y-3">
                {businessSectors.map((sector, index) => (
                  <li key={index}>
                    <Link
                      to={sector.path}
                      className="text-gray-600 hover:text-[#417ABD] transition-colors text-sm"
                    >
                      {sector.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map */}
            <div className="lg:col-span-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Our Location</h3>
              <Map height="250px" showTokenInput={false} />
            </div>
          </div>
        </div>

        <Separator className="bg-gray-200" />

        {/* Bottom Section */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} ATICOM Investment Group. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <Link to="/privacy" className="hover:text-[#417ABD] transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[#417ABD] transition-colors">Terms of Service</Link>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Developed By <a href="https://gudalabs.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#417ABD]">gudalabs</a>
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollToTop}
                className="hover:bg-[#417ABD] hover:text-white hover:border-[#417ABD]"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
