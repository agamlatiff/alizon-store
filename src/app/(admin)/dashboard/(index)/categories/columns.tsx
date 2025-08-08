"use client";

import { Button } from "@/components/ui/button";
import type { Category } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "./_components/FormDelete";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Button size={"sm"} asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="size-4 mr-2" />
              Edit
            </Link>
          </Button>
          <FormDelete id={category.id}/>
        </div>
      );
    },
  },
];
