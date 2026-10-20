// Second pass for products still under 2 photos: look for the same model code (SKU or model in the title) in the retailer
// catalogues we already downloaded (data/retail-*.json, Shopify product feeds) and use their photos.
// A match needs the model code to equal a variant SKU, or to appear as a whole token in a title that also names the brand.
// Usage: node scripts/sourcing/gallery-fallback.mjs [--dry]
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UA = { 'User-Agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
const DRY = process.argv.includes('--dry');
const FILE = 'src/config/products.generated.json';
const P = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

const feeds = fs.readdirSync('data').filter((f) => /^retail-.*\.json$/.test(f));
const bySku = new Map();   // normalised sku -> [{title, images, vendor}]
const byToken = new Map(); // normalised model-looking token -> [{title, images, vendor}]
let feedProducts = 0;
for (const f of feeds) {
  let j;
  try { j = JSON.parse(fs.readFileSync('data/' + f, 'utf8')); } catch { continue; }
  const arr = Array.isArray(j) ? j : j.products || [];
  for (const it of arr) {
    const imgs = (it.images || []).map((i) => (typeof i === 'string' ? i : i.src)).filter(Boolean);
    if (imgs.length < 2) continue;
    feedProducts++;
    const rec = { title: String(it.title || ''), images: imgs, vendor: String(it.vendor || '') };
    for (const v of it.variants || []) {
      const k = norm(v.sku);
      if (k.length >= 5) { if (!bySku.has(k)) bySku.set(k, []); bySku.get(k).push(rec); }
    }
    for (const t of rec.title.split(/[\s,()/]+/)) {
      const k = norm(t);
      if (k.length >= 5 && /[0-9]/.test(k) && /[a-z]/.test(k)) { if (!byToken.has(k)) byToken.set(k, []); byToken.get(k).push(rec); }
    }
  }
}
console.log('feeds', feeds.length, 'feed products with 2+ images', feedProducts, 'sku keys', bySku.size, 'token keys', byToken.size);

async function fingerprint(input) {
  return sharp(input).rotate().flatten({ background: '#fff' }).resize(16, 16, { fit: 'fill' }).greyscale().raw().toBuffer();
}
const dist = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i]); return d / a.length; };

let matched = 0, gained = 0;
const need = P.filter((p) => (p.images || []).length < 2 && p.model);
for (const p of need) {
  const m = norm(p.model);
  if (m.length < 5) continue;
  const brandTok = norm(p.brand).slice(0, 5);
  let cand = (bySku.get(m) || []).filter((r) => true);
  if (!cand.length) cand = (byToken.get(m) || []).filter((r) => norm(r.title + r.vendor).includes(brandTok));
  if (!cand.length) continue;
  matched++;
  if (DRY) continue;
  const dir = path.join('public', path.dirname(p.images[0]));
  const base = path.basename(p.images[0], path.extname(p.images[0]));
  const fps = [];
  try { fps.push(await fingerprint(path.join('public', p.images[0]))); } catch { /* ignore */ }
  const added = [];
  for (const u0 of cand[0].images) {
    if ((p.images || []).length + added.length >= 4) break;
    try {
      const u = u0.startsWith('//') ? 'https:' + u0 : u0;
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
console.log('needing photos', need.length, 'matched in retailer feeds', matched, 'photos added', gained, '| products with 2+ photos:', P.filter((p) => (p.images || []).length >= 2).length, 'of', P.length);
