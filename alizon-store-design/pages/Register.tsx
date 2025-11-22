import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect after success animation
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 2000);
  };

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
          <Link to="/" className="flex items-center gap-3 w-fit">
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
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg">A</div>
             <span className="font-display font-bold text-xl text-brand">AlizonStore</span>
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold text-brand mb-2">Create Account</h1>
            <p className="text-neutral-500">
              Already a member? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Log in here</Link>
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Account Created!</h3>
              <p className="text-green-700">Welcome to the family. Redirecting you to homepage...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand" htmlFor="name">Full Name</label>
                  <div className="relative group">
                    <input 
                      id="name"
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                      placeholder="John Doe"
                    />
                    <User className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand" htmlFor="email">Email Address</label>
                  <div className="relative group">
                    <input 
                      id="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                      placeholder="you@example.com"
                    />
                    <Mail className="w-5 h-5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand" htmlFor="password">Password</label>
                  <div className="relative group">
                    <input 
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="relative flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
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
                disabled={isLoading}
                className="h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Creating Account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-neutral-500">Or register with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all bg-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="font-medium text-neutral-700">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all bg-white">
                  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium text-neutral-700">Facebook</span>
                </button>
              </div>
            </form>
          )}
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
           <p>We strive to display product colors and images as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be accurate.</p>
           
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

export default Register;