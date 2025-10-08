"use client";

import { Button } from "@/components/ui/button";
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
          className={`${
            status === "active"
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => (
      <span>{dateFormat(getValue() as Date | null)}</span>
    ),
  },
  {
    accessorKey: "updatedAt",
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
          <Button size={"sm"} asChild>
            <Link href={`/dashboard/categories/edit/${category.id}`}>
              <Edit className="size-4 mr-2" />
              Edit
            </Link>
          </Button>
          <FormDelete id={category.id} />
        </div>
      );
    },
  },
];
