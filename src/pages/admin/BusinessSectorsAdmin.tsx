
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Building2,
  GripVertical,
  ExternalLink
} from 'lucide-react';

interface BusinessSector {
  id: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
  route: string;
  order_index: number;
  active: boolean;
}

const BusinessSectorsAdmin = () => {
  const [sectors, setSectors] = useState<BusinessSector[]>([]);
  const [editingSector, setEditingSector] = useState<BusinessSector | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newFeature, setNewFeature] = useState('');
  const { toast } = useToast();

  const fetchSectors = async () => {
    try {
      const { data, error } = await supabase
        .from('business_sectors')
        .select('*')
        .order('order_index');

      if (error) throw error;
      setSectors(data || []);
    } catch (error) {
      console.error('Error fetching business sectors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business sectors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const handleEdit = (sector: BusinessSector) => {
    setEditingSector({ ...sector });
  };

  const handleSave = async () => {
    if (!editingSector) return;

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('business_sectors')
          .insert({
            title: editingSector.title,
            description: editingSector.description,
            image_url: editingSector.image_url,
            features: editingSector.features,
            route: editingSector.route,
            order_index: sectors.length + 1,
            active: editingSector.active
          });

        if (error) throw error;
        toast({
          title: "Success",
          description: "Business sector created successfully",
        });
      } else {
        const { error } = await supabase
          .from('business_sectors')
          .update({
            title: editingSector.title,
            description: editingSector.description,
            image_url: editingSector.image_url,
            features: editingSector.features,
            route: editingSector.route,
            active: editingSector.active
          })
          .eq('id', editingSector.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Business sector updated successfully",
        });
      }

      setEditingSector(null);
      setIsCreating(false);
      fetchSectors();
    } catch (error) {
      console.error('Error saving business sector:', error);
      toast({
        title: "Error",
        description: "Failed to save business sector",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('business_sectors')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Business sector deleted successfully",
      });
      fetchSectors();
    } catch (error) {
      console.error('Error deleting business sector:', error);
      toast({
        title: "Error",
        description: "Failed to delete business sector",
        variant: "destructive",
      });
    }
  };

  const handleCreate = () => {
    setEditingSector({
      id: '',
      title: '',
      description: '',
      image_url: '',
      features: [],
      route: '',
      order_index: sectors.length + 1,
      active: true
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingSector(null);
    setIsCreating(false);
    setNewFeature('');
  };

  const addFeature = () => {
    if (!editingSector || !newFeature.trim()) return;
    
    setEditingSector({
      ...editingSector,
      features: [...editingSector.features, newFeature.trim()]
    });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    if (!editingSector) return;
    
    setEditingSector({
      ...editingSector,
      features: editingSector.features.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">Business Sectors</h2>
          <p className="text-gray-600">Manage company business sectors and services</p>
        </div>
        <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Sector
        </Button>
      </div>

      {/* Edit/Create Form */}
      {editingSector && (
        <Card className="border-aticom-blue">
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Business Sector' : 'Edit Business Sector'}</CardTitle>
            <CardDescription>
              {isCreating ? 'Add a new business sector' : 'Update business sector information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingSector.title}
                  onChange={(e) => setEditingSector({...editingSector, title: e.target.value})}
                  placeholder="Enter sector title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="route">Route</Label>
                <Input
                  id="route"
                  value={editingSector.route}
                  onChange={(e) => setEditingSector({...editingSector, route: e.target.value})}
                  placeholder="e.g., /real-estate"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingSector.description}
                onChange={(e) => setEditingSector({...editingSector, description: e.target.value})}
                placeholder="Enter sector description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={editingSector.image_url}
                onChange={(e) => setEditingSector({...editingSector, image_url: e.target.value})}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                />
                <Button type="button" onClick={addFeature} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {editingSector.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <button onClick={() => removeFeature(index)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingSector.active}
                onCheckedChange={(checked) => setEditingSector({...editingSector, active: checked})}
              />
              <Label htmlFor="active">Active</Label>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-aticom-green hover:bg-aticom-green/90">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? 'Create Sector' : 'Save Changes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sectors List */}
      <div className="grid gap-4">
        {sectors.map((sector) => (
          <Card key={sector.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center">
                  <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {sector.image_url ? (
                      <img 
                        src={sector.image_url} 
                        alt={sector.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-aticom-navy">{sector.title}</h3>
                      <p className="text-sm text-aticom-blue flex items-center">
                        {sector.route}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={sector.active ? "default" : "secondary"}>
                        {sector.active ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(sector)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(sector.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-3">{sector.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {sector.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sectors.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No business sectors yet</h3>
                <p className="text-gray-600">Create your first business sector to get started.</p>
              </div>
              <Button onClick={handleCreate} className="bg-aticom-blue hover:bg-aticom-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Create First Sector
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessSectorsAdmin;
