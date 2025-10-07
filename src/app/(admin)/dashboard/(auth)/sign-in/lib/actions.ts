"use server";

import { schemaSignIn } from "@/lib/schema";
import type { ActionResult } from "@/types";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const SignIn = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  
  
  
  const validate = schemaSignIn.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validate.success) {
    return {
      error: validate.error.issues[0].message,
    };
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  if (!existingUser) {
    return {
      error: "Email not found",
    };
  }

  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password
  );

  if (!comparePassword) {
    return {
      error: "Email/password incorrect",
    };
  }


  return redirect("/dashboard");
};

export default SignIn;
