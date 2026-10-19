// Pass 1b: crawl every route of the live site and audit status, metadata, headings, links and images.
// Usage: node scripts/audit/crawl-audit.mjs https://bar-freezer.vercel.app
import fs from 'fs';

const BASE = (process.argv[2] || 'https://bar-freezer.vercel.app').replace(/\/$/, '');
let s = fs.readFileSync('src/config/site.js', 'utf8')
  .replace("import productsData from './products.light.json';", "import fs from 'fs'; const productsData = JSON.parse(fs.readFileSync('src/config/products.light.json','utf8'));")
  .replace("import { EXTRA_POSTS } from './guides-extra.js';", "import { EXTRA_POSTS } from '../src/config/guides-extra.js';");
fs.writeFileSync('data/_site-tmp.mjs', s);
const m = await import('../../data/_site-tmp.mjs?x=' + Date.now());
fs.unlinkSync('data/_site-tmp.mjs');

const routes = new Set(['/']);
['trade', 'quote', 'finance', 'warranty-service', 'warranty', 'deals', 'clearance', 'compare', 'reviews', 'about', 'contact', 'faq', 'returns', 'cart', 'checkout', 'search', 'delivery', 'guides', 'payment-methods'].forEach((r) => routes.add(`/${r}/`));
(function walk(nodes) { for (const n of nodes || []) { if (n.path) routes.add(n.path); walk(n.subcategories); walk(n.types); } })(m.CATEGORIES);
m.BRANDS.forEach((b) => routes.add(`/brands/${b.slug}/`));
m.VENUES.forEach((v) => routes.add(`/venues/${v.slug}/`));
m.CITIES.forEach((c) => routes.add(`/delivery/${c.slug}/`));
m.POSTS.forEach((p) => routes.add(`/guides/${p.slug}/`));
m.PRODUCTS.forEach((p) => routes.add(`/product/${p.slug}/`));
const known = new Set(routes);
console.log('routes to crawl:', routes.size);

const rows = [];
const brokenLinks = new Map();
const queue = [...routes];
const t0 = Date.now();
async function get(url) {
  for (let t = 0; t < 2; t++) {
    try { const r = await fetch(url, { redirect: 'manual' }); const body = await r.text(); return { status: r.status, headers: r.headers, body }; } catch (e) { if (t) return { status: 0, error: e.message }; }
  }
}
async function worker() {
  while (queue.length) {
    const path = queue.shift();
    const r = await get(BASE + path);
    const row = { path, status: r.status, ms: 0 };
    if (r.body) {
      const h = r.body;
      row.bytes = Buffer.byteLength(h);
      row.title = (h.match(/<title[^>]*>([^<]*)/) || [])[1] || '';
      row.desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
      row.canonical = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
      row.ogTitle = (h.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || '';
      row.h1 = (h.match(/<h1[\s>]/g) || []).length;
      row.lang = (h.match(/<html[^>]*lang="([^"]*)"/) || [])[1] || '';
      row.jsonld = (h.match(/application\/ld\+json/g) || []).length;
      row.robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
      const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((x) => x[0]);
      row.imgs = imgs.length;
      row.imgNoAlt = imgs.filter((x) => !/\balt="[^"]/.test(x)).length;
      row.imgNoDims = imgs.filter((x) => !/\bwidth=/.test(x) || !/\bheight=/.test(x)).length;
      for (const mm of h.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/g)) {
        const href = mm[1];
        if (/^\/(_next|images|favicon)/.test(href)) continue;
        const norm = href.endsWith('/') ? href : href + '/';
        if (!known.has(norm)) { if (!brokenLinks.has(norm)) brokenLinks.set(norm, new Set()); brokenLinks.get(norm).add(path); }
      }
    }
    rows.push(row);
  }
}
await Promise.all(Array.from({ length: 10 }, worker));
console.log('crawled in', Math.round((Date.now() - t0) / 1000), 's');

