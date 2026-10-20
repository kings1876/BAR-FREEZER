// Third pass: KW Commercial Kitchen (kwcommercial.com.au) lists full photo galleries in each product's JSON-LD.
// Finds the product page by model code in its sitemap URLs, then adds the gallery photos (deduplicated) to products still under 2 photos.
// Usage: node scripts/sourcing/gallery-kw.mjs [--dry]
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UA = { 'User-Agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
const DRY = process.argv.includes('--dry');
const FILE = 'src/config/products.generated.json';
const P = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const getText = async (u) => { const r = await fetch(u, { headers: UA }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); };

const urls = [];
for (const sm of ['products.xml', 'products-new.xml']) {
  const x = await getText('https://www.kwcommercial.com.au/sitemaps/' + sm);
  urls.push(...[...x.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
}
const index = urls.filter((u) => u.includes('/product/')).map((u) => ({ u, k: norm(u.split('/product/')[1]) }));
console.log('KW product urls', index.length);

async function fingerprint(input) { return sharp(input).rotate().flatten({ background: '#fff' }).resize(16, 16, { fit: 'fill' }).greyscale().raw().toBuffer(); }
const dist = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i]); return d / a.length; };

const need = P.filter((p) => (p.images || []).length < 2 && p.model && norm(p.model).length >= 4);
let matched = 0, gained = 0, tried = 0;
for (const p of need) {
  const m = norm(p.model);
  const brand = norm(p.brand).slice(0, 4);
  // exact-ish: the slug contains the model code as a whole run; prefer slugs that also name the brand
  let hits = index.filter((x) => x.k.includes(m));
  if (!hits.length) continue;
  const withBrand = hits.filter((x) => x.k.includes(brand));
  hits = withBrand.length ? withBrand : hits;
  // avoid ex-showroom / used listings when a new listing exists
  hits.sort((a, b) => (/ex-?showroom|used|clearance/.test(a.u) ? 1 : 0) - (/ex-?showroom|used|clearance/.test(b.u) ? 1 : 0) || a.u.length - b.u.length);
  matched++;
  if (DRY) continue;
  let imgs = [];
  try {
    const h = await getText(hits[0].u);
    const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((x) => { try { return JSON.parse(x[1]); } catch { return null; } }).filter(Boolean);
    const prod = ld.flatMap((x) => (Array.isArray(x) ? x : x['@graph'] || [x])).find((x) => x['@type'] === 'Product');
    imgs = prod && prod.image ? (Array.isArray(prod.image) ? prod.image : [prod.image]) : [];
  } catch { continue; }
  imgs = [...new Set(imgs.map((u) => u.replace(/\?.*$/, '')))];
  tried++;
  const dir = path.join('public', path.dirname(p.images[0]));
  const base = path.basename(p.images[0], path.extname(p.images[0]));
  const fps = [];
  try { fps.push(await fingerprint(path.join('public', p.images[0]))); } catch { /* ignore */ }
  const added = [];
  for (const u of imgs) {
    if ((p.images || []).length + added.length >= 4) break;
    try {
      const r = await fetch(u, { headers: UA });
      if (!r.ok) continue;
      const buf = Buffer.from(await r.arrayBuffer());
      const meta = await sharp(buf).metadata();
      if (!meta.width || meta.width < 380 || meta.height < 280) continue;
      const fp = await fingerprint(buf);
      if (fps.some((f) => dist(f, fp) < 6)) continue;
      const n = (p.images || []).length + added.length + 1;
      const out = path.join(dir, `${base}-${n}.webp`);
      await sharp(buf).rotate().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
      fps.push(fp);
      added.push('/' + path.relative('public', out).replace(/\\/g, '/'));
    } catch { /* skip */ }
  }
  if (added.length) { p.images = [...(p.images || []), ...added]; gained += added.length; }
}
if (!DRY) fs.writeFileSync(FILE, JSON.stringify(P));
console.log('needing', need.length, 'matched slug', matched, 'pages read', tried, 'photos added', gained, '| products with 2+ photos:', P.filter((p) => (p.images || []).length >= 2).length, 'of', P.length);
