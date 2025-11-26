"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toggleWishlist, checkWishlistStatus } from "@/app/actions/wishlist";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

const WishlistButton = ({ productId, className = "" }: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await checkWishlistStatus(productId);
        setIsInWishlist(status);
      } catch (error) {
        console.error("Failed to check wishlist status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, [productId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in first
    if (status === "unauthenticated" || !session) {
      // Redirect to login page with callback URL
      const currentPath = window.location.pathname;
      router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
      return;
    }

    // Optimistic update
    const previousState = isInWishlist;
    setIsInWishlist(!previousState);

    try {
      const result = await toggleWishlist(productId);
      if (result.error) {
        // Revert if error
        setIsInWishlist(previousState);
        if (result.error.includes("logged in")) {
          const currentPath = window.location.pathname;
          router.push(`/sign-in?callbackUrl=${encodeURIComponent(currentPath)}`);
        }
      }
    } catch (error) {
      setIsInWishlist(previousState);
    }
  };

  if (isLoading) {
    return (
      <button
        className={`w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm ${className}`}
        disabled
      >
        <Heart className="w-5 h-5 text-neutral-300" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all hover:scale-110 hover:bg-white ${className}`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-red-500 text-red-500" : "text-neutral-600 hover:text-red-500"
          }`}
      />
    </button>
  );
};

export default WishlistButton;
