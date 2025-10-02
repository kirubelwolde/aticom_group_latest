
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/admin/ImageUpload';
import type { TileApplication } from '@/types/ceramic-tiles';

interface TileApplicationFormProps {
  application?: TileApplication;
  tileCollections: Array<{ id: string; name: string }>;
  onSubmit: (data: Partial<TileApplication>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const TileApplicationForm: React.FC<TileApplicationFormProps> = ({
  application,
  tileCollections,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: application?.title || '',
    description: application?.description || '',
    image_url: application?.image_url || '',
    suitable_tile_ids: application?.suitable_tile_ids || [],
    sort_order: application?.sort_order || 0,
    published: application?.published ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTileSelection = (tileId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      suitable_tile_ids: checked
        ? [...prev.suitable_tile_ids, tileId]
        : prev.suitable_tile_ids.filter(id => id !== tileId)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="Application description..."
              />
            </div>

            <div>
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
              <Label htmlFor="published">Published</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload
              label="Application Image"
              value={formData.image_url}
              onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              placeholder="Upload application image"
              bucketName="tile-images"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Suitable Tile Collections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tileCollections.map((tile) => (
                <div key={tile.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tile-${tile.id}`}
                    checked={formData.suitable_tile_ids.includes(tile.id)}
                    onCheckedChange={(checked) => handleTileSelection(tile.id, checked as boolean)}
                  />
                  <Label htmlFor={`tile-${tile.id}`}>{tile.name}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : application ? 'Update Application' : 'Create Application'}
        </Button>
      </div>
    </form>
  );
};

export default TileApplicationForm;
