// Converts product photos in public/images/products to WebP (max 1000px, quality 78) and points
// data/products-*.json at the .webp files.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = 'public/images/products';
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(p);
  }
})(ROOT);

let before = 0, after = 0, n = 0, fail = 0;
for (const f of files) {
  const out = f.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    before += fs.statSync(f).size;
    await sharp(f).rotate().resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    after += fs.statSync(out).size;
    fs.unlinkSync(f);
    n++;
  } catch (e) {
    fail++;
    console.log('FAIL', f, e.message);
  }
}
console.log('converted', n, 'failed', fail, 'MB', (before / 1e6).toFixed(1), '->', (after / 1e6).toFixed(1));

for (const j of fs.readdirSync('data').filter((x) => /^products-.*\.json$/.test(x))) {
  const list = JSON.parse(fs.readFileSync(`data/${j}`, 'utf8'));
  for (const p of list) p.images = (p.images || []).map((u) => (/\.(jpe?g|png)$/i.test(u) && fs.existsSync('public' + u.replace(/\.(jpe?g|png)$/i, '.webp')) ? u.replace(/\.(jpe?g|png)$/i, '.webp') : u));
  fs.writeFileSync(`data/${j}`, JSON.stringify(list, null, 1));
}
console.log('product JSON updated');
