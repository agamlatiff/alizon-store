"use client";

import Button from "@/components/ui/button";
import type { Category } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import FormDelete from "../../../components/dashboard/categories/FormDelete";
import { Badge } from "@/components/ui/badge";
import { dateFormat } from "@/lib/utils";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <Badge
          className={`${status === "active"
            ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
            : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ getValue }) => (
      <span>{dateFormat(getValue() as Date | null)}</span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ getValue }) => (
      <span>{dateFormat(getValue() as Date | null)}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link
            href={`/dashboard/categories/edit/${category.id}`}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </Link>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
