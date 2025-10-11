import z from "zod";


const FILE_TYPE = ["image/png", "image/jpg", "image/jpeg"];
const isFile = (file: unknown): file is File =>
  typeof file === "object" &&
  file !== null &&
  "name" in file &&
  "size" in file &&
  "type" in file;

export const schemaSignIn = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .email("Email is not valid"),
  password: z
    .string()
    .trim()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export const schemaSignUp = schemaSignIn.extend({
  name: z.string().trim().min(1, "Name is required"),
});

export const schemaCategory = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z
    .string()
    .trim()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters"),
  status: z.enum(["active", "inactive"], {
    error: "Status is required",
  }),
});

export const schemaLocation = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z
    .string()
    .trim()
    .nonempty("Address is required")
    .min(4, "Address must be at least 4 characters"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
});

export const schemaBrand = z.object({
  name: z.string().trim().min(1, "Name is required"),
  logo: z
    .any()
    .refine((file: File) => file === null || isFile(file), {
      message: "File is required",
    })
    .refine((file: File) => file && FILE_TYPE.includes(file.type), {
      message: "File type is not allowed",
    }),

  description: z
    .string()
    .trim()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters"),

  website: z
    .string()
    .trim()
    .nonempty("Website is required")
    .url("Website must be a valid URL"),

  country: z
    .string()
    .trim()
    .nonempty("Country is required")
    .max(100, "Country must not exceed 100 characters"),

  status: z.enum(["active", "inactive"], {
    error: "Status is required",
  }),
});

export const schemaProduct = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .min(4, "Name must be at least 4 characters"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z.string().nonempty("Price is required"),
  stock: z.string().nonempty("Stock is required"),
  brand_id: z.string().nonempty("Brand is required"),
  category_id: z.string().nonempty("Category is required"),
  location_id: z.string().nonempty("Location is required"),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 images",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = FILE_TYPE.includes(file.type);
        });

        return validate;
      },
      {
        message: "Uploaded file should image",
      }
    ),
});

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({ message: "Product Id is required" }),
  })
  .omit({ images: true });

export const schemaShippingAddress = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(5, { message: "Name should be at least 5 characters" }),
  address: z
    .string()
    .nonempty({ message: "Address is required" })
    .min(5, { message: "Address should be at least 5 characters" }),
  city: z
    .string()
    .nonempty({ message: "City is required" })
    .min(5, { message: "City should be at least 5 characters" }),
  postal_code: z
    .string()
    .nonempty({ message: "Postal Code is required" })
    .min(5, { message: "Postal Code should be at least 5 characters" }),
  notes: z
    .string()
    .min(5, { message: "Notes should be at least 5 characters" })
    .nullable(),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .min(5, { message: "Phone should be at least 5 characters" }),
});
