import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';
import { 
  useBathroomProducts, 
  useBathroomInstallations, 
  useBathroomCategories,
  useProductInquiries,
  useCreateBathroomProduct,
  useUpdateBathroomProduct,
  useDeleteBathroomProduct,
  useCreateBathroomInstallation,
  useUpdateBathroomInstallation,
  useDeleteBathroomInstallation
} from '@/hooks/useBathroomSolutions';
import BathroomProductForm from '@/components/forms/BathroomProductForm';
import BathroomInstallationForm from '@/components/forms/BathroomInstallationForm';
import type { BathroomProduct, BathroomInstallation } from '@/types/bathroom-solutions';
import BusinessContentAdmin from '@/components/admin/BusinessContentAdmin';

const BathroomSolutionsFullAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [installationDialogOpen, setInstallationDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<BathroomProduct | undefined>();
  const [selectedInstallation, setSelectedInstallation] = useState<BathroomInstallation | undefined>();
  const [categoryFilter, setCategoryFilter] = useState('All');

  const sectorRoute = '/bathroom-solutions';

  // Data fetching
  const { data: products, isLoading: productsLoading } = useBathroomProducts();
  const { data: installations, isLoading: installationsLoading } = useBathroomInstallations();
  const { data: categories } = useBathroomCategories();
  const { data: inquiries } = useProductInquiries();

  // Mutations
  const createProduct = useCreateBathroomProduct();
  const updateProduct = useUpdateBathroomProduct();
  const deleteProduct = useDeleteBathroomProduct();
  const createInstallation = useCreateBathroomInstallation();
  const updateInstallation = useUpdateBathroomInstallation();
  const deleteInstallation = useDeleteBathroomInstallation();

  // Filter data based on search
  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredInstallations = installations?.filter(installation =>
    installation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    installation.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = () => {
    setSelectedProduct(undefined);
    setProductDialogOpen(true);
  };

  const handleEditProduct = (product: BathroomProduct) => {
    setSelectedProduct(product);
    setProductDialogOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  const handleProductSubmit = (data: any) => {
    if (selectedProduct) {
      updateProduct.mutate(
        { id: selectedProduct.id, data },
        { onSuccess: () => setProductDialogOpen(false) }
      );
    } else {
      createProduct.mutate(data, {
        onSuccess: () => setProductDialogOpen(false)
      });
    }
  };

  const handleCreateInstallation = () => {
    setSelectedInstallation(undefined);
    setInstallationDialogOpen(true);
  };

  const handleEditInstallation = (installation: BathroomInstallation) => {
    setSelectedInstallation(installation);
    setInstallationDialogOpen(true);
  };

  const handleDeleteInstallation = async (id: string) => {
    if (confirm('Are you sure you want to delete this installation?')) {
      deleteInstallation.mutate(id);
    }
  };

  const handleInstallationSubmit = (data: any) => {
    if (selectedInstallation) {
      updateInstallation.mutate(
        { id: selectedInstallation.id, data },
        { onSuccess: () => setInstallationDialogOpen(false) }
      );
    } else {
      createInstallation.mutate(data, {
        onSuccess: () => setInstallationDialogOpen(false)
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <BusinessContentAdmin sectorRoute={sectorRoute} sectorTitle="Bathroom Solutions" />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bathroom Solutions Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="products">Products ({products?.length || 0})</TabsTrigger>
          <TabsTrigger value="installations">Installations ({installations?.length || 0})</TabsTrigger>
          <TabsTrigger value="categories">Categories ({categories?.length || 0})</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries ({inquiries?.length || 0})</TabsTrigger>
        </TabsList>

         {/* Collections Tab */}
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Products</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage bathroom products</p>
                </div>
                <Button onClick={handleCreateProduct}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
            {/* Search & Filter for Products */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option key="all" value="All">All</option>
                {categories?.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            {productsLoading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <div className="grid gap-4">
                {filteredProducts?.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge variant="secondary">{product.category}</Badge>
                          {product.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="installations" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Installations</h2>
            <Button onClick={handleCreateInstallation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Installation
            </Button>
          </div>

          {installationsLoading ? (
            <div>Loading installations...</div>
          ) : (
            <div className="grid gap-6">
              {filteredInstallations?.map((installation) => (
                <Card key={installation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        {installation.image_url && (
                          <img
                            src={installation.image_url}
                            alt={installation.title}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{installation.title}</h3>
                          {installation.location && (
                            <p className="text-sm text-gray-600">📍 {installation.location}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-2">
                            {installation.area && <Badge variant="outline">{installation.area}</Badge>}
                            {installation.client_name && <Badge variant="secondary">{installation.client_name}</Badge>}
                            <Badge variant={installation.published ? "default" : "destructive"}>
                              {installation.published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                          {installation.completion_date && (
                            <p className="text-sm text-gray-600 mt-1">
                              Completed: {new Date(installation.completion_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditInstallation(installation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteInstallation(installation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Categories</h2>
          </div>

          <div className="grid gap-4">
            {categories?.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      {category.description && (
                        <p className="text-sm text-gray-600">{category.description}</p>
                      )}
                    </div>
                    <Badge variant={category.active ? "default" : "secondary"}>
                      {category.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Product Inquiries</h2>
          </div>

          <div className="grid gap-4">
            {inquiries?.map((inquiry) => (
              <Card key={inquiry.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{inquiry.customer_name}</h3>
                      <p className="text-sm text-gray-600">{inquiry.customer_email}</p>
                      {inquiry.customer_phone && (
                        <p className="text-sm text-gray-600">{inquiry.customer_phone}</p>
                      )}
                      {inquiry.message && (
                        <p className="text-sm mt-2">{inquiry.message}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(inquiry.created_at!).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={inquiry.status === 'pending' ? "destructive" : "default"}>
                        {inquiry.status}
                      </Badge>
                      <Badge variant="outline">{inquiry.inquiry_type}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Dialog */}
      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
          </DialogHeader>
          <BathroomProductForm
            product={selectedProduct}
            categories={categories || []}
            onSubmit={handleProductSubmit}
            onCancel={() => setProductDialogOpen(false)}
            isLoading={createProduct.isPending || updateProduct.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Installation Dialog */}
      <Dialog open={installationDialogOpen} onOpenChange={setInstallationDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedInstallation ? 'Edit Installation' : 'Create New Installation'}
            </DialogTitle>
          </DialogHeader>
          <BathroomInstallationForm
            installation={selectedInstallation}
            onSubmit={handleInstallationSubmit}
            onCancel={() => setInstallationDialogOpen(false)}
            isLoading={createInstallation.isPending || updateInstallation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BathroomSolutionsFullAdmin;
