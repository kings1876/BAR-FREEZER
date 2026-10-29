import type { MetadataRoute } from 'next';
import { allPaths } from '../lib/routes';
import { leftOutOfSitemap } from '../lib/index-policy';

// Pages that canonicalise to another URL are left out of the sitemap.
const SKIP = new Set(['/cart/', '/checkout/', '/search/', '/pay-crypto/', '/warranty-service/', '/trade/', '/deals/']);

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths()
    .filter((p) => !SKIP.has(p) && !(p.startsWith('/product/') && leftOutOfSitemap(p.split('/')[2])))
    .map((p) => ({ url: 'https://barfreezer.com.au' + p }));
}
