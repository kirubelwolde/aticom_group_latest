import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Search, 
  Globe, 
  BarChart3, 
  Settings, 
  Eye, 
  TrendingUp,
  FileText,
  Link,
  Image,
  Tag,
  Target,
  CheckSquare
} from 'lucide-react';
import { useSeoSettings, useUpdateSeoSetting, useCreateSeoSetting } from '@/hooks/useSeoSettings';
import type { Tables } from '@/integrations/supabase/types';

type SeoSetting = Tables<'seo_settings'>;

const SeoAdmin = () => {
  const { data: seoSettings, isLoading } = useSeoSettings();
  const updateSeoSetting = useUpdateSeoSetting();
  const createSeoSetting = useCreateSeoSetting();
  const [selectedSetting, setSelectedSetting] = useState<SeoSetting | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // track current tab (overview, editor, analytics, tools)
  const [activeTab, setActiveTab] = useState<'overview' | 'editor' | 'analytics' | 'tools'>('overview');

  const handleSaveSeoSetting = async (data: Partial<SeoSetting>) => {
    try {
      if (selectedSetting?.id) {
        await updateSeoSetting.mutateAsync({ id: selectedSetting.id, ...data });
        toast.success('SEO settings updated successfully!');
      } else {
        await createSeoSetting.mutateAsync(data as any);
        toast.success('SEO settings created successfully!');
      }
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to save SEO settings');
      console.error('Error saving SEO settings:', error);
    }
  };

  const SeoForm = ({ setting }: { setting: SeoSetting | null }) => {
    const [formData, setFormData] = useState({
      title: setting?.title || '',
      meta_description: setting?.meta_description || '',
      meta_keywords: setting?.meta_keywords?.join(', ') || '',
      focus_keywords: setting?.focus_keywords?.join(', ') || '',
      canonical_url: setting?.canonical_url || '',
      og_title: setting?.og_title || '',
      og_description: setting?.og_description || '',
      og_image: setting?.og_image || '',
      twitter_title: setting?.twitter_title || '',
      twitter_description: setting?.twitter_description || '',
      twitter_image: setting?.twitter_image || '',
      h1_tag: setting?.h1_tag || '',
      sitemap_priority: setting?.sitemap_priority || 0.5,
      sitemap_changefreq: setting?.sitemap_changefreq || 'weekly',
      index_status: setting?.index_status ?? true,
      follow_status: setting?.follow_status ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const processedData = {
        ...formData,
        meta_keywords: formData.meta_keywords.split(',').map(k => k.trim()).filter(k => k),
        focus_keywords: formData.focus_keywords.split(',').map(k => k.trim()).filter(k => k),
        sitemap_priority: Number(formData.sitemap_priority),
      };
      handleSaveSeoSetting(processedData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic SEO */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Basic SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Page title for search results"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/60 characters (recommended)
                </p>
              </div>
              
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                  placeholder="Brief description for search results"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.meta_description.length}/160 characters (recommended)
                </p>
              </div>
              
              <div>
                <Label htmlFor="h1_tag">H1 Tag</Label>
                <Input
                  id="h1_tag"
                  value={formData.h1_tag}
                  onChange={(e) => setFormData({...formData, h1_tag: e.target.value})}
                  placeholder="Main heading tag"
                />
              </div>
            </CardContent>
          </Card>

          {/* Keywords & Targeting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Keywords & Targeting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="focus_keywords">Focus Keywords</Label>
                <Input
                  id="focus_keywords"
                  value={formData.focus_keywords}
                  onChange={(e) => setFormData({...formData, focus_keywords: e.target.value})}
                  placeholder="main keyword, secondary keyword"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Primary keywords to rank for (comma separated)
                </p>
              </div>
              
              <div>
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({...formData, meta_keywords: e.target.value})}
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">
                  All relevant keywords (comma separated)
                </p>
              </div>
              
              <div>
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={formData.canonical_url}
                  onChange={(e) => setFormData({...formData, canonical_url: e.target.value})}
                  placeholder="https://aticom.com/page"
                />
              </div>
            </CardContent>
          </Card>

          {/* Open Graph */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Open Graph (Facebook)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="og_title">OG Title</Label>
                <Input
                  id="og_title"
                  value={formData.og_title}
                  onChange={(e) => setFormData({...formData, og_title: e.target.value})}
                  placeholder="Title for social media sharing"
                />
              </div>
              
              <div>
                <Label htmlFor="og_description">OG Description</Label>
                <Textarea
                  id="og_description"
                  value={formData.og_description}
                  onChange={(e) => setFormData({...formData, og_description: e.target.value})}
                  placeholder="Description for social media sharing"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={formData.og_image}
                  onChange={(e) => setFormData({...formData, og_image: e.target.value})}
                  placeholder="https://aticom.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Twitter Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Twitter Cards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twitter_title">Twitter Title</Label>
                <Input
                  id="twitter_title"
                  value={formData.twitter_title}
                  onChange={(e) => setFormData({...formData, twitter_title: e.target.value})}
                  placeholder="Title for Twitter sharing"
                />
              </div>
              
              <div>
                <Label htmlFor="twitter_description">Twitter Description</Label>
                <Textarea
                  id="twitter_description"
                  value={formData.twitter_description}
                  onChange={(e) => setFormData({...formData, twitter_description: e.target.value})}
                  placeholder="Description for Twitter sharing"
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="twitter_image">Twitter Image URL</Label>
                <Input
                  id="twitter_image"
                  value={formData.twitter_image}
                  onChange={(e) => setFormData({...formData, twitter_image: e.target.value})}
                  placeholder="https://aticom.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical SEO */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Technical SEO
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="index_status"
                  checked={formData.index_status}
                  onCheckedChange={(checked) => setFormData({...formData, index_status: checked})}
                />
                <Label htmlFor="index_status">Allow Indexing</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="follow_status"
                  checked={formData.follow_status}
                  onCheckedChange={(checked) => setFormData({...formData, follow_status: checked})}
                />
                <Label htmlFor="follow_status">Allow Following Links</Label>
              </div>
              
              <div>
                <Label htmlFor="sitemap_priority">Sitemap Priority</Label>
                <Select
                  value={formData.sitemap_priority.toString()}
                  onValueChange={(value) => setFormData({...formData, sitemap_priority: parseFloat(value)})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.0">1.0 (Highest)</SelectItem>
                    <SelectItem value="0.9">0.9 (Very High)</SelectItem>
                    <SelectItem value="0.8">0.8 (High)</SelectItem>
                    <SelectItem value="0.7">0.7 (Medium High)</SelectItem>
                    <SelectItem value="0.6">0.6 (Medium)</SelectItem>
                    <SelectItem value="0.5">0.5 (Normal)</SelectItem>
                    <SelectItem value="0.4">0.4 (Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateSeoSetting.isPending || createSeoSetting.isPending}>
            {updateSeoSetting.isPending || createSeoSetting.isPending ? 'Saving...' : 'Save SEO Settings'}
          </Button>
        </div>
      </form>
    );
  };

  if (isLoading) {
    return <div>Loading SEO settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">SEO Management</h1>
          <p className="text-gray-600">Optimize your pages for search engines</p>
        </div>
        <Button onClick={() => {
          setSelectedSetting(null);
          setIsEditing(true);
          setActiveTab('editor');
        }}>
          Add New SEO Page
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'overview' | 'editor' | 'analytics' | 'tools')}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="editor">Page Editor</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tools">SEO Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Pages</p>
                    <p className="text-2xl font-bold">{seoSettings?.length || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Indexed Pages</p>
                    <p className="text-2xl font-bold">
                      {seoSettings?.filter(s => s.index_status).length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold">
                      {seoSettings?.filter(s => (s.sitemap_priority || 0) >= 0.8).length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckSquare className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg SEO Score</p>
                    <p className="text-2xl font-bold">
                      {Math.round((seoSettings?.reduce((sum, s) => sum + (s.seo_score || 0), 0) || 0) / (seoSettings?.length || 1))}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>SEO Pages Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoSettings?.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{setting.title}</h3>
                        <Badge variant={setting.index_status ? 'default' : 'secondary'}>
                          {setting.index_status ? 'Indexed' : 'No Index'}
                        </Badge>
                        <Badge variant="outline">
                          Priority: {setting.sitemap_priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{setting.page_route}</p>
                      <p className="text-xs text-gray-500 mt-1">{setting.meta_description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedSetting(setting);
                        setIsEditing(true);
                        setActiveTab('editor');
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor">
          {isEditing ? (
            <SeoForm setting={selectedSetting} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 mb-4">Select a page to edit its SEO settings</p>
                <Button onClick={() => setIsEditing(true)}>
                  Start Editing
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>SEO Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Analytics integration will be available soon. Connect Google Search Console and Google Analytics for detailed insights.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sitemap Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Generate XML sitemap for search engines</p>
                <Button>Generate Sitemap</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Robots.txt Manager</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Manage your robots.txt file</p>
                <Button>Edit Robots.txt</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Run comprehensive SEO audit</p>
                <Button>Run Audit</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Schema Markup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Manage structured data</p>
                <Button>Configure Schema</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoAdmin;
