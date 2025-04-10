'use server';
import './globals.css';
import { ThemeProvider } from '@/context/providers/ThemeProvider';
import SocketProvider from '@/context/providers/SocketProvider';
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
        >
          <SocketProvider>
            {children}
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}