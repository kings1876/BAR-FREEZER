import type { MetadataRoute } from 'next';
import { allPaths } from '../lib/routes';

// Pages that canonicalise to another URL are left out of the sitemap.
const SKIP = new Set(['/cart/', '/checkout/', '/search/', '/warranty-service/', '/trade/', '/deals/']);

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths()
    .filter((p) => !SKIP.has(p))
    .map((p) => ({ url: 'https://barfreezer.com.au' + p }));
}
