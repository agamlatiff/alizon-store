import React, { useState } from 'react';
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CartDrawer = () => {
  const { isOpen, toggleCart, items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Simulate async operation
  const handleUpdateQuantity = (id: number, delta: number) => {
    setLoadingId(`${id}-update`);
    setTimeout(() => {
      updateQuantity(id, delta);
      setLoadingId(null);
    }, 400);
  };

  const handleRemove = (id: number) => {
    setLoadingId(`${id}-remove`);
    setTimeout(() => {
      removeFromCart(id);
      setLoadingId(null);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-surface">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand" />
              <h2 className="text-lg font-display font-bold text-brand">Your Cart</h2>
              <span className="bg-primary text-brand text-xs font-bold px-2 py-0.5 rounded-full">
                {items.length}
              </span>
            </div>
            <button onClick={toggleCart} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-2">
                  <ShoppingBag className="w-8 h-8 text-neutral-300" />
                </div>
                <div>
                  <h3 className="text-neutral-900 font-semibold text-lg">Your cart is empty</h3>
                  <p className="text-neutral-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
                </div>
                <Button onClick={toggleCart} variant="outline" size="sm" className="mt-4">Start Shopping</Button>
              </div>
            ) : (
              items.map((item) => {
                const isUpdating = loadingId === `${item.id}-update`;
                const isRemoving = loadingId === `${item.id}-remove`;
                
                return (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className={`flex gap-4 transition-opacity duration-300 ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100'}`}>
                    <div className="w-20 h-24 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      {(isUpdating || isRemoving) && (
                        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-brand animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-brand text-sm line-clamp-1 pr-2">{item.title}</h4>
                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                            disabled={!!loadingId}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">
                          {item.selectedSize} / {item.selectedColor}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                         <div className="flex items-center border border-neutral-200 rounded-lg text-brand bg-white">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-neutral-100 hover:text-primary-600 disabled:opacity-30 rounded-l-lg transition-colors"
                              disabled={item.quantity <= 1 || !!loadingId}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-neutral-100 hover:text-primary-600 disabled:opacity-30 rounded-r-lg transition-colors"
                              disabled={!!loadingId}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                         </div>
                         <div className="flex flex-col items-end">
                             <span className="font-bold text-brand">${(item.price * item.quantity).toFixed(2)}</span>
                             {item.quantity > 1 && (
                               <span className="text-[10px] text-neutral-400">${item.price.toFixed(2)} each</span>
                             )}
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-surface border-t border-neutral-100">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-brand pt-3 border-t border-neutral-200">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" onClick={toggleCart}>
                <Button fullWidth className="group h-12 text-lg shadow-xl shadow-primary/20">
                  Checkout Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;