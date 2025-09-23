
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Factory, Settings, Shield, Award } from 'lucide-react';

const Manufacturing = () => {
  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#417ABD] to-[#2C5282] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="info" className="mb-4">Manufacturing Division</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Advanced Manufacturing Solutions
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                State-of-the-art production facilities delivering quality products for construction and infrastructure
              </p>
            </div>
          </div>
        </section>

        {/* Manufacturing Lines */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#417ABD] mb-4">Our Manufacturing Lines</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Ceramic Tiles Production",
                  desc: "High-quality ceramic tiles for residential and commercial use",
                  capacity: "500,000 m²/year",
                  technology: "Italian Technology"
                },
                {
                  title: "Bathroom Solutions",
                  desc: "Complete bathroom fittings and sanitary ware manufacturing",
                  capacity: "50,000 units/year",
                  technology: "German Engineering"
                }
              ].map((line, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover-scale">
                  <div className="w-16 h-16 bg-[#417ABD] rounded-full flex items-center justify-center mb-6">
                    <Factory className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#417ABD] mb-4">{line.title}</h3>
                  <p className="text-gray-600 mb-4">{line.desc}</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Capacity:</span>
                      <span className="font-semibold">{line.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Technology:</span>
                      <span className="font-semibold">{line.technology}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#5EB447] hover:bg-[#5EB447]/90">
                    View Products
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & Standards */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#417ABD] mb-4">Quality & Standards</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "ISO 9001", desc: "Quality Management" },
                { icon: Award, title: "CE Marking", desc: "European Conformity" },
                { icon: Settings, title: "Lean Manufacturing", desc: "Efficient Production" },
                { icon: Factory, title: "Industry 4.0", desc: "Smart Manufacturing" }
              ].map((standard, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#417ABD] rounded-full flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#417ABD] mb-2">{standard.title}</h3>
                  <p className="text-gray-600">{standard.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Manufacturing;
