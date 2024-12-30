import SessionWrapper from "@/context/providers/SessionWrapper";
import "./globals.css";
import { ThemeProvider } from "@/context/providers/ThemeProvider";
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
            {children}
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
