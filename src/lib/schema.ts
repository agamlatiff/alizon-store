import z from "zod";

export const schemaSignIn = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Email is not valid" }),
  password: z.string().nonempty({ message: "Password is required" }).min(5, { message: "Password must be at least 5 characters" }),
});
