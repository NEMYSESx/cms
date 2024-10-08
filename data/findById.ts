import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
