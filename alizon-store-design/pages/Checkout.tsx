import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { Check, Lock, User, Mail, MapPin, Phone, Globe, Building, Loader2, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { items, cartTotal } = useCart();
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-brand mb-4">Your cart is empty</h2>
        <Link to="/catalog">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-lg animate-bounce">
          <Check className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-display font-bold text-brand mb-4">Order Confirmed!</h2>
        <p className="text-neutral-500 max-w-md mb-8 text-lg">
          Thank you for your purchase. We've sent a confirmation email to your inbox. 
          <span className="block mt-2 font-bold text-brand">Order #ALZ-8842</span>
        </p>
        <Link to="/">
          <Button size="lg" className="min-w-[200px]">Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand font-bold' : 'text-neutral-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm ${step >= 1 ? 'border-brand bg-brand text-white shadow-lg' : 'border-neutral-300'}`}>1</span>
            <span>Shipping</span>
          </div>
          <div className={`w-20 h-0.5 mx-4 transition-colors duration-500 ${step >= 2 ? 'bg-brand' : 'bg-neutral-200'}`}></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand font-bold' : 'text-neutral-400'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm transition-colors duration-500 ${step >= 2 ? 'border-brand bg-brand text-white shadow-lg' : 'border-neutral-300'}`}>2</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-card border border-neutral-100 transition-all duration-500">
               <h3 className="text-2xl font-display font-bold text-brand mb-6 flex items-center gap-3">
                 {step === 1 ? <MapPin className="w-6 h-6 text-primary" /> : <CreditCard className="w-6 h-6 text-primary" />}
                 {step === 1 ? 'Shipping Details' : 'Payment Method'}
               </h3>
               
               {step === 1 ? (
                 <form className="space-y-8 animate-in slide-in-from-left-4 duration-300" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    
                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold border-b border-neutral-100 pb-2">
                           Contact Information
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <label className="text-sm font-medium text-brand flex items-center gap-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="you@example.com" 
                                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand flex items-center gap-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    placeholder="+1 (555) 000-0000" 
                                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" 
                                    required 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="space-y-4">
                        <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold border-b border-neutral-100 pb-2">
                           Shipping Address
                        </h4>
                        
                        {/* Country */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand flex items-center gap-2">
                                Country / Region
                            </label>
                            <div className="relative">
                                <select className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand appearance-none cursor-pointer" required>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AU">Australia</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                                  <Globe className="w-4 h-4" />
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand">First Name</label>
                                <input type="text" placeholder="John" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand">Last Name</label>
                                <input type="text" placeholder="Doe" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                            </div>
                        </div>

                        {/* Street Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand">Street Address</label>
                            <input type="text" placeholder="1234 Main St" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                        </div>

                        {/* Apt/Suite */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand">Apartment, suite, etc. (optional)</label>
                            <input type="text" placeholder="Apt 4B" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" />
                        </div>

                        {/* City/State/Zip */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <label className="text-sm font-medium text-brand">City</label>
                                <input type="text" placeholder="New York" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand">State / Province</label>
                                <input type="text" placeholder="California" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-brand">Zip Code</label>
                                <input type="text" placeholder="90210" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand placeholder-neutral-400 transition-shadow" required />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Button type="submit" size="lg" fullWidth className="shadow-xl shadow-primary/20 h-14 text-lg">
                            Continue to Payment
                        </Button>
                    </div>
                 </form>
               ) : (
                 <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex gap-3 items-start">
                       <Lock className="w-5 h-5 text-green-600 mt-0.5" />
                       <div>
                         <h4 className="font-bold text-green-800 text-sm">Secure SSL Encryption</h4>
                         <p className="text-xs text-green-700 mt-1">Your financial data is encrypted and processed securely.</p>
                       </div>
                    </div>
                    
                    {/* Mock Payment Form */}
                    <div className="space-y-5">
                       <div className="space-y-2">
                         <label className="text-sm font-medium text-brand">Card Number</label>
                         <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 pl-12 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand font-mono placeholder-neutral-400" />
                            <CreditCard className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-sm font-medium text-brand">Expiry Date</label>
                           <input type="text" placeholder="MM/YY" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand font-mono placeholder-neutral-400" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-sm font-medium text-brand">CVC / CVV</label>
                           <input type="text" placeholder="123" className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-brand font-mono placeholder-neutral-400" />
                         </div>
                       </div>
                    </div>
                    
                    <div className="flex gap-4 pt-6">
                       <Button variant="ghost" onClick={() => setStep(1)} disabled={isProcessing}>Back</Button>
                       <Button 
                         onClick={handlePayment} 
                         size="lg" 
                         className="flex-1 shadow-xl shadow-primary/20 h-14 text-lg relative"
                         disabled={isProcessing}
                       >
                         {isProcessing ? (
                           <span className="flex items-center gap-2">
                             <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                           </span>
                         ) : (
                           `Pay $${cartTotal.toFixed(2)}`
                         )}
                       </Button>
                    </div>
                 </div>
               )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
             <div className="bg-white p-6 rounded-2xl shadow-card border border-neutral-100 sticky top-24">
                <h3 className="text-lg font-bold text-brand mb-6">Order Summary</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6 custom-scrollbar">
                   {items.map(item => (
                     <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 py-2">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          <img src={item.image} alt="Product" className="w-full h-full object-cover" />
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] font-bold flex items-center justify-center rounded-full text-brand shadow-sm border border-white">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-brand line-clamp-2">{item.title}</p>
                           <p className="text-xs text-neutral-500 mt-1">{item.selectedSize} / {item.selectedColor}</p>
                        </div>
                        <span className="text-sm font-bold text-brand">${(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                   ))}
                </div>
                
                <div className="border-t border-neutral-100 pt-4 space-y-3 text-sm">
                   <div className="flex justify-between text-neutral-500">
                     <span>Subtotal</span>
                     <span>${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-brand font-medium">
                     <span>Shipping</span>
                     <span className="text-green-600 font-bold">Free</span>
                   </div>
                   <div className="flex justify-between font-bold text-xl text-brand pt-4 border-t border-neutral-100 mt-2">
                     <span>Total</span>
                     <span>${cartTotal.toFixed(2)}</span>
                   </div>
                </div>
             </div>
             
             <div className="mt-6 text-center">
               <p className="text-xs text-neutral-400">
                 By placing your order, you agree to our Terms of Service and Privacy Policy.
               </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;