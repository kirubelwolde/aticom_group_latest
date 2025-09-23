import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TileCollection } from '@/types/ceramic-tiles';

export const createTileCollectionColumns = (
  onEdit: (collection: TileCollection) => void,
  onDelete: (id: string) => void
): ColumnDef<TileCollection>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'sizes',
    header: 'Sizes',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1">
        {row.original.sizes?.map((size) => (
          <Badge key={size} variant="outline" className="text-xs">
            {size}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.published ? 'default' : 'outline'}>
        {row.original.published ? 'Published' : 'Draft'}
      </Badge>
    ),
  },
  {
    accessorKey: 'sort_order',
    header: 'Order',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row.original)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(row.original.id)}
          className="text-destructive hover:text-destructive/80"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    ),
  },
];
