'use server';
import SessionWrapper from '@/context/providers/SessionWrapper';
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
      <body className="font-general">
      
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
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
