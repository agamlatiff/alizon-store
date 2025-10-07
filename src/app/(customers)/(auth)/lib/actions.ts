"use server";

import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import type { ActionResult } from "@/types";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export const SignIn = async (
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
      role: "customer",
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

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect("/");
};

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const parse = schemaSignUp.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parse.success) {
    return {
      error: parse.error.issues[0].message,
    };
  }

  const hashPassword = bcrypt.hashSync(parse.data.password, 12);

  try {
    await prisma.user.create({
      data: {
        name: parse.data.name,
        email: parse.data.email,
        password: hashPassword,
        role: "customer",
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: "Failed to sin up",
    };
  }

  return redirect("/signin");
};
