import prisma from "@/lib/prisma";
import CardProduct from "@/components/customers/CardProduct";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { unstable_cache } from "next/cache";

const getNewArrivals = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      take: 4,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: {
          select: {
            name: true
          }
        }
      }
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  },
  ['new-arrivals'],
  { revalidate: 3600, tags: ['products'] }
);

const NewArrivals = async () => {
  const newArrivals = await getNewArrivals();

  const products = newArrivals.map(p => ({
    ...p,
    image_url: p.images[0] ? getImageUrl(p.images[0], "products") : '/assets/photos/p1.png',
    category_name: p.category.name
  }));

  return (
    <section className="container mx-auto px-4 md:px-6 pt-20 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-8 bg-primary"></span>
            <span className="text-primary-600 font-bold tracking-wider text-xs uppercase">Weekly Selection</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-brand">Trending Now</h2>
        </div>

        <Link href="/catalogs" className="text-brand font-bold hover:text-primary transition-colors flex items-center gap-2">
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, idx) => (
          <div key={product.id} className="animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
            <CardProduct item={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
