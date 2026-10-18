// Fetches Hoshizaki Australia products from the public WooCommerce Store API into data/hoshizaki-raw.json.
import fs from 'fs';

let all = [];
for (let pg = 1; pg <= 10; pg++) {
  const r = await fetch(`https://hoshizaki.com.au/wp-json/wc/store/v1/products?per_page=100&page=${pg}`);
  if (!r.ok) break;
  const j = await r.json();
  if (!j.length) break;
  all = all.concat(j);
}
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/hoshizaki-raw.json', JSON.stringify(all));
console.log('products:', all.length);
