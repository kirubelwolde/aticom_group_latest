
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Plus, X, Users, Eye, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface Partner {
  name: string;
  logo: string;
}

interface PartnersContent {
  id: string;
  title: string;
  subtitle: string;
  partners: Partner[];
  hero_image?: string;
  active: boolean;
}

const PartnersAdmin = () => {
  const [content, setContent] = useState<PartnersContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('partners_content')
        .select('*')
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContent({
          id: data.id,
          title: data.title || 'Our Trusted Partners',
          subtitle: data.subtitle || 'Building strong partnerships across Ethiopia and beyond',
          partners: Array.isArray(data.partners) ? (data.partners as unknown as Partner[]) : [],
          hero_image: (data as any).hero_image,
          active: data.active
        });
      } else {
        // Create default content if none exists
        setContent({
          id: '',
          title: 'Our Trusted Partners',
          subtitle: 'Building strong partnerships across Ethiopia and beyond',
          partners: [
            { name: 'Ethiopian Airlines', logo: '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png' },
            { name: 'Commercial Bank of Ethiopia', logo: '/lovable-uploads/ce2da46f-e428-4a5f-8ccf-2f861740c234.png' },
            { name: 'Ethiopian Investment Commission', logo: '/lovable-uploads/914150f2-c3e2-41f8-a334-a1c78c6c7692.png' }
          ],
          hero_image: '',
          active: true
        });
      }
    } catch (error) {
      console.error('Error fetching partners content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch partners content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('partners_content')
        .upsert({
          id: content.id || undefined,
          title: content.title,
          subtitle: content.subtitle,
          partners: content.partners as any,
          hero_image: content.hero_image,
          active: content.active,
          updated_at: new Date().toISOString()
        } as any);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Partners content saved successfully",
      });
      
      // Refresh content to get the new ID if it was created
      await fetchContent();
    } catch (error) {
      console.error('Error saving partners content:', error);
      toast({
        title: "Error",
        description: "Failed to save partners content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addPartner = () => {
    if (!content) return;
    
    setContent({
      ...content,
      partners: [...content.partners, { name: '', logo: '' }]
    });
  };

  const updatePartner = (index: number, field: keyof Partner, value: string) => {
    if (!content) return;
    
    const partners = [...content.partners];
    partners[index][field] = value;
    setContent({
      ...content,
      partners
    });
  };

  const removePartner = (index: number) => {
    if (!content) return;
    
    const partners = content.partners.filter((_, i) => i !== index);
    setContent({
      ...content,
      partners
    });
  };

  const handleHeroImageUpload = (url: string) => {
    if (!content) return;
    setContent({ ...content, hero_image: url });
  };

  const handlePartnerLogoUpload = (index: number, url: string) => {
    if (!content) return;
    const partners = [...content.partners];
    partners[index] = { ...partners[index], logo: url };
    setContent({ ...content, partners });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6">
        <div className="text-center">No content found</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners Content Management</h1>
          <p className="text-gray-600 mt-2">Manage partners header, hero image, and partner logos</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={previewMode ? 'default' : 'outline'}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {content && (
        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Section Information
              </CardTitle>
              <CardDescription>Configure the partners section header</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Section Title</Label>
                <Input
                  id="title"
                  value={content.title}
                  onChange={(e) => setContent({...content, title: e.target.value})}
                  disabled={previewMode}
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={content.subtitle}
                  onChange={(e) => setContent({...content, subtitle: e.target.value})}
                  disabled={previewMode}
                  placeholder="Enter section subtitle"
                />
              </div>
            </CardContent>
          </Card>

          {/* Hero Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                Hero Image
              </CardTitle>
              <CardDescription>Upload an image for the partners page hero section</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                label="Hero Image"
                value={content.hero_image || ''}
                onChange={handleHeroImageUpload}
                placeholder="Upload hero image for partners page"
                required={false}
                disabled={previewMode}
                bucketName="partner-logos"
              />
            </CardContent>
          </Card>

          {/* Partners List */}
          <Card>
            <CardHeader>
              <CardTitle>Partners</CardTitle>
              <CardDescription>Manage the list of company partners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Label>Partners List</Label>
                {!previewMode && (
                  <Button type="button" variant="outline" size="sm" onClick={addPartner}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Partner
                  </Button>
                )}
              </div>
              {content.partners.map((partner, index) => (
                <Card key={index} className="mb-4">
                  <CardContent className="pt-4">
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                      <div className="flex-1">
                        <Label>Partner Name</Label>
                        <Input
                          value={partner.name}
                          onChange={(e) => updatePartner(index, 'name', e.target.value)}
                          placeholder="Partner name"
                          disabled={previewMode}
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Logo</Label>
                        <ImageUpload
                          label={`Partner ${index + 1} Logo`}
                          value={partner.logo || ''}
                          onChange={(url) => handlePartnerLogoUpload(index, url)}
                          placeholder="Upload or paste logo URL"
                          required={false}
                          disabled={previewMode}
                          bucketName="partner-logos"
                        />
                      </div>
                      {!previewMode && (
                        <div className="flex items-center md:justify-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePartner(index)}
                          >
                            <X className="h-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Status Section */}
          <Card>
            <CardHeader>
              <CardTitle>Section Status</CardTitle>
              <CardDescription>Control the visibility of this section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="partners-active-status"
                  checked={content.active}
                  onCheckedChange={(checked) => setContent({ ...content, active: checked })}
                  disabled={previewMode}
                />
                <Label htmlFor="partners-active-status">
                  {content.active ? 'Section is visible to visitors' : 'Section is hidden from visitors'}
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PartnersAdmin;
