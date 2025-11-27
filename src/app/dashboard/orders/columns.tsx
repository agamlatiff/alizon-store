"use client";

import { Badge } from "@/components/ui/badge";
import { USDFormat } from "@/lib/utils";

import type { StatusOrder } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import FormUpdateStatus from "@/components/dashboard/orders/FormUpdateStatus";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: string;
  products: TProduct[];
  customer_name: string;
  price: number;
  status: StatusOrder;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <div className="flex flex-col gap-2 items-center">
          {order.products.map((product, i) => (
            <div
              key={`${product.name}-${i}`}
              className="flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-sm">{product.name}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "price",
    header: "Total Price",
    cell: ({ row }) => USDFormat(row.original.price),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: "default" | "destructive" | "outline" | "secondary" =
        "default";
      let className = "";

      if (status === "success") {
        variant = "default"; // Greenish usually default or custom class
        className = "bg-green-500 hover:bg-green-600";
      } else if (status === "pending") {
        variant = "secondary"; // Yellowish/Gray
        className = "bg-yellow-500 hover:bg-yellow-600 text-white";
      } else if (status === "failed") {
        variant = "destructive";
      }

      return (
        <Badge variant={variant} className={className}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;
      return <FormUpdateStatus id={order.id} currentStatus={order.status} />;
    },
  },
];
