import type { MetadataRoute } from 'next';
import { allPaths } from '../lib/routes';

const SKIP = new Set(['/cart/', '/checkout/', '/search/']);

export default function sitemap(): MetadataRoute.Sitemap {
  return allPaths()
    .filter((p) => !SKIP.has(p))
    .map((p) => ({ url: 'https://barfreezer.com.au' + p }));
}
