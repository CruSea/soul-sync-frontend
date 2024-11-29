import "./globals.css";
import SessionWrapper from "@/components/providers/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Turumba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex h-screen">
            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
