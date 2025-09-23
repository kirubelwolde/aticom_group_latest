import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { TileInstallation } from '@/hooks/useTileInstallations';

export const createInstallationColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): ColumnDef<TileInstallation>[] => [
  {
    accessorKey: 'image_url',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.getValue('image_url') as string;
      return imageUrl ? (
        <div className="h-12 w-16 relative rounded-md overflow-hidden">
          <img
            src={imageUrl}
            alt="Installation preview"
            className="object-cover h-full w-full"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder-image.png'; // Use a fallback image
              img.alt = 'Image not available';
            }}
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.opacity = '1'; // Fade in when loaded
            }}
            style={{
              opacity: 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
        </div>
      ) : (
        <div className="h-12 w-16 bg-muted flex items-center justify-center rounded-md">
          <span className="text-xs text-muted-foreground">No image</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => row.getValue('location') || '—',
  },
  {
    accessorKey: 'area',
    header: 'Area',
    cell: ({ row }) => {
      const area = row.getValue('area') as string;
      return area ? `${area} m²` : '—';
    },
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => (
      <div className="flex items-center">
        <span
          className={`h-2.5 w-2.5 rounded-full mr-2 ${
            row.getValue('published') ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
        {row.getValue('published') ? 'Published' : 'Draft'}
      </div>
    ),
  },
  {
    accessorKey: 'sort_order',
    header: 'Order',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row.original.id)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original.id)}
          className="text-destructive hover:text-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    ),
  },
];
