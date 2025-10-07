"use client";

import SignIn from "@/app/(auth)/lib/actions";
import type { TypeCheckingSignIn } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import Logo from "../logo";

const initiaFormState: TypeCheckingSignIn = {
  email: "",
  password: "",
};

const FormSignIn = () => {
  const [state, formAction, pending] = useActionState(SignIn, initiaFormState);
  return (
    <section
      id="signin"
      className="bg-[#EFF3FA] min-h-screen pt-[30px] pb-[50px] flex flex-col"
    >
      <div className="container max-w-[1130px] mx-auto flex flex-1 items-center justify-center py-5">
        <form
          action={formAction}
          className="w-[500px] bg-white p-[50px_30px] flex flex-col gap-5 rounded-3xl border border-[#E5E5E5]"
        >
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="font-bold text-2xl leading-[34px] text-black">
            Sign In
          </h1>
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
              placeholder="Write your email address"
            />
          </div>
          <p className="text-red-500 text-sm -mt-2">{state.email}</p>
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
            </div>
            <p className="text-red-500 text-sm">{state.password}</p>
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
              href="/sign-up"
              className="p-[12px_24px] bg-white rounded-full text-center font-semibold border border-[#E5E5E5] text-black"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormSignIn;
