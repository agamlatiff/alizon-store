import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { PlusCircle } from "lucide-react";
import { columns } from "./columns";
import { getBrands } from "./lib/data";
import Link from "next/link";


const BrandPage = async () => {
  const brands = await getBrands();
  return (
    <div className="space-y-4">
      <div className="text-right">
        <Link
          href="/dashboard/brands/create"
          className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5 h-8 gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Brand
          </span>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Brands</CardTitle>
          <CardDescription>
            Manage your brands and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={brands} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandPage;
