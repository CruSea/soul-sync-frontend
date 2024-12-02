
//import { NextAuthProvider } from "@/context/Provider";
import SessionWrapper from "@/components/providers/SessionWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-general">
      <SessionWrapper>
          {children}
    </SessionWrapper>
        </body>
    </html>
  );
}
