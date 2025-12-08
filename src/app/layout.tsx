import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Providers } from '@/components/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'SalesDuo | List building made easy',
  description:
    'List building made easy with SalesDuo. Custom lead lists built to your exact specifications. Define your requirements, get a quote, receive your data.',
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
    title: 'SalesDuo | List building made easy',
    description:
      'Custom lead lists built to your exact specifications. 100% self-served list building.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalesDuo | List building made easy',
    description:
      'Custom lead lists built to your exact specifications. 100% self-served list building.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
