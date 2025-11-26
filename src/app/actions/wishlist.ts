"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "You must be logged in to manage wishlist" };
  }

  try {
    const existingWishlist = await prisma.wishlist.findUnique({
      where: {
        user_id_product_id: {
          user_id: session.user.id,
          product_id: productId,
        },
      },
    });

    if (existingWishlist) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: {
          id: existingWishlist.id,
        },
      });
      revalidatePath("/catalogs");
      revalidatePath("/wishlist");
      return { status: "removed" };
    } else {
      // Add to wishlist
      await prisma.wishlist.create({
        data: {
          user_id: session.user.id,
          product_id: productId,
        },
      });
      revalidatePath("/catalogs");
      revalidatePath("/wishlist");
      return { status: "added" };
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return { error: "Something went wrong" };
  }
}

export async function checkWishlistStatus(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

  const wishlist = await prisma.wishlist.findUnique({
    where: {
      user_id_product_id: {
        user_id: session.user.id,
        product_id: productId,
      },
    },
  });

  return !!wishlist;
}
