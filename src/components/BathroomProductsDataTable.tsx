
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/ui/data-table"; // Assuming you have a DataTable component
import { useBathroomProducts } from "@/hooks/useBathroomSolutions";
import { BathroomProduct } from "@/types/bathroom-solutions";

// This is an example of how you might define your columns.
// You'll want to customize this based on the exact data you want to display.
export const columns: ColumnDef<BathroomProduct>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (
      <span className={row.original.published ? "text-green-600" : "text-red-600"}>
        {row.original.published ? "Yes" : "No"}
      </span>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View product details</DropdownMenuItem>
            <DropdownMenuItem>Edit product</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function BathroomProductsDataTable() {
  const { data: products, isLoading, error } = useBathroomProducts(false); // Fetch all products, including unpublished

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Manage Bathroom Products</h2>
      <Button className="mb-4">Add New Product</Button>
      {products && <DataTable columns={columns} data={products} />}
    </div>
  );
}

