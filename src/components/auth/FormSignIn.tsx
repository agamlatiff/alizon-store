"use client";

import SignIn from "@/app/(auth)/lib/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "@/lib/icon";
import type { TypeCheckingSignIn } from "@/types";

import React, { useActionState, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

const initiaFormState: TypeCheckingSignIn = {
  email: "",
  password: "",
  error: "",
};

const FormSignIn = ({ children }: { children: React.ReactNode }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(SignIn, initiaFormState);
  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 antialiased flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 mr-2 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">AlizonStore</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
          <p className="mt-1 text-md text-gray-500">Sign in to continue.</p>
        </div>

        {/* Google Sign In Button */}
        {children}

        {/* Separator */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 text-xs font-semibold text-gray-400 uppercase">
            OR
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {state.error !== "" && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}

        {/* Email & Password Form */}
        <form action={formAction} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              />
            </div>
            <p className="text-sm text-red-500 mt-2">{state.email}</p>
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </Label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-sm text-red-500 mt-2">{state.password}</p>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormSignIn;
