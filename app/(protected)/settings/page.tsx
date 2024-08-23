import React from "react";
import { auth, signOut } from "@/auth";

const Setting = async () => {
  const session = await auth();
  // session?.user.role
  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Sign out</button>
      </form>
    </>
  );
};

export default Setting;
