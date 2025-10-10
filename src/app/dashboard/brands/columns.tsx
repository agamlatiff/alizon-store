"use client";

import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/supabase";
import type { Brand } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FormDelete from "../../../components/dashboard/brands/FormDelete";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <div className="inline-flex items-center gap-5">
          <Image
            src={getImageUrl(brand.logo)}
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
    id: "actions",
    cell: ({ row }) => {
      const brand = row.original;
      return (
        <div className="space-x-4 inline-flex">
          <Button size={"sm"} asChild>
            <Link href={`/dashboard/brands/edit/${brand.id}`}>
              <Edit className="size-4 mr-2" />
              Edit
            </Link>
          </Button>
          <FormDelete id={brand.id} />
        </div>
      );
    },
  },
];
