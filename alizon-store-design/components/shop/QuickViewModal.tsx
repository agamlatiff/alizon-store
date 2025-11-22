import React, { useState, useEffect } from 'react';
import { X, Star, Minus, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
    }
  }, [product]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal Panel */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors">
          <X className="w-5 h-5 text-neutral-600" />
        </button>

        {/* Image */}
        <div className="w-full md:w-1/2 bg-neutral-100 flex-shrink-0">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div>
            <span className="text-xs text-neutral-500 mb-2 block">{product.category}</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-brand mb-3">{product.title}</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-primary-600 text-primary-600" />
                <span className="text-sm text-brand font-bold">{product.rating}</span>
                <span className="text-sm text-neutral-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-brand">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-lg text-neutral-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-sm text-neutral-600 leading-relaxed mb-6 line-clamp-3">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mt-auto">
             {/* Colors */}
             {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-sm font-bold text-brand mb-2 block">Color</span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor === color ? 'border-brand ring-1 ring-brand ring-offset-2' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="text-sm font-bold text-brand mb-2 block">Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${selectedSize === size ? 'bg-brand text-white border-brand' : 'border-neutral-200 text-brand hover:border-brand'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-100">
               <div className="flex items-center border border-neutral-200 rounded-full h-12 text-brand">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="p-3 hover:text-primary-600 disabled:opacity-30"
                   disabled={quantity <= 1}
                 >
                   <Minus className="w-4 h-4" />
                 </button>
                 <span className="w-8 text-center font-bold">{quantity}</span>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="p-3 hover:text-primary-600"
                 >
                   <Plus className="w-4 h-4" />
                 </button>
              </div>
              <Button fullWidth size="md" onClick={handleAddToCart} className="flex-1 h-12">
                Add to Cart
              </Button>
            </div>
            <Link to={`/product/${product.id}`} onClick={onClose} className="text-center text-sm text-brand font-medium underline hover:text-primary-600 transition-colors flex items-center justify-center gap-2">
              View Full Details <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
