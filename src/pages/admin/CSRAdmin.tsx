
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
import { Save, Plus, X, Heart, Eye, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface CSRInitiative {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface CSRContent {
  id: string;
  title: string;
  subtitle: string;
  main_title: string;
  initiatives: CSRInitiative[];
  image_url: string | null;
  hero_image?: string;
  cta_text: string;
  cta_link: string;
  active: boolean;
}

const CSRAdmin = () => {
  const [content, setContent] = useState<CSRContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('csr_content')
        .select('*')
        .eq('active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setContent({
          id: data.id,
          title: data.title || 'Corporate Social Responsibility',
          subtitle: data.subtitle || '',
          main_title: data.main_title || '',
          initiatives: Array.isArray(data.initiatives) ? (data.initiatives as unknown as CSRInitiative[]) : [],
          image_url: data.image_url,
          hero_image: (data as any).hero_image,
          cta_text: data.cta_text || 'Learn More About Our CSR Initiatives',
          cta_link: data.cta_link || '/csr',
          active: data.active
        });
      } else {
        // Create default content if none exists
        setContent({
          id: '',
          title: 'Corporate Social Responsibility',
          subtitle: 'Committed to making a positive impact in Ethiopian communities through sustainable development and social initiatives',
          main_title: 'We Are Active At Community Development',
          initiatives: [
            {
              icon: 'Heart',
              title: 'Community Housing Projects',
              description: 'Renovating houses for underprivileged residents in Akaki Qaliti Subdistrict 10, improving living conditions and community welfare.',
              color: 'green-500'
            },
            {
              icon: 'Users',
              title: 'Local Employment',
              description: 'Creating sustainable employment opportunities for local communities through our diverse business operations.',
              color: 'blue-500'
            },
            {
              icon: 'Leaf',
              title: 'Environmental Sustainability',
              description: 'Implementing eco-friendly practices in our agro-processing operations and promoting sustainable farming methods.',
              color: 'amber-500'
            }
          ],
          image_url: '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
          hero_image: '/lovable-uploads/579ae00d-1b54-4620-bb45-aae2d62bf7f2.png',
          cta_text: 'Learn More About Our CSR Initiatives',
          cta_link: '/csr',
          active: true
        });
      }
    } catch (error) {
      console.error('Error fetching CSR content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch CSR content",
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
        .from('csr_content')
        .upsert({
          id: content.id || undefined,
          title: content.title,
          subtitle: content.subtitle,
          main_title: content.main_title,
          initiatives: content.initiatives as unknown as any,
          image_url: content.image_url,
          hero_image: content.hero_image,
          cta_text: content.cta_text,
          cta_link: content.cta_link,
          active: content.active,
          updated_at: new Date().toISOString()
        } as any);

      if (error) throw error;

      toast({
        title: "Success",
        description: "CSR content saved successfully",
      });
      
      // Refresh content to get the new ID if it was created
      await fetchContent();
    } catch (error) {
      console.error('Error saving CSR content:', error);
      toast({
        title: "Error",
        description: "Failed to save CSR content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addInitiative = () => {
    if (!content) return;
    setContent({
      ...content,
      initiatives: [...content.initiatives, {
        icon: 'Heart',
        title: '',
        description: '',
        color: 'blue-500'
      }]
    });
  };

  const removeInitiative = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      initiatives: content.initiatives.filter((_, i) => i !== index)
    });
  };

  const updateInitiative = (index: number, field: keyof CSRInitiative, value: string) => {
    if (!content) return;
    const newInitiatives = [...content.initiatives];
    newInitiatives[index] = { ...newInitiatives[index], [field]: value };
    setContent({
      ...content,
      initiatives: newInitiatives
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero_image: imageUrl
    });
  };

  const iconOptions = [
    'Heart', 'Users', 'Leaf', 'Home', 'GraduationCap', 'Stethoscope', 
    'Award', 'Target', 'Globe', 'CheckCircle', 'Star', 'Lightbulb',
    'Shield', 'Gift', 'Handshake', 'Plant', 'Sun', 'Moon'
  ];

  const colorOptions = [
    'blue-500', 'green-500', 'amber-500', 'red-500', 'purple-500',
    'indigo-500', 'pink-500', 'emerald-500', 'teal-500', 'cyan-500'
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">CSR Content Management</h1>
          <p className="text-gray-600 mt-2">Manage your corporate social responsibility content and initiatives</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant={previewMode ? "default" : "outline"}
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Edit Mode" : "Preview Mode"}
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core CSR page content and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Enter page title"
                disabled={previewMode}
              />
            </div>
            
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                placeholder="Enter subtitle"
                rows={3}
                disabled={previewMode}
              />
            </div>

            <div>
              <Label htmlFor="main-title">Main Title</Label>
              <Input
                id="main-title"
                value={content.main_title}
                onChange={(e) => setContent({ ...content, main_title: e.target.value })}
                placeholder="Enter main title"
                disabled={previewMode}
              />
            </div>

            <div>
              <Label htmlFor="cta-text">Call to Action Text</Label>
              <Input
                id="cta-text"
                value={content.cta_text}
                onChange={(e) => setContent({ ...content, cta_text: e.target.value })}
                placeholder="Enter CTA text"
                disabled={previewMode}
              />
            </div>

            <div>
              <Label htmlFor="cta-link">Call to Action Link</Label>
              <Input
                id="cta-link"
                value={content.cta_link}
                onChange={(e) => setContent({ ...content, cta_link: e.target.value })}
                placeholder="Enter CTA link"
                disabled={previewMode}
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
            <CardDescription>Upload an image for the CSR page hero section</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              label="Hero Image"
              value={content.hero_image || ''}
              onChange={handleImageUpload}
              placeholder="Upload hero image for CSR page"
              required={false}
              disabled={previewMode}
              bucketName="hero-cards"
            />
          </CardContent>
        </Card>
      </div>

      {/* CSR Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle>CSR Initiatives</CardTitle>
          <CardDescription>Manage your corporate social responsibility initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            {!previewMode && (
              <Button type="button" variant="outline" onClick={addInitiative}>
                <Plus className="w-4 h-4 mr-2" />
                Add Initiative
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {content.initiatives.map((initiative, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Initiative {index + 1}</Badge>
                  {!previewMode && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeInitiative(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div>
                  <Label>Icon</Label>
                  <select
                    value={initiative.icon}
                    onChange={(e) => updateInitiative(index, 'icon', e.target.value)}
                    disabled={previewMode}
                    className="w-full p-2 border rounded-md"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Title</Label>
                  <Input
                    value={initiative.title}
                    onChange={(e) => updateInitiative(index, 'title', e.target.value)}
                    placeholder="Enter initiative title"
                    disabled={previewMode}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={initiative.description}
                    onChange={(e) => updateInitiative(index, 'description', e.target.value)}
                    placeholder="Describe this initiative"
                    rows={3}
                    disabled={previewMode}
                  />
                </div>

                <div>
                  <Label>Color Theme</Label>
                  <select
                    value={initiative.color}
                    onChange={(e) => updateInitiative(index, 'color', e.target.value)}
                    disabled={previewMode}
                    className="w-full p-2 border rounded-md"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Section */}
      <Card>
        <CardHeader>
          <CardTitle>Page Status</CardTitle>
          <CardDescription>Control the visibility of this content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="active-status"
              checked={content.active}
              onCheckedChange={(checked) => setContent({ ...content, active: checked })}
              disabled={previewMode}
            />
            <Label htmlFor="active-status">
              {content.active ? 'Page is visible to visitors' : 'Page is hidden from visitors'}
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSRAdmin;
