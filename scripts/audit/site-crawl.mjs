// Crawls every URL in the live sitemap and reproduces the checks Semrush Site Audit reported:
// title == H1, orphaned sitemap pages, pages with one incoming internal link, text/HTML ratio, JS+CSS weight.
// Usage: node scripts/audit/site-crawl.mjs [base] ; writes .crawl.json
import fs from 'fs';

const BASE = (process.argv[2] || 'https://barfreezer.com.au').replace(/\/$/, '');
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
console.log('sitemap urls', urls.length);

const dec = (x) => String(x).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const pages = {};
const assetCache = new Map();
let i = 0;
async function assetSize(path) {
  if (assetCache.has(path)) return assetCache.get(path);
  const r = await fetch(BASE + path);
  const b = Buffer.from(await r.arrayBuffer());
  const n = b.length;
  assetCache.set(path, n);
  return n;
}
async function worker() {
  while (i < urls.length) {
    const u = urls[i++];
    try {
      const r = await fetch(BASE + u);
      const h = await r.text();
      const title = dec((h.match(/<title[^>]*>([^<]*)/) || [])[1] || '');
      const h1 = dec(((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '').replace(/<[^>]+>/g, '').trim());
      const body = (h.match(/<body[\s\S]*<\/body>/) || [h])[0];
      const text = body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const links = [...h.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/g)].map((m) => (m[1].endsWith('/') ? m[1] : m[1] + '/'));
      const assets = [...new Set([...h.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+\.(?:js|css))(?:\?[^"]*)?"/g)].map((m) => decodeURI(m[1])))];
      pages[u] = { status: r.status, bytes: Buffer.byteLength(h), textBytes: Buffer.byteLength(text), title, h1, links: [...new Set(links)], assets };
    } catch (e) { pages[u] = { status: 0, error: e.message }; }
  }
}
await Promise.all(Array.from({ length: 10 }, worker));

const inlinks = {};
for (const [u, p] of Object.entries(pages)) for (const l of p.links || []) if (l !== u) (inlinks[l] = inlinks[l] || new Set()).add(u);
const allAssets = [...new Set(Object.values(pages).flatMap((p) => p.assets || []))];
let jsTotal = 0, cssTotal = 0;
for (const a of allAssets) { const n = await assetSize(a); if (a.endsWith('.js')) jsTotal += n; else cssTotal += n; }
const rep = { urls: urls.length, ok: Object.values(pages).filter((p) => p.status === 200).length };
rep.titleEqualsH1 = urls.filter((u) => pages[u].status === 200 && pages[u].title.trim().toLowerCase() === pages[u].h1.trim().toLowerCase());
rep.orphans = urls.filter((u) => !(inlinks[u] && inlinks[u].size));
rep.oneLink = urls.filter((u) => inlinks[u] && inlinks[u].size === 1);
const ratios = urls.map((u) => ({ u, r: pages[u].textBytes / pages[u].bytes })).filter((x) => x.r < 0.1);
rep.lowRatio = ratios.length;
rep.ratioSample = ratios.slice(0, 5).map((x) => x.u + ' ' + (x.r * 100).toFixed(1) + '%');
rep.avgBytes = Math.round(Object.values(pages).reduce((s, p) => s + (p.bytes || 0), 0) / urls.length);
rep.sitewideAssetKB = { js: Math.round(jsTotal / 1024), css: Math.round(cssTotal / 1024), files: allAssets.length };
const perPage = urls.map((u) => (pages[u].assets || []).reduce((s, a) => s + (assetCache.get(a) || 0), 0));
rep.maxPageJsCssKB = Math.round(Math.max(...perPage) / 1024);
rep.avgPageJsCssKB = Math.round(perPage.reduce((a, b) => a + b, 0) / perPage.length / 1024);
fs.writeFileSync('.crawl.json', JSON.stringify({ rep, pages: Object.fromEntries(Object.entries(pages).map(([u, p]) => [u, { ...p, links: undefined }])) }));
console.log(JSON.stringify({ ...rep, titleEqualsH1: rep.titleEqualsH1.length, orphans: rep.orphans.length, oneLink: rep.oneLink.length }, null, 1));
fs.writeFileSync('.crawl-lists.json', JSON.stringify({ titleEqualsH1: rep.titleEqualsH1, orphans: rep.orphans, oneLink: rep.oneLink }));
