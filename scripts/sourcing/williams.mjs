// Parses Williams Refrigeration Australia category listings (williams-refrigeration.com.au) -> data/williams-raw.json
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
const dec = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&deg;/g, '°').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#039;|&rsquo;/g, "'").replace(/\s+/g, ' ').trim();

const CATS = (process.argv[2] || 'back-bar-general,uprights,front-of-house,topaz-cafe-range,preparation-counters,foodservice-counters,specialised').split(',');
const out = [];
for (const cat of CATS) {
  const h = await get(`https://www.williams-refrigeration.com.au/products/${cat}/-/-/-`);
  if (!h) { console.log('FAIL', cat); continue; }
  const arts = h.split('<article class="product').slice(1);
  for (const a of arts) {
    const link = (a.match(/<a href="([^"]+)"[^>]*class="product-image"/) || [])[1] || '';
    const img = (a.match(/<img src="([^"]+)"/) || [])[1] || '';
    const name = dec((a.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || '');
    const props = {};
    for (const m of a.matchAll(/<dl class="property-list__item">\s*<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)) props[dec(m[1])] = dec(m[2]);
    const tech = {};
    for (const m of a.matchAll(/<span class="technical-list__term">([\s\S]*?)<\/span>\s*<span class="technical-list__data">([\s\S]*?)<\/span>/g)) tech[dec(m[1])] = dec(m[2]);
    const range = link.split('/products/')[1]?.split('/')[1] || '';
    out.push({ category: cat, range, name, link, image: img, props, tech });
  }
  console.log(cat, arts.length);
  await sleep(300);
}
fs.writeFileSync('data/williams-raw.json', JSON.stringify(out, null, 1));
console.log('saved', out.length);
