// Finds photos for products that have none, downloads them as WebP and patches data/products-*.json.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const RE = JSON.parse(fs.readFileSync('data/retail-restaurantequipment.com.au.json', 'utf8'));
const find = (re, re2) => RE.find((l) => re.test(l.title) && (!re2 || re2.test(l.title)) && l.images && l.images[0]);

const targets = {
  'the-lg-208td': { url: find(/LG-208TD/i)?.images[0], dir: 'thermaster' },
  'the-lg-330td': { url: find(/LG-330TD/i)?.images[0], dir: 'thermaster' },
  'wl-fgc1u': { url: find(/FGC1U/i)?.images[0], dir: 'williams' },
  'wl-fgc2': { url: find(/FGC2/i, /Remote/i)?.images[0], dir: 'williams' },
  'wl-ic-u-900-hg-c': { url: 'https://assets.williams-refrigeration.com/files/prod_mi_mai_1562850247_745cea1f93.png', dir: 'williams' }
};

const result = {};
for (const [id, t] of Object.entries(targets)) {
  if (!t.url) { console.log('NO URL', id); continue; }
  try {
    const r = await fetch(t.url + (t.url.includes('?') ? '&' : '?') + (t.url.includes('shopify') ? 'width=1000' : ''), { headers: { 'user-agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' } });
    if (!r.ok) { console.log('HTTP', r.status, id); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    const rel = `/images/products/${t.dir}/${id}.webp`;
    fs.mkdirSync(path.join('public', path.dirname(rel)), { recursive: true });
    await sharp(buf).rotate().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join('public', rel));
    result[id] = rel;
    console.log('ok', id, '<-', t.url.slice(0, 80));
  } catch (e) { console.log('FAIL', id, e.message); }
}

for (const f of fs.readdirSync('data').filter((x) => /^products-.*\.json$/.test(x))) {
  const list = JSON.parse(fs.readFileSync(`data/${f}`, 'utf8'));
  let changed = false;
  for (const p of list) if (result[p.id]) { p.images = [result[p.id]]; changed = true; }
  if (changed) fs.writeFileSync(`data/${f}`, JSON.stringify(list, null, 1));
}
console.log('patched', Object.keys(result).length);
