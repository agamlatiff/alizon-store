import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/40 to-transparent" />
        
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <Link to="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-xl">A</div>
            <span className="font-display font-bold text-2xl tracking-tight">AlizonStore</span>
          </Link>
          
          <div className="space-y-6 max-w-lg">
            <h2 className="text-5xl font-display font-bold leading-tight">
              Welcome Back to <span className="text-primary">Style.</span>
            </h2>
            <p className="text-lg text-neutral-300 font-light">
              Sign in to access your saved items, track orders, and get exclusive access to new drops.
            </p>
            
            <div className="flex gap-8 pt-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">15k+</span>
                <span className="text-sm text-neutral-400">Happy Customers</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-white">4.9</span>
                <span className="text-sm text-neutral-400">Average Rating</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-neutral-500">
            © 2025 AlizonStore. Fashion for the modern era.
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md space-y-8 animate-in slide-in-from-right-8 duration-700">
          
          {/* Mobile Logo */}
          <Link to="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg">A</div>
             <span className="font-display font-bold text-xl text-brand">AlizonStore</span>
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold text-brand mb-2">Sign in</h1>
            <p className="text-neutral-500">
              New user? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {isSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-green-800">Welcome Back!</h3>
              <p className="text-green-700">Login successful. Redirecting you to the store...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
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
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-brand" htmlFor="password">Password</label>
                    <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-600/80">Forgot password?</a>
                  </div>
                  <div className="relative group">
                    <input 
                      id="password"
                      type={showPassword ? "text" : "password"} 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full pl-11 pr-12 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-neutral-400"
                      placeholder="Enter your password"
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

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-sm text-neutral-600 cursor-pointer select-none">Keep me logged in</label>
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
                    <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface text-neutral-500">Or continue with</span>
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
    </div>
  );
};

export default Login;