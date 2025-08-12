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

export const schemaProduct = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(4, { message: "Name must be at least 4 characters" }),
  description: z
    .string()
    .nonempty({ message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().nonempty({ message: "Price is required" }),
  stock: z.string().nonempty({ message: "Stock is required" }),
  brand_id: z.string().nonempty({ message: "Brand is required" }),
  category_id: z.string().nonempty({ message: "Category is required" }),
  location_id: z.string().nonempty({ message: "Location is required" }),
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

export const schemaProductEdit = schemaProduct.extend({
  id: z.number({ message: "Product Id is required" }),
}).omit({images: true});
