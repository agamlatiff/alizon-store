import React, { useState, useMemo, useEffect } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, Sparkles, Flame } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';
import { PRODUCTS } from '../data';
import { Category, Product } from '../types';
import QuickViewModal from '../components/shop/QuickViewModal';

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // New State for special filters
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories: Category[] = ['All', 'Men', 'Women', 'Accessories', 'Shoes'];

  // Sync state with URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const filterParam = searchParams.get('filter');

    // Handle Category
    if (categoryParam && categories.includes(categoryParam as Category)) {
      setActiveCategory(categoryParam as Category);
      setActiveFilter(null); // Reset filter if category is selected explicitly
    } else {
      setActiveCategory('All');
    }

    // Handle Special Filters (New / Popular)
    if (filterParam) {
      setActiveFilter(filterParam);
      // Reset category to All if we are filtering by New/Popular across all categories
      if (!categoryParam) setActiveCategory('All');
    } else {
      setActiveFilter(null);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    // When manually changing category, we clear the special "filter" param to avoid confusion
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Category Filter
      const matchCategory = activeCategory === 'All' || product.category === activeCategory;
      
      // 2. Price Filter
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      // 3. Special Filters (New / Popular)
      let matchSpecial = true;
      if (activeFilter === 'new') {
        matchSpecial = !!product.isNew;
      } else if (activeFilter === 'popular') {
        matchSpecial = product.rating >= 4.7 || product.reviews > 100;
      }

      return matchCategory && matchPrice && matchSpecial;
    });
  }, [activeCategory, priceRange, activeFilter]);

  const getPageTitle = () => {
    if (activeFilter === 'new') return <span className="flex items-center gap-2">New Drops <Sparkles className="w-6 h-6 text-primary" /></span>;
    if (activeFilter === 'popular') return <span className="flex items-center gap-2">Best Sellers <Flame className="w-6 h-6 text-orange-500" /></span>;
    if (activeCategory === 'All') return 'All Products';
    return `${activeCategory}'s Collection`;
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-display font-bold text-brand mb-2 flex items-center">
               {getPageTitle()}
             </h1>
             <p className="text-neutral-500">Showing {filteredProducts.length} results</p>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Filters Rail - Desktop Sticky / Mobile Modal */}
          <aside className={`
            lg:w-64 flex-shrink-0 lg:block
            ${isMobileFilterOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'}
            lg:static lg:bg-transparent lg:p-0 lg:z-auto
          `}>
            <div className="lg:sticky lg:top-24 space-y-8">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold font-display text-brand">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-bold text-brand mb-4 flex items-center justify-between">
                  Categories <ChevronDown className="w-4 h-4" />
                </h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${activeCategory === cat ? 'border-primary bg-primary' : 'border-neutral-300'}`}>
                        {activeCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <input 
                        type="radio" 
                        name="category" 
                        className="hidden" 
                        checked={activeCategory === cat}
                        onChange={() => handleCategoryChange(cat)} 
                      />
                      <span className={`text-sm ${activeCategory === cat ? 'text-brand font-medium' : 'text-neutral-500 group-hover:text-neutral-700'}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-brand mb-4">Price Range</h3>
                <div className="px-2">
                   <input 
                     type="range" 
                     min="0" 
                     max="500" 
                     value={priceRange[1]} 
                     onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                     className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary"
                   />
                   <div className="flex justify-between mt-2 text-sm text-neutral-600 font-medium">
                     <span>$0</span>
                     <span>${priceRange[1]}</span>
                   </div>
                </div>
              </div>

              {/* Mock Brand Filter */}
              <div>
                <h3 className="font-bold text-brand mb-4">Brands</h3>
                <div className="space-y-2">
                  {['Nike', 'Adidas', 'Puma', 'Zara'].map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-neutral-300 text-primary focus:ring-primary" />
                      <span className="text-sm text-neutral-500">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button 
                className="lg:hidden w-full bg-brand text-white py-3 rounded-lg font-bold mt-8"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 w-full">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredProducts.map(product => (
                   <ProductCard 
                      key={product.id} 
                      product={product} 
                      onQuickView={setQuickViewProduct} 
                    />
                 ))}
               </div>
             ) : (
               <div className="text-center py-20 bg-neutral-50 rounded-xl border border-neutral-100">
                 <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                 <h3 className="text-lg font-bold text-brand">No products found</h3>
                 <p className="text-neutral-500">Try adjusting your filters.</p>
               </div>
             )}
          </div>

        </div>
      </div>
      <QuickViewModal 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default Catalog;