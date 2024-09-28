import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./_component/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const Settings = async ({ params }: SettingsPageProps) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    redirect("/auth/login");
  }
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default Settings;
