
import React from "react";
import Layout from "@/components/Layout";
import { ProfessionalButton } from "@/components/ui/professional-button";
import { ProfessionalBadge } from "@/components/ui/professional-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Leaf, Droplets, Globe, Award, ArrowRight, TrendingUp, Users, Shield } from "lucide-react";

const Agriculture = () => {
  const products = [
    {
      title: "ATICADO Fresh Avocado",
      description: "Premium quality fresh avocados for international export markets",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      path: "/avocado-fresh",
      badge: "Export Ready",
      features: ["Premium Quality", "International Standards", "Sustainable Farming"]
    },
    {
      title: "ATICADO Oil Production",
      description: "Cold-pressed avocado oil with exceptional nutritional value",
      image: "/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png",
      path: "/avocado-oil",
      badge: "Certified Organic",
      features: ["Cold-Pressed", "Rich Nutrients", "High Smoke Point"]
    }
  ];

  const farmingPractices = [
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Environmentally responsible agricultural practices that preserve soil health and biodiversity",
      color: "from-aticom-green to-aticom-blue"
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description: "Advanced irrigation systems that maximize water efficiency and minimize environmental impact",
      color: "from-aticom-blue to-aticom-navy"
    },
    {
      icon: Shield,
      title: "Organic Certification",
      description: "Certified organic farming methods ensuring the highest quality and safety standards",
      color: "from-aticom-gold to-aticom-green"
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "Meeting international quality standards for export to global markets",
      color: "from-aticom-navy to-aticom-blue"
    }
  ];

  const stats = [
    { number: "500+", label: "Hectares Under Cultivation", icon: TrendingUp },
    { number: "15", label: "Years of Experience", icon: Award },
    { number: "200+", label: "Local Farmers Supported", icon: Users },
    { number: "95%", label: "Export Quality Rate", icon: Globe }
  ];

  return (
    <Layout>
      <div className="animate-fade-in-up">
        {/* Hero Section */}
        <section className="relative bg-gradient-premium text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-aticom-green/90 to-aticom-blue/80"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] animate-float"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <ProfessionalBadge variant="glass" size="lg" className="mb-6">
                  🌱 ATICOM Agriculture Division
                </ProfessionalBadge>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-strong">
                  Growing Ethiopia's
                  <span className="text-gradient block mt-2">Agricultural Future</span>
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                  Leading sustainable agriculture practices with premium avocado cultivation, 
                  processing, and export operations that support local communities and 
                  global markets.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <ProfessionalButton variant="floating" size="lg" asChild>
                    <Link to="/avocado-fresh">
                      Explore Products
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </ProfessionalButton>
                  <ProfessionalButton variant="glass" size="lg" asChild>
                    <Link to="/contact">
                      Partner With Us
                    </Link>
                  </ProfessionalButton>
                </div>
              </div>
              <div className="relative animate-fade-in-right">
                <div className="card-premium p-8 rounded-3xl">
                  <img 
                    src="/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png" 
                    alt="ATICOM Agriculture"
                    className="w-full rounded-2xl shadow-strong"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-aticom-green rounded-2xl flex items-center justify-center shadow-glow-green">
                  <Leaf className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-aticom-gold/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ProfessionalBadge variant="success" size="lg" className="mb-6">
                Our Agricultural Impact
              </ProfessionalBadge>
              <h2 className="text-4xl md:text-5xl font-bold text-aticom-navy mb-6">
                Numbers That Tell Our Story
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-colored">
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-aticom-green mb-2 animate-counter">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 lg:py-24 bg-gradient-to-br from-aticom-gray to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ProfessionalBadge variant="premium" size="lg" className="mb-6">
                Premium Products
              </ProfessionalBadge>
              <h2 className="text-4xl md:text-5xl font-bold text-aticom-navy mb-6">
                ATICADO Product Line
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our range of premium avocado products, from fresh exports 
                to processed oils, all meeting the highest international standards.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {products.map((product, index) => (
                <Card 
                  key={product.title} 
                  className="card-premium group hover-lift overflow-hidden"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <ProfessionalBadge variant="glass" size="sm">
                        {product.badge}
                      </ProfessionalBadge>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-aticom-navy mb-3">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature) => (
                        <ProfessionalBadge key={feature} variant="outline" size="sm">
                          {feature}
                        </ProfessionalBadge>
                      ))}
                    </div>
                    <ProfessionalButton variant="premium" asChild className="w-full">
                      <Link to={product.path}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </ProfessionalButton>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Farming Practices Section */}
        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ProfessionalBadge variant="gold" size="lg" className="mb-6">
                Our Approach
              </ProfessionalBadge>
              <h2 className="text-4xl md:text-5xl font-bold text-aticom-navy mb-6">
                Sustainable Farming Practices
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We believe in farming methods that protect the environment while 
                delivering exceptional quality and supporting local communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {farmingPractices.map((practice, index) => (
                <Card 
                  key={practice.title} 
                  className="card-professional group hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${practice.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-colored`}>
                      <practice.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-aticom-navy mb-3">
                      {practice.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {practice.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 bg-gradient-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-shadow-strong">
              Join Our Agricultural Revolution
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Partner with ATICOM to be part of Ethiopia's sustainable agricultural future. 
              Together, we can create lasting impact for communities and the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton variant="floating" size="lg" asChild>
                <Link to="/contact">Become a Partner</Link>
              </ProfessionalButton>
              <ProfessionalButton variant="glass" size="lg" asChild>
                <Link to="/about">Our Story</Link>
              </ProfessionalButton>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Agriculture;
