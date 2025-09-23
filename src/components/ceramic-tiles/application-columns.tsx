import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Trash2 } from 'lucide-react';
import { TileApplication } from '@/hooks/useTileApplications';

export const createApplicationColumns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): ColumnDef<TileApplication>[] => [
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
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-md">
        {row.getValue('description') || '—'}
      </div>
    ),
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
