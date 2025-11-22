import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, ArrowRight, Star, Sparkles, ChevronLeft, ChevronRight, Quote, Package, Zap, CreditCard, Timer, ArrowUpRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import { PRODUCTS, TESTIMONIALS } from '../data';
import QuickViewModal from '../components/shop/QuickViewModal';
import { Product } from '../types';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Slider Logic for Trending
  const [sliderIndex, setSliderIndex] = useState(0);
  
  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % PRODUCTS.length); 
  };
  const prevSlide = () => {
     setSliderIndex((prev) => (prev === 0 ? PRODUCTS.length - 1 : prev - 1));
  };

  // Scroll to Lookbook handler
  const scrollToLookbook = () => {
    const element = document.getElementById('lookbook');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get visible products for carousel
  const getVisibleProducts = () => {
    const items = [];
    for (let i = 0; i < 4; i++) {
      items.push(PRODUCTS[(sliderIndex + i) % PRODUCTS.length]);
    }
    return items;
  };

  // Create a doubled array for infinite marquee - 5x to ensure smooth loop on wide screens
  const marqueeTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <>
      <div className="space-y-0 pb-24">
        
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[700px] w-full bg-neutral-900 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70 transform hover:scale-105 transition-transform duration-[20s]" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')"}}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/40 via-transparent to-surface" />
          
          {/* Increased padding-bottom to prevent overlap with the floating bar */}
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
              <Link to="/catalog">
                <Button size="lg" className="shadow-[0_0_20px_rgba(255,180,0,0.5)] hover:shadow-[0_0_30px_rgba(255,180,0,0.7)] min-w-[180px] border-2 border-primary">Shop Now</Button>
              </Link>
              <Button 
                onClick={scrollToLookbook}
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-brand min-w-[180px] backdrop-blur-sm"
              >
                View Lookbook
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

        {/* Trending Now Slider */}
        <section className="container mx-auto px-4 md:px-6 pt-20 pb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
             <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-px w-8 bg-primary"></span>
                  <span className="text-primary-600 font-bold tracking-wider text-xs uppercase">Weekly Selection</span>
                </div>
                <h2 className="text-4xl font-display font-bold text-brand">Trending Now</h2>
             </div>
             
             {/* Interactive Click Click Buttons */}
             <div className="flex items-center gap-3">
                <button 
                  onClick={prevSlide} 
                  className="w-14 h-14 rounded-full border-2 border-neutral-100 flex items-center justify-center text-brand hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="w-14 h-14 rounded-full border-2 border-neutral-100 flex items-center justify-center text-brand hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 group"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
          
          {/* Slider Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {getVisibleProducts().map((product, idx) => (
               <div key={`${product.id}-${sliderIndex}`} className="animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 50}ms` }}>
                 <ProductCard 
                   product={product} 
                   onQuickView={setQuickViewProduct} 
                 />
               </div>
             ))}
          </div>
        </section>
        
        {/* Shop by Category - Enhanced Bento Grid */}
        <section className="container mx-auto px-4 md:px-6 py-24 border-t border-neutral-100">
          <div className="text-center mb-16">
             <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Collections</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-brand mb-4">Shop by Category</h2>
             <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 md:h-[650px]">
            {/* Large Item Left - Women */}
            <Link to="/catalog" className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 md:row-span-2 bg-neutral-100 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" 
                alt="Women's Fashion" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                 <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">New Season</span>
                 <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Women</h3>
                 <span className="inline-flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all">
                   Explore Collection <ArrowRight className="w-5 h-5" />
                 </span>
              </div>
            </Link>

            {/* Top Right - Men */}
            <Link to="/catalog" className="group relative rounded-3xl overflow-hidden col-span-1 md:col-span-2 bg-neutral-100 shadow-lg h-64 md:h-auto">
               <img 
                src="https://images.unsplash.com/photo-1516257984-b1b4d8c92d1d?q=80&w=1200&auto=format&fit=crop" 
                alt="Men's Fashion" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-y-0 right-0 p-8 flex flex-col justify-center items-end text-right">
                 <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">Men</h3>
                 <span className="text-neutral-300 text-sm mb-4">Classic & Modern Styles</span>
                 <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-brand transition-colors">
                   <ArrowUpRight className="w-5 h-5" />
                 </span>
              </div>
            </Link>

            {/* Bottom Mid - Accessories */}
            <Link to="/catalog" className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto">
               <img 
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" 
                alt="Accessories" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                 <h3 className="text-2xl font-display font-bold text-white mb-2">Accessories</h3>
                 <span className="text-white/80 text-sm">Complete the look</span>
              </div>
            </Link>

            {/* Bottom Right - Shoes */}
            <Link to="/catalog" className="group relative rounded-3xl overflow-hidden col-span-1 bg-neutral-100 shadow-lg h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1560769629-975e13f0c470?q=80&w=800&auto=format&fit=crop" 
                alt="Shoes" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                 <h3 className="text-2xl font-display font-bold text-white mb-2">Shoes</h3>
                 <span className="text-white/80 text-sm">Step up your game</span>
              </div>
            </Link>
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
                    
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold font-mono border border-white/20">
                            {timeLeft.hours.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Hours</span>
                       </div>
                       <span className="text-2xl font-bold text-primary">:</span>
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold font-mono border border-white/20">
                            {timeLeft.minutes.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Mins</span>
                       </div>
                       <span className="text-2xl font-bold text-primary">:</span>
                       <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-primary text-brand rounded-xl flex items-center justify-center text-2xl font-bold font-mono shadow-[0_0_15px_rgba(255,180,0,0.5)]">
                            {timeLeft.seconds.toString().padStart(2, '0')}
                          </div>
                          <span className="text-xs text-neutral-500 mt-2 uppercase tracking-wider">Secs</span>
                       </div>
                    </div>
                    
                    <Button className="bg-white text-brand hover:bg-primary border-0 h-12 px-8 text-lg shadow-xl">
                       Shop The Sale
                    </Button>
                 </div>
                 
                 <div className="flex-1 relative">
                    <div className="relative z-10 transform hover:rotate-2 transition-transform duration-500">
                       <img 
                         src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                         alt="Flash Sale Model" 
                         className="rounded-3xl shadow-2xl border-4 border-white/10 w-full max-w-md mx-auto"
                       />
                       
                       {/* Floating Product Cards */}
                       <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-[240px] animate-in slide-in-from-bottom-4 duration-1000 delay-300 hidden sm:flex">
                          <img 
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop" 
                            className="w-16 h-16 rounded-lg object-cover bg-neutral-100" 
                            alt="Shoe" 
                          />
                          <div>
                             <p className="font-bold text-brand text-sm">Runner Pro</p>
                             <div className="flex items-center gap-2">
                               <span className="text-xs line-through text-neutral-400">$140</span>
                               <span className="text-sm font-bold text-red-600">$70</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* "The Edit" - Curated Lookbook */}
        <section id="lookbook" className="container mx-auto px-4 md:px-6 py-24">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                 <img 
                   src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" 
                   alt="The Edit" 
                   className="w-full h-[600px] object-cover rounded-3xl shadow-2xl"
                 />
                 <div className="absolute inset-0 rounded-3xl border border-black/5"></div>
              </div>
              <div className="space-y-8">
                 <div>
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">The Edit</span>
                    <h2 className="text-4xl font-display font-bold text-brand mb-4">Urban Sophistication</h2>
                    <p className="text-neutral-500 text-lg leading-relaxed">
                       Curated looks for the modern city dweller. We've combined comfort with sharp tailoring to create a versatile wardrobe that transitions seamlessly from office to evening.
                    </p>
                 </div>
                 
                 <div className="space-y-4">
                    <h3 className="font-bold text-brand text-lg border-b border-neutral-100 pb-2">Shop the Look</h3>
                    {/* Mini Product List */}
                    {[PRODUCTS[0], PRODUCTS[3]].map(product => (
                       <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors group cursor-pointer border border-transparent hover:border-neutral-100">
                          <img src={product.image} alt={product.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                             <h4 className="font-bold text-brand group-hover:text-primary-600 transition-colors">{product.title}</h4>
                             <p className="text-sm text-neutral-500">{product.category}</p>
                          </div>
                          <span className="font-bold text-brand">${product.price.toFixed(2)}</span>
                          <button 
                            className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-brand group-hover:border-primary transition-all"
                            aria-label="View product"
                          >
                             <ArrowRight className="w-4 h-4" />
                          </button>
                       </div>
                    ))}
                 </div>
                 
                 <Link to="/catalog">
                    <Button variant="outline" size="lg" className="mt-4 w-full sm:w-auto">Explore Full Collection</Button>
                 </Link>
              </div>
           </div>
        </section>

        {/* Testimonials Marquee */}
        <section className="py-24 bg-neutral-50 border-t border-neutral-100 overflow-hidden">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-display font-bold text-brand">What Our Customers Say</h2>
           </div>
           
           {/* Marquee Container */}
           <div className="relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-neutral-50 to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-neutral-50 to-transparent z-10"></div>
              
              <div className="flex w-max animate-marquee hover:pause-on-hover">
                 {marqueeTestimonials.map((review, idx) => (
                    <div key={`${review.id}-${idx}`} className="w-[350px] md:w-[450px] px-4">
                       <div className="bg-white p-8 rounded-2xl shadow-card h-full border border-neutral-100">
                          <div className="flex gap-1 mb-4">
                             {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary text-primary' : 'fill-neutral-200 text-neutral-200'}`} />
                             ))}
                          </div>
                          <p className="text-brand font-medium italic mb-6 leading-relaxed">"{review.comment}"</p>
                          <div className="flex items-center gap-4">
                             <img src={review.avatar} alt={review.user} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                             <div>
                                <h4 className="font-bold text-brand text-sm">{review.user}</h4>
                                <span className="text-xs text-neutral-400">{review.date}</span>
                             </div>
                             <Quote className="w-8 h-8 text-primary/20 ml-auto" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
        
      </div>
      
      {/* Quick View Modal */}
      <QuickViewModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default Home;