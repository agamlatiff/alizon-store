"use client";

import React, { useActionState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { TypeCheckingLocations } from "@/types";
import type { Location } from "@prisma/client";
import {
  postLocation,
  updateLocation,
} from "@/app/dashboard/locations/lib/actions";

const initialState: TypeCheckingLocations = {
  address: "",
  city: "",
  country: "",
  name: "",
  error: "",
};

interface FormLocationProps {
  type?: "ADD" | "EDIT";
  data?: Location | null;
}

const FormLocation = ({ data = null, type = "ADD" }: FormLocationProps) => {
  const updateLocationWithId = (_: unknown, formData: FormData) =>
    updateLocation(_, formData, data?.id);

  const [state, formAction, pending] = useActionState(
    type === "ADD" ? postLocation : updateLocationWithId,
    initialState
  );

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/locations">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Create Location
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm" type="button">
                <Link href={"/dashboard/locations"}> Discard</Link>
              </Button>
              <Button size="sm" type="submit" disabled={pending}>
                {pending ? "Loading..." : "Save Location"}
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                  <CardDescription>
                    Enter the Location details below.
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
                        placeholder="Enter your location name"
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.name}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        placeholder="Enter your location address"
                        id="address"
                        type="text"
                        name="address"
                        className="w-full"
                        defaultValue={data?.address}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.address}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="city">City</Label>
                      <Input
                        placeholder="Enter your location city "
                        id="city"
                        type="text"
                        name="city"
                        className="w-full"
                        defaultValue={data?.city}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.city}
                    </p>

                    <div className="grid gap-3">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        placeholder="Enter your location country"
                        id="country"
                        type="text"
                        name="country"
                        className="w-full"
                        defaultValue={data?.country}
                      />
                    </div>
                    <p className="text-sm text-red-500 -mt-2 ml-1">
                      {state.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm" type="button">
              <Link href={"/dashboard/locations"}> Discard</Link>
            </Button>
            <Button size="sm">Save Location</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormLocation;
