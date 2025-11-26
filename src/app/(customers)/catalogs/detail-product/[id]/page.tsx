import { Suspense } from "react";
import Navbar from "../../../../../components/customers/Navbar";
import Footer from "../../../../../components/customers/Footer";
import PriceInfo from "./_components/PriceInfo";
import type { Tparams } from "@/types";
import { getProductById } from "./lib/data";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ListProducts from "@/components/customers/ListProducts";
import { Star, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

type paramsProps = {
  params: Tparams
};

const DetailProductPage = async ({ params }: paramsProps) => {
  const product = await getProductById(params.id);
  const session = await auth();

  if (!product) {
    return redirect("/");
  }
  
  // Mock rating
  const rating = 4.8;
  const reviewCount = 124;

  return (
    <>
      <Navbar session={session} />
      
      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-primary transition-colors"><Home className="w-4 h-4" /></Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/catalogs" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-brand font-semibold truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Images & Info */}
          <div className="flex-1 space-y-10">
            
            {/* Header Mobile (visible only on small screens) */}
            <div className="lg:hidden space-y-2">
               <h1 className="font-display font-bold text-3xl text-brand leading-tight">{product.name}</h1>
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                     {[1,2,3,4,5].map(i => (
                       <Star key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'fill-primary text-primary' : 'fill-neutral-200 text-neutral-200'}`} />
                     ))}
                  </div>
                  <span className="text-sm text-neutral-500 font-medium">({reviewCount} Reviews)</span>
               </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
               <div className="aspect-square w-full bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 relative group">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" 
                  />
               </div>
               <div className="grid grid-cols-4 gap-4">
                  {product.images.map((img, i) => (
                    <div key={i} className={`aspect-square rounded-xl border-2 ${i === 0 ? 'border-primary' : 'border-transparent'} overflow-hidden bg-neutral-50 cursor-pointer hover:border-primary/50 transition-colors`}>
                       <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
               <div>
                  <h1 className="hidden lg:block font-display font-bold text-4xl text-brand leading-tight mb-4">{product.name}</h1>
                  <div className="hidden lg:flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-0.5">
                         {[1,2,3,4,5].map(i => (
                           <Star key={i} className={`w-5 h-5 ${i <= Math.round(rating) ? 'fill-primary text-primary' : 'fill-neutral-200 text-neutral-200'}`} />
                         ))}
                      </div>
                      <span className="text-sm text-neutral-500 font-medium ml-2">{rating} ({reviewCount} Reviews)</span>
                  </div>
                  
                  <div className="prose prose-neutral max-w-none">
                     <h3 className="font-display font-bold text-xl text-brand mb-3">About Product</h3>
                     <p className="text-neutral-600 leading-relaxed">
                        {product.description}
                     </p>
                  </div>
               </div>

               {/* Reviews Section (Simplified) */}
               <div className="border-t border-neutral-100 pt-8">
                  <h3 className="font-display font-bold text-xl text-brand mb-6">Customer Reviews</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[1, 2].map((review) => (
                        <div key={review} className="bg-neutral-50 p-6 rounded-2xl space-y-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                                 <img src={`/assets/photos/p${review + 1}.png`} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-sm text-brand">Happy Customer</h4>
                                 <div className="flex gap-0.5">
                                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                 </div>
                              </div>
                              <span className="ml-auto text-xs text-neutral-400">2 days ago</span>
                           </div>
                           <p className="text-sm text-neutral-600 italic">"Absolutely love this product! The quality exceeded my expectations and the shipping was super fast."</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Price & Actions */}
          <PriceInfo
            isLogin={session ? true : false}
            item={{
              id: product.id,
              category_name: product.category.name,
              image_url: product.images[0],
              name: product.name,
              price: Number(product.price),
            }}
          />
        </div>

        {/* Related Products */}
        <div className="mt-24 border-t border-neutral-100 pt-16">
          <Suspense fallback={<span>Loading...</span>}>
            <ListProducts
              isShowDetail={false}
              title={
                <span className="font-display font-bold text-3xl text-brand">
                  You Might Also Like
                </span>
              }
            />
          </Suspense>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DetailProductPage;
