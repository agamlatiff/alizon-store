"use server";

import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import type { TypeCheckingSignIn, TypeCheckingSignUp } from "@/types";
import { normalizeEmail, normalizePassword } from "@/lib/normalize";
import { signIn } from "@/lib/auth";

const SignIn = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingSignIn> => {
  const emailRaw = String(formData.get("email") ?? "");
  const passwordRaw = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/");

  // Validation schema
  const parsedData = schemaSignIn.safeParse({
    email: normalizeEmail(emailRaw),
    password: normalizePassword(passwordRaw),
  });

  // Checking data (1)
  if (!parsedData.success) {
    const errors = parsedData.error.flatten().fieldErrors;
    return {
      email: errors.email?.[0] ?? "",
      password: errors.password?.[0] ?? "",
    };
  }

  // Existing user by email & Authorization
  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });

  const pepper = process.env.PASSWORD_PEPPER ?? "";
  const toHash = pepper
    ? parsedData.data.password + pepper
    : parsedData.data.password;

  // Checking Email (2)
  if (!existingUser?.password) {
    return {
      error: "Email or password is incorrect",
    };
  }

  // Compare password around form data & database
  const comparePassword = await bcrypt.compare(toHash, existingUser.password);

  // Validation Password (3)
  if (!comparePassword) {
    return {
      error: "Email or password is incorrect",
    };
  }

  // Rehash from 12 to 13
  try {
    await signIn("credentials", formData);
    const rounds = bcrypt.getRounds(existingUser.password) ?? 12;
    if (rounds < 13) {
      const newHash = await bcrypt.hash(toHash, 13);
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: newHash },
      });
    }
  } catch (error) {
    console.log(error);
  }

  // If three validation checking true, redirect to callback URL or home
  return redirect(callbackUrl);
};

export default SignIn;

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<TypeCheckingSignUp> => {
  const emailRaw = String(formData.get("email") ?? "");
  const passwordRaw = String(formData.get("password") ?? "");
  const nameRaw = String(formData.get("name") ?? "");

  // Get data from form data
  const parsedUser = schemaSignUp.safeParse({
    email: emailRaw,
    password: passwordRaw,
    name: nameRaw,
  });

  const errors = parsedUser.error?.flatten();

  // Checking
  if (!parsedUser.success) {
    return {
      email: errors?.fieldErrors.email?.[0] ?? "",
      password: errors?.fieldErrors.password?.[0] ?? "",
      name: errors?.fieldErrors.name?.[0] ?? "",
    };
  }

  const pepper = process.env.PASSWORD_PEPPER ?? "";
  const toHash = pepper
    ? parsedUser.data.password + pepper
    : parsedUser.data.password;

  const hashPassword = await bcrypt.hash(toHash, 12);

  try {
    await prisma.user.create({
      data: {
        name: parsedUser.data.name,
        email: parsedUser.data.email,
        password: hashPassword,
        role: "customer",
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create account. Please try again.",
    };
  }

  return redirect("/sign-in");
};
