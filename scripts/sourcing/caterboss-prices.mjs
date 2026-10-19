// Reads caterboss.ie (Ireland) product pages for chosen brands (JSON-LD Offer, EUR ex VAT) -> data/retail-caterboss.ie.json
import fs from 'fs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (price research)' };
const BRANDS = (process.argv[2] || 'tefcold,williams,vintec').split(',');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(1000 * (t + 1));
  }
  return null;
}

const sm = await get('https://www.caterboss.ie/sitemap.xml');
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => /\/product\//.test(u) && BRANDS.some((b) => u.toLowerCase().includes('/product/' + b)));
console.log('product urls:', urls.length);

const out = [];
const queue = [...urls];
let n = 0;
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const h = await get(url);
    n++;
    if (!h) continue;
    for (const m of h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
      let j;
      try { j = JSON.parse(m[1]); } catch { continue; }
      if (j['@type'] !== 'Product') continue;
      const offers = Array.isArray(j.offers) ? j.offers : j.offers ? [j.offers] : [];
      const price = offers.map((o) => parseFloat(o.price)).filter((x) => x > 0)[0];
      if (!price) continue;
      out.push({
        host: 'caterboss.ie',
        title: j.name,
        vendor: (j.brand && j.brand.name) || '',
        handle: url.split('/product/')[1] || '',
        url,
        variants: [{ sku: j.sku || '', price: String(price), compare: null, available: true, title: 'EUR ex VAT' }]
      });
    }
    if (n % 25 === 0) console.log(n, '/', urls.length, 'priced', out.length);
    await sleep(150);
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
fs.writeFileSync('data/retail-caterboss.ie.json', JSON.stringify(out));
console.log('done priced', out.length);
