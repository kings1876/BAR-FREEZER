// Crawls tefcold.com product pages (server-rendered spec lists + breadcrumb) into data/tefcold-raw.json.
import fs from 'fs';

const UA = { 'user-agent': 'Mozilla/5.0 (compatible; BarFreezerCatalogueBot/1.0; +https://barfreezer.com.au)' };
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
const dec = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const sm = await get('https://www.tefcold.com/sitemap/products');
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('product urls:', urls.length);

const OUT = 'data/tefcold-raw.json';
const have = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : [];
const done = new Set(have.map((p) => p.url));
const queue = urls.filter((u) => !done.has(u));
const results = [...have];
let n = 0;

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const h = await get(url);
    n++;
    if (!h) { console.log('FAIL', url); continue; }
    const specs = {};
    for (const m of h.matchAll(/<span class="pr-2 font-semibold">([^<]*)<\/span><div[^>]*>([\s\S]*?)<\/div><\/li>/g)) specs[dec(m[1])] = dec(m[2]);
    const ldm = h.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    let ld = {};
    try { ld = ldm ? JSON.parse(ldm[1]) : {}; } catch {}
    const ol = h.match(/<ol[\s\S]*?<\/ol>/);
    const crumbs = ol ? [...ol[0].matchAll(/<li[\s\S]*?<\/li>/g)].map((x) => dec(x[0])).filter(Boolean) : [];
    const h1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    results.push({ url, id: ld.productID || ld.sku || '', model: h1 ? dec(h1[1]) : ld.name || '', type: ld.description || '', image: ld.image || '', crumbs, specs });
    if (n % 40 === 0) {
      fs.writeFileSync(OUT, JSON.stringify(results));
      console.log(n, '/', urls.length - done.size, 'saved', results.length);
    }
    await sleep(120);
  }
}
await Promise.all([worker(), worker(), worker(), worker(), worker()]);
fs.writeFileSync(OUT, JSON.stringify(results));
console.log('done', results.length);
