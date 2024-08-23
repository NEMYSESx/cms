import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "please enter a valid email sirrr" }),
  password: z.string(),
});

export const RegisterSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "userName is too short" })
    .max(20, { message: "Username is too long" }),
  email: z.string().email({ message: "please enter a valid email sirrr" }),
  password: z.string().min(6, { message: "please enter atleast 6 digits" }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({ message: "please add an valid email address sirrr!!" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimun 6 character required",
  }),
});
