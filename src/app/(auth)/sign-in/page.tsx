import FormSignIn from "@/components/auth/FormSignIn";
import Button from "@/components/ui/button";
import { signIn } from "@/lib/auth";
import { GoogleIcon } from "@/lib/icon";
import React from "react";

const SignInPage = () => {
  return (
    <FormSignIn>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all bg-white text-neutral-700 font-medium shadow-sm"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>
      </form>
    </FormSignIn>
  );
};

export default SignInPage;
