"use client";

import Button from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import type { Brand } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormDelete from "../../../components/dashboard/brands/FormDelete";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(brand.logo ?? "")}
            height={80}
            width={80}
            alt="Product"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const brand = row.original;
      return <div>{brand.name}</div>;
    },
  },

  {
    accessorKey: "country",
    header: "country",
    cell: ({ row }) => {
      const brand = row.original;
      return <div>{brand.country}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <Badge
          className={`${brand.status === "active"
              ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}
        >
          {brand.status === "active" ? "active" : "inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "website",
    header: "Website",
    cell: ({ row }) => {
      const brand = row.original;
      return <div>{brand.website}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link
            href={`/dashboard/brands/edit/${brand.id}`}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </Link>
          <FormDelete id={brand.id} />
        </div>
      );
    },
  },
];
