"use client";

import { Badge } from "@/components/ui/badge";
import { rupiahFormat } from "@/lib/utils";
import type { StatusOrder } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

type TProduct = {
  name: string;
  image: string;
};

export type TColumn = {
  id: number;
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
        <div className="flex flex-col gap-4 justify-start">
          <div className="inline-flex items-center gap-5">
            {order.products.map((product, i) => (
                   <div key={`${product.name}-${i}`} className="inline-flex items-center gap-5">
                        <Image src={product.image} height={80} width={80} alt="Product"/>
                      </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey : 'customer_name',
    header : 'Customer Name',
  },
  {
    accessorKey: 'price',
    header: 'Total Price',
    cell: ({row}) => rupiahFormat(row.original.price)
  },
  {
    accessorKey: "status",
    header: "Status",
    cell : ({row}) => {
      return (
        <Badge variant={row.original.status === 'failed' ? 'destructive' : 'default'}>{row.original.status}</Badge>
      )
    }
  }
  
  
  
];
