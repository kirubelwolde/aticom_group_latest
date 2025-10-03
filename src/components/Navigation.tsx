import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const businessSectors = [
    {
      category: "Construction Finishing Material",
      items: [
        { name: "Complete Sanitary ware (Jomoo)", path: "/bathroom-solutions" },
        { name: "Porcelane & Ceramic Tiles (Arerti)", path: "/ceramic-tiles" },
      ]
    },
    // its is not essentail for now 
    // {
    //   category: "Real Estate Development",
    //   items: [
    //     { name: "Pislando (Sister Company)", path: "/pislando" },
    //     { name: "Our Properties", path: "/real-estate" },
    //   ]
    // },
    {
      category: "Exports",
      items: [
        { name: "Coffee", path: "/coffee" },
        { name: "Cereal Crops", path: "/cereal-crops" },
         //// ** its not essential for the momment  { name: "Oil Seeds", path: "/oil-seeds" },
        { name: "Fresh Avocado", path: "/avocado-fresh" },
      ]
    }
  ];

  const aboutItems = [
    { name: "About ATICOM", path: "/about" },
    { name: "Vision & Mission", path: "/vision-mission" },
    { name: "Our Team", path: "/team" },
    { name: "Our Partners", path: "/partners" },
    { name: "Our Contribution", path: "/csr" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-strong border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/19dd7868-19b3-4400-b881-1d6834e52292.png" 
                alt="ATICOM Group Logo" 
                className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    to="/"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      location.pathname === "/"
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`bg-transparent border-0 ${
                      location.pathname.startsWith("/about") ||
                      aboutItems.some((item) => location.pathname === item.path)
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    About
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-56 p-4 bg-white/60 backdrop-blur-lg rounded-xl shadow-strong border border-white/20">
                      <div className="grid gap-2">
                        {aboutItems.map((item) => (
                          <NavigationMenuLink key={item.path} asChild>
                            <Link
                              to={item.path}
                              className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`bg-transparent border-0 ${
                      businessSectors.some(sector => 
                        sector.items.some(item => location.pathname === item.path)
                      )
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Business
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-64 p-3 bg-white/60 backdrop-blur-lg rounded-xl shadow-strong border border-white/20">
                      <div className="space-y-3">
                        {businessSectors.map((sector) => (
                          <div key={sector.category} className="space-y-1">
                            <h4 className="px-3 py-2 text-xs font-semibold text-aticom-blue uppercase tracking-wider">
                              {sector.category}
                            </h4>
                            <div className="space-y-1">
                              {sector.items.map((item) => (
                                <NavigationMenuLink key={item.path} asChild>
                                  <Link
                                    to={item.path}
                                    className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-aticom-blue/10 hover:text-aticom-blue transition-colors duration-200"
                                  >
                                    {item.name}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/news"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      location.pathname.startsWith("/news")
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    News
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/open-positions"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      location.pathname === "/careers" || location.pathname === "/open-positions"
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Join our Team
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link
                    to="/contact"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm ${
                      location.pathname === "/contact"
                        ? isScrolled
                          ? "text-aticom-blue bg-aticom-blue/10"
                          : "text-white bg-white/20"
                        : isScrolled
                        ? "text-gray-700 hover:text-aticom-blue"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-3 ml-4">
              <Button
                variant="outline"
                size="icon"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                onClick={() => {
                  const message = encodeURIComponent("Hello! I'm interested in learning more about ATICOM Investment Group's services.");
                  window.open(`https://wa.me/251946141516?text=${message}`, '_blank');
                }}
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              
              <Button
                asChild
                className="bg-gradient-primary text-white shadow-colored hover:shadow-glow hover:scale-105 transition-all duration-300"
              >
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-strong border-t border-white/20 animate-slide-in-bottom">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <div className="space-y-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  About
                </div>
                {aboutItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-4">
                <div className="px-4 py-2 text-sm font-semibold text-aticom-blue uppercase tracking-wide">
                  Business
                </div>
                {businessSectors.map((sector) => (
                  <div key={sector.category} className="space-y-2">
                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {sector.category}
                    </div>
                    <div className="space-y-1 pl-2">
                      {sector.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/news"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                News
              </Link>

              <Link
                to="/open-positions"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Join our Team
              </Link>

              <Link
                to="/contact"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:text-aticom-blue hover:bg-aticom-blue/10 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <div className="space-y-3 mt-4">
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
                  onClick={() => {
                    const message = encodeURIComponent("Hello! I'm interested in learning more about ATICOM Investment Group's services.");
                    window.open(`https://wa.me/251946141516?text=${message}`, '_blank');
                    setIsOpen(false);
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Chat
                </Button>
                
                <Button
                  asChild
                  className="w-full bg-gradient-primary text-white shadow-colored hover:shadow-glow"
                >
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
