import { CATEGORIES, BRANDS, VENUES, CITIES, PRODUCTS, ACCESSORY_PRODUCTS, POSTS } from '../config/site.js';

export const STATIC_ROUTES = [
  'trade', 'quote', 'finance', 'warranty-service', 'warranty', 'deals', 'clearance',
  'compare', 'reviews', 'about', 'contact', 'faq', 'returns', 'payment-methods', 'cart', 'checkout',
  'search', 'delivery', 'guides',
];

function collectPaths(nodes: any[], out: Set<string>) {
  for (const n of nodes || []) {
    if (n.path) out.add(n.path);
    collectPaths(n.subcategories, out);
    collectPaths(n.types, out);
  }
}

export function allPaths(): string[] {
  const paths = new Set<string>(['/']);
  STATIC_ROUTES.forEach((r) => paths.add(`/${r}/`));
  collectPaths(CATEGORIES as any[], paths);
  (BRANDS as any[]).forEach((b) => paths.add(`/brands/${b.slug}/`));
  (VENUES as any[]).forEach((v) => paths.add(`/venues/${v.slug}/`));
  (CITIES as any[]).forEach((c) => paths.add(`/delivery/${c.slug}/`));
  (POSTS as any[]).forEach((p) => paths.add(`/guides/${p.slug}/`));
  [...(PRODUCTS as any[]), ...(ACCESSORY_PRODUCTS as any[])].forEach((p) => paths.add(`/product/${p.slug}/`));
  return [...paths];
}
