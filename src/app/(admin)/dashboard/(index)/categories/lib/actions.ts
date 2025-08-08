"use server";

import { schemaCategory } from "@/lib/schema";
import type { ActionResult } from "@/types";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";

export const postCategory = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  try {
    await prisma.category.create({
      data: {
        name: validate.data.name,
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
  id: number | undefined
): Promise<ActionResult> => {
  const validate = schemaCategory.safeParse({
    name: formData.get("name"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
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
        id: id,
      },
      data: {
        name: validate.data.name,
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
  id: number
): Promise<ActionResult> => {
  
  try {
    await prisma.category.delete({
      where : {
        id
      }
    })
  } catch (error ) {
    console.log(error) 
    return {
      error: 'Failed to delete data'
    };
  }
  
  return redirect("/dashboard/categories");
}
