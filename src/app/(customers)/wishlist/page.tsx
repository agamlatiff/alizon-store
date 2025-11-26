import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/customers/Navbar";
import Footer from "@/components/customers/Footer";
import prisma from "@/lib/prisma";
import CardProduct from "@/components/customers/CardProduct";
import { Heart } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase";

async function getUserWishlist(userId: string) {
  const wishlistItems = await prisma.wishlist.findMany({
    where: {
      user_id: userId,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return wishlistItems.map((item: any) => ({
    ...item.product,
    price: Number(item.product.price),
    image_url: item.product.images[0]
      ? getImageUrl(item.product.images[0], "products")
      : "/assets/photos/p1.png",
    category_name: item.product.category.name,
  }));
}

const WishlistPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const wishlistProducts = await getUserWishlist(session.user?.id ?? "");

  return (
    <>
      <Navbar session={session} />

      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-2">
              My Wishlist
            </h1>
            <p className="text-neutral-500">
              Your curated collection of favorites
            </p>
          </div>

          {/* Wishlist Grid */}
          {wishlistProducts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-brand mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-neutral-500 mb-6">
                Save items you love to your wishlist so you can easily find them
                later.
              </p>
              <Link
                href="/catalogs"
                className="inline-flex items-center gap-2 bg-primary text-brand font-bold px-6 py-3 rounded-full hover:bg-primary-600 transition-colors"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistProducts.map((product: any, idx: number) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <CardProduct item={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default WishlistPage;
