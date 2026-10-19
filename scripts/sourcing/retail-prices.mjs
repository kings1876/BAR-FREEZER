// Downloads public Shopify catalogues (/products.json) of Australian retailers for price research -> data/retail-<host>.json
import fs from 'fs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (price research)' };
const HOSTS = process.argv.slice(2);
fs.mkdirSync('data', { recursive: true });

for (const host of HOSTS) {
  let all = [];
  for (let page = 1; page <= 60; page++) {
    let j = null;
    for (let t = 0; t < 3 && !j; t++) {
      try {
        const r = await fetch(`https://${host}/products.json?limit=250&page=${page}`, { headers: UA });
        if (r.ok) j = await r.json();
      } catch {}
      if (!j) await new Promise((r) => setTimeout(r, 1000));
    }
    if (!j || !j.products || !j.products.length) break;
    all = all.concat(
      j.products.map((p) => ({
        host,
        title: p.title,
        vendor: p.vendor,
        type: p.product_type,
        handle: p.handle,
        url: `https://${host}/products/${p.handle}`,
        variants: (p.variants || []).map((v) => ({ sku: v.sku, price: v.price, compare: v.compare_at_price, available: v.available, title: v.title }))
      }))
    );
    await new Promise((r) => setTimeout(r, 300));
  }
  fs.writeFileSync(`data/retail-${host}.json`, JSON.stringify(all));
  console.log(host, 'products', all.length);
}
