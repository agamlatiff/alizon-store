import { Suspense } from "react";
import Navbar from "../../components/customers/Navbar";
import Footer from "../../components/customers/Footer";
import CardProduct from "@/components/customers/CardProduct";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Sparkles, Truck, RotateCcw, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, ArrowUpRight, Zap, Mail } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Image from "next/image";
import TestimonialMarquee from "@/components/customers/TestimonialMarquee";
import { getImageUrl } from "@/lib/supabase";

async function getNewArrivals() {
  return await prisma.product.findMany({
    take: 4,
    orderBy: { created_at: 'desc' },
    include: {
      category: true,
    }
  });
}

async function getCategories() {
  return await prisma.category.findMany({
    take: 4,
    include: {
      products: {
        take: 1,
        select: {
          images: true
        }
      }
    }
  });
}

const LandingPage = async () => {
  const session = await auth();
  const newArrivals = await getNewArrivals();
  const categoriesData = await getCategories();

  // Transform Prisma data to match CardProduct expectation
  const products = newArrivals.map(p => ({
    ...p,
    price: Number(p.price), // Convert BigInt to number
    image_url: p.images[0] ? getImageUrl(p.images[0], "products") : '/assets/photos/p1.png',
    category_name: p.category.name
  }));

  // Helper to get image for category
  const getCategoryImage = (cat: any, fallbackUrl: string) => {
    if (cat?.products?.[0]?.images?.[0]) {
      return getImageUrl(cat.products[0].images[0], "products");
    }
    return fallbackUrl;
  };

  return (
    <>
      <Navbar session={session} />

      <div className="space-y-0 pb-24">

        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[700px] w-full bg-neutral-900 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transform hover:scale-105 transition-transform duration-[20s]"
            style={{ backgroundImage: "url('/assets/hero.jpg') " }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-transparent to-surface" />

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-4 pt-20 pb-40 md:pb-56">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-widest uppercase mb-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
              <Sparkles className="w-3 h-3 text-primary" /> New Collection 2025
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-display leading-tight mb-6 drop-shadow-2xl animate-in slide-in-from-bottom-6 duration-700 delay-200 tracking-tight">
              Style That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Speaks.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-100 mb-10 max-w-2xl drop-shadow-md animate-in slide-in-from-bottom-6 duration-700 delay-300 font-light">
              Discover the latest trends in fashion. Premium quality, sustainable materials, and designs that turn heads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-500">
              <Link href="/catalogs">
                <Button size="lg" className="shadow-[0_0_20px_rgba(255,180,0,0.5)] hover:shadow-[0_0_30px_rgba(255,180,0,0.7)] min-w-[180px] border-2 border-primary">Shop Now</Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-brand min-w-[180px] backdrop-blur-sm"
              >
                <Link href="#lookbook">
                  View Lookbook
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Floating Features Bar */}
        <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-24 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-neutral-200/50">
            {[
              { icon: Truck, title: "Free Express Shipping", text: "On all orders over $150", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: RotateCcw, title: "30-Day Easy Returns", text: "Hassle-free return policy", color: "text-green-600", bg: "bg-green-50" },
              { icon: ShieldCheck, title: "Secure Payment", text: "100% secure checkout", color: "text-purple-600", bg: "bg-purple-50" },
            ].map((feature, idx) => (
              <div key={idx} className="group flex items-center gap-5 p-8 hover:bg-white/90 transition-all duration-300 cursor-default">
                <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand text-lg group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1 font-medium">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now Slider (Simplified to Grid for MVP) */}
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

        {/* Shop by Category - Bento Grid */}
        <section className="container mx-auto px-4 md:px-6 py-24 border-t border-neutral-100" id="lookbook">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Collections</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand mb-4">Shop by Category</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 md:h-[650px]">
            {/* Large Item Left */}
            {categoriesData[0] && (
              <Link href={`/catalogs?categories=${categoriesData[0].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 md:row-span-2 bg-neutral-100 shadow-lg">
                <img
                  src={getCategoryImage(categoriesData[0], "assets/hero.jpg")}
                  alt={categoriesData[0].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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
              <Link href={`/catalogs?categories=${categoriesData[1].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 bg-neutral-100 shadow-lg h-64 md:h-auto">
                <img
                  src={getCategoryImage(categoriesData[1], "assets/casual-wear.jpg")}
                  alt={categoriesData[1].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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
              <Link href={`/catalogs?categories=${categoriesData[2].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto">
                <img
                  src={getCategoryImage(categoriesData[2], "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop")}
                  alt={categoriesData[2].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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
              <Link href={`/catalogs?categories=${categoriesData[3].id}`} className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto">
                <img
                  src={getCategoryImage(categoriesData[3], "https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop")}
                  alt={categoriesData[3].name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
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

        {/* Flash Sale Section */}
        <section className="py-24 bg-brand text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-[150px] translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 animate-pulse">
                  <Zap className="w-4 h-4 fill-current" /> FLASH SALE
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                  Up to <span className="text-primary">50% OFF</span><br />Selected Items
                </h2>
                <p className="text-neutral-400 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                  Limited time offer. Grab your favorites before they are gone forever. Free shipping included.
                </p>

                <Button className="bg-white text-brand hover:bg-primary border-0 h-12 px-8 text-lg shadow-xl">
                  <Link href="/catalogs">
                    Shop The Sale
                  </Link>
                </Button>
              </div>

              <div className="flex-1 relative">
                <div className="relative z-10 transform hover:rotate-2 transition-transform duration-500">
                  <img
                    src="assets/actor.jpg"
                    alt="Flash Sale Model"
                    className="rounded-3xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonials Marquee */}
        <TestimonialMarquee />
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;
