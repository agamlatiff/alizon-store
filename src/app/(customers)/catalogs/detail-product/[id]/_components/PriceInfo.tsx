'use client'

import { useCart } from "@/hooks/useCart";
import { USDFormat } from "@/lib/utils";
import Button from "@/components/ui/button";
import { ShoppingCart, Heart, CheckCircle2, Truck, ShieldCheck } from "lucide-react";

import type { TCart, TProduct } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toggleWishlist, checkWishlistStatus } from "@/app/actions/wishlist";


interface PriceInfoProp {
  item: TProduct;
  isLogin: boolean
}

const PriceInfo = ({ item, isLogin }: PriceInfoProp) => {

  const { addProduct, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const checkStatus = async () => {
      if (isLogin) {
        const status = await checkWishlistStatus(item.id);
        setIsInWishlist(status);
      }
    };
    checkStatus();
  }, [item.id, isLogin]);

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!isLogin) {
      const currentPath = window.location.pathname;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    setIsAdding(true);
    const newCart: TCart = {
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

  const handleToggleWishlist = async () => {
    // Check if user is logged in
    if (!isLogin) {
      const currentPath = window.location.pathname;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    setIsWishlistLoading(true);
    const previousState = isInWishlist;
    setIsInWishlist(!previousState);

    try {
      const result = await toggleWishlist(item.id);
      if (result.error) {
        setIsInWishlist(previousState);
      }
    } catch (error) {
      setIsInWishlist(previousState);
    } finally {
      setIsWishlistLoading(false);
    }
  }

  return (
    <div className="w-full lg:w-[350px] flex flex-col shrink-0 gap-5 h-fit sticky top-24">
      <div className="w-full bg-white border border-neutral-100 shadow-xl shadow-neutral-100/50 flex flex-col gap-6 p-6 rounded-3xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">In Stock</span>
            <span className="text-neutral-400 text-xs font-medium">SKU: {item.id.slice(0, 8)}</span>
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
            onClick={handleToggleWishlist}
            disabled={isWishlistLoading}
            variant="outline"
            className={`h-12 text-lg border-neutral-200 hover:bg-neutral-50 transition-colors ${isInWishlist ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : 'hover:text-brand'
              }`}
            fullWidth
          >
            <Heart className={`w-5 h-5 mr-2 ${isInWishlist ? 'fill-red-500' : ''}`} />
            {isInWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
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
