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
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          <GoogleIcon />
          <span className="ml-3">Sign up with Google</span>
        </button>
      </form>
    </FormSignUp>
  );
};

export default SignUpPage;
