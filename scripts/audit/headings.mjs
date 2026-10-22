// Finds pages whose headings skip a level (for example h1 straight to h3) or have no/multiple h1.
const BASE = (process.argv[2] || 'https://barfreezer.com.au').replace(/\/$/, '');
const sm = await (await fetch(BASE + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
const bad = [];
let i = 0;
await Promise.all(Array.from({ length: 8 }, async () => { while (i < urls.length) { const u = urls[i++]; const h = (await (await fetch(BASE + u)).text()).replace(/<script[\s\S]*?<\/script>/g, ''); const lv = [...h.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]); let prev = 0, skip = false; for (const l of lv) { if (prev && l > prev + 1) skip = true; prev = l; } const h1 = lv.filter((x) => x === 1).length; if (skip || h1 !== 1) bad.push(u + ' h1=' + h1 + (skip ? ' skip ' + lv.join('') : '')); } }));
console.log('pages', urls.length, 'with heading issues', bad.length); console.log(bad.slice(0, 15).join('\n'));
