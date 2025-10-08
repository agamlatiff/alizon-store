"use server";

import { schemaLocation } from "@/lib/schema";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { TypeCheckingLocations } from "@/types";

export const postLocation = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingLocations> => {
  // Get data from form data
  const parsedData = schemaLocation.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    country: formData.get("country"),
  });

  // Checking if form data not valid
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0],
      address: errors.address?.[0],
      city: errors.city?.[0],
      country: errors.country?.[0],
      error: "Failed to insert data",
    };
  }

  // Create data Location
  try {
    await prisma.location.create({
      data: {
        name: parsedData.data.name,
        address: parsedData.data.address,
        city: parsedData.data.city,
        country: parsedData.data.country,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to insert data",
    };
  }

  return redirect("/dashboard/locations");
};

export const updateLocation = async (
  _: unknown,
  formData: FormData,
  id: string | undefined
): Promise<TypeCheckingLocations> => {
  // Get data from form data
  const parsedData = schemaLocation.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    country: formData.get("country"),
  });

  // Checking if form data not valid
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0],
      address: errors.address?.[0],
      city: errors.city?.[0],
      country: errors.country?.[0],
      error: "Failed to insert data",
    };
  }

  // Validation if account invalid
  if (id === undefined) {
    return {
      error: "Account is not found",
    };
  }

  // Update database
  try {
    await prisma.location.update({
      where: {
        id,
      },
      data: {
        name: parsedData.data.name,
        address: parsedData.data.address,
        city: parsedData.data.city,
        country: parsedData.data.country,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update data",
    };
  }

  return redirect("/dashboard/locations");
};

export const deleteLocation = async (
  _: unknown,
  formData: FormData,
  id: string
): Promise<TypeCheckingLocations> => {
  try {
    await prisma.location.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete data",
    };
  }

  return redirect("/dashboard/locations");
};
