import z from "zod";

const FILE_TYPE = ["image/png", "image/jpg", "image/jpeg"];

export const schemaSignIn = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters" }),
});

export const schemaCategory = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),
});

export const schemaBrand = schemaCategory.extend({
  image: z
    .any()
    .refine((file: File) => FILE_TYPE.includes(file.type), {
      message: "File type is not allowed",
    })
    .refine((file: File) => file?.name, { message: "Image is required" }),
});
