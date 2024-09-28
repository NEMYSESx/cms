import { auth } from "./auth";
import { redirect } from "next/navigation";
import { db } from "./lib/db";

const fun = async () => {
  const session = await auth();
  const id = session?.user.id;
  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const store = await db.store.findFirst({
    where: {
      userId: id,
    },
  });

  return store?.id;
};

console.log("hvgfdxzvsvxcv", fun);

// console.log("esrgthdyjgsfdsrgthn", url);
export const publicRoutes = ["/", "/auth/new-verification"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/store";
