import type { Metadata } from "next";
import "../../../globals.css"
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Dashboard",
  
  // Write description !!!
  description: "",
};

const getRoleUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      role: true,
    },
  });

  if (user?.role === "customer") {
    redirect("/");
  }

  return user;
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = await getRoleUser(session?.user?.email as string);

  if (session && user?.role === 'superadmin') {
    return redirect("/dashboard");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
