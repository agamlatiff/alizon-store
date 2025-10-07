import type { Metadata } from "next";
import "../../../globals.css"
import { Inter } from "next/font/google";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Dashbaord",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth()
  
  if(session){
    return redirect("/dashboard")
  }
  
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
