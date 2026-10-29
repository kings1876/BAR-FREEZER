// Which product pages Google should index. Server only (reads the full catalogue).
//  - duplicates: the same model, condition and price listed twice (for example under two supplier names) canonicalise to one page.
//  - thin: accessory pages with almost no description or specification are kept for visitors but not offered to search engines.
import FULL from '../config/products.generated.json';

const modelKey = (p: any) => String(p.model || p.sku || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const DUP = new Map<string, string>();
const groups = new Map<string, any[]>();
for (const p of FULL as any[]) {
  if (p.primaryCategory === 'Accessories & Parts') continue;
  const k = modelKey(p);
  if (k.length < 4 || !(p.price > 0)) continue;
  const g = `${k}|${p.condition}|${p.price}`;
  (groups.get(g) || groups.set(g, []).get(g)!).push(p);
}
for (const list of groups.values()) {
  if (list.length < 2) continue;
  const primary = list.find((p) => !String(p.slug).startsWith('f-e-d-')) || list[0];
  for (const p of list) if (p.slug !== primary.slug) DUP.set(p.slug, primary.slug);
}

const THIN = new Set<string>(
  (FULL as any[]).filter((p) => p.primaryCategory === 'Accessories & Parts' && String(p.fullDescription || '').length < 450).map((p) => p.slug)
);

export const duplicateOf = (slug: string): string | undefined => DUP.get(slug);
export const isThinProduct = (slug: string): boolean => THIN.has(slug);
export const leftOutOfSitemap = (slug: string): boolean => DUP.has(slug) || THIN.has(slug);
