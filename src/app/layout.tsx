import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import './globals.css';

// Self-hosted at build time by next/font: no render-blocking request to Google Fonts.
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-jakarta' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-space-mono' });

const title = 'Bar Fridges & Bar Freezers Australia | Bar Freezer';
const description =
  'Shop bar fridges and bar freezers in Australia: under bar, back bar, glass door and display models, kegerators, wine fridges and ice machines. Delivered Australia-wide.';

export const metadata: Metadata = {
  metadataBase: new URL('https://barfreezer.com.au'),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: 'Bar Freezer Australia',
    locale: 'en_AU',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Bar Freezer: bar fridges and bar freezers in Australia' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: '48x48' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`scroll-smooth ${jakarta.variable} ${mono.variable}`}>
      <body className="bg-slate-900 text-slate-100 font-sans antialiased min-h-screen selection:bg-amber-500 selection:text-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
