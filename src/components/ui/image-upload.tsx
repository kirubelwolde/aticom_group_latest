import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Trash2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  bucketName?: string;
}

export function ImageUpload({
  value,
  onChange,
  className,
  disabled = false,
  bucketName = "tile-images",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName; // Don't include bucket name in path since we're already uploading to the bucket

      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) {
        toast({
          title: "Upload failed",
          description: error.message || "Failed to upload image. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      // Check if the image is accessible
      const checkImage = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve(true);
          img.onerror = () => reject(false);
          img.src = url;
        });
      };

      try {
        await checkImage(urlData.publicUrl);
        onChange(urlData.publicUrl);
        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } catch {
        toast({
          title: "Upload failed",
          description: "Image uploaded but cannot be accessed. Please check bucket permissions.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className={cn('space-y-2', className)}>
      {value ? (
        <div className="relative group">
          <div className="aspect-square rounded-md overflow-hidden border">
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
            disabled={disabled || isUploading}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove image</span>
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center space-y-2',
            'hover:border-primary/50 transition-colors',
            disabled && 'opacity-50 cursor-not-allowed',
            isUploading && 'opacity-70 cursor-wait'
          )}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
        >
          <div className="p-2 rounded-full bg-muted">
            {isUploading ? (
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="text-sm text-center">
            {isUploading ? (
              <span>Uploading...</span>
            ) : (
              <>
                <span className="font-medium text-primary">Click to upload</span> or drag and drop
                <p className="text-xs text-muted-foreground mt-1">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </>
            )}
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
          />
        </div>
      )}
    </div>
  );
}