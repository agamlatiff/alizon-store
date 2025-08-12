import { Poppins } from "next/font/google";
import "../../globalsLanding.css";

const poppins = Poppins({
  weight: ['300', '400', '500','700', '800', '900'],
  subsets: ["latin-ext"],
})


export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
