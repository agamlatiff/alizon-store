"use client";

import { useCart } from "@/hooks/useCart";
import { USDFormat } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartProduct = () => {
  const { products, increaseQuantity, decreaseQuantity, removeProduct } = useCart();

  if (products.length === 0) {
    return (
      <div className="container max-w-[1130px] mx-auto mt-[50px] text-center p-10 bg-white rounded-3xl border border-neutral-100">
        <p className="text-neutral-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div
      id="cart"
      className="container max-w-[1130px] mx-auto flex flex-col gap-5 mt-[50px]"
    >
      {products.map((cart) => (
        <div key={cart.id + cart.name} className="product-total-card bg-white flex items-center justify-between p-5 rounded-[20px] border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center w-[340px] gap-5">
            <div className="w-[120px] h-[70px] flex shrink-0 overflow-hidden items-center justify-center rounded-xl bg-neutral-50">
              <img
                src={cart.image_url}
                className="w-full h-full object-contain"
                alt={cart.name}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold leading-[22px] text-brand">{cart.name}</p>
              <p className="text-sm text-[#616369]">{cart.category_name}</p>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Price</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              {USDFormat(cart.price)}
            </p>
          </div>
          <div className="w-[120px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Quantity</p>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => decreaseQuantity(cart.id)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
                disabled={cart.quantity <= 1}
              >
                <Minus className="w-4 h-4 text-brand" />
              </button>
              <p className="text-brand font-bold leading-[22px] w-6 text-center">
                {cart.quantity}
              </p>
              <button 
                type="button" 
                onClick={() => increaseQuantity(cart.id)} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary hover:bg-primary-600 transition-colors"
              >
                <Plus className="w-4 h-4 text-brand" />
              </button>
            </div>
          </div>
          <div className="w-[150px] flex flex-col gap-1">
            <p className="text-sm text-[#616369]">Total</p>
            <p className="font-semibold text-[#0D5CD7] leading-[22px]">
              {USDFormat(cart.price * cart.quantity)}
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => removeProduct(cart.id)} 
            className="p-3 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartProduct;
