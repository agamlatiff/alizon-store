"use server";

import prisma from "@/lib/prisma";
import type { ActionResult } from "@/types";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(
  _: unknown,
  formData: FormData,
  orderId: string
): Promise<ActionResult> {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "success" },
    });

    revalidatePath("/dashboard/orders");

    return { error: "" };
  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      error: "Failed to update order status. Please try again.",
    };
  }
}
