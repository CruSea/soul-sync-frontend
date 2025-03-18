'use server';
import './globals.css';
import { ThemeProvider } from '@/context/providers/ThemeProvider';
import React from 'react';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-general vsc-initialized">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          // storageKey="dashboard-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
