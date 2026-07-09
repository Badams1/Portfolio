import type { Metadata, Viewport } from "next";
import { GeistSans, GeistMono } from 'geist/font';
import { Fraunces } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import "./globals.css";

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz', 'SOFT', 'WONK'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bdadams.dev'),
  title: "Benjamin Adams — Software Engineer",
  description:
    "Software engineer at PlusWellbeing.ai, turning LLM output into structured healthcare data. Northeastern CS '26, looking for new-grad backend and full-stack roles.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Benjamin Adams — Software Engineer",
    description:
      "Applied-AI pipelines, PostgreSQL performance work, and a Unix shell you can run in the browser.",
    url: "https://bdadams.dev",
    siteName: "Benjamin Adams",
    type: "website",
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Benjamin Adams — Software Engineer",
    description:
      "Applied-AI pipelines, PostgreSQL performance work, and a Unix shell you can run in the browser.",
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f1' },
    { media: '(prefers-color-scheme: dark)', color: '#131210' },
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Benjamin Adams',
  url: 'https://bdadams.dev',
  email: 'mailto:bdadams083104@gmail.com',
  jobTitle: 'Software Engineer',
  worksFor: { '@type': 'Organization', name: 'PlusWellbeing.ai' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Northeastern University' },
  address: { '@type': 'PostalAddress', addressLocality: 'Boston', addressRegion: 'MA' },
  sameAs: [
    'https://github.com/Badams1',
    'https://www.linkedin.com/in/benjamin-adams-444651292/',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable} font-sans antialiased`}>
        {/* Gate scroll-reveal hidden states on JS being available: without
            this class the site renders fully static (see globals.css). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="grain" aria-hidden="true" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
