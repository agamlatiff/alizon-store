import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { columns } from "../products/columns";
import { DataTable } from "@/components/ui/data-table";
import { getProducts } from "./lib/data";

const ProductsPage = async () => {

  const products = await getProducts()

  return (
    <div className="space-y-4">
      <div className="text-right">
        <Link
          href="/dashboard/products/create"
          className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5 h-8 gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add product
          </span>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;
