import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();
  const id = session?.user.id;
  if (!session?.user.id) {
    redirect("/auth/login");
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
