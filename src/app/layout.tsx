import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'List Building for Agencies | Self-Served Lead Research',
  description:
    'Build perfect lead lists without the research grind. Upload a video walkthrough, get a quote with samples, and receive your complete dataset within 48 hours.',
  keywords: [
    'lead generation',
    'list building',
    'agency leads',
    'b2b leads',
    'self-served',
  ],
  authors: [{ name: 'SalesDuo' }],
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'List Building for Agencies | Self-Served Lead Research',
    description:
      'Build perfect lead lists without the research grind. 48-hour delivery, 100% self-served.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'List Building for Agencies | Self-Served Lead Research',
    description:
      'Build perfect lead lists without the research grind. 48-hour delivery, 100% self-served.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
