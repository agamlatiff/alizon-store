"use client";
import Link from "next/link";
import Image from "next/image";
import { useActionState } from "react";
import type { TypeCheckingSignUp } from "@/types";
import { signUp } from "@/app/(auth)/lib/actions";

const initiaFormState: TypeCheckingSignUp = {
  email: "",
  password: "",
  name: "",
};

const FormSignUp = () => {
  const [state, formAction, pending] = useActionState(signUp, initiaFormState);
  return (
    <div
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <Image
              height={200}
              width={200}
              src="assets/logos/logo-black.svg"
              alt="logo"
            />
          </div>
          <h1 className="font-bold text-2xl leading-[34px]">Sign Up</h1>

          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                height={25}
                width={25}
                src="assets/icons/profile-circle.svg"
                alt="icon"
              />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write your complete name"
            />
            <p className="text-red-500 text-sm">{state.name}</p>
          </div>
          <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
            <div className="flex shrink-0">
              <Image
                height={25}
                width={25}
                src="assets/icons/sms.svg"
                alt="icon"
              />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
              placeholder="Write yor email address"
            />
             <p className="text-red-500 text-sm">{state.email}</p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-[#FFC736] transition-all duration-300">
              <div className="flex shrink-0">
                <Image
                  height={25}
                  width={25}
                  src="assets/icons/lock.svg"
                  alt="icon"
                />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
                placeholder="Write your password"
              />
               <p className="text-red-500 text-sm">{state.password}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              disabled={pending}
              type="submit"
              className="p-[12px_24px] bg-[#0D5CD7] rounded-full text-center font-semibold text-white"
            >
              {pending ? "Loading..." : "Sign in to my account"}
            </button>
            <Link
              href="/sign-in"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5]"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSignUp;
