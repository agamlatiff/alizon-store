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
    const errors = parsedData.error.flatten().fieldErrors
    return {
      name : errors.name?.[0],
      logo : errors.logo?.[0],
      description : errors.description?.[0],
      website : errors.website?.[0],
      country : errors.country?.[0],
      status : errors.status?.[0],
      error: "Failed to insert data"
    };
  }

  // Create data
  try {
    const fileName = await uploadFile(parsedData.data.logo, "brands");
    await prisma.brand.create({
      data: {
        name: parsedData.data.name,
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
  const fileUpload = formData.get("image") as File;

  
  // SAMPAI SINI YAK CATAT CATAT!
  const parsedData = schemaBrand.pick({ name: true }).safeParse({
    name: formData.get("name"),
  });

  if (!parsedData.success) {
    return {
      error: parsedData.error.issues[0].message,
    };
  }

  const brand = await prisma.brand.findFirst({
    where: {
      id,
    },
    select: {
      logo: true,
    },
  });

  let fileName = brand?.logo;

  if (fileUpload.size > 0) {
    fileName = await uploadFile(fileUpload, "brands");
  }

  try {
    await prisma.brand.update({
      where: {
        id,
      },
      data: {
        name: parsedData.data.name,
        logo: fileName,
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
  const brand = await prisma.brand.findFirst({
    where: {
      id,
    },
    select: {
      logo: true,
    },
  });

  if (!brand) {
    return {
      error: "Brand not found",
    };
  }

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
