import "./globals.css";
import SessionWrapper from "@/components/providers/SessionWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-general"><SessionWrapper>{children}</SessionWrapper></body>
    </html>
  );
}
