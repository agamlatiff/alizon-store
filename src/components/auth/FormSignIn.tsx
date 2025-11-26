"use client";

import SignIn from "@/app/(auth)/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { TypeCheckingSignIn } from "@/types";
import React, { useActionState, useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const initiaFormState: TypeCheckingSignIn = {
  email: "",
  password: "",
  error: "",
};

const FormSignIn = ({ children }: { children: React.ReactNode }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(SignIn, initiaFormState);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Left Side - Image & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[20s] hover:scale-110"
          style={{ backgroundImage: "url('assets/login.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/40 to-transparent" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16 text-white">
          <Link href="/" className="flex items-center gap-3 w-fit">
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
          <Link href="/" className="flex lg:hidden items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-brand font-bold text-lg">A</div>
            <span className="font-display font-bold text-xl text-brand">AlizonStore</span>
          </Link>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-display font-bold text-brand mb-2">Sign in</h1>
            <p className="text-neutral-500">
              New user? <Link href="/sign-up" className="text-primary-600 font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          {state.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <form action={formAction} className="space-y-6">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-brand" htmlFor="password">Password</label>
                  <a href="#" className="text-xs font-medium text-primary-600 hover:text-primary-600/80">Forgot password?</a>
                </div>
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
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
                {state.password && <p className="text-sm text-red-500 mt-1">{state.password}</p>}
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
              disabled={pending}
              className="h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              {pending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign In <ArrowRight className="w-5 h-5" />
                </span>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Google Button Container */}
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignIn;