const by = (f) => rows.filter(f);
const stat = {};
rows.forEach((r) => (stat[r.status] = (stat[r.status] || 0) + 1));
console.log('\nSTATUS', stat);
const titles = new Map();
rows.forEach((r) => { if (r.title) titles.set(r.title, (titles.get(r.title) || 0) + 1); });
const descs = new Map();
rows.forEach((r) => { if (r.desc) descs.set(r.desc, (descs.get(r.desc) || 0) + 1); });
const canon = by((r) => r.status === 200 && r.canonical);
console.log('\nMETADATA');
console.log('  unique titles:', titles.size, 'of', rows.length, '| most common:', [...titles.entries()].sort((a, b) => b[1] - a[1])[0]);
console.log('  unique descriptions:', descs.size, '| most common count:', [...descs.values()].sort((a, b) => b - a)[0]);
console.log('  pages with canonical:', canon.length, '| with og:title:', by((r) => r.ogTitle).length, '| with JSON-LD:', by((r) => r.jsonld).length);
console.log('  lang attr values:', [...new Set(rows.map((r) => r.lang))]);
console.log('  h1 count != 1:', by((r) => r.status === 200 && r.h1 !== 1).length, by((r) => r.status === 200 && r.h1 !== 1).slice(0, 5).map((r) => r.path + ':' + r.h1));
console.log('  noindex pages:', by((r) => /noindex/.test(r.robots)).length);
console.log('\nIMAGES');
console.log('  pages with <img> lacking alt:', by((r) => r.imgNoAlt > 0).length, '| lacking width/height:', by((r) => r.imgNoDims > 0).length, 'of', by((r) => r.imgs > 0).length);
console.log('\nSIZE');
const sz = rows.filter((r) => r.bytes).sort((a, b) => b.bytes - a.bytes);
console.log('  heaviest HTML:', sz.slice(0, 5).map((r) => r.path + ' ' + (r.bytes / 1e6).toFixed(2) + 'MB').join(' | '));
console.log('  median HTML:', ((sz[Math.floor(sz.length / 2)].bytes) / 1024).toFixed(0) + 'KB', '| pages > 1MB:', sz.filter((r) => r.bytes > 1e6).length, '| pages > 2MB:', sz.filter((r) => r.bytes > 2e6).length);
console.log('\nINTERNAL LINKS to unknown routes:', brokenLinks.size);
[...brokenLinks.entries()].slice(0, 15).forEach(([l, from]) => console.log('  ', l, '<- e.g.', [...from][0], `(+${from.size - 1})`));
console.log('\nNON-200:', by((r) => r.status !== 200).slice(0, 10).map((r) => r.path + ' ' + r.status));
fs.writeFileSync('data/_audit-crawl.json', JSON.stringify(rows));

// site-level files
console.log('\nSITE FILES');
for (const f of ['/robots.txt', '/sitemap.xml', '/favicon.ico', '/llms.txt', '/.well-known/security.txt', '/nope-404/']) {
  const r = await get(BASE + f);
  console.log('  ', f, r.status, r.headers ? (r.headers.get('content-type') || '') : '');
}
const home = await get(BASE + '/');
const hh = {};
['strict-transport-security', 'x-frame-options', 'x-content-type-options', 'content-security-policy', 'referrer-policy', 'permissions-policy', 'cache-control'].forEach((k) => (hh[k] = home.headers.get(k) || '(missing)'));
console.log('\nSECURITY/CACHE HEADERS (home):', hh);
const www = await get(BASE.replace('://', '://www.'));
console.log('www host:', www.status || www.error);
const http = await fetch(BASE.replace('https', 'http'), { redirect: 'manual' }).then((r) => r.status).catch((e) => e.message);
console.log('http -> https:', http);
const noSlash = await get(BASE + '/bar-freezers');
console.log('no trailing slash /bar-freezers ->', noSlash.status, noSlash.headers && noSlash.headers.get('location'));
