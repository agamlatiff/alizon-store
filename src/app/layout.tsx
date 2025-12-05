import { Poppins } from "next/font/google";
import "./globals.css"
import AuthProvider from "@/components/providers/AuthProvider";
import NextTopLoader from "nextjs-toploader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL('https://alizonstore.vercel.app'), // Replace with actual domain
  title: {
    default: "AlizonStore - Your Premium E-Commerce Destination",
    template: "%s | AlizonStore"
  },
  description: "Discover amazing products at AlizonStore. Shop the latest trends in electronics, fashion, and more with free express shipping and 30-day returns.",
  keywords: ["ecommerce", "fashion", "electronics", "shopping", "online store", "premium"],
  authors: [{ name: "AlizonStore" }],
  creator: "AlizonStore",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alizonstore.vercel.app",
    title: "AlizonStore - Your Premium E-Commerce Destination",
    description: "Discover amazing products at AlizonStore. Shop the latest trends in electronics, fashion, and more.",
    siteName: "AlizonStore",
    images: [
      {
        url: "/assets/hero.jpg", // Use a relevant image
        width: 1200,
        height: 630,
        alt: "AlizonStore Hero Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlizonStore - Your Premium E-Commerce Destination",
    description: "Discover amazing products at AlizonStore. Shop the latest trends in electronics, fashion, and more.",
    images: ["/assets/hero.jpg"],
    creator: "@alizonstore",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NextTopLoader color="#F97316" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
