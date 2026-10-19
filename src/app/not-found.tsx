import type { Metadata } from 'next';
import ClientApp from '../App';

export const metadata: Metadata = {
  title: 'Page Not Found | Bar Freezer',
  description: 'The page you were looking for could not be found. Browse bar fridges, bar freezers and accessories from Bar Freezer.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <ClientApp />;
}
