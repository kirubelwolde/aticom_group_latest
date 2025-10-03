
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Image as ImageIcon, Plus, X } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface BusinessContentData {
  id: string;
  business_sector_id: string;
  page_title: string;
  hero_section: any;
  about_section: any;
  features_section: any;
  gallery_images: string[];
  cta_section: any;
  meta_description: string;
}

interface BusinessContentAdminProps {
  sectorRoute: string;
  sectorTitle: string;
}

const BusinessContentAdmin: React.FC<BusinessContentAdminProps> = ({ sectorRoute, sectorTitle }) => {
  const [content, setContent] = useState<BusinessContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newGalleryImage, setNewGalleryImage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, [sectorRoute]);

  const fetchContent = async () => {
    try {
      // First get the business sector
      const { data: sector, error: sectorError } = await supabase
        .from('business_sectors')
        .select('id')
        .eq('route', sectorRoute)
        .single();

      if (sectorError) throw sectorError;

      // Then get the business content
      const { data, error } = await supabase
        .from('business_content')
        .select('*')
        .eq('business_sector_id', sector.id)
        .single();

      if (error) {
        // If no row exists, create a default content row
        // PGRST116 indicates no rows found for single()
        if ((error as any).code === 'PGRST116') {
          const defaultContent = {
            business_sector_id: sector.id,
            page_title: sectorTitle,
            hero_section: {
              title: sectorTitle,
              subtitle: '',
              description: '',
              background_image: ''
            },
            about_section: {
              title: '',
              content: '',
              image: ''
            },
            features_section: {
              title: '',
              features: []
            },
            gallery_images: [],
            cta_section: {
              title: '',
              description: '',
              button_text: '',
              button_link: ''
            },
            meta_description: ''
          } as any;

          const { data: inserted, error: insertError } = await supabase
            .from('business_content')
            .insert(defaultContent)
            .select('*')
            .single();

          if (insertError) throw insertError;
          setContent(inserted as any);
        } else {
          throw error;
        }
      } else {
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch business content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('business_content')
        .update({
          page_title: content.page_title,
          hero_section: content.hero_section,
          about_section: content.about_section,
          features_section: content.features_section,
          gallery_images: content.gallery_images,
          cta_section: content.cta_section,
          meta_description: content.meta_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', content.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Business content updated successfully",
      });
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: "Error",
        description: "Failed to save business content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, data: any) => {
    if (!content) return;
    setContent({
      ...content,
      [section]: data
    });
  };

  const addGalleryImage = () => {
    if (!content || !newGalleryImage.trim()) return;
    
    setContent({
      ...content,
      gallery_images: [...content.gallery_images, newGalleryImage.trim()]
    });
    setNewGalleryImage('');
  };

  const removeGalleryImage = (index: number) => {
    if (!content) return;
    
    setContent({
      ...content,
      gallery_images: content.gallery_images.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!content) {
    return <div className="text-center text-red-600">Failed to load content</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">{sectorTitle} Content</h2>
          <p className="text-gray-600">Manage the detailed content for the {sectorTitle} page</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-aticom-green hover:bg-aticom-green/90">
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Page Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
          <CardDescription>Basic page information and SEO settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="page-title">Page Title</Label>
            <Input
              id="page-title"
              value={content.page_title}
              onChange={(e) => setContent({...content, page_title: e.target.value})}
              placeholder="Enter page title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta-description">Meta Description</Label>
            <Textarea
              id="meta-description"
              value={content.meta_description || ''}
              onChange={(e) => setContent({...content, meta_description: e.target.value})}
              placeholder="Enter meta description for SEO"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Main banner content that appears at the top of the page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input
                value={content.hero_section?.title || ''}
                onChange={(e) => updateSection('hero_section', {...content.hero_section, title: e.target.value})}
                placeholder="Enter hero title"
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Subtitle</Label>
              <Input
                value={content.hero_section?.subtitle || ''}
                onChange={(e) => updateSection('hero_section', {...content.hero_section, subtitle: e.target.value})}
                placeholder="Enter hero subtitle"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Hero Description</Label>
            <Textarea
              value={content.hero_section?.description || ''}
              onChange={(e) => updateSection('hero_section', {...content.hero_section, description: e.target.value})}
              placeholder="Enter hero description"
              rows={3}
            />
          </div>
          <ImageUpload
            value={content.hero_section?.background_image || ''}
            onChange={(url) => updateSection('hero_section', { ...content.hero_section, background_image: url })}
            placeholder="Hero background image URL" label={''}          />
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Detailed information about this business sector</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>About Title</Label>
            <Input
              value={content.about_section?.title || ''}
              onChange={(e) => updateSection('about_section', {...content.about_section, title: e.target.value})}
              placeholder="Enter about section title"
            />
          </div>
          <div className="space-y-2">
            <Label>About Content</Label>
            <Textarea
              value={content.about_section?.content || ''}
              onChange={(e) => updateSection('about_section', {...content.about_section, content: e.target.value})}
              placeholder="Enter detailed about content"
              rows={5}
            />
          </div>
          <ImageUpload
            value={content.about_section?.image || ''}
            onChange={(url) => updateSection('about_section', { ...content.about_section, image: url })}
            placeholder="About section image URL" label={''}          />
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle>Features Section</CardTitle>
          <CardDescription>Key features and highlights of this business sector</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Features Title</Label>
            <Input
              value={content.features_section?.title || ''}
              onChange={(e) => updateSection('features_section', {...content.features_section, title: e.target.value})}
              placeholder="Enter features section title"
            />
          </div>
          <div className="space-y-2">
            <Label>Features List</Label>
            <Textarea
              value={Array.isArray(content.features_section?.features) ? content.features_section.features.join('\n') : ''}
              onChange={(e) => updateSection('features_section', {...content.features_section, features: e.target.value.split('\n').filter(f => f.trim())})}
              placeholder="Enter each feature on a new line"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gallery Images */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>Additional images showcasing this business sector</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              placeholder="Enter image URL"
              className="flex-1"
            />
            <Button onClick={addGalleryImage} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {content.gallery_images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-24 object-cover rounded border"
                />
                <Button
                  onClick={() => removeGalleryImage(index)}
                  size="sm"
                  variant="destructive"
                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card>
        <CardHeader>
          <CardTitle>Call to Action Section</CardTitle>
          <CardDescription>Encourage visitors to take action</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>CTA Title</Label>
            <Input
              value={content.cta_section?.title || ''}
              onChange={(e) => updateSection('cta_section', {...content.cta_section, title: e.target.value})}
              placeholder="Enter CTA title"
            />
          </div>
          <div className="space-y-2">
            <Label>CTA Description</Label>
            <Textarea
              value={content.cta_section?.description || ''}
              onChange={(e) => updateSection('cta_section', {...content.cta_section, description: e.target.value})}
              placeholder="Enter CTA description"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={content.cta_section?.button_text || ''}
                onChange={(e) => updateSection('cta_section', {...content.cta_section, button_text: e.target.value})}
                placeholder="Enter button text"
              />
            </div>
            <div className="space-y-2">
              <Label>Button Link</Label>
              <Input
                value={content.cta_section?.button_link || ''}
                onChange={(e) => updateSection('cta_section', {...content.cta_section, button_link: e.target.value})}
                placeholder="Enter button link"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessContentAdmin;
