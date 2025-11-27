"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

import { AlertCircle, ChevronLeft, X } from "lucide-react";

import {
  postBrand,
  updateBrand,
} from "../../../app/dashboard/brands/lib/actions";
import type { Brand } from "@prisma/client";
import type { TypeCheckingBrands } from "@/types";
import { useActionState, useEffect, useState, type ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

const initialState: TypeCheckingBrands = {
  country: "",
  description: "",
  logo: "",
  name: "",
  status: "",
  website: "",
  error: "",
};
interface FormBrandProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

const FormBrand = ({ data, type }: FormBrandProps) => {
  const updateBrandWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id ?? "");

  const [state, formAction, pending] = useActionState(
    type === "ADD" ? postBrand : updateBrandWithId,
    initialState
  );

  const [status, setStatus] = useState<string>(data?.status ?? "");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileImage = e.target.files?.[0];

    // If file is not selected
    if (!fileImage) {
      setFile(null);
      setPreviewImage(null);
      return;
    }

    setFile(fileImage);
    setPreviewImage(URL.createObjectURL(fileImage));
  };

  const clearImage = () => {
    setFile(null);
    setPreviewImage(null);
    const fileInput = document.getElementById("logo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/brands"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-7 w-7"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Brand
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                <Link href={"/dashboard/brands"}>Discard</Link>
              </Button>
              <Button size="sm" type="submit" disabled={pending}>
                {pending ? "Loading..." : "Save Brand"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                  <CardDescription>
                    Enter the Brand details below.
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
                        placeholder="Enter your brand name"
                        id="name"
                        type="text"
                        name="name"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.name}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        name="logo"
                        placeholder="Upload Logo"
                        className="w-full text-muted-foreground placeholder:text-muted-foreground"
                        onChange={onFileChange}

                      />
                    </div>
                    {previewImage && (
                      <>
                        <div className="relative h-24 w-24 rounded-md overflow-hidden border">
                          <Image
                            src={previewImage}
                            alt={file?.name ?? "preview"}
                            fill
                            className="object-cover object-top"
                            sizes="96px"
                            priority
                          />

                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 bg-red-500 hover:bg-red-600 text-white"
                            onClick={clearImage}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Delete logo</span>
                          </Button>
                        </div>
                      </>
                    )}

                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.logo}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        placeholder="Enter your brand description"
                        id="description"
                        type="text"
                        name="description"
                        className="w-full"
                        defaultValue={data?.description}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.description}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="text"
                        name="website"
                        placeholder="Enter your brand website"
                        className="w-full"
                        defaultValue={data?.website}
                      />
                    </div>

                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.website}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        name="country"
                        placeholder="Enter your brand country"
                        className="w-full"
                        defaultValue={data?.country}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.country}
                    </p>
                    <Select value={status} onValueChange={setStatus}>
                      <Label>Status</Label>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status brand" />
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
              <Link href={"/dashboard/brands"}> Discard</Link>
            </Button>
            <Button size="sm">Save Brand</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormBrand;
