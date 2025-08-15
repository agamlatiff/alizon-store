"use server";

import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
import xenditClient from "@/lib/xendit";
import type { ActionResult, TCart } from "@/types";
import { Prisma } from "@prisma/client";
import prisma from "lib/prisma";
import { redirect } from "next/navigation";
import type { PaymentRequestParameters, PaymentRequest } from "xendit-node/payment_request/models";

export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  product: TCart[]
): Promise<ActionResult> {
  const { session, user } = await getUser();

  if (!session) {
    return redirect("/");
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
  
  let redirectPaymentUrl = '/'

  try {
    const order = await prisma.order.create({
      data: {
        total: total,
        status: "pending",
        user_id: user.id,
        code: generateRandomString(15),
      },
    });

    const data: PaymentRequestParameters = {
      amount: total,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
      currency: "IDR",
      referenceId: order.code,
    };
    
    const response : PaymentRequest = await xenditClient.PaymentRequest.createPaymentRequest({
      data
    })
    
    redirectPaymentUrl = response.actions?.find((item) => item.urlType === 'DEEPLINK')?.url ?? '/'
    
    const queryCreateProductOrder : Prisma.OrderProductCreateManyInput[] = []
    
    for (const product of products) {
      queryCreateProductOrder.push({
        order_id : order.id,
        product_id: product.id
      })
    }
    
  } catch (e) {
    console.log(e);
    return  {
      error: 'Failed to check out'
    }
  }

  console.log(parse);

  return redirect(redirectPaymentUrl);
}
