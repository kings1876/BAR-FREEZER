// Picks real product photos for a guide: a hero image plus a thumbnail for every product the guide links to.
// Server only (reads the full catalogue and checks the image file exists in /public).
import fs from 'fs';
import path from 'path';

export interface GuideImage { src: string; alt: string; slug: string; name: string }
export interface GuideImages { hero: GuideImage | null; thumbs: Record<string, string> }

const exists = (src: string) => {
  try { return fs.existsSync(path.join(process.cwd(), 'public', src)); } catch { return false; }
};

const CARD_KEYS = ['id', 'sku', 'brand', 'model', 'name', 'slug', 'categorySlug', 'primaryCategory', 'subCategory', 'type', 'doorCount', 'doorType', 'doorStyle', 'widthMm', 'depthMm', 'heightMm', 'capacityLitres', 'capacityLabel', 'price', 'tradePrice', 'finish', 'tempRange', 'installation', 'stockQty', 'shippingBadge', 'warrantyYears'];

// Up to three products to show as order-ready cards: the products the guide links to, otherwise mid-priced products
// from the category it links to most. Trimmed to the fields a product card needs so the page payload stays small.
export function guideCards(content: string, all: any[], max = 3): any[] {
  const bySlug = new Map<string, any>(all.map((p) => [p.slug, p]));
  const slugs = [...new Set([...content.matchAll(/\]\(\/product\/([^/)]+)\/\)/g)].map((m) => m[1]))];
  let picked = slugs.map((s) => bySlug.get(s)).filter(Boolean);
  if (picked.length < max) {
    const counts = new Map<string, number>();
    for (const m of content.matchAll(/\]\(\/(bar-fridges|bar-freezers)\/([a-z0-9-]+)\/\)/g)) counts.set(m[1] + '/' + m[2], (counts.get(m[1] + '/' + m[2]) || 0) + 1);
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    if (top) {
      const [rootSlug, sub] = top[0].split('/');
      const root = ({ 'bar-fridges': 'Bar Fridges & Coolers', 'bar-freezers': 'Bar Freezers' } as Record<string, string>)[rootSlug];
      const list = all.filter((p) => p.primaryCategory === root && p.categorySlug === sub && p.price > 0 && (p.images || []).some((s: string) => exists(s))).sort((a, b) => a.price - b.price);
      const mid = Math.floor(list.length / 2);
      const near = list.map((p, idx) => ({ p, d: Math.abs(idx - mid) })).sort((a, b) => a.d - b.d).map((x) => x.p);
      for (const p of near) { if (picked.length >= max) break; if (!picked.includes(p)) picked.push(p); }
    }
  }
  return picked.slice(0, max).map((p) => {
    const o: any = {};
    for (const k of CARD_KEYS) o[k] = p[k] ?? (typeof p[k] === 'number' ? 0 : null);
    for (const k of ['tempRange', 'finish', 'brand', 'type', 'sku']) o[k] = p[k] || '';
    for (const k of ['widthMm', 'heightMm', 'depthMm', 'doorCount', 'warrantyYears']) o[k] = p[k] || 0;
    o.images = (p.images || []).filter((s: string) => s && exists(s)).slice(0, 1);
    o.features = [];
    return o;
  });
}

export function guideImages(content: string, all: any[]): GuideImages {
  const bySlug = new Map<string, any>(all.map((p) => [p.slug, p]));
  const pick = (p: any): GuideImage | null => {
    const src = (p?.images || []).find((s: string) => s && exists(s));
    return src ? { src, alt: p.name, slug: p.slug, name: p.name } : null;
  };

  const thumbs: Record<string, string> = {};
  const productLinks = [...content.matchAll(/\]\(\/product\/([^/)]+)\/\)/g)].map((m) => m[1]);
  for (const s of productLinks) {
    const img = pick(bySlug.get(s));
    if (img) thumbs[s] = img.src;
  }

  let hero: GuideImage | null = null;
  for (const s of productLinks) { hero = pick(bySlug.get(s)); if (hero) break; }

  if (!hero) {
    // No product links: use the category the guide links to most often, and a mid-priced product from it as a typical example.
    const counts = new Map<string, number>();
    for (const m of content.matchAll(/\]\(\/(bar-fridges|bar-freezers|accessories-parts)\/([a-z0-9-]+)\/\)/g)) counts.set(m[1] + '/' + m[2], (counts.get(m[1] + '/' + m[2]) || 0) + 1);
    // Accessories and specialty machines make poor lead photos, so only fall back to them when nothing else is linked.
    const poor = (k: string) => k.startsWith('accessories-parts/') || k === 'bar-freezers/glass-frosters-specialty';
    const ranked = [...counts.entries()].sort((a, b) => (poor(a[0]) ? 1 : 0) - (poor(b[0]) ? 1 : 0) || b[1] - a[1]);
    const top = ranked.find(([k]) => !poor(k)) || ['bar-fridges/under-bar-fridges', 1];
    if (top) {
      const [rootSlug, sub] = top[0].split('/');
      const root = ({ 'bar-fridges': 'Bar Fridges & Coolers', 'bar-freezers': 'Bar Freezers', 'accessories-parts': 'Accessories & Parts' } as Record<string, string>)[rootSlug];
      const list = all
        .filter((p) => p.primaryCategory === root && p.categorySlug === sub && p.price > 0)
        .sort((a, b) => a.price - b.price);
      const mid = Math.floor(list.length / 2);
      const byDistance = list.map((p, idx) => ({ p, d: Math.abs(idx - mid) })).sort((a, b) => a.d - b.d);
      for (const { p } of byDistance) { hero = pick(p); if (hero) break; }
    }
  }
  return { hero, thumbs };
}
