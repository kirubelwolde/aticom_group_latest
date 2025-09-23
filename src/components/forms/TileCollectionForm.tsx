import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import ImageUpload from '@/components/admin/ImageUpload';
import { TILE_CATEGORIES, TILE_FINISHES, TILE_SIZES } from '@/services/ceramicTilesService';
import { TileCollection } from '@/types/ceramic-tiles';

const collectionFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  price: z.string().optional(),
  sizes: z.array(z.string()).min(1, 'At least one size is required'),
  finishes: z.array(z.string()),
  colors: z.array(z.string()),
  image_url: z.string().optional(),
  sort_order: z.number().default(0),
  published: z.boolean().default(true),
});

type CollectionFormValues = z.infer<typeof collectionFormSchema>;

interface TileCollectionFormProps {
  initialData?: Partial<CollectionFormValues>;
  onSubmit: (data: CollectionFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  businessSectorId: string;
}

export function TileCollectionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
  businessSectorId,
}: TileCollectionFormProps) {
  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      category: initialData?.category || '',
      description: initialData?.description || '',
      price: initialData?.price || '',
      sizes: initialData?.sizes || [],
      finishes: initialData?.finishes || [],
      colors: initialData?.colors || [],
      image_url: initialData?.image_url || '',
      sort_order: initialData?.sort_order || 0,
      published: initialData?.published ?? true,
    },
  });

  const handleImageUpload = (url: string) => {
    form.setValue('image_url', url, { shouldValidate: true });
  };

  const handleColorAdd = (color: string) => {
    const currentColors = form.getValues('colors') || [];
    if (!currentColors.includes(color)) {
      form.setValue('colors', [...currentColors, color], { shouldValidate: true });
    }
  };

  const handleColorRemove = (color: string) => {
    const currentColors = form.getValues('colors') || [];
    form.setValue(
      'colors',
      currentColors.filter((c) => c !== color),
      { shouldValidate: true }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter collection name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TILE_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Sizes</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={TILE_SIZES.map((size) => ({
                    label: size,
                    value: size,
                  }))}
                  onChange={(values) => field.onChange(values)}
                  placeholder="Select sizes..."
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="finishes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Finishes</FormLabel>
                <MultiSelect
                  selected={field.value}
                  options={TILE_FINISHES.map((finish) => ({
                    label: finish,
                    value: finish,
                  }))}
                  onChange={(values) => field.onChange(values)}
                  placeholder="Select finishes..."
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Colors</FormLabel>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((color) => (
                        <div
                          key={color}
                          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-muted"
                        >
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                          <span>{color}</span>
                          <button
                            type="button"
                            onClick={() => handleColorRemove(color)}
                            className="ml-1 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        className="w-16 h-10 p-1"
                        onBlur={(e) => {
                          const color = e.target.value;
                          if (color) handleColorAdd(color);
                          e.target.value = '';
                        }}
                      />
                      <Input
                        placeholder="Or enter hex color (#RRGGBB)"
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const color = (e.target as HTMLInputElement).value;
                            if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
                              handleColorAdd(color);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <ImageUpload
                    value={field.value || ''}
                    onChange={handleImageUpload}
                    placeholder="Upload tile collection image" label={''}                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter collection description"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $10.99/sq ft" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sort_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sort Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Lower numbers appear first
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 pt-6">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      {field.value
                        ? 'This collection is visible to customers'
                        : 'This collection is hidden from customers'}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="mr-2">Saving...</span>
              </>
            ) : (
              'Save Collection'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
