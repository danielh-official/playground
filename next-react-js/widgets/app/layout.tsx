import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Widgets',
  description: 'Widgets app built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
        <footer>
          <p className="text-center">
            This app is purely for educational purposes. Data is stored on your
            browser&lsquo;s IndexedDB. See the{' '}
            <a
              className="text-blue-500 hover:underline"
              href="https://github.com/danielh-official/next-js-widgets"
              target="_blank"
            >
              GitHub repository
            </a>{' '}
            for more details.
          </p>
          <p className="text-center p-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Widgets App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
