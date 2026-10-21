// Shows how many HTML bytes and text bytes each landmark contributes on a page (scripts and svg removed).
// Usage: node scripts/audit/sections.mjs <base> <path>
const [base = 'https://barfreezer.com.au', path = '/'] = process.argv.slice(2);
const raw = await (await fetch(base + path)).text();
const h = raw.replace(/<script[\s\S]*?<\/script>/g, '');
const txt = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
console.log('raw', raw.length, 'scripts', raw.length - h.length, 'svg', (h.match(/<svg[\s\S]*?<\/svg>/g) || []).reduce((s, x) => s + x.length, 0));
for (const t of ['header', 'main', 'footer']) {
  const m = h.match(new RegExp('<' + t + '[\\s\\S]*?</' + t + '>'));
  console.log(t, m ? m[0].length : 0, 'text', m ? txt(m[0]) : 0);
}
console.log('visible text total', txt(h));
