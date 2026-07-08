import type { Metadata } from "next";
import { GeistSans, GeistMono } from 'geist/font';
import { Fraunces } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import "./globals.css";

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz'],
});

export const metadata: Metadata = {
  title: "Benjamin Adams — Software Engineer",
  description:
    "Software engineer building applied-AI and data systems. Northeastern CS '26. Currently shipping healthcare infrastructure at PlusWellbeing.ai.",
  openGraph: {
    title: "Benjamin Adams — Software Engineer",
    description:
      "Applied-AI pipelines, PostgreSQL performance work, and systems projects — plus a Unix shell you can run in the browser.",
    url: "https://bdadams.dev",
    siteName: "Benjamin Adams",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="grain" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
