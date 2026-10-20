// Downloads full Shopify product feeds (products.json) from extra Australian retailers for gallery matching.
// Usage: node scripts/sourcing/fetch-feeds.mjs domain [domain ...]
import fs from 'fs';
const UA = { 'User-Agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
for (const d of process.argv.slice(2)) {
  const all = [];
  for (let page = 1; page <= 60; page++) {
    const r = await fetch(`https://${d}/products.json?limit=250&page=${page}`, { headers: UA });
    if (!r.ok) break;
    const j = await r.json();
    if (!j.products || !j.products.length) break;
    all.push(...j.products);
    if (j.products.length < 250) break;
  }
  fs.writeFileSync(`data/retail-${d}.json`, JSON.stringify(all));
  console.log(d, all.length, 'products,', all.filter((p) => (p.images || []).length > 1).length, 'with 2+ images');
}
