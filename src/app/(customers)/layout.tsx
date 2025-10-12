export default async function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<div>
  {children}
</div>
  );
}
