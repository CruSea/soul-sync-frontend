import SessionWrapper from "@/context/providers/SessionWrapper";
import "./globals.css";
import { ThemeProvider } from "@/context/providers/ThemeProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className="font-general">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="dashboard-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
