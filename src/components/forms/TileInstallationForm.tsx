import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { TileInstallation } from '@/hooks/useTileInstallations';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

const installationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  location: z.string().optional(),
  description: z.string().optional(),
  area: z.string().optional(),
  image_url: z.string().optional(),
  sort_order: z.number().default(0),
  published: z.boolean().default(true),
});

type InstallationFormValues = z.infer<typeof installationSchema>;

interface TileInstallationFormProps {
  initialData?: Partial<TileInstallation>;
  onSubmit: (data: Partial<TileInstallation>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TileInstallationForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: TileInstallationFormProps) {
  const form = useForm<InstallationFormValues>({
    resolver: zodResolver(installationSchema),
    defaultValues: {
      title: initialData?.title || '',
      location: initialData?.location || '',
      description: initialData?.description || '',
      area: initialData?.area || '',
      image_url: initialData?.image_url || '',
      sort_order: initialData?.sort_order || 0,
      published: initialData?.published ?? true,
    },
  });

  const handleSubmit = async (data: InstallationFormValues) => {
    await onSubmit(data);
  };

  const handleImageUpload = (url: string) => {
    form.setValue('image_url', url);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Installation title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Location (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area (sqm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Area in square meters (optional)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className="flex items-center gap-4">
                  {field.value ? (
                    <div className="relative">
                      <img
                        src={field.value}
                        alt="Installation preview"
                        className="h-32 w-32 object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={() => field.onChange('')}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove image</span>
                      </Button>
                    </div>
                  ) : (
                    <ImageUpload
                      label="Installation Image"
                      value={field.value || ''}
                      onChange={handleImageUpload}
                      placeholder="Upload an image"
                      bucketName="tile-images"
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Published</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Whether this installation is visible on the public site
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData?.id ? 'Update' : 'Create'} Installation
          </Button>
        </div>
      </form>
    </Form>
  );
}
