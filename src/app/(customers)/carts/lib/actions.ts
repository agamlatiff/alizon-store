"use server";

import { schemaShippingAddress } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
import stripe from "@/lib/stripe";
import type { ActionResult, TCart } from "@/types";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[]
): Promise<ActionResult> {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  const parse = schemaShippingAddress.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    postal_code: formData.get("postal_code"),
  });

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message,
    };
  }

  try {
    // Create order in database
    const order = await prisma.order.create({
      data: {
        total: total,
        status: "pending",
        user_id: session.user?.id,
        code: generateRandomString(15),
      },
    });

    // Create order products
    const queryCreateProductOrder: Prisma.OrderProductCreateManyInput[] = [];

    for (const product of products) {
      queryCreateProductOrder.push({
        order_id: order.id,
        product_id: product.id,
        quantity: product.quantity,
        subtotal: product.price,
      });
    }

    await prisma.orderProduct.createMany({
      data: queryCreateProductOrder,
    });

    // Create order details (shipping address)
    await prisma.orderDetail.create({
      data: {
        address: parse.data.address,
        city: parse.data.city,
        name: parse.data.name,
        phone: parse.data.phone,
        postal_code: parse.data.postal_code,
        order_id: order.id,
      },
    });

    // Create Stripe Checkout Session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: [product.image_url],
          },
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
        },
        quantity: product.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel?order_id=${order.id}`,
      metadata: {
        order_id: order.id,
        order_code: order.code,
        user_id: session.user?.id || "",
      },
      customer_email: session.user?.email || undefined,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        code: stripeSession.id, // Store Stripe session ID as order code
      },
    });

    // Redirect to Stripe Checkout
    return redirect(stripeSession.url || "/");
  } catch (e) {
    console.error("Checkout error:", e);
    return {
      error: "Failed to process checkout. Please try again.",
    };
  }
}
