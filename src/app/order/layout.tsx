import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your order | Bar Freezer',
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
