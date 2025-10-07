"use server";


import { schemaSignIn } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

export type TypeCheckingSignIn = {
  email?: string;
  password?: string;
};

const SignIn = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingSignIn> => {
  // Validation schema 
  const validate = schemaSignIn.safeParse({
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  });

  // Checking data (1)
  if (!validate.success) {
    const errors = validate.error.flatten().fieldErrors;
    return {
      email: errors.email?.[0] ?? "",
      password: errors.password?.[0] ?? "",
    };
  }

  // Existing user by email & Authorization
  const existingUser = await prisma.user.findFirst({
    where: {
      email: validate.data.email,
      role: "superadmin",
    },
  });

  // Checking Email (2)
  if (!existingUser) {
    return {
      email: "Email is not registered",
    };
  }

  
  // Compare password around form data & database
  const comparePassword = bcrypt.compareSync(
    validate.data.password,
    existingUser.password ?? ""
  );

  // Validation Password (3)
  if (!comparePassword) {
    return {
      password: "Password is incorrect",
    };
  }

  // If three validation checking true, redirect
  return redirect("/dashboard");
};

export default SignIn;


// export const signUp = async (
//   _: unknown,
//   formData: FormData
// ): Promise<ActionResult> => {
//   const parse = schemaSignUp.safeParse({
//     name: formData.get("name"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   });

//   if (!parse.success) {
//     return {
//       error: parse.error.issues[0].message,
//     };
//   }

//   const hashPassword = bcrypt.hashSync(parse.data.password, 12);

//   try {
//     await prisma.user.create({
//       data: {
//         name: parse.data.name,
//         email: parse.data.email,
//         password: hashPassword,
//         role: "customer",
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     return {
//       error: "Failed to sin up",
//     };
//   }

//   return redirect("/signin");
// };
