import WhatsAppButton from "@/components/customers/WhatsAppButton";

export default async function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <WhatsAppButton />
    </div>
  );
}
