// Breadth-first click depth from the home page over plain <a href> links (what Semrush's crawler sees without JS).
// Usage: node scripts/audit/depth.mjs [base]
const BASE = (process.argv[2] || 'https://barfreezer.com.au').replace(/\/$/, '');
const depth = { '/': 0 };
let frontier = ['/'];
const norm = (h) => { const p = h.split('#')[0].split('?')[0]; return p.endsWith('/') ? p : p + '/'; };
while (frontier.length) {
  const next = [];
  await Promise.all(Array.from({ length: 8 }, async (_, w) => {
    for (let i = w; i < frontier.length; i += 8) {
      const u = frontier[i];
      const h = await (await fetch(BASE + u)).text();
      for (const m of h.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
        const l = norm(m[1]);
        if (/^\/(api|_next|images|admin)\//.test(l) || /\.[a-z0-9]{2,4}\/$/.test(l)) continue;
        if (!(l in depth)) { depth[l] = depth[u] + 1; next.push(l); }
      }
    }
  }));
  frontier = next;
}
const deep = Object.entries(depth).filter(([, d]) => d > 3);
console.log('pages', Object.keys(depth).length, 'deeper than 3:', deep.length);
console.log(deep.slice(0, 30).map(([u, d]) => d + ' ' + u).join('\n'));
const by = {};
for (const d of Object.values(depth)) by[d] = (by[d] || 0) + 1;
console.log(by);
console.log('accessories root depth', depth['/accessories-parts/'], 'co2', depth['/accessories-parts/glass-frosting-accessories/co2-frosters/']);
