import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100">
      
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <span className="bg-white/90 backdrop-blur-sm text-brand text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-neutral-100">
              New
            </span>
          )}
        </div>

        {/* Emotional Discount Badge - Red for Urgency */}
        {product.oldPrice && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 animate-pulse">
            -{discountPercentage}%
          </span>
        )}

        {/* Quick Actions Overlay - High Contrast Fix */}
        <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            className="flex-1 bg-neutral-900 text-white hover:bg-primary hover:text-neutral-900 border border-neutral-900 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold shadow-xl transition-all duration-200"
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
          <button 
            className="w-12 bg-white text-brand hover:bg-primary hover:text-neutral-900 border border-neutral-100 flex items-center justify-center rounded-xl shadow-xl transition-all duration-200 flex-shrink-0"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-wide">{product.category}</p>
            <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                <span className="text-xs text-neutral-600 font-semibold">{product.rating}</span>
            </div>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-display font-semibold text-lg text-brand mb-2 truncate hover:text-primary-600 transition-colors leading-tight">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-baseline gap-2 mt-2">
          <span className={`text-lg font-bold ${product.oldPrice ? 'text-red-600' : 'text-brand'}`}>
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through decoration-neutral-400">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;