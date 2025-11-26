"use client";

import { useCart } from "@/hooks/useCart";

import type { ActionResult } from "@/types";
import { useActionState, useMemo } from "react";
import { storeOrder } from "../lib/actions";
import { USDFormat } from "@/lib/utils";
import { User, Home, MapPin, FileText, Phone, CheckCircle2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Button from "@/components/ui/button";

const initialState: ActionResult = {
  error: "",
};
const CheckoutForm = () => {
  const { products } = useCart();
  const grandTotal = useMemo(() => {
    return products.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
  }, [products]);

  const storeOrderParams = (_: unknown, formData: FormData) =>
    storeOrder(_, formData, grandTotal, products);

  const [state, formAction, pending] = useActionState(
    storeOrderParams,
    initialState
  );

  if (products.length === 0) return null;

  return (
    <form
      action={formAction}
      id="checkout-info"
      className="container max-w-[1130px] mx-auto flex flex-col lg:flex-row justify-between gap-10 mt-[50px] pb-[100px]"
    >
      <div className="flex-1 flex flex-col shrink-0 gap-4 h-fit">
        <h2 className="font-display font-bold text-2xl leading-[34px] text-brand">
          Your Shipping Address
        </h2>
        <div className="flex flex-col gap-5 p-[30px] rounded-3xl border border-[#E5E5E5] bg-white shadow-sm">
          <div className="flex items-center gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
            <div className="flex shrink-0 text-neutral-400">
              <User className="w-5 h-5" />
            </div>
            <input
              required
              type="text"
              id=""
              name="name"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent"
              placeholder="Write your real complete name"
            />
          </div>
          <div className="flex items-center gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
            <div className="flex shrink-0 text-neutral-400">
              <Home className="w-5 h-5" />
            </div>
            <input
              required
              type="text"
              id=""
              name="address"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent"
              placeholder="Write your active house address"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-[30px]">
            <div className="w-full flex items-center gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
              <div className="flex shrink-0 text-neutral-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                required
                type="text"
                id=""
                name="city"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent"
                placeholder="City"
              />
            </div>
            <div className="w-full flex items-center gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
              <div className="flex shrink-0 text-neutral-400">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                required
                type="number"
                id=""
                name="postal_code"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent"
                placeholder="Post code"
              />
            </div>
          </div>
          <div className="flex items-start gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
            <div className="flex shrink-0 text-neutral-400 mt-1">
              <FileText className="w-5 h-5" />
            </div>
            <textarea
              name=""
              id="notes"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent resize-none"
              rows={4}
              placeholder="Additional notes for courier"
              defaultValue={""}
            />
          </div>
          <div className="flex items-center gap-[10px] rounded-xl border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
            <div className="flex shrink-0 text-neutral-400">
              <Phone className="w-5 h-5" />
            </div>
            <input
              required
              type="tel"
              id=""
              name="phone"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-brand bg-transparent"
              placeholder="Write your phone number or whatsapp"
            />
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-[400px] flex flex-col shrink-0 gap-4 h-fit">
        <h2 className="font-display font-bold text-2xl leading-[34px] text-brand">Payment Details</h2>
        <div className="w-full bg-white border border-[#E5E5E5] flex flex-col gap-[30px] p-[30px] rounded-3xl shadow-lg shadow-neutral-100">
          <div className="w-full bg-surface border border-[#E5E5E5] flex items-center justify-between gap-2 p-5 rounded-2xl">
            <div className="flex items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full bg-green-100 items-center justify-center text-green-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <p className="font-semibold text-brand">100% Authentic</p>
                <p className="text-sm text-neutral-500">Original products guaranteed</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <p>Sub Total</p>
              </div>
              <p className="font-semibold text-brand">{USDFormat(grandTotal)}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <p>Insurance</p>
              </div>
              <p className="font-semibold text-brand">{USDFormat(0)}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <p>Shipping</p>
              </div>
              <p className="font-semibold text-brand">{USDFormat(0)}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-600">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <p>Tax (11%)</p>
              </div>
              <p className="font-semibold text-brand">{USDFormat(0)}</p>
            </div>
          </div>
          
          <div className="h-px bg-neutral-100" />
          
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-neutral-500">Grand Total</p>
            <p className="font-display font-bold text-[32px] leading-[48px] text-primary-600">
              {USDFormat(grandTotal)}
            </p>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="h-12 text-lg shadow-xl shadow-primary/20"
              disabled={pending}
              fullWidth
            >
              {pending ? "Processing..." : "Checkout Now"}
            </Button>
            <Button
              variant="outline"
              className="h-12 text-lg"
              fullWidth
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
