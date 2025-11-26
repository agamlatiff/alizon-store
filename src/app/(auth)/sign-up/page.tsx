import FormSignUp from "@/components/auth/FormSignUp";
import { signIn } from "@/lib/auth";
import { GoogleIcon } from "@/lib/icon";

const SignUpPage = () => {
  return (
    <FormSignUp>
      <form action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all bg-white text-neutral-700 font-medium shadow-sm"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>
      </form>
    </FormSignUp>
  );
};

export default SignUpPage;
