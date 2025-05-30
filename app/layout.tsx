import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Adams - Portfolio",
  description: "Software Developer & CS Student - Portfolio featuring MiniShell and other projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
