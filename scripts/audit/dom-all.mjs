// Counts DOM elements on every sitemap page (server HTML, scripts removed) and lists the pages over the limit.
// Lighthouse flags "excessive DOM size" from about 800 elements. Usage: node scripts/audit/dom-all.mjs [base] [limit]
const BASE = (process.argv[2] || 'https://barfreezer.com.au').replace(/\/$/, '');
const LIMIT = Number(process.argv[3] || 800);
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
const res = [];
let i = 0;
await Promise.all(Array.from({ length: 10 }, async () => {
  while (i < urls.length) {
    const u = urls[i++];
    const h = (await (await fetch(BASE + u)).text()).replace(/<script[\s\S]*?<\/script>/g, '');
    res.push([u, (h.match(/<[a-zA-Z][^>]*>/g) || []).length]);
  }
}));
const over = res.filter((r) => r[1] > LIMIT).sort((a, b) => b[1] - a[1]);
const groups = {};
for (const [u, n] of over) { const k = u.split('/')[1] || 'home'; (groups[k] = groups[k] || []).push(n); }
console.log('pages', res.length, 'over', LIMIT, ':', over.length);
for (const [k, a] of Object.entries(groups)) console.log(k, a.length, 'max', Math.max(...a), 'min', Math.min(...a));
console.log(over.slice(0, 8).map((r) => r[1] + ' ' + r[0]).join('\n'));
