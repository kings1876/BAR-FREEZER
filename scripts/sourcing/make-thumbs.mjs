// Creates 480px "-sm.webp" and 800px "-md.webp" copies of every product's first photo, used by product cards (srcset).
// Usage: node scripts/sourcing/make-thumbs.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const products = JSON.parse(fs.readFileSync('src/config/products.light.json', 'utf8'));
let made = 0, skipped = 0, missing = 0;
for (const p of products) {
  const first = (p.images || [])[0];
  if (!first || !/\.webp$/.test(first)) continue;
  const src = path.join('public', first);
  const out = src.replace(/\.webp$/, '-sm.webp');
  if (!fs.existsSync(src)) { missing++; continue; }
  const outMd = src.replace(/\.webp$/, '-md.webp');
  if (fs.existsSync(out)) skipped++;
  else { await sharp(src).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out); made++; }
  if (!fs.existsSync(outMd)) await sharp(src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 74 }).toFile(outMd);
}
console.log({ made, skipped, missing });
