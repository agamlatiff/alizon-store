import { Button } from "@/components/ui/button";
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
import { getLocations } from "./lib/data";

const LocationsPage = async () => {
  const data = await getLocations();

  return (
    <div className="space-y-4">
      <div className="text-right">
        <Button size="sm" className="h-8 gap-1" asChild>
          <Link href="/dashboard/locations/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Location
            </span>
          </Link>
        </Button>
      </div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Locations</CardTitle>
          <CardDescription>
            Manage your locations and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationsPage;
