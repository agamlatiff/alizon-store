"use server";

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { deleteFile, uploadFile } from "@/lib/supabase";
import type { ActionResult } from "@/types";
import type { ProductStock } from "@prisma/client";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";

export async function storeProduct(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parse = schemaProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    images: formData.getAll("images"),
  });

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message,
    };
  }

  const uploaded_images = parse.data.images as File[];
  const fileNames = [];

  for (const image of uploaded_images) {
    const fileName = await uploadFile(image, "products");
    fileNames.push(fileName);
  }

  try {
    await prisma.product.create({
      data: {
        name: parse.data.name,
        description: parse.data.description,
        category_id: Number.parseInt(parse.data.category_id),
        location_id: Number.parseInt(parse.data.location_id),
        brand_id: Number.parseInt(parse.data.brand_id),
        price: Number.parseInt(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: fileNames,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to insert data product",
    };
  }

  return redirect("/dashboard/products");
}

export async function updateProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const parse = schemaProductEdit.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    brand_id: formData.get("brand_id"),
    category_id: formData.get("category_id"),
    location_id: formData.get("location_id"),
    stock: formData.get("stock"),
    id: id,
  });

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message,
    };
  }

  const product = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  const uploaded_images = formData.getAll("images") as File[];
  let fileNames = [];

  if (uploaded_images.length === 3) {
    const parseImages = schemaProduct.pick({ images: true }).safeParse({
      images: uploaded_images,
    });

    if (!parseImages.success) {
      return {
        error: "Failed to upload images",
      };
    }

    for (const image of uploaded_images) {
      const fileName = await uploadFile(image, "products");
      fileNames.push(fileName);
    }
  } else {
    fileNames = product.images;
  }

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: parse.data.name,
        description: parse.data.description,
        category_id: Number.parseInt(parse.data.category_id),
        location_id: Number.parseInt(parse.data.location_id),
        brand_id: Number.parseInt(parse.data.brand_id),
        price: Number.parseInt(parse.data.price),
        stock: parse.data.stock as ProductStock,
        images: fileNames,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to update data product",
    };
  }

  return redirect("/dashboard/products");
}

export async function deleteProduct(
  _: unknown,
  formData: FormData,
  id: number
): Promise<ActionResult> {
  const product = await prisma.product.findFirst({
    where: {
      id,
    },
    select: {
      images: true,
      id: true,
    },
  });

  if (!product) {
    return {
      error: "Product not found",
    };
  }

  await deleteFile();

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to delete data product",
    };
  }

  return redirect("/dashboard/products");
}
