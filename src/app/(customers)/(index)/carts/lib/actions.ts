'use server'

import { getUser } from "@/lib/auth";
import { schemaShippingAddress } from "@/lib/schema";
import type { ActionResult, TCart } from "@/types";
import { redirect } from "next/navigation";

export async function storeOrder(_: unknown, formData: FormData, total: number, product: TCart[]) : Promise<ActionResult> {
  
  const  {session} = await getUser()
  
  if(!session) {
    return redirect('/')
  }
  
  const parse = schemaShippingAddress.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    city: formData.get('city'),
    postal_code: formData.get('postal_code'),
  })
  
  if(!parse.success) {
    return {
      error: parse.error.issues[0].message
    }
  } 

  
  console.log(parse)
  
  return redirect('/')
}