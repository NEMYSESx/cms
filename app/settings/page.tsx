import React from "react";
import { auth, signOut } from "@/auth";
import { Modal } from "@/components/ui/modal";

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

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }
