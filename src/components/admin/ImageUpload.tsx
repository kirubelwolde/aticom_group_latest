import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  bucketName?: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  placeholder = "https://...",
  required = false,
  disabled = false,
  bucketName = "hero-cards"
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

    setUploading(true);
    
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${bucketName}/${fileName}`;

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
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(data.path);

      console.log('Supabase public URL:', urlData.publicUrl);

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
        setPreview(null);
        toast({
          title: "Success",
          description: `Image uploaded. Public URL: ${urlData.publicUrl}`,
        });
      } catch {
        toast({
          title: "Upload failed",
          description: "Image uploaded but cannot be accessed. Please check bucket permissions or try again.",
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
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = () => {
    onChange('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={`${label}-input`}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      {/* Current image preview */}
      {value && !preview && (
        <div className="relative group">
          <img
            src={value}
            alt={label}
            className="w-full h-32 object-cover rounded-lg border"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              toast({
                title: 'Image Load Error',
                description: 'Could not load image from URL. Please check the URL or bucket permissions.',
                variant: 'destructive',
              });
              // Show fallback link
              const fallback = document.getElementById(`${label}-fallback-link`);
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <a
            id={`${label}-fallback-link`}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'none', color: 'red', fontSize: '0.9em', position: 'absolute', bottom: 8, left: 8, background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #f00' }}
          >
            Open image URL
          </a>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={removeImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* File preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearPreview}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Upload buttons */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleFileSelect(e);
            handleFileUpload(e);
          }}
          className="hidden"
          id={`${label}-file-input`}
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || disabled}
          className="flex-1"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          {uploading ? 'Uploading...' : 'Upload Image'}
        </Button>

        {!value && !preview && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) onChange(url);
            }}
            disabled={disabled}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            URL
          </Button>
        )}
      </div>

      {/* URL input fallback */}
      {!value && !preview && (
        <div>
          <Label className="text-sm text-gray-600">Or enter URL directly:</Label>
          <Input
            id={`${label}-input`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="mt-1"
            disabled={disabled}
          />
        </div>
      )}

      {/* Show URL for uploaded images */}
      {value && (
        <div>
          <Label className="text-sm text-gray-600">Image URL:</Label>
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 text-sm"
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;