// Reads Sydney Commercial Kitchens brand listings (prices embedded as dataLayer view_item_list, ex GST)
// and stores them in the same shape as the Shopify catalogues -> data/retail-sck.json (prices converted to inc GST).
import fs from 'fs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (price research)' };
const BRANDS = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(1000);
  }
  return null;
}

const out = [];
for (const brand of BRANDS) {
  const seen = new Set();
  for (let page = 1; page <= 30; page++) {
    const url = `https://www.sydneycommercialkitchens.com.au/brands/${brand}${page > 1 ? `?p=${page}` : ''}`;
    const h = await get(url);
    if (!h) break;
    const m = h.match(/"event":"view_item_list","ecommerce":(\{[\s\S]*?\})\}\);/);
    if (!m) break;
    let items = [];
    try { items = JSON.parse(m[1]).items || []; } catch { break; }
    const fresh = items.filter((i) => !seen.has(i.item_id + i.item_name));
    if (!fresh.length) break;
    for (const i of fresh) {
      seen.add(i.item_id + i.item_name);
      out.push({
        host: 'sydneycommercialkitchens.com.au',
        title: i.item_name,
        vendor: brand,
        handle: String(i.item_name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        url: `https://www.sydneycommercialkitchens.com.au/brands/${brand}`,
        variants: [{ sku: i.item_id, price: String(Math.round(Number(i.price) * 1.1 * 100) / 100), compare: null, available: true, title: 'ex GST x 1.1' }]
      });
    }
    await sleep(400);
  }
  console.log(brand, out.filter((o) => o.vendor === brand).length);
}
fs.writeFileSync('data/retail-sydneycommercialkitchens.com.au.json', JSON.stringify(out));
console.log('total', out.length);
