// Extracts Skope (skope.com/au) product model data from the Next.js flight payload on each product-view page.
import fs from 'fs';

const SITEMAP = 'https://skope.com/au/sitemap.xml';
const INCLUDE = /\/au\/(fridges|freezers)\//;
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; BarFreezerCatalogueBot/1.0; +https://barfreezer.com.au)' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(800 * (i + 1));
  }
  return null;
}

function flight(html) {
  let out = '';
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)<\/script>/g)) {
    try { out += JSON.parse('"' + m[1] + '"'); } catch {}
  }
  return out;
}

function extractArray(text, startIdx) {
  // startIdx points at '[' ; bracket-match respecting strings
  let depth = 0, inStr = false, esc = false;
  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (esc) esc = false; else if (c === String.fromCharCode(92)) esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) return text.slice(startIdx, i + 1); }
  }
  return null;
}

const xml = await get(SITEMAP);
const urls = [...xml.matchAll(/<loc>([^<]*product-view[^<]*)<\/loc>/g)].map((m) => m[1]).filter((u) => INCLUDE.test(u));
console.log('product-view pages:', urls.length);

const byModel = new Map();
let done = 0;
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const html = await get(url);
    done++;
    if (!html) { console.log('FAIL', url); continue; }
    const f = flight(html);
    const key = '"products":{"nodes":[';
    let from = 0;
    while (true) {
      const i = f.indexOf(key, from);
      if (i < 0) break;
      const arr = extractArray(f, i + key.length - 1);
      from = i + key.length;
      if (!arr) continue;
      let nodes;
      try { nodes = JSON.parse(arr); } catch { continue; }
      for (const n of nodes) {
        if (!n || n.__typename !== 'Product' || !n.model) continue;
        if (!byModel.has(n.model)) byModel.set(n.model, { ...n, sourceUrl: n.link || url });
      }
    }
    if (done % 25 === 0) console.log(done, '/', urls.length, 'models so far', byModel.size);
    await sleep(150);
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
const all = [...byModel.values()];
fs.writeFileSync('data/skope-raw.json', JSON.stringify(all, null, 1));
console.log('models:', all.length);
