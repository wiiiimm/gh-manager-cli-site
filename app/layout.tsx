import type React from 'react';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title:
    'gh-manager-cli - TUI Terminal GitHub Repository Management Tool | Clean Up Your GitHub in 5 Minutes',
  description:
    "Stop clicking through GitHub's slow web UI. Archive old projects, delete forks, and organize your repos with powerful keyboard shortcuts. Clean up 50+ repos in minutes, not hours.",
  generator: 'v0.app',
  keywords: [
    'gh-manager-cli',
    'github manager terminal',
    'github manager cli',
    'github terminal management',
    'terminal ui github',
    'tui github manager',
    'github repository management cli',
    'github',
    'repository management',
    'cli',
    'terminal',
    'developer tools',
    'github cleanup',
    'archive repos',
    'delete forks',
    'github organization',
    'github tui',
    'github terminal interface',
  ],
  authors: [{ name: 'William Li' }],
  creator: 'William Li',
  publisher: 'gh-manager-cli',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gh-manager-cli.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'gh-manager-cli - TUI Terminal GitHub Repository Management Tool',
    description:
      "Stop clicking through GitHub's slow web UI. Archive, delete, and organize repos with powerful keyboard shortcuts. Clean up 50+ repos in 5 minutes.",
    url: 'https://gh-manager-cli.dev',
    siteName: 'gh-manager-cli',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'gh-manager-cli - Terminal UI for GitHub Repository Management',
      },
      {
        url: '/app-demo-poster.jpg',
        width: 1200,
        height: 675,
        alt: 'gh-manager-cli Demo - Terminal Interface',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gh-manager-cli - TUI Terminal GitHub Repository Management Tool',
    description:
      "Stop clicking through GitHub's slow web UI. Archive, delete, and organize repos with keyboard shortcuts. Clean up 50+ repos in 5 minutes.",
    images: ['/opengraph-image', '/app-demo-poster.jpg'],
    creator: '@wiiiimm',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',
    yandex: '',
    yahoo: '',
    other: {
      me: ['https://github.com/wiiiimm'],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-mono ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RWJYVL851V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RWJYVL851V');
          `}
        </Script>
      </body>
    </html>
  );
}
