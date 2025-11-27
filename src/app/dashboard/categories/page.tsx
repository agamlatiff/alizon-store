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
import React from "react";
import { columns } from "./columns";

import Link from "next/link";
import { getCategories } from "./lib/data";

const CategoriesPage = async () => {
  const data = await getCategories();

  return (
    <div className="space-y-4">
      <div className="text-right">
        <Link
          href="/dashboard/categories/create"
          className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary hover:bg-primary-600 text-brand focus:ring-primary-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm px-4 py-1.5 h-8 gap-1"
        >
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Category
          </span>
        </Link>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your categories and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
