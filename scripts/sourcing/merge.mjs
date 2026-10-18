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
