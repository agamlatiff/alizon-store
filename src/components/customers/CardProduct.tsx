'use client';

import { USDFormat } from "@/lib/utils";
import type { TProduct } from "@/types";
import Link from "next/link";
import React from "react";
import { Eye, ShoppingCart } from "lucide-react";
import WishlistButton from "./WishlistButton";
import { useCart } from "@/hooks/useCart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CardProductProps {
  item: TProduct;
}

const CardProduct = ({ item }: CardProductProps) => {
  const [imgSrc, setImgSrc] = React.useState(item.image_url);
  const { addProduct } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (status === "unauthenticated" || !session) {
      const currentPath = window.location.pathname;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Add to cart
    addProduct({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      image_url: item.image_url,
      category_name: item.category_name,
      quantity: 1,
    });
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100">

      {/* Image Container */}
      <Link href={`/catalogs/detail-product/${item.id}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <img
          src={imgSrc}
          alt={item.name}
          onError={() => setImgSrc('/assets/photos/p1.png')}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}


        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-20">
          <WishlistButton productId={item.id} />
        </div>

        {/* Discount Badge */}


        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            className="flex-1 bg-neutral-900 text-white hover:bg-primary hover:text-neutral-900 border border-neutral-900 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold shadow-xl transition-all duration-200"
          // onClick={(e) => {
          //   e.preventDefault();
          //   // onQuickView(product);
          // }}
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <button
            className="w-12 bg-white text-brand hover:bg-primary hover:text-neutral-900 border border-neutral-100 flex items-center justify-center rounded-xl shadow-xl transition-all duration-200 flex-shrink-0"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{item.category_name}</p>

        </div>

        <Link href={`/catalogs/detail-product/${item.id}`} className="block">
          <h3 className="font-display font-semibold text-lg text-brand mb-2 truncate hover:text-primary-600 transition-colors leading-tight">
            {item.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-brand">
            {USDFormat(Number(item.price))}
          </span>

        </div>
      </div>
    </div>
  );
};

export default CardProduct;
