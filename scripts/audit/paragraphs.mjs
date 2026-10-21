// Lists the longest paragraphs (in words) on pages, to find "paragraphs are too long" offenders.
// Usage: node scripts/audit/paragraphs.mjs <base> <path...>   or   node scripts/audit/paragraphs.mjs <base> --all
import fs from 'fs';
const [base, ...rest] = process.argv.slice(2);
let paths = rest;
if (rest[0] === '--all') {
  const sm = await (await fetch(base + '/sitemap.xml')).text();
  paths = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
}
const min = Number(process.env.MIN || 0);
const out = [];
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => {
  while (i < paths.length) {
    const u = paths[i++];
    const h = (await (await fetch(base + u)).text()).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');
    let max = 0, txt = '';
    for (const m of h.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)) {
      const t = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const w = t.split(' ').length;
      if (w > max) { max = w; txt = t; }
    }
    out.push([u, max, txt]);
  }
}));
out.sort((a, b) => b[1] - a[1]);
for (const [u, w, t] of out.filter((x) => x[1] >= min).slice(0, Number(process.env.TOP || 10))) console.log(w, u, '\n   ', t.slice(0, 160));
