import prisma from "@/lib/prisma";
import { getImageUrl } from "@/lib/supabase";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { unstable_cache } from "next/cache";

const getCategories = unstable_cache(
  async () => {
    return await prisma.category.findMany({
      take: 4,
      select: {
        id: true,
        name: true,
        products: {
          take: 1,
          select: {
            images: true
          }
        }
      }
    });
  },
  ['home-categories'],
  { revalidate: 3600, tags: ['categories'] }
);

const Categories = async () => {
  const categoriesData = await getCategories();

  // Helper to get image for category
  const getCategoryImage = (cat: any, fallbackUrl: string) => {
    if (cat?.products?.[0]?.images?.[0]) {
      return getImageUrl(cat.products[0].images[0], "products");
    }
    return fallbackUrl;
  };

  return (
    <section className="container mx-auto px-4 md:px-6 py-24 border-t border-neutral-100" id="lookbook">
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Collections</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-brand mb-4">Shop by Category</h2>
        <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 md:h-[650px]">
        {/* Large Item Left */}
        {categoriesData[0] && (
          <Link href={`/catalogs?categories=${categoriesData[0].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 md:row-span-2 bg-neutral-100 shadow-lg block h-full">
            <Image
              src={getCategoryImage(categoriesData[0], "/assets/hero.jpg")}
              alt={categoriesData[0].name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">New Season</span>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">{categoriesData[0].name}</h3>
              <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                Explore Collection <ArrowRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        )}

        {/* Top Right */}
        {categoriesData[1] && (
          <Link href={`/catalogs?categories=${categoriesData[1].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 bg-neutral-100 shadow-lg h-64 md:h-auto block">
            <Image
              src={getCategoryImage(categoriesData[1], "/assets/casual-wear.jpg")}
              alt={categoriesData[1].name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <div className="absolute inset-y-0 right-0 p-8 flex flex-col justify-center items-end text-right">
              <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">{categoriesData[1].name}</h3>
              <span className="text-neutral-300 text-sm mb-4">Classic & Modern Styles</span>
              <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-brand transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
          </Link>
        )}

        {/* Bottom Mid */}
        {categoriesData[2] && (
          <Link href={`/catalogs?categories=${categoriesData[2].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto block">
            <Image
              src={getCategoryImage(categoriesData[2], "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop")}
              alt={categoriesData[2].name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-2xl font-display font-bold text-white mb-2">{categoriesData[2].name}</h3>
              <span className="text-white/80 text-sm">Complete the look</span>
            </div>
          </Link>
        )}

        {/* Bottom Right */}
        {categoriesData[3] && (
          <Link href={`/catalogs?categories=${categoriesData[3].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto block">
            <Image
              src={getCategoryImage(categoriesData[3], "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop")}
              alt={categoriesData[3].name}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h3 className="text-2xl font-display font-bold text-white mb-2">{categoriesData[3].name}</h3>
              <span className="text-white/80 text-sm">Step up your game</span>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Categories;
