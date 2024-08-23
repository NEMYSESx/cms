"use server";
import z from "zod";
import { RegisterSchema } from "@/schemas/validation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { findByEmail } from "@/data/findByEmail";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  console.log("bk", validatedFields);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { userName, email, password } = validatedFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "email already in use" };
  }
  await db.user.create({
    data: {
      name: userName,
      email,
      password: hashPassword,
    },
  });

  const verficationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verficationToken.email, verficationToken.token);

  return { success: "Confirmation email sent" };
};
