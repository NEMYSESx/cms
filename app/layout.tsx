import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toat-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn("antialiased", fontHeading.variable, fontBody.variable)}
        >
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
