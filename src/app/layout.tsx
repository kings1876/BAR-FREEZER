import type { Metadata } from 'next';
import './globals.css';

const title = 'Bar Freezer Australia | Commercial Bar Freezers & Fridges';
const description =
  'Commercial and home bar freezers, underbar fridges, and hospitality refrigeration delivered Australia-wide with local stock and trade pricing.';

export const metadata: Metadata = {
  metadataBase: new URL('https://barfreezer.com.au'),
  title,
  description,
  openGraph: { title, description, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-900 text-slate-100 font-sans antialiased min-h-screen selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
