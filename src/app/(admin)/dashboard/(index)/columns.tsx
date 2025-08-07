"use client";

import type { Category } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const columns : ColumnDef<Category[]> = [
  {
    accessorKey: 'name',
    header: 'Category Name'
  }
]