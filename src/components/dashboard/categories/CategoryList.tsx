import Link from "next/link";
import { PlusCircle, Archive } from "lucide-react";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { getCategories } from "@/app/(customers)/lib/data";

export async function CategoryList({
  activeCategoryId,
}: {
  activeCategoryId?: string;
}) {
  const categories = await getCategories();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="grid gap-1">
          <CardTitle className="text-lg">Categories</CardTitle>
          <CardDescription>Manage your product categories</CardDescription>
        </div>
        <Link
          href="/dashboard/categories?action=create"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 gap-1 px-3"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline sm:whitespace-nowrap">
            Add New
          </span>
        </Link>
      </CardHeader>
      <CardContent className="p-2">
        <nav className="grid gap-1 text-sm text-muted-foreground">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/dashboard/categories?id=${category.id}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted",
                activeCategoryId === String(category.id) &&
                "bg-muted text-primary font-semibold"
              )}
            >
              <Archive className="h-4 w-4" />
              {category.name}
            </Link>
          ))}
          {categories.length === 0 && (
            <p className="px-3 py-2 text-center">No categories found.</p>
          )}
        </nav>
      </CardContent>
    </Card>
  );
}
