'use client'

import { useCart } from "@/hooks/useCart";
import { USDFormat } from "@/lib/utils";
import Button from "@/components/ui/button";
import { ShoppingCart, Heart, CheckCircle2, Truck, ShieldCheck } from "lucide-react";

import type { TCart, TProduct } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface PriceInfoProp {
  item : TProduct;
  isLogin: boolean
}

const PriceInfo = ({item, isLogin} : PriceInfoProp) => {
  
  const {addProduct, openCart} = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const router = useRouter()
  
  const handleAddToCart = () => {
    setIsAdding(true);
    const newCart : TCart = {
      ...item,
      quantity: 1
    }
    
    addProduct(newCart);
    
    // Simulate loading for better UX
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 500);
  }
  
  return (
    <div className="w-full lg:w-[350px] flex flex-col shrink-0 gap-5 h-fit sticky top-24">
      <div className="w-full bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 flex flex-col gap-6 p-6 rounded-3xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
             <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">In Stock</span>
             <span className="text-neutral-400 text-xs font-medium">SKU: {item.id.slice(0,8)}</span>
          </div>
          <p className="font-display font-bold text-4xl text-brand mt-2">{USDFormat(item.price)}</p>
        </div>
        
        <div className="space-y-3">
          {[
            "Official Warranty Included",
            "100% Original Product",
            "Free Shipping Available",
            "Secure Packaging"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-neutral-600">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 mt-2">
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="h-12 text-lg shadow-lg shadow-primary/20"
            fullWidth
          >
            {isAdding ? "Adding..." : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="h-12 text-lg border-neutral-200 hover:bg-neutral-50 hover:text-brand"
            fullWidth
          >
            <Heart className="w-5 h-5 mr-2" /> Save to Wishlist
          </Button>
        </div>
      </div>
      
      <div className="w-full bg-surface border border-neutral-100 p-5 rounded-3xl space-y-4">
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
               <Truck className="w-5 h-5" />
            </div>
            <div>
               <h4 className="font-bold text-brand text-sm">Fast Delivery</h4>
               <p className="text-xs text-neutral-500 mt-1">Get it within 2-3 business days</p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
               <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
               <h4 className="font-bold text-brand text-sm">Buyer Protection</h4>
               <p className="text-xs text-neutral-500 mt-1">Money back guarantee if not satisfied</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PriceInfo;
