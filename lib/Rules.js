import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Please enter your Name !!!" })
      .min(6, { message: "Name must be at least 6 character long!!!" })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Please enter your Email !!!" })
      .email({ message: "Please enter a valid Email !!!" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "Please enter your Password !!!" })
      .min(6, { message: "Password must be at least 6 character long!!!" })
      .regex(/[a-zA-Z]/, {
        message: "Password must be at least contain  one character !!!",
      })
      .regex(/[0-9]/, {
        message: "Password must be at least contain  one number !!!",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must be at least contain  one special character !!!",
      })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Please enter your Confirm Password !!!" })
      .min(6, {
        message: "Confirm Password must be at least 6 character long !!!",
      })
      .trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm Password Not Match. Please try again !!!",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid Email !!!" }).trim(),
  password: z
    .string()
    .min(1, { message: "Please enter your Password !!!" })
    .trim(),
});

export const StoreFormSchema = z.object({
  businnessName: z
    .string()
    .min(1, { message: "Please enter your Businness Name !!!" })
    .max(128, { message: "Businness Name Must Be Less Than 128 Character!!!" })
    .trim(),
  businnessPhone: z
    .string()
    .min(1, { message: "Please enter your Businness Phone !!!" })
    .max(20, { message: "Businness Phone Must Be Less Than 20 Character!!!" })
    .trim(),
  businnessAddress: z
    .string()
    .min(1, { message: "Please enter your Businness Address !!!" })
    .trim(),
  branchName: z
    .string()
    .min(1, { message: "Please enter your Branch Name !!!" })
    .max(128, { message: "Branch Name Must Be Less Than 128 Character!!!" })
    .trim(),
  branchPhone: z
    .string()
    .min(1, { message: "Please enter your Branch Phone !!!" })
    .max(20, { message: "Branch Phone Must Be Less Than 20 Character!!!" })
    .trim(),
  branchAddress: z
    .string()
    .min(1, { message: "Please enter your Branch Address !!!" })
    .trim(),
  kategory: z
    .string()
    .min(1, { message: "Please enter your Kategory Name !!!" })
    .max(128, { message: "Kategory Name Must Be Less Than 128 Character!!!" })
    .trim(),
});

export const BranchFormSchema = z.object({
  branchName: z
    .string()
    .min(1, { message: "Please enter your Branch Name !!!" })
    .max(128, { message: "Branch Name Must Be Less Than 128 Character!!!" })
    .trim(),
  branchPhone: z
    .string()
    .min(1, { message: "Please enter your Branch Phone !!!" })
    .max(20, { message: "Branch Phone Must Be Less Than 20 Character!!!" })
    .trim(),
  branchAddress: z
    .string()
    .min(1, { message: "Please enter your Branch Address !!!" })
    .trim(),
});

export const ProductFormSchema = z.object({
  product_name: z
    .string()
    .min(1, { message: "Please enter your Product Name !!!" })
    .max(128, { message: "Product Name Must Be Less Than 128 Character!!!" })
    .trim(),
  product_description: z
    .string()
    .min(1, { message: "Please enter your Product Description !!!" })
    .max(1024, {
      message: "Product Description Must Be Less Than 1024 Character!!!",
    })
    .trim(),
  product_price: z
    .string()
    .min(1, { message: "Please enter your Product Price !!!" })
    .trim(),
});

export const KategoryFormSchema = z.object({
  kategory_name: z
    .string()
    .min(1, { message: "Please enter your Kategory Name !!!" })
    .max(128, { message: "Kategory Name Must Be Less Than 128 Character!!!" })
    .trim(),
});

export const StaffFormSchema = z.object({
  id_number: z
    .string()
    .min(1, { message: "Please enter your Staff Id Number !!!" })
    .max(128, { message: "Staff Id Number Must Be Less Than 128 Character!!!" })
    .trim(),
  name: z
    .string()
    .min(1, { message: "Please enter your Staff Name !!!" })
    .max(64, {
      message: "Staff Name Must Be Less Than 64 Character!!!",
    })
    .trim(),
  phone: z
    .string()
    .min(1, { message: "Please enter your Staff Phone !!!" })
    .max(32, {
      message: "Staff Phone Be Less Than 32 Character!!!",
    })
    .trim(),
  email: z
    .string()
    .min(1, { message: "Please enter your Staff Email !!!" })
    .email({ message: "Please enter a valid Email !!!" })
    .trim(),
});
