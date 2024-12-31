import SessionWrapper from '@/context/providers/SessionWrapper';
import './globals.css';
import { ThemeProvider } from '@/context/providers/ThemeProvider';
import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-general">
        <SessionWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="dashboard-theme"
          >
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
