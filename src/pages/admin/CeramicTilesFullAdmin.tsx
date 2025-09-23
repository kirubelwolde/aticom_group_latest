
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import BusinessContentAdmin from '@/components/admin/BusinessContentAdmin';
import { TileCollectionForm } from '@/components/forms/TileCollectionForm';
import TileApplicationForm from '@/components/forms/TileApplicationForm';
import { TileInstallationForm } from '@/components/forms/TileInstallationForm';
import { useTileCollections, useUpsertTileCollection, useDeleteTileCollection } from '@/hooks/useTileCollections';
import { useTileApplications, useUpsertTileApplication, useDeleteTileApplication } from '@/hooks/useTileApplications';
import { useTileInstallations, useUpsertTileInstallation, useDeleteTileInstallation } from '@/hooks/useTileInstallations';
import { useBusinessSector } from '@/hooks/useBusinessSector';
import type { TileCollection, TileApplication } from '@/types/ceramic-tiles';
import type { TileInstallation } from '@/hooks/useTileInstallations';

const CeramicTilesFullAdmin = () => {
  const { toast } = useToast();
  const sectorRoute = '/ceramic-tiles';
  
  // Get business sector
  const { data: businessSector, isLoading: sectorLoading } = useBusinessSector(sectorRoute);
  const businessSectorId = businessSector?.id || '';

  // Data hooks
  const { data: tileCollections = [], isLoading: collectionsLoading } = useTileCollections(businessSectorId);
  const { data: applications = [], isLoading: applicationsLoading } = useTileApplications(businessSectorId);
  const { data: installations = [], isLoading: installationsLoading } = useTileInstallations(businessSectorId);

  // Mutation hooks
  const upsertCollectionMutation = useUpsertTileCollection(businessSectorId);
  const deleteCollectionMutation = useDeleteTileCollection(businessSectorId);
  const upsertApplicationMutation = useUpsertTileApplication(businessSectorId);
  const deleteApplicationMutation = useDeleteTileApplication(businessSectorId);
  const upsertInstallationMutation = useUpsertTileInstallation(businessSectorId);
  const deleteInstallationMutation = useDeleteTileInstallation(businessSectorId);

  // Dialog states
  const [collectionDialog, setCollectionDialog] = useState<{ open: boolean; collection?: TileCollection }>({ open: false });
  const [applicationDialog, setApplicationDialog] = useState<{ open: boolean; application?: TileApplication }>({ open: false });
  const [installationDialog, setInstallationDialog] = useState<{ open: boolean; installation?: TileInstallation }>({ open: false });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter collections based on search and category
  const filteredCollections = tileCollections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || collection.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(tileCollections.map(c => c.category)))];

  // Collection handlers
  const handleCreateCollection = () => {
    setCollectionDialog({ open: true });
  };

  const handleEditCollection = (collection: TileCollection) => {
    setCollectionDialog({ open: true, collection });
  };

  const handleDeleteCollection = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        await deleteCollectionMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  const handleCollectionSubmit = async (data: any) => {
    try {
      const payload = collectionDialog.collection
        ? { ...data, id: collectionDialog.collection.id }
        : data;
      
      await upsertCollectionMutation.mutateAsync(payload);
      setCollectionDialog({ open: false });
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  // Application handlers
  const handleCreateApplication = () => {
    setApplicationDialog({ open: true });
  };

  const handleEditApplication = (application: TileApplication) => {
    setApplicationDialog({ open: true, application });
  };

  const handleDeleteApplication = async (id: string) => {
    if (confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplicationMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const handleApplicationSubmit = async (data: any) => {
    try {
      const payload = applicationDialog.application
        ? { ...data, id: applicationDialog.application.id }
        : data;
      
      await upsertApplicationMutation.mutateAsync(payload);
      setApplicationDialog({ open: false });
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  // Installation handlers
  const handleCreateInstallation = () => {
    setInstallationDialog({ open: true });
  };

  const handleEditInstallation = (installation: TileInstallation) => {
    setInstallationDialog({ open: true, installation });
  };

  const handleDeleteInstallation = async (id: string) => {
    if (confirm('Are you sure you want to delete this installation?')) {
      try {
        await deleteInstallationMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting installation:', error);
      }
    }
  };

  const handleInstallationSubmit = async (data: any) => {
    try {
      const payload = installationDialog.installation
        ? { ...data, id: installationDialog.installation.id }
        : data;
      
      await upsertInstallationMutation.mutateAsync(payload);
      setInstallationDialog({ open: false });
    } catch (error) {
      console.error('Error saving installation:', error);
    }
  };

  if (sectorLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  if (!businessSector) {
    return <div className="text-center p-8">Business sector not found</div>;
  }

  return (
    <div className="space-y-6">
      <BusinessContentAdmin sectorRoute={sectorRoute} sectorTitle="Ceramic Tiles" />

      <Tabs defaultValue="collections" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="collections">Tile Collections</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="installations">Installations</TabsTrigger>
        </TabsList>

        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tile Collections</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage your ceramic tile collections
                  </p>
                </div>
                <Button onClick={handleCreateCollection}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Collection
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search collections..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Collections Grid */}
              {collectionsLoading ? (
                <div className="text-center py-8">Loading collections...</div>
              ) : (
                <div className="grid gap-4">
                  {filteredCollections.map((collection) => (
                    <Card key={collection.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {collection.image_url && (
                            <img
                              src={collection.image_url}
                              alt={collection.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{collection.name}</h3>
                            <Badge variant="secondary">{collection.category}</Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              {collection.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {collection.sizes?.slice(0, 3).map((size) => (
                                <Badge key={size} variant="outline" className="text-xs">
                                  {size}
                                </Badge>
                              ))}
                              {collection.sizes && collection.sizes.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{collection.sizes.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCollection(collection)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCollection(collection.id)}
                          >
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

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tile Applications</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage tile application scenarios
                  </p>
                </div>
                <Button onClick={handleCreateApplication}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Application
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="text-center py-8">Loading applications...</div>
              ) : (
                <div className="grid gap-4">
                  {applications.map((application) => (
                    <Card key={application.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {application.image_url && (
                            <img
                              src={application.image_url}
                              alt={application.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{application.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {application.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {application.suitable_tile_ids?.length || 0} suitable tiles
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditApplication(application)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteApplication(application.id)}
                          >
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

        {/* Installations Tab */}
        <TabsContent value="installations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Tile Installations</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Showcase completed tile installations
                  </p>
                </div>
                <Button onClick={handleCreateInstallation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Installation
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {installationsLoading ? (
                <div className="text-center py-8">Loading installations...</div>
              ) : (
                <div className="grid gap-4">
                  {installations.map((installation) => (
                    <Card key={installation.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {installation.image_url && (
                            <img
                              src={installation.image_url}
                              alt={installation.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{installation.title}</h3>
                            {installation.location && (
                              <p className="text-sm text-muted-foreground">
                                📍 {installation.location}
                              </p>
                            )}
                            {installation.area && (
                              <p className="text-xs text-muted-foreground">
                                Area: {installation.area}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mt-1">
                              {installation.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditInstallation(installation)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteInstallation(installation.id)}
                          >
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
      </Tabs>

      {/* Collection Dialog */}
      <Dialog open={collectionDialog.open} onOpenChange={(open) => setCollectionDialog({ open })}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {collectionDialog.collection ? 'Edit Collection' : 'Create New Collection'}
            </DialogTitle>
          </DialogHeader>
          <TileCollectionForm
            initialData={collectionDialog.collection}
            businessSectorId={businessSectorId}
            onSubmit={handleCollectionSubmit}
            onCancel={() => setCollectionDialog({ open: false })}
            isSubmitting={upsertCollectionMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Application Dialog */}
      <Dialog open={applicationDialog.open} onOpenChange={(open) => setApplicationDialog({ open })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {applicationDialog.application ? 'Edit Application' : 'Create New Application'}
            </DialogTitle>
          </DialogHeader>
          <TileApplicationForm
            application={applicationDialog.application}
            tileCollections={tileCollections.map(c => ({ id: c.id, name: c.name }))}
            onSubmit={handleApplicationSubmit}
            onCancel={() => setApplicationDialog({ open: false })}
            isLoading={upsertApplicationMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Installation Dialog */}
      <Dialog open={installationDialog.open} onOpenChange={(open) => setInstallationDialog({ open })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {installationDialog.installation ? 'Edit Installation' : 'Create New Installation'}
            </DialogTitle>
          </DialogHeader>
          <TileInstallationForm
            initialData={installationDialog.installation}
            onSubmit={handleInstallationSubmit}
            onCancel={() => setInstallationDialog({ open: false })}
            isLoading={upsertInstallationMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CeramicTilesFullAdmin;
