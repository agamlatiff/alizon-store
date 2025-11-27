"use client";

import FormDelete from "@/components/dashboard/locations/FormDelete";
import Button from "@/components/ui/button";
import type { Location } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "name",
    header: "Location",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "city",
  },
  {
    accessorKey: "country",
    header: "Country",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const location = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Link
            href={`/dashboard/locations/edit/${location.id}`}
            className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </Link>
          <FormDelete id={location.id} />
        </div>
      );
    },
  },
];
