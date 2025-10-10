"use server";

import { schemaBrand } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import type { TypeCheckingBrand } from "@/types";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const postBrand = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingBrand> => {
  // Get form data
  const parsedData = schemaBrand.safeParse({
    name: formData.get("name"),
    logo: formData.get("logo"),
    description: formData.get("description"),
    website: formData.get("website"),
    country: formData.get("country"),
    status: formData.get("status"),
  });

  // Validation form data
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0],
      logo: errors.logo?.[0],
      description: errors.description?.[0],
      website: errors.website?.[0],
      country: errors.country?.[0],
      status: errors.status?.[0],
      error: "Failed to insert data",
    };
  }

  // Create data
  try {
    const fileName = await uploadFile(parsedData.data.logo, "brands");
    await prisma.brand.create({
      data: {
        ...parsedData.data,
        logo: fileName,

      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to insert data",
    };
  }

  return redirect("/dashboard/brands");
};

export const updateBrand = async (
  _: unknown,
  formData: FormData,
  id: string
): Promise<TypeCheckingBrand> => {
  // Get form data
  const fileUpload = formData.get("logo") as File;
  const parsedData = schemaBrand.safeParse({
    name: formData.get("name"),
    logo: formData.get("logo"),
    description: formData.get("description"),
    website: formData.get("website"),
    country: formData.get("country"),
    status: formData.get("status"),
  });

  // Validation form data
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0],
      logo: errors.logo?.[0],
      description: errors.description?.[0],
      website: errors.website?.[0],
      country: errors.country?.[0],
      status: errors.status?.[0],
      error: "Failed to insert data",
    };
  }

  // Find existing brand logo
  const brand = await prisma.brand.findFirst({
    where: {
      id,
    },
    select: {
      logo: true,
    },
  });

  let fileName = brand?.logo;

  // Upload new logo if exists
  if (fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "brands");
  }

  // Update data
  try {
    await prisma.brand.update({
      where: {
        id,
      },
      data: {
        name: parsedData.data.name,
        logo: fileName,
        description: parsedData.data.description,
        website: parsedData.data.website,
        country: parsedData.data.country,
        status: parsedData.data.status,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update data",
    };
  }

  return redirect("/dashboard/brands");
};

export const deleteBrand = async (
  _: unknown,
  formData: FormData,
  id: string
): Promise<TypeCheckingBrand> => {
  // Find existing brand logo
  const brand = await prisma.brand.findFirst({
    where: {
      id,
    },
    select: {
      logo: true,
    },
  });

  // If brand not found
  if (!brand) {
    return {
      error: "Brand not found",
    };
  }

  // Delete existing logo
  try {
    deleteFile();

    await prisma.brand.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete data",
    };
  }

  return redirect("/dashboard/brands");
};
