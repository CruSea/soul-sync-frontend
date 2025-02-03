'use server'
import SessionWrapper from '@/context/providers/SessionWrapper';
import './globals.css';
import { ThemeProvider } from '@/context/providers/ThemeProvider';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-general">
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
           // storageKey="dashboard-theme"
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
