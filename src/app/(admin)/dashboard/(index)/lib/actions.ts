"use server";

import { getUser, lucia } from "@/lib/auth";
import type { ActionResult } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Logout = async (
  _: unknown,
  formData: FormData
): Promise<ActionResult> => {
  const { session } = await getUser();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  console.log(formData);
  return redirect("/dashboard/sign-in");
};

export default Logout;
