import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, Share2 } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import { useCart } from '../context/CartContext';
import QuickViewModal from '../components/shop/QuickViewModal';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [zoomOrigin, setZoomOrigin] = useState('center');

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === Number(id));
    if (found) {
      setProduct(found);
      setActiveImg(found.image);
      setSelectedSize(found.sizes ? found.sizes[0] : '');
      setSelectedColor(found.colors ? found.colors[0] : '');
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  if (!product) return <div className="h-screen flex items-center justify-center text-brand">Loading...</div>;

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="pb-16">
        <div className="container mx-auto px-4 md:px-6 py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-neutral-500 mb-8 flex items-center gap-2">
            <span>Home</span> / <span>Catalog</span> / <span>{product.category}</span> / <span className="text-brand font-medium">{product.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Gallery */}
            <div className="space-y-4">
              <div 
                className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100 relative group"
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={activeImg} 
                  alt={product.title} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.75]"
                  style={{ transformOrigin: zoomOrigin }}
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-neutral-400 hover:text-primary-600 transition-colors">
                  <Heart className="w-5 h-5 hover:fill-current" />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {/* Use different images for thumbnails to simulate gallery */}
                {[product.image, 
                  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop", 
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop"
                ].map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImg(img)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImg === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-neutral-200'}`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="lg:py-4">
               <div className="flex items-center gap-2 mb-4">
                 <div className="flex text-primary-600">
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                   <Star className="w-4 h-4 fill-current" />
                 </div>
                 <span className="text-sm text-neutral-500 font-medium">{product.reviews} Reviews</span>
               </div>

               <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-4">{product.title}</h1>
               
               <div className="flex items-end gap-4 mb-6">
                  <span className="text-3xl font-bold text-brand">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-xl text-neutral-400 line-through mb-1">${product.oldPrice.toFixed(2)}</span>
                  )}
                  {product.oldPrice && (
                     <span className="bg-primary-100 text-brand text-xs font-bold px-2 py-1 rounded mb-2">Save ${product.oldPrice - product.price}</span>
                  )}
               </div>

               <p className="text-neutral-600 leading-relaxed mb-8">
                 {product.description}
               </p>

               <div className="space-y-6 mb-8 border-t border-b border-neutral-100 py-6">
                  {/* Colors */}
                  {product.colors && (
                    <div>
                      <span className="text-sm font-bold text-brand mb-3 block">Color: {selectedColor}</span>
                      <div className="flex gap-3">
                        {product.colors.map(color => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-brand ring-1 ring-brand ring-offset-2' : 'border-transparent hover:scale-110'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.sizes && (
                    <div>
                      <div className="flex justify-between items-center mb-3">
                         <span className="text-sm font-bold text-brand">Size: {selectedSize}</span>
                         <button className="text-xs text-neutral-500 underline hover:text-brand">Size Guide</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`min-w-[3rem] h-10 rounded-lg border text-sm font-medium transition-all ${selectedSize === size ? 'border-brand bg-brand text-white' : 'border-neutral-200 text-brand hover:border-neutral-400'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
               </div>

               {/* Actions */}
               <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-neutral-200 rounded-full px-4 h-12 w-fit text-brand">
                     <button 
                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
                       className="p-1 hover:text-primary-600 disabled:opacity-30"
                       disabled={quantity <= 1}
                     >
                       <Minus className="w-4 h-4" />
                     </button>
                     <span className="w-12 text-center font-bold">{quantity}</span>
                     <button 
                       onClick={() => setQuantity(quantity + 1)}
                       className="p-1 hover:text-primary-600"
                     >
                       <Plus className="w-4 h-4" />
                     </button>
                  </div>
                  <Button 
                    fullWidth 
                    size="lg" 
                    onClick={() => addToCart(product, quantity, selectedSize, selectedColor)}
                    className="flex-1"
                  >
                    Add to Cart
                  </Button>
                  <button className="h-12 w-12 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-primary-600 hover:border-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
               </div>

               {/* Guarantees */}
               <div className="grid grid-cols-2 gap-4 text-xs text-neutral-500 items-center">
                 <div className="flex items-center gap-2">
                   <Truck className="w-4 h-4 text-primary-600" /> Free shipping over $150
                 </div>
                 <div className="flex items-center gap-2 bg-primary-100 text-brand font-semibold px-3 py-2 rounded-lg justify-center">
                   <ShieldCheck className="w-4 h-4 text-primary-600" />
                   <span>2-year quality warranty</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-100 pt-16">
              <h2 className="text-2xl font-display font-bold text-brand mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {relatedProducts.map(p => <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />)}
              </div>
            </div>
          )}
        </div>
      </div>
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
};

export default ProductDetail;
