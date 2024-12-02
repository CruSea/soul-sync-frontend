
import { NextAuthProvider } from "@/context/Provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-general">
      <NextAuthProvider>
          {children}
    </NextAuthProvider>
        </body>
    </html>
  );
}
