// Crawls Vintec Australia wine cabinet pages (vintec.com/en-au) -> data/vintec-raw.json
import fs from 'fs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(1000 * (i + 1));
  }
  return null;
}
const dec = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const sm = await get('https://www.vintec.com/en-au/sitemap.xml');
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => /\/en-au\/(large-wine-cellars|underbench-wine-cellars|wine-cabinets|beverage-centre|wine-cellars)\/[^/]+\/$/.test(u));
console.log('product pages:', urls.length);

const out = [];
for (const url of urls) {
  const h = await get(url);
  if (!h) { console.log('FAIL', url); continue; }
  const specs = {};
  for (const m of h.matchAll(/<span class="units">([\s\S]*?)<\/span>\s*<span class="dimension">([\s\S]*?)<\/span>/g)) specs[dec(m[1])] = dec(m[2]);
  let ld = null;
  for (const m of h.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); if (j['@type'] === 'Product') ld = j; } catch {}
  }
  const h1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const feats = [];
  const fm = h.match(/Cabinet Features[\s\S]{0,2000}/i);
  out.push({
    url,
    category: url.split('/en-au/')[1].split('/')[0],
    model: (ld && (ld.model || ld.sku)) || url.split('/').filter(Boolean).pop().toUpperCase(),
    title: h1 ? dec(h1[1]) : ld?.name || '',
    description: ld?.description || '',
    image: (ld && (Array.isArray(ld.image) ? ld.image[0] : ld.image)) || (h.match(/https?:\/\/[^"'\s]+resourceimageelectrolux[^"'\s?]+\.png/) || [])[0] || '',
    specs,
    price: (() => { const m = h.match(/product-details_heading_pricing-number[^>]*>\s*\$\s*([\d,]+)/); return m ? Number(m[1].replace(/,/g, '')) : null; })()
  });
  await sleep(250);
}
fs.writeFileSync('data/vintec-raw.json', JSON.stringify(out, null, 1));
console.log('saved', out.length);
