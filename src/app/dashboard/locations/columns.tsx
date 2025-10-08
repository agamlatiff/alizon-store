"use client";

import FormDelete from "@/components/dashboard/locations/FormDelete";
import { Button } from "@/components/ui/button";
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
          <Button size={"sm"} asChild>
            <Link href={`/dashboard/locations/edit/${location.id}`}>
              <Edit className="size-4 mr-2" />
              Edit
            </Link>
          </Button>
          <FormDelete id={location.id} />
        </div>
      );
    },
  },
];
