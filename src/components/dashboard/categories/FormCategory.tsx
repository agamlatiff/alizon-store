"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Category } from "@prisma/client";
import {
  postCategory,
  updateCategory,
} from "../../../app/dashboard/categories/lib/actions";
import type { TypeCheckingCategories } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState: TypeCheckingCategories = {
  name: "",
  description: "",
  status: "",
  error: "",
};

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  data?: Category | null;
}

const FormCategory = ({ data = null, type = "ADD" }: FormCategoryProps) => {
  const updateCategoryWithId = (_: unknown, formData: FormData) =>
    updateCategory(_, formData, data?.id);

  const [state, formAction, pending] = useActionState(
    type === "ADD" ? postCategory : updateCategoryWithId,
    initialState
  );

  const [status, setStatus] = useState<string>(data?.status ?? "");

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/categories"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Category
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                <Link href={"/dashboard/categories"}> Discard</Link>
              </Button>
              <Button size="sm" type="submit" disabled={pending}>
                {pending ? "Loading..." : "Save Category"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Category Details</CardTitle>
                  <CardDescription>
                    Enter the Category details below.
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
                        placeholder="Enter your category name"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.name}
                    </p>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        type="text"
                        name="description"
                        placeholder="Enter your category description"
                        className="w-full"
                        defaultValue={data?.description}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.description}
                    </p>

                    <Select value={status} onValueChange={setStatus}>
                      <Label>Status</Label>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="status" value={status} />
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.status}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" type="button">
              <Link href={"/dashboard/categories"}> Discard</Link>
            </Button>
            <Button size="sm" type="submit" disabled={pending}>
              {pending ? "Loading..." : "Save Category"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormCategory;
