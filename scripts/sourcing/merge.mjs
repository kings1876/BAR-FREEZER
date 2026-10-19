// Merges every data/products-*.json into src/config/products.generated.json and links similar models.
import fs from 'fs';

const files = fs.readdirSync('data').filter((f) => /^products-.*\.json$/.test(f)).sort();
let products = [];
for (const f of files) {
  const list = JSON.parse(fs.readFileSync(`data/${f}`, 'utf8'));
  console.log(f, list.length);
  products = products.concat(list);
}

// Unique ids and slugs
const ids = new Set();
const slugs = new Set();
products = products.filter((p) => {
  if (ids.has(p.id) || slugs.has(p.slug)) return false;
  ids.add(p.id);
  slugs.add(p.slug);
  return true;
});

// Similar models: same subcategory, closest width, preferring the same brand
for (const p of products) {
  p.alternatives = products
    .filter((q) => q.id !== p.id && q.subCategory === p.subCategory && q.type === p.type)
    .concat(products.filter((q) => q.id !== p.id && q.subCategory === p.subCategory && q.type !== p.type))
    .filter((q, i, a) => a.findIndex((z) => z.id === q.id) === i)
    .sort((a, b) => (a.brand === p.brand ? 0 : 1) - (b.brand === p.brand ? 0 : 1) || Math.abs(a.widthMm - p.widthMm) - Math.abs(b.widthMm - p.widthMm))
    .slice(0, 3)
    .map((q) => q.id);
}

fs.writeFileSync('src/config/products.generated.json', JSON.stringify(products));
const byBrand = {};
const byCat = {};
products.forEach((p) => {
  byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
  const k = `${p.primaryCategory} > ${p.subCategory}`;
  byCat[k] = (byCat[k] || 0) + 1;
});
console.log('TOTAL', products.length, byBrand);
console.log(Object.entries(byCat).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));

// Re-apply market prices found at Australian retailers (see match-prices.mjs / prices.mjs)
if (fs.existsSync('data/prices-found.json')) {
  const found = JSON.parse(fs.readFileSync('data/prices-found.json', 'utf8'));
  let n = 0;
  for (const p of products) {
    const v = found[p.id];
    if (!v) continue;
    const au = v.prices.filter((x) => !x.foreign);
    const ps = (au.length ? au : v.prices).map((x) => x.price).sort((a, b) => a - b);
    const med = ps.length % 2 ? ps[(ps.length - 1) / 2] : (ps[ps.length / 2 - 1] + ps[ps.length / 2]) / 2;
    p.price = Math.round(med);
    p.priceBasis = au.length ? 'au-retail' : 'overseas-estimate';
    n++;
  }
  fs.writeFileSync('src/config/products.generated.json', JSON.stringify(products));
  console.log('market prices re-applied:', n);
}

// ---------------------------------------------------------------------------
// Estimates for products with no listing anywhere: nearest comparable priced models in the same
// subcategory (by capacity, else width), scaled by size^0.6, median of up to 5. Flagged priceBasis 'estimate'.
{
  const sizeOf = (p) => (p.capacityLitres > 0 ? { v: p.capacityLitres, k: 'cap' } : p.widthMm > 0 ? { v: p.widthMm, k: 'w' } : null);
  const med = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
  const priced = products.filter((p) => p.price);
  let est = 0;
  for (const u of products) {
    if (u.price) continue;
    const isAcc = u.primaryCategory === 'Accessories & Parts';
    let pool = priced.filter((p) => p.subCategory === u.subCategory && (!isAcc || p.price < 1000 === u.price < 1000 || true));
    if (isAcc) pool = priced.filter((p) => p.primaryCategory === u.primaryCategory && p.price < 1000);
    if (pool.length < 3) pool = priced.filter((p) => p.primaryCategory === u.primaryCategory);
    const su = sizeOf(u);
    let cands = pool;
    let value;
    if (su && !isAcc) {
      cands = pool.map((p) => ({ p, s: sizeOf(p) })).filter((x) => x.s && x.s.k === su.k).sort((a, b) => Math.abs(Math.log(su.v / a.s.v)) - Math.abs(Math.log(su.v / b.s.v))).slice(0, 5);
      if (cands.length) value = med(cands.map((x) => x.p.price * Math.pow(su.v / x.s.v, 0.6)));
    }
    if (value == null) value = med(pool.map((p) => p.price));
    u.price = value < 500 ? Math.round(value) : Math.round(value / 10) * 10;
    u.priceBasis = 'estimate';
    est++;
  }
  fs.writeFileSync('src/config/products.generated.json', JSON.stringify(products));
  console.log('estimated prices:', est, '| total priced:', products.filter((p) => p.price).length, 'of', products.length);
}
