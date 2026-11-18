// Pings IndexNow (Bing, Yandex, Naver, Seznam, Yep) with changed URLs.
// Usage: node scripts/indexnow.mjs <url> [<url> ...]   submit specific URLs
//        node scripts/indexnow.mjs --all                submit every URL in the live sitemap
// The key file lives in /public/<key>.txt and must be live on the site before submitting.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { SITE } = await import(new URL('../src/config/site.js', import.meta.url).href);
const host = SITE.domain;
const origin = `https://${host}`;
const key = fs.readdirSync(path.join(root, 'public')).map((f) => f.match(/^([a-f0-9]{32})\.txt$/)?.[1]).find(Boolean);
if (!key) { console.error('No IndexNow key file (public/<32 hex>.txt) found.'); process.exit(1); }

const args = process.argv.slice(2);
let urls = args.filter((a) => a.startsWith('http'));
if (args.includes('--all')) {
  const loc = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const index = loc(await (await fetch(`${origin}/sitemap.xml`)).text());
  for (const u of index) {
    if (u.endsWith('.xml')) urls.push(...loc(await (await fetch(u)).text()));
    else urls.push(u);
  }
  urls = [...new Set(urls)].filter((u) => !/\.(jpg|jpeg|png|webp|avif)$/i.test(u));
}
if (!urls.length) { console.error('No URLs. Pass URLs or --all.'); process.exit(1); }

for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: batch }),
  });
  console.log(`${batch.length} URLs -> HTTP ${res.status} ${res.statusText}`);
}
