
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
import { Save, Plus, X, Target, Eye, Upload, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface VisionMission {
  id: string;
  vision_title: string;
  vision_content: string;
  vision_points: string[];
  mission_title: string;
  mission_content: string;
  mission_points: string[];
  core_values: { title: string; description: string }[];
  hero_image?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

const VisionMissionAdmin = () => {
  const [content, setContent] = useState<VisionMission | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('vision_mission')
        .select('*')
        .eq('active', true)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error && error.code !== 'PGRST116') throw error;
      
      const row = Array.isArray(data) ? data[0] : (data as any);
      if (row) {
        setContent({
          id: row.id,
          vision_title: row.vision_title || 'Our Vision',
          vision_content: row.vision_content || '',
          vision_points: row.vision_points || [],
          mission_title: row.mission_title || 'Our Mission',
          mission_content: row.mission_content || '',
          mission_points: row.mission_points || [],
          core_values: Array.isArray(row.core_values) ? (row.core_values as { title: string; description: string }[]) : [],
          hero_image: (row as any).hero_image,
          active: row.active
        });
      } else {
        // Create default content if none exists
        setContent({
          id: '',
          vision_title: 'Our Vision',
          vision_content: 'To be Ethiopia\'s premier diversified business group, recognized internationally for excellence, innovation, and sustainable business practices across all our ventures.',
          vision_points: [
            'Establish world-class manufacturing and processing facilities',
            'Lead Ethiopia\'s export market with high-quality products',
            'Drive economic growth through innovative business solutions'
          ],
          mission_title: 'Our Mission',
          mission_content: 'To deliver exceptional value to customers, employees, shareholders, and communities through sustainable business operations that drive Ethiopia\'s economic growth.',
          mission_points: [
            'Produce high-quality products that meet international standards',
            'Create employment opportunities and develop local skills',
            'Implement sustainable practices across all business operations'
          ],
          core_values: [
            { title: 'Excellence', description: 'Striving for the highest standards in everything we do' },
            { title: 'Integrity', description: 'Conducting business with honesty, transparency and accountability' },
            { title: 'Innovation', description: 'Continuously seeking better ways to serve our stakeholders' },
            { title: 'Sustainability', description: 'Creating lasting positive impact for communities and environment' }
          ],
          active: true
        });
      }
    } catch (error) {
      console.error('Error fetching vision mission:', error);
      toast({
        title: "Error",
        description: "Failed to fetch vision mission content",
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
      // Deactivate all existing active rows if this content is active
      if (content.active) {
        await supabase
          .from('vision_mission')
          .update({ active: false })
          .eq('active', true);
      }

      const { error } = await supabase
        .from('vision_mission')
        .upsert({
          id: content.id || undefined,
          vision_title: content.vision_title,
          vision_content: content.vision_content,
          vision_points: content.vision_points,
          mission_title: content.mission_title,
          mission_content: content.mission_content,
          mission_points: content.mission_points,
          core_values: content.core_values,
          hero_image: content.hero_image,
          active: content.active,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vision & Mission content saved successfully",
      });
      
      // Refresh content to get the new ID if it was created
      await fetchContent();
    } catch (error) {
      console.error('Error saving vision mission:', error);
      toast({
        title: "Error",
        description: "Failed to save vision mission content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addVisionPoint = () => {
    if (!content) return;
    setContent({
      ...content,
      vision_points: [...content.vision_points, '']
    });
  };

  const removeVisionPoint = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      vision_points: content.vision_points.filter((_, i) => i !== index)
    });
  };

  const updateVisionPoint = (index: number, value: string) => {
    if (!content) return;
    const newPoints = [...content.vision_points];
    newPoints[index] = value;
    setContent({
      ...content,
      vision_points: newPoints
    });
  };

  const addMissionPoint = () => {
    if (!content) return;
    setContent({
      ...content,
      mission_points: [...content.mission_points, '']
    });
  };

  const removeMissionPoint = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      mission_points: content.mission_points.filter((_, i) => i !== index)
    });
  };

  const updateMissionPoint = (index: number, value: string) => {
    if (!content) return;
    const newPoints = [...content.mission_points];
    newPoints[index] = value;
    setContent({
      ...content,
      mission_points: newPoints
    });
  };

  const addCoreValue = () => {
    if (!content) return;
    setContent({
      ...content,
      core_values: [...content.core_values, { title: '', description: '' }]
    });
  };

  const removeCoreValue = (index: number) => {
    if (!content) return;
    setContent({
      ...content,
      core_values: content.core_values.filter((_, i) => i !== index)
    });
  };

  const updateCoreValue = (index: number, field: 'title' | 'description', value: string) => {
    if (!content) return;
    const newValues = [...content.core_values];
    newValues[index] = { ...newValues[index], [field]: value };
    setContent({
      ...content,
      core_values: newValues
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero_image: imageUrl
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Vision & Mission Management</h1>
          <p className="text-gray-600 mt-2">Manage your company's vision, mission, and core values</p>
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
        {/* Vision Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Vision
            </CardTitle>
            <CardDescription>Define your company's long-term vision and goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vision-title">Vision Title</Label>
              <Input
                id="vision-title"
                value={content.vision_title}
                onChange={(e) => setContent({ ...content, vision_title: e.target.value })}
                placeholder="Enter vision title"
                disabled={previewMode}
              />
            </div>
            
            <div>
              <Label htmlFor="vision-content">Vision Description</Label>
              <Textarea
                id="vision-content"
                value={content.vision_content}
                onChange={(e) => setContent({ ...content, vision_content: e.target.value })}
                placeholder="Describe your company's vision"
                rows={4}
                disabled={previewMode}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Vision Points</Label>
                {!previewMode && (
                  <Button type="button" variant="outline" size="sm" onClick={addVisionPoint}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Point
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {content.vision_points.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={point}
                      onChange={(e) => updateVisionPoint(index, e.target.value)}
                      placeholder={`Vision point ${index + 1}`}
                      disabled={previewMode}
                    />
                    {!previewMode && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeVisionPoint(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Mission
            </CardTitle>
            <CardDescription>Define your company's mission and purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mission-title">Mission Title</Label>
              <Input
                id="mission-title"
                value={content.mission_title}
                onChange={(e) => setContent({ ...content, mission_title: e.target.value })}
                placeholder="Enter mission title"
                disabled={previewMode}
              />
            </div>
            
            <div>
              <Label htmlFor="mission-content">Mission Description</Label>
              <Textarea
                id="mission-content"
                value={content.mission_content}
                onChange={(e) => setContent({ ...content, mission_content: e.target.value })}
                placeholder="Describe your company's mission"
                rows={4}
                disabled={previewMode}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Mission Points</Label>
                {!previewMode && (
                  <Button type="button" variant="outline" size="sm" onClick={addMissionPoint}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Point
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {content.mission_points.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={point}
                      onChange={(e) => updateMissionPoint(index, e.target.value)}
                      placeholder={`Mission point ${index + 1}`}
                      disabled={previewMode}
                    />
                    {!previewMode && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeMissionPoint(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Values Section */}
      <Card>
        <CardHeader>
          <CardTitle>Core Values</CardTitle>
          <CardDescription>Define the fundamental values that guide your company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            {!previewMode && (
              <Button type="button" variant="outline" onClick={addCoreValue}>
                <Plus className="w-4 h-4 mr-2" />
                Add Core Value
              </Button>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {content.core_values.map((value, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Value {index + 1}</Badge>
                  {!previewMode && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCoreValue(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={value.title}
                    onChange={(e) => updateCoreValue(index, 'title', e.target.value)}
                    placeholder="Enter value title"
                    disabled={previewMode}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={value.description}
                    onChange={(e) => updateCoreValue(index, 'description', e.target.value)}
                    placeholder="Describe this core value"
                    rows={2}
                    disabled={previewMode}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hero Image Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Hero Image
          </CardTitle>
          <CardDescription>Upload an image for the vision & mission page hero section</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload
            label="Hero Image"
            value={content.hero_image || ''}
            onChange={handleImageUpload}
            placeholder="Upload hero image for vision & mission page"
            required={false}
            disabled={previewMode}
            bucketName="hero-images"
          />
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

export default VisionMissionAdmin;
