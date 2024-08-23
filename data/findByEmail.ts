import { db } from "@/lib/db";

export const findByEmail = async (email: string) => {
  try {
    const user = db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};
