"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { signUp } from "@/app/(auth)/lib/actions";
import type { TypeCheckingSignUp } from "@/types";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, User, AlertCircle } from 'lucide-react';
import React, { useActionState, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

const initialState: TypeCheckingSignUp = {
  email: "",
  name: "",
  password: "",
  error: " ",
};

const FormSignUp = ({ children }: { children: React.ReactNode }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/40 to-transparent" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-xl">A</div>
            <span className="font-display font-bold text-2xl tracking-tight">AlizonStore</span>
          </Link>
          
          <div className="space-y-6 max-w-lg">
            <h2 className="text-5xl font-display font-bold leading-tight">
              Join the <span className="text-primary">Movement.</span>
            </h2>
            <p className="text-lg text-neutral-300 font-light">
              Create an account to unlock personalized recommendations, early access to sales, and express checkout.
            </p>
            
            <div className="space-y-4 pt-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <span className="text-neutral-200">Free Express Shipping on first order</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary">
                   <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <span className="text-neutral-200">Exclusive member-only deals</span>
               </div>
            </div>
          </div>

          <div className="text-sm text-neutral-500">
            © 2025 AlizonStore. Fashion for the modern era.
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          
          {/* Mobile Logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg">A</div>
             <span className="font-display font-bold text-xl text-brand">AlizonStore</span>
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold text-brand mb-2">Create Account</h1>
            <p className="text-neutral-500">
              Already a member? <Link href="/sign-in" className="text-primary-600 font-semibold hover:underline">Log in here</Link>
            </p>
          </div>

          {state.error && state.error.trim() !== "" && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <form action={formAction} className="space-y-6">
            <div className="space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand" htmlFor="name">Full Name</label>
                <div className="relative group">
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                    placeholder="John Doe"
                  />
                  <User className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                </div>
                {state.name && <p className="text-sm text-red-500 mt-1">{state.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                    placeholder="you@example.com"
                  />
                  <Mail className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                </div>
                {state.email && <p className="text-sm text-red-500 mt-1">{state.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand" htmlFor="password">Password</label>
                <div className="relative group">
                  <input 
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} 
                    required
                    minLength={8}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                    placeholder="Min. 8 characters"
                  />
                  <Lock className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {state.password && <p className="text-sm text-red-500 mt-1">{state.password}</p>}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="relative flex items-center h-5">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary cursor-pointer"
                />
              </div>
              <label htmlFor="terms" className="text-sm text-neutral-600 select-none leading-tight">
                I agree to the <button type="button" onClick={() => setActiveModal('terms')} className="text-brand font-semibold hover:underline">Terms of Service</button> and <button type="button" onClick={() => setActiveModal('privacy')} className="text-brand font-semibold hover:underline">Privacy Policy</button>.
              </label>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              disabled={pending}
              className="h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Creating Account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-neutral-500">Or register with</span>
            </div>
          </div>

          {/* Google Button Container */}
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      <Modal isOpen={activeModal === 'terms'} onClose={() => setActiveModal(null)} title="Terms of Service" maxWidth="2xl">
         <div className="space-y-4">
           <p><strong>Effective Date:</strong> March 15, 2025</p>
           <p>Welcome to AlizonStore. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
           
           <h4 className="font-bold text-brand">1. Acceptance of Terms</h4>
           <p>By creating an account or making a purchase, you confirm that you are at least 18 years old and legally capable of entering into binding contracts.</p>
           
           <h4 className="font-bold text-brand">2. Product Information</h4>
           <p>We strive to display product colors and images as accurately as possible. However, we cannot guarantee that your computer monitor&apos;s display of any color will be accurate.</p>
           
           <h4 className="font-bold text-brand">3. Pricing and Payment</h4>
           <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time. Payment must be received prior to shipping.</p>
           
           <h4 className="font-bold text-brand">4. Shipping and Returns</h4>
           <p>Shipping times are estimates only. You have 30 days from the date of delivery to return items in their original condition.</p>
           
           <h4 className="font-bold text-brand">5. Limitation of Liability</h4>
           <p>AlizonStore shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or services.</p>
         </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal isOpen={activeModal === 'privacy'} onClose={() => setActiveModal(null)} title="Privacy Policy" maxWidth="2xl">
        <div className="space-y-4">
           <p><strong>Last Updated:</strong> March 15, 2025</p>
           <p>Your privacy is important to us. This policy describes how AlizonStore collects, uses, and protects your personal information.</p>
           
           <h4 className="font-bold text-brand">1. Information We Collect</h4>
           <p>We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase.</p>
           
           <h4 className="font-bold text-brand">2. How We Use Your Information</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>To process and fulfill your orders.</li>
             <li>To communicate with you about your account or orders.</li>
             <li>To send you marketing communications (if opted in).</li>
             <li>To improve our store and customer service.</li>
           </ul>
           
           <h4 className="font-bold text-brand">3. Information Sharing</h4>
           <p>We do not sell your personal information. We share data only with third-party service providers necessary to run our business (e.g., payment processors like Stripe, shipping carriers).</p>
           
           <h4 className="font-bold text-brand">4. Cookies</h4>
           <p>We use cookies to improve your browsing experience and analyze site traffic. You can control cookie settings through your browser.</p>
           
           <h4 className="font-bold text-brand">5. Security</h4>
           <p>We implement industry-standard security measures to protect your personal information during transmission and storage.</p>
         </div>
      </Modal>
    </div>
  );
};

export default FormSignUp;
