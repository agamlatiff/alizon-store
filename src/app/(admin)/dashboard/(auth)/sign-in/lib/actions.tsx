"use server";

import type { ActionResult } from "@/types";
import { redirect } from "next/navigation";

const SignIn = async (_ : unknown, formData: FormData) : Promise<ActionResult> => {
  console.log(formData.get('email'));
  
  return redirect('/dashboard/sign-in');
};

export default SignIn;
