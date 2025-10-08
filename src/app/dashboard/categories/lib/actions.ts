"use server";

import { schemaCategory } from "@/lib/schema";
import type { TypeCheckingCategories } from "@/types";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { StatusCategory } from "@prisma/client";

export const postCategory = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingCategories> => {
  const parsedData = schemaCategory.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
  });

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0] ?? "",
      description: errors.description?.[0] ?? "",
      status: errors.status?.[0] ?? "",
      error: "Failed to insert data",
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: parsedData.data.name,
        description: parsedData.data.description,
        status: parsedData.data.status,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to insert data",
    };
  }

  return redirect("/dashboard/categories");
};

export const updateCategory = async (
  _: unknown,
  formData: FormData,
  id: string | undefined
): Promise<TypeCheckingCategories> => {
  const parsedData = schemaCategory.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    status: formData.get("status"),
  });

  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      name: errors.name?.[0] ?? "",
      description: errors.description?.[0] ?? "",
      status: errors.status?.[0] ?? "",
    };
  }

  if (id === undefined) {
    return {
      error: "Id is not found",
    };
  }

  try {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        name: parsedData.data.name,
        description: parsedData.data.description,
        status: parsedData.data.status as StatusCategory,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update data",
    };
  }

  return redirect("/dashboard/categories");
};

export const deleteCategory = async (
  _: unknown,
  formData: FormData,
  id: string
): Promise<TypeCheckingCategories> => {
  try {
    await prisma.category.delete({
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

  return redirect("/dashboard/categories");
};
