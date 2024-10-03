import React from "react";
import { UserButton } from "./auth/user-button";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
const Navbar = async () => {
  const session = await auth();

  const id = session?.user.id;
  const stores = await db.store.findMany({
    where: {
      userId: id,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {" "}
        <div>
          <StoreSwitcher items={stores} />
        </div>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
