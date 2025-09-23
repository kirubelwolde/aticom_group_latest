import React, { useState } from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Grid3X3,
  Palette,
  Ruler,
  Sparkles,
  Eye,
  Search,
} from "lucide-react";
import { useBusinessSector } from "@/hooks/useBusinessSector";
import { useTileCollections } from "@/hooks/useTileCollections";
import { useTileApplications } from "@/hooks/useTileApplications";
import { useTileInstallations } from "@/hooks/useTileInstallations";
import Chatbot from "@/components/Chatbot";

const CeramicTiles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Tiles");
  const [selectedSize, setSelectedSize] = useState("All Sizes");

  // Get business sector and data
  const { data: businessSector } = useBusinessSector('/ceramic-tiles');
  const businessSectorId = businessSector?.id || '';
  
  const { data: tileCollections = [] } = useTileCollections(businessSectorId);
  const { data: applications = [] } = useTileApplications(businessSectorId);
  const { data: installations = [] } = useTileInstallations(businessSectorId);

  const categories = [
    "All Tiles",
    ...Array.from(new Set(tileCollections.map(tile => tile.category)))
  ];

  const sizes = [
    "All Sizes",
    ...Array.from(new Set(tileCollections.flatMap(tile => tile.sizes || [])))
  ];

  const filteredTiles = tileCollections.filter((tile) => {
    const categoryMatch = selectedCategory === "All Tiles" || tile.category === selectedCategory;
    const sizeMatch = selectedSize === "All Sizes" || tile.sizes?.includes(selectedSize);
    return categoryMatch && sizeMatch && tile.published;
  });

  return (
    <>
      <DynamicBusinessPage 
        sectorRoute="/ceramic-tiles"
        fallbackTitle="Ceramic Tiles"
        fallbackDescription="Italian technology meets Ethiopian craftsmanship for world-class ceramic tiles"
      >
        {/* Filter Section */}
        <section className="py-6 bg-gradient-to-r from-gray-50 to-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5EB447] focus:border-transparent text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5EB447] focus:border-transparent text-sm"
                  >
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <Button variant="outline" className="border-gray-300 hover:bg-gradient-to-r hover:from-[#5EB447] hover:to-[#417ABD] hover:text-white text-sm">
                <Search className="w-4 h-4 mr-2" />
                Advanced Search
              </Button>
            </div>
          </div>
        </section>

        {/* Tile Collections */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-4 py-2 text-sm font-semibold">
                OUR COLLECTIONS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Collections
              </h2>
              <p className="text-base text-gray-600">
                Discover our comprehensive range of premium ceramic tiles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTiles.map((tile, index) => (
                <Card
                  key={tile.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up border-0 shadow-lg bg-white group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    {tile.image_url && (
                      <img
                        src={tile.image_url}
                        alt={tile.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white text-xs">
                        {tile.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="w-7 h-7 bg-white/90"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                      <div className="text-white">
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center">
                            <Ruler className="w-3 h-3 mr-1" />
                            {tile.sizes?.join(", ")}
                          </div>
                          <div className="flex items-center">
                            <Palette className="w-3 h-3 mr-1" />
                            {tile.colors?.length || 0} Colors
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#417ABD] transition-colors">
                      {tile.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {tile.description}
                    </p>

                    {/* Technical Details */}
                    <div className="space-y-2 mb-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">
                          Available Sizes:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {tile.sizes?.map((size) => (
                            <span
                              key={size}
                              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">
                          Finishes:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {tile.finishes?.map((finish) => (
                            <span
                              key={finish}
                              className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded"
                            >
                              {finish}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 mb-1">
                          Colors:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {tile.colors?.map((color) => (
                            <span
                              key={color}
                              className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[#5EB447]">
                        {tile.price || 'Contact for Price'}
                      </span>
                      <Button className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] hover:from-[#5EB447] hover:to-[#417ABD] text-white text-sm">
                        Get Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-4 py-2 text-sm font-semibold">
                APPLICATIONS
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Perfect for Every Application
              </h2>
              <p className="text-base text-gray-600">
                Find the ideal tiles for your specific project needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.filter(app => app.published).map((app, index) => (
                <Card
                  key={app.id}
                  className="text-center hover:shadow-xl transition-all duration-300 animate-fade-in-up border-0 shadow-lg bg-white group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-5">
                    {app.image_url && (
                      <img
                        src={app.image_url}
                        alt={app.title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#417ABD] transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      {app.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Installation Gallery */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-4 py-2 text-sm font-semibold">
                INSTALLATION GALLERY
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Installation Gallery
              </h2>
              <p className="text-base text-gray-600">
                See our ceramic tiles transformed into stunning spaces
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {installations.filter(inst => inst.published).map((project, index) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up border-0 shadow-lg bg-white group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-base font-bold">{project.title}</h3>
                      {project.location && (
                        <p className="text-sm opacity-90">{project.location}</p>
                      )}
                      {project.area && (
                        <div className="flex items-center mt-2">
                          <Sparkles className="w-3 h-3 mr-1" />
                          <span className="text-xs">
                            {project.area} installed
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-gray-600 mb-3 text-sm">{project.description}</p>
                    <Button
                      variant="ghost"
                      className="text-[#417ABD] hover:text-[#5EB447] p-0 text-sm"
                    >
                      View Project Gallery →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology & Quality */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <Badge className="mb-6 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-4 py-2 text-sm font-semibold">
                  TECHNOLOGY & QUALITY
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Italian Technology, Ethiopian Excellence
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Our state-of-the-art manufacturing facility combines the
                  latest Italian ceramic technology with skilled Ethiopian
                  craftsmanship to produce tiles that meet international quality
                  standards.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        Advanced Manufacturing Equipment
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Italian-made kilns and pressing machines ensuring
                        consistent quality and precision.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        Rigorous Quality Control
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Multi-stage testing processes including water
                        absorption, breaking strength, and dimensional accuracy.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        Sustainable Production
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Environmentally responsible practices with
                        energy-efficient kilns and recycled materials.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-5 h-5 bg-gradient-to-br from-[#5EB447] to-[#417ABD] rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                        International Standards
                      </h4>
                      <p className="text-gray-600 text-sm">
                        ISO 9001 certified production meeting or exceeding
                        global ceramic tile standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/lovable-uploads/470bc52a-2c54-4485-943c-925bbafb6c90.png"
                  alt="Ceramic Tiles Manufacturing"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </DynamicBusinessPage>
      
      {/* Add the Chatbot component */}
      {/* <Chatbot /> */}
    </>
  );
};

export default CeramicTiles;
