"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TypeCheckingProducts } from "@/types";
import type {
  Brand,
  Category,
  Product,
  Location as PrismaLocation,
} from "@prisma/client";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  storeProduct,
  updateProduct,
} from "../../../app/dashboard/products/lib/actions";
import UploadImages from "./UploadImages";

interface FormProductProps {
  type?: "ADD" | "EDIT";
  data?: Product | null;
  brands?: Brand[];
  categories?: Category[];
  locations?: PrismaLocation[];
}

const initialFormState: TypeCheckingProducts = {
  brand_id: "",
  category_id: "",
  location_id: "",
  description: "",
  name: "",
  price: "",
  stock: "",
  error: "",
};

const FormProduct = ({
  type,
  data,
  brands,
  categories,
  locations,
}: FormProductProps) => {
  const updateProductWIthId = (_: unknown, formData: FormData) =>
    updateProduct(_, formData, data?.id ?? "");

  const [state, formAction, pending] = useActionState(
    type === "ADD" ? storeProduct : updateProductWIthId,
    initialFormState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/products">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Product
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                <Link href={"/dashboard/products"}>Discard</Link>
              </Button>
              <Button size="sm" type="submit" disabled={pending}>
                {pending ? "Loading..." : "Save Product"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Enter the Product details below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full"
                        defaultValue={data?.name}
                        placeholder="Enter your product name"
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.name}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        className="w-full"
                        placeholder="Enter your product price"
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.price}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        name="description"
                        id="description"
                        className="min-h-32"
                        defaultValue={data?.description}
                        placeholder="Enter your product description"
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card x-chunk="dashboard-07-chunk-2">
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div className="grid gap-3">
                      <Label htmlFor="category">Category</Label>
                      <Select name="category_id">
                        <SelectTrigger
                          id="category"
                          aria-label="Select category"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((cat) => (
                            <SelectItem key={cat.id} value={`${cat.id}`}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-red-500 -mt-2 ml-1">
                        {state.category_id}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="brand">Brand</Label>
                      <Select name="brand_id">
                        <SelectTrigger id="brand" aria-label="Select Brand">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands?.map((cat) => (
                            <SelectItem key={cat.id} value={`${cat.id}`}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-red-500 -mt-2 ml-1">
                        {state.brand_id}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="location_id">Location</Label>
                      <Select name="location_id">
                        <SelectTrigger
                          id="location"
                          aria-label="Select location"
                        >
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations?.map((cat) => (
                            <SelectItem key={cat.id} value={`${cat.id}`}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-red-500 -mt-2 ml-1">
                        {state.location_id}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-3">
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Status</Label>
                      <Select name="stock" defaultValue={data?.stock}>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ready">Ready</SelectItem>
                          <SelectItem value="preorder">Pre-Order</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.stock}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <UploadImages error={state.images} />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" type="button">
              <Link href={"/dashboard/products"}>Discard</Link>
            </Button>
            <Button size="sm" type="submit">
              Save Product
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormProduct;
