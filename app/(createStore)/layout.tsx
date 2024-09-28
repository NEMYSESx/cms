import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  if (store) {
    redirect(`${store.id}`);
  }

  return <div>{children}</div>;
}
