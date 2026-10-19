// Matches our products to retailer listings by model code and writes data/prices-found.json (+ summary).
import fs from 'fs';

const products = JSON.parse(fs.readFileSync('src/config/products.generated.json', 'utf8'));
const hosts = fs.readdirSync('data').filter((f) => /^retail-.*\.json$/.test(f));
const listings = hosts.flatMap((f) => JSON.parse(fs.readFileSync(`data/${f}`, 'utf8')));
console.log('listings:', listings.length, 'from', hosts.length, 'retailers');

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const brandOk = (p, l) => {
  const hay = norm(l.vendor + ' ' + l.title + ' ' + l.handle);
  const b = norm(p.brand);
  if (hay.includes(b)) return true;
  // Sub-brands sold under a different vendor name
  if (b === 'tefcold') return false;
  return false;
};

// Index listings by every normalised token and adjacent token pair in title/sku/handle
const index = new Map();
function add(key, l) {
  if (key.length < 4) return;
  if (!index.has(key)) index.set(key, new Set());
  index.get(key).add(l);
}
for (const l of listings) {
  const texts = [l.title, ...(l.variants || []).map((v) => v.sku || ''), l.handle.replace(/-/g, ' ')];
  for (const t of texts) {
    const toks = String(t).split(/[\s/,()]+/).filter(Boolean);
    for (let i = 0; i < toks.length; i++) {
      add(norm(toks[i]), l);
      for (let n = 2; n <= 4 && i + n <= toks.length; n++) add(norm(toks.slice(i, i + n).join('')), l);
    }
  }
}

const found = {};
let matched = 0;
for (const p of products) {
  const firstTok = String(p.model).split(/\s+/)[0];
  const keys = [...new Set([norm(p.model), norm(p.sku), String(p.model).includes(' ') && /\d/.test(firstTok) && /-/.test(firstTok) ? norm(firstTok) : ''])].filter((k) => k.length >= 5);
  const cands = new Set();
  for (const k of keys) for (const l of index.get(k) || []) cands.add(l);
  const good = [...cands].filter((l) => brandOk(p, l) || p.brand === 'Tefcold');
  if (!good.length) continue;
  const prices = [];
  for (const l of good) {
    for (const v of l.variants || []) {
      const n = parseFloat(v.price);
      if (n > 0) prices.push({ price: n, host: l.host, url: l.url, available: v.available, title: l.title });
    }
  }
  if (!prices.length) continue;
  prices.sort((a, b) => a.price - b.price);
  found[p.id] = { model: p.model, brand: p.brand, prices };
  matched++;
}
// Extra prices read directly from manufacturer pages: data/prices-extra-*.json = { productId: [{price, host, url}] }
for (const f of fs.readdirSync('data').filter((f) => /^prices-extra-.*.json$/.test(f))) {
  const extra = JSON.parse(fs.readFileSync('data/' + f, 'utf8'));
  for (const [id, list] of Object.entries(extra)) {
    const p = products.find((x) => x.id === id);
    if (!p) continue;
    if (!found[id]) { found[id] = { model: p.model, brand: p.brand, prices: [] }; matched++; }
    found[id].prices.push(...list.map((x) => ({ available: true, title: p.name, ...x })));
  }
}
fs.writeFileSync('data/prices-found.json', JSON.stringify(found, null, 1));
const byBrand = {};
products.forEach((p) => { byBrand[p.brand] = byBrand[p.brand] || { total: 0, priced: 0 }; byBrand[p.brand].total++; if (found[p.id]) byBrand[p.brand].priced++; });
console.log('matched', matched, 'of', products.length);
console.log(byBrand);
