// Adds extra photos (gallery) to products from the same official / retailer pages the first photo came from.
// Usage: node scripts/sourcing/gallery.mjs [--dry] [--limit N] [--only prefix]
// Reads src/config/products.generated.json, downloads extra images to public/images/products/<brand>/<name>-N.webp
// (max 1000px, WebP q78, same as optimize-images.mjs) and appends their paths to product.images (max 4 per product).
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

const UA = { 'User-Agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
const DRY = process.argv.includes('--dry');
const arg = (n) => { const i = process.argv.indexOf(n); return i > -1 ? process.argv[i + 1] : null; };
const LIMIT = Number(arg('--limit') || 0);
const ONLY = arg('--only');
const MAX_IMAGES = 4;

const FILE = 'src/config/products.generated.json';
const P = JSON.parse(fs.readFileSync(FILE, 'utf8'));

const SHOPIFY = new Set(['ozcoolers.com.au', 'restaurantequipment.com.au', 'kitchenlibrary.au', 'cateringequipment.com.au', 'allfixelectrical.com.au', 'thegoodguys.com.au', 'bar-fridges-australia.com.au', 'tedslightsandfans.net.au']);

const abs = (u, base) => { try { return new URL(u.replace(/&amp;/g, '&'), base).href; } catch { return null; } };
const getText = async (u) => { const r = await fetch(u, { headers: UA, redirect: 'follow' }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); };

// ---- extractors: return candidate absolute image URLs (best first), may include the product's first photo
const EX = {
  async shopify(p) {
    const r = await fetch(p.sourceUrl.replace(/[?#].*$/, '') + '.js', { headers: UA });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    return (j.images || []).map((u) => abs(u.startsWith('//') ? 'https:' + u : u, p.sourceUrl)).filter(Boolean);
  },
  async tefcold(p) {
    const h = await getText(p.sourceUrl);
    const ids = [...new Set([...h.matchAll(/headlessapi\.tefcold\.com\/images\/auto\/0\/700\/ce\/([A-Za-z0-9+/=_-]+)\.webp/g)].map((m) => m[1]))];
    return ids.map((i) => `https://headlessapi.tefcold.com/images/fit/1000/1000/ce/${i}.webp`);
  },
  async williams(p) {
    const h = await getText(p.sourceUrl);
    return [...new Set([...h.matchAll(/https:\/\/assets\.williams-refrigeration\.com\/files\/prod_(?:gi_gal|mi_mai)_[A-Za-z0-9_]+\.(?:png|jpe?g)/g)].map((m) => m[0]))];
  },
  async dometic(p) {
    const h = await getText(p.sourceUrl);
    const a = [...h.matchAll(/https:\/\/www\.dometic\.com\/media\/catalog\/product\/cache\/[a-f0-9]+\/[^"'\s)]+\.(?:png|jpe?g)/g)].map((m) => m[0]);
    const b = [...h.matchAll(/https:\/\/media\.dometic\.com\/externalassets\/[^"'\s)]+\.(?:png|jpe?g)/g)].map((m) => m[0]);
    const code = String(p.sku || p.model || '').replace(/[^0-9]/g, '');
    const mine = b.filter((u) => code && u.includes(code));
    return [...new Set([...a.slice(0, 3), ...mine])];
  },
  async foster(p) {
    const h = await getText(p.sourceUrl);
    const m = [...h.matchAll(/%2FFiles%2FProduct%20assets%2FImages%20Automatic%2F([A-Za-z0-9_.-]+\.png)/g)].map((x) => x[1]);
    return [...new Set(m)].map((f) => `https://www.fosterrefrigerator.com/Admin/Public/GetImage.ashx?image=%2fFiles%2fProduct+assets%2fImages+Automatic%2f${f}&width=1000&format=webp`);
  },
  async vestfrost(p) {
    const h = await getText(p.sourceUrl);
    const g = [...h.matchAll(/(\/media\/[a-z0-9]+\/[^"')\s?]+\.(?:png|jpg|jpeg))\?[^"')\s]*width=600&amp;height=516/gi)].map((m) => `https://www.vestfrostsolutions.com${m[1]}?width=900`);
    return [...new Set(g)];
  },
  async vintec(p) {
    const h = await getText(p.sourceUrl);
    const g = [...h.matchAll(/\/resourceimageelectrolux\/Public\/Image2\/product\/[0-9]+\/[0-9]+\/BE-AEGHeroCarousel\/AEGHeroCarousel\.png/g)].map((m) => `https://www.vintec.com${m[0]}?width=1000`);
    return [...new Set(g)];
  },
  async skope(p) {
    const raw = EX._skopeRaw || (EX._skopeRaw = JSON.parse(fs.readFileSync('data/skope-raw.json', 'utf8')));
    const arr = Array.isArray(raw) ? raw : Object.values(raw);
    const hit = arr.find((x) => x.link === p.sourceUrl || (x.model && x.model === p.model));
    const nodes = (hit && hit.images && hit.images.nodes) || [];
    return nodes.filter((i) => i.absoluteLink && !i.svg).map((i) => i.absoluteLink);
  },
  async hoshizaki(p) {
    const raw = EX._hzRaw || (EX._hzRaw = JSON.parse(fs.readFileSync('data/hoshizaki-raw.json', 'utf8')));
    const arr = Array.isArray(raw) ? raw : Object.values(raw);
    const hit = arr.find((x) => x.permalink === p.sourceUrl || x.link === p.sourceUrl || (x.slug && p.sourceUrl.includes(x.slug)));
    return ((hit && hit.images) || []).map((i) => (typeof i === 'string' ? i : i.src || i.url)).filter(Boolean);
  },
};

function strategy(p) {
  let host = '';
  try { host = new URL(p.sourceUrl).host; } catch { return null; }
  if (SHOPIFY.has(host)) return 'shopify';
  if (host === 'www.tefcold.com') return 'tefcold';
  if (host === 'www.williams-refrigeration.com.au') return 'williams';
  if (host === 'www.dometic.com') return 'dometic';
  if (host === 'www.fosterrefrigerator.com') return 'foster';
  if (host === 'www.vestfrostsolutions.com') return 'vestfrost';
  if (host === 'www.vintec.com') return 'vintec';
  if (host === 'skope.com') return 'skope';
  if (host === 'hoshizaki.com.au') return 'hoshizaki';
  return null;
}

// visual fingerprint: 16x16 grayscale after trimming, used to skip duplicates of photos we already have
async function fingerprint(input) {
  const buf = await sharp(input).rotate().flatten({ background: '#fff' }).resize(16, 16, { fit: 'fill' }).greyscale().raw().toBuffer();
  return buf;
}
const dist = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) d += Math.abs(a[i] - b[i]); return d / a.length; };

async function download(url) {
  const r = await fetch(url, { headers: UA, redirect: 'follow' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return Buffer.from(await r.arrayBuffer());
}

const stats = { tried: 0, added: 0, products: 0, noExtra: 0, errors: 0, byStrategy: {} };
const todo = P.filter((p) => (p.images || []).length < 2 && strategy(p) && (!ONLY || p.id.startsWith(ONLY)));
const list = LIMIT ? todo.slice(0, LIMIT) : todo;
console.log('products to process:', list.length, DRY ? '(dry run)' : '');

async function processProduct(p) {
  const strat = strategy(p);
  const s = (stats.byStrategy[strat] = stats.byStrategy[strat] || { n: 0, withExtra: 0, imgs: 0 });
  s.n++; stats.tried++;
  let urls;
  try { urls = await EX[strat](p); } catch (e) { stats.errors++; return; }
  urls = [...new Set(urls)];
  if (urls.length < 2) { stats.noExtra++; return; }
  if (DRY) { s.withExtra++; s.imgs += urls.length - 1; return; }

  const dir = path.join('public', path.dirname(p.images[0]));
  const base = path.basename(p.images[0], path.extname(p.images[0]));
  const first = path.join('public', p.images[0]);
  const fps = [];
  try { fps.push(await fingerprint(first)); } catch { /* no first image on disk */ }
  const added = [];
  for (const u of urls) {
    if (added.length + (p.images || []).length >= MAX_IMAGES) break;
    try {
      const buf = await download(u);
      const meta = await sharp(buf).metadata();
      if (!meta.width || meta.width < 380 || meta.height < 280) continue;
      const fp = await fingerprint(buf);
      if (fps.some((f) => dist(f, fp) < 6)) continue; // same photo as one we have
      const n = (p.images || []).length + added.length + 1;
      const out = path.join(dir, `${base}-${n}.webp`);
      await sharp(buf).rotate().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
      fps.push(fp);
      added.push('/' + path.relative('public', out).replace(/\\/g, '/'));
    } catch { /* skip bad image */ }
  }
  if (added.length) { p.images = [...(p.images || []), ...added]; s.withExtra++; s.imgs += added.length; stats.added += added.length; stats.products++; }
  else stats.noExtra++;
}

const queue = [...list];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const p = queue.shift();
    await processProduct(p);
    if ((stats.tried % 50) === 0) console.log('...', stats.tried, '/', list.length, 'products with new photos:', stats.products);
  }
});
await Promise.all(workers);

if (!DRY) fs.writeFileSync(FILE, JSON.stringify(P));
console.log(JSON.stringify(stats, null, 1));
const final = P.filter((p) => (p.images || []).length >= 2).length;
console.log('products with 2+ photos now:', final, 'of', P.length);
