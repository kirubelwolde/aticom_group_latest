
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Edit, 
  Save, 
  X, 
  GripVertical,
  Image as ImageIcon,
  AlertCircle,
  Upload
} from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  order_index: number;
  active: boolean;
  business_sector_id: string;
}

interface BusinessSector {
  id: string;
  title: string;
  route: string;
}

const HeroSlidesAdmin = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [businessSectors, setBusinessSectors] = useState<BusinessSector[]>([]);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null); // New state for image file
  const [signedUrls, setSignedUrls] = useState<Record<string, string>>({}); // Fallback signed URLs for existing records
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      // Fetch business sectors
      const { data: sectorsData, error: sectorsError } = await supabase
        .from('business_sectors')
        .select('id, title, route')
        .order('order_index');

      if (sectorsError) throw sectorsError;
      setBusinessSectors(sectorsData || []);

      // Fetch hero slides
      const { data: slidesData, error: slidesError } = await supabase
        .from('hero_slides')
        .select('*')
        .order('order_index');

      if (slidesError) throw slidesError;
      setSlides(slidesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fallback: For existing records, generate signed URLs if the stored image_url is a public storage URL or a raw path
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const generateSigned = async () => {
      const updates: Record<string, string> = {};

      await Promise.all(
        slides.map(async (s) => {
          const url = s.image_url;
          if (!url) return;

          // If already looks like a signed URL, skip
          if (url.includes('token=')) return;

          // Case 1: public storage URL -> extract path after '/object/public/hero-cards/'
          const publicPrefix = '/storage/v1/object/public/hero-cards/';
          if (url.includes(publicPrefix)) {
            try {
              const idx = url.indexOf(publicPrefix);
              const filePath = url.substring(idx + publicPrefix.length);
              const { data, error } = await supabase.storage
                .from('hero-cards')
                .createSignedUrl(filePath, 60 * 60 * 24 * 365);
              if (!error && data?.signedUrl) {
                updates[s.id] = data.signedUrl;
              }
            } catch {}
            return;
          }

          // Case 2: DB stores raw storage path like 'hero_slide_images/xyz.png'
          if (!url.startsWith('http')) {
            try {
              const { data, error } = await supabase.storage
                .from('hero-cards')
                .createSignedUrl(url, 60 * 60 * 24 * 365);
              if (!error && data?.signedUrl) {
                updates[s.id] = data.signedUrl;
              }
            } catch {}
            return;
          }
        })
      );

      if (Object.keys(updates).length > 0) {
        setSignedUrls((prev) => ({ ...prev, ...updates }));
      }
    };

    generateSigned();
  }, [slides]);

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setImageFile(null); // Clear image file when editing a new slide
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return editingSlide?.image_url || null; // If no new file, return existing URL

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `hero_slide_images/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('hero-cards') // Use the hero-cards bucket for hero slide images
        .upload(filePath, imageFile, { cacheControl: '3600', upsert: false });

      if (uploadError) throw uploadError;

      // Generate a long-lived signed URL so images are accessible even if the bucket is private
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('hero-cards')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year

      if (signedUrlError || !signedUrlData?.signedUrl) throw signedUrlError ?? new Error('Failed to create signed URL');

      return signedUrlData.signedUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSave = async () => {
    if (!editingSlide) return;

    setLoading(true);
    const imageUrl = await uploadImage(); // Upload image and get URL
    setLoading(false);

    if (imageFile && !imageUrl) { // If a new file was selected but upload failed
      return;
    }

    try {
      const { error } = await supabase
        .from('hero_slides')
        .update({
          title: editingSlide.title,
          subtitle: editingSlide.subtitle,
          description: editingSlide.description,
          image_url: imageUrl, // Use the uploaded image URL
          active: editingSlide.active,
          business_sector_id: editingSlide.business_sector_id
        })
        .eq('id', editingSlide.id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Hero slide updated successfully",
      });

      setEditingSlide(null);
      setImageFile(null); // Clear image file after saving
      fetchData();
    } catch (error) {
      console.error('Error saving slide:', error);
      toast({
        title: "Error",
        description: "Failed to save slide",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditingSlide(null);
    setImageFile(null); // Clear image file on cancel
  };

  const getBusinessSectorTitle = (sectorId: string) => {
    const sector = businessSectors.find(s => s.id === sectorId);
    return sector ? sector.title : 'Unknown';
  };

  const getBusinessSectorRoute = (sectorId: string) => {
    const sector = businessSectors.find(s => s.id === sectorId);
    return sector ? sector.route : '#';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-aticom-navy">Hero Slides Management</h2>
          <p className="text-gray-600">Manage the 7 hero slides - one for each business sector</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-aticom-blue">
          <AlertCircle className="h-4 w-4" />
          <span>Exactly 7 slides maintained automatically</span>
        </div>
      </div>

      {/* Information Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Hero Slides System</h4>
              <p className="text-sm text-blue-700 mt-1">
                The system maintains exactly 7 hero slides, each linked to a business sector. 
                You can edit the content and images, but cannot add or delete slides.
                Each slide automatically links to its corresponding business sector page.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Form */}
      {editingSlide && (
        <Card className="border-aticom-blue">
          <CardHeader>
            <CardTitle>Edit Hero Slide</CardTitle>
            <CardDescription>
              Update the content for this hero slide
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business-sector">Business Sector</Label>
              <Select
                value={editingSlide.business_sector_id}
                onValueChange={(value) => setEditingSlide({...editingSlide, business_sector_id: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business sector" />
                </SelectTrigger>
                <SelectContent>
                  {businessSectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id}>
                      {sector.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({...editingSlide, title: e.target.value})}
                  placeholder="Enter slide title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={editingSlide.subtitle}
                  onChange={(e) => setEditingSlide({...editingSlide, subtitle: e.target.value})}
                  placeholder="Enter slide subtitle"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingSlide.description}
                onChange={(e) => setEditingSlide({...editingSlide, description: e.target.value})}
                placeholder="Enter slide description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-upload">Slide Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
              />
              {(editingSlide.image_url && !imageFile) && (
                <div className="mt-2 flex items-center space-x-2">
                  <img src={editingSlide.image_url} alt="Current Slide" className="w-24 h-24 object-cover rounded-md" />
                  <p className="text-sm text-gray-500">Current Image</p>
                </div>
              )}
              {imageFile && (
                <div className="mt-2 flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-aticom-blue" />
                  <p className="text-sm text-gray-500">{imageFile.name} ready to upload</p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-aticom-green hover:bg-aticom-green/90">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Slides List */}
      <div className="grid gap-4">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* Order Indicator */}
                <div className="flex items-center p-4 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="w-32 h-24 bg-gray-200 flex items-center justify-center">
                  {slide.image_url ? (
                    <img 
                      src={signedUrls[slide.id] || slide.image_url} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-aticom-navy">{slide.title}</h3>
                      <p className="text-sm text-aticom-blue">{slide.subtitle}</p>
                      <p className="text-xs text-gray-600 line-clamp-2">{slide.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Links to: {getBusinessSectorRoute(slide.business_sector_id)}
                        </Badge>
                        <Badge variant={slide.active ? "default" : "secondary"}>
                          {slide.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(slide)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {slides.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">No slides found</h3>
                <p className="text-gray-600">The hero slides will be automatically generated.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HeroSlidesAdmin;
