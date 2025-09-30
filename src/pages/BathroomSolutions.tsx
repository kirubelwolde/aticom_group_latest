
import React, { useState } from "react";
import DynamicBusinessPage from "@/components/DynamicBusinessPage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Phone, Mail, MessageSquare, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBathroomProducts, useBathroomInstallations, useBathroomCategories, useCreateProductInquiry, useCreateBathroomSolution } from "@/hooks/useBathroomSolutions";
import type { ProductInquiryFormData, BathroomSolutionFormData } from "@/types/bathroom-solutions";

const BathroomSolutions = () => {
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [inquiryDialogOpen, setInquiryDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [inquiryForm, setInquiryForm] = useState<ProductInquiryFormData>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    message: "",
    inquiry_type: "general",
  });

  const [newSolutionDialogOpen, setNewSolutionDialogOpen] = useState(false);
  const [newSolutionForm, setNewSolutionForm] = useState<BathroomSolutionFormData>({
    title: "",
    description: "",
    image_url: "",
    category: "",
    features: [],
  });

  // Data fetching
  const { data: products, isLoading: productsLoading } = useBathroomProducts(true);
  const { data: installations, isLoading: installationsLoading } = useBathroomInstallations(true);
  const { data: categories } = useBathroomCategories(true);
  const createInquiry = useCreateProductInquiry();
  const createBathroomSolution = useCreateBathroomSolution();

  // Filter products
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInquiry = (productId: string) => {
    setSelectedProductId(productId);
    setInquiryForm(prev => ({ ...prev, product_id: productId }));
    setInquiryDialogOpen(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiry.mutate({
      ...inquiryForm,
      product_id: selectedProductId,
    }, {
      onSuccess: () => {
        setInquiryDialogOpen(false);
        setInquiryForm({
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          message: "",
          inquiry_type: "general",
        });
      }
    });
  };

  const handleNewSolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBathroomSolution.mutate(newSolutionForm, {
      onSuccess: () => {
        setNewSolutionDialogOpen(false);
        setNewSolutionForm({
          title: "",
          description: "",
          image_url: "",
          category: "",
          features: [],
        });
      },
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <DynamicBusinessPage 
      sectorRoute="/bathroom-solutions"
      fallbackTitle="Bathroom Solutions"
      fallbackDescription="Modern bathroom fittings, sanitary ware, and complete bathroom solutions for residential and commercial projects."
    >
      {/* Products Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white px-3 py-1 text-xs font-semibold">
              OUR PRODUCTS
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Premium Bathroom Products
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts?.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    {product.model && (
                      <p className="text-sm text-gray-600 mb-2">Model: {product.model}</p>
                    )}
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="ml-2 text-sm text-gray-600">
                        {product.rating} ({product.reviews_count} reviews)
                      </span>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {product.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-[#417ABD]">
                        {product.price || "Contact for Price"}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleInquiry(product.id)}
                        className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white"
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Inquire
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button onClick={() => setNewSolutionDialogOpen(true)} className="bg-gradient-to-r from-[#417ABD] to-[#5EB447] text-white">
              Add New Bathroom Solution
            </Button>
          </div>
        </div>
      </section>

      {/* Installation Showcase */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-gradient-to-r from-[#5EB447] to-[#417ABD] text-white px-3 py-1 text-xs font-semibold">
              OUR WORK
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Installation Showcase
            </h2>
          </div>

          {installationsLoading ? (
            <div className="text-center py-8">Loading installations...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {installations?.map((installation) => (
                <Card key={installation.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={installation.image_url || "/placeholder.svg"}
                      alt={installation.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{installation.title}</h3>
                    {installation.location && (
                      <p className="text-sm text-gray-600 mb-2">📍 {installation.location}</p>
                    )}
                    {installation.description && (
                      <p className="text-gray-600 text-sm mb-3">
                        {installation.description}
                      </p>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      {installation.area && (
                        <span>Area: {installation.area}</span>
                      )}
                      {installation.completion_date && (
                        <span>{new Date(installation.completion_date).getFullYear()}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Dialog */}
      <Dialog open={inquiryDialogOpen} onOpenChange={setInquiryDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Product Inquiry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div>
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input
                id="customer_name"
                value={inquiryForm.customer_name}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <Input
                id="customer_email"
                type="email"
                value={inquiryForm.customer_email}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, customer_email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_phone">Phone</Label>
              <Input
                id="customer_phone"
                value={inquiryForm.customer_phone}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, customer_phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="inquiry_type">Inquiry Type</Label>
              <Select 
                value={inquiryForm.inquiry_type} 
                onValueChange={(value) => setInquiryForm(prev => ({ ...prev, inquiry_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="price">Price Quote</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                  <SelectItem value="installation">Installation Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                rows={3}
                placeholder="Please describe your requirements..."
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setInquiryDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createInquiry.isPending}>
                {createInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add New Bathroom Solution Dialog */}
      <Dialog open={newSolutionDialogOpen} onOpenChange={setNewSolutionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Bathroom Solution</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNewSolutionSubmit} className="space-y-4">
            <div>
              <Label htmlFor="new_solution_title">Title *</Label>
              <Input
                id="new_solution_title"
                value={newSolutionForm.title}
                onChange={(e) => setNewSolutionForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="new_solution_description">Description *</Label>
              <Textarea
                id="new_solution_description"
                value={newSolutionForm.description}
                onChange={(e) => setNewSolutionForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="new_solution_image_url">Image URL *</Label>
              <Input
                id="new_solution_image_url"
                value={newSolutionForm.image_url}
                onChange={(e) => setNewSolutionForm(prev => ({ ...prev, image_url: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="new_solution_category">Category *</Label>
              <Input
                id="new_solution_category"
                value={newSolutionForm.category}
                onChange={(e) => setNewSolutionForm(prev => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="new_solution_features">Features (comma separated)</Label>
              <Input
                id="new_solution_features"
                value={newSolutionForm.features.join(", ")}
                onChange={(e) => setNewSolutionForm(prev => ({ ...prev, features: e.target.value.split(",").map(f => f.trim()) }))}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setNewSolutionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createBathroomSolution.isPending}>
                {createBathroomSolution.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </DynamicBusinessPage>
  );
};

export default BathroomSolutions;
