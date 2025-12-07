import { Suspense } from "react";
import Navbar from "../../components/customers/Navbar";
import Footer from "../../components/customers/Footer";
import { auth } from "@/lib/auth";
import { Sparkles, Truck, RotateCcw, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Image from "next/image";
import TestimonialMarquee from "@/components/customers/TestimonialMarquee";
import NewArrivals from "@/components/customers/home/NewArrivals";
import Categories from "@/components/customers/home/Categories";
import NewArrivalsSkeleton from "@/components/customers/skeletons/NewArrivalsSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const LandingPage = async () => {
  const session = await auth();

  return (
    <>
      <OrganizationJsonLd />
      <Navbar session={session} />

      <div className="space-y-0 pb-24">

        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[700px] w-full bg-neutral-900 overflow-hidden">
          <div className="absolute inset-0 opacity-70 transform hover:scale-105 transition-transform duration-[20s]">
            <Image
              src="/assets/hero.jpg"
              alt="Hero Background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
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
        <Suspense fallback={<NewArrivalsSkeleton />}>
          <NewArrivals />
        </Suspense>

        {/* Shop by Category - Bento Grid */}
        <Suspense fallback={
          <div className="container mx-auto px-4 md:px-6 py-24 border-t border-neutral-100">
            <div className="text-center mb-16">
              <Skeleton className="h-4 w-24 mx-auto mb-2" />
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-1.5 w-24 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 md:h-[650px]">
              <Skeleton className="col-span-1 md:col-span-2 md:row-span-2 rounded-3xl" />
              <Skeleton className="col-span-1 md:col-span-2 rounded-3xl" />
              <Skeleton className="col-span-1 rounded-3xl" />
              <Skeleton className="col-span-1 rounded-3xl" />
            </div>
          </div>
        }>
          <Categories />
        </Suspense>

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
                  <Image
                    src="/assets/actor.jpg"
                    alt="Flash Sale Model"
                    width={500}
                    height={600}
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

