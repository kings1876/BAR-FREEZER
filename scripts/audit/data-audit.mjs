// Pass 1a: catalogue data integrity audit (run from repo root: node scripts/audit/data-audit.mjs)
import fs from 'fs';

const P = JSON.parse(fs.readFileSync('src/config/products.generated.json', 'utf8'));
const issues = {};
const add = (k, v) => (issues[k] = issues[k] || []).push(v);

const ids = new Map(), slugs = new Map(), names = new Map();
for (const p of P) {
  if (ids.has(p.id)) add('duplicate id', p.id); ids.set(p.id, 1);
  if (slugs.has(p.slug)) add('duplicate slug', p.slug); slugs.set(p.slug, 1);
  const nk = (p.brand + '|' + p.name).toLowerCase();
  if (names.has(nk)) add('duplicate brand+name', p.name.slice(0, 60)); names.set(nk, 1);
  if (!p.slug || /[^a-z0-9-]/.test(p.slug)) add('bad slug chars', p.slug);
  if (p.slug && p.slug.length > 100) add('slug > 100 chars', p.slug.slice(0, 50));
  if (!(typeof p.price === 'number' && p.price > 0)) add('missing/invalid price', p.id);
  if (typeof p.price === 'number' && p.price > 60000) add('price > $60k', p.id + ' $' + p.price);
  if (typeof p.price === 'number' && p.price < 10) add('price < $10', p.id + ' $' + p.price);
  if (!p.images || !p.images.length) add('no image', p.id);
  else for (const im of p.images) if (!fs.existsSync('public' + im)) add('image file missing', p.id + ' ' + im);
  if (!p.name || p.name.length < 5) add('short name', p.id);
  if (/<[a-z][\s\S]*>|&#\d+;|&amp;/i.test(p.name + p.shortDescription)) add('html/entity in text', p.id);
  if (!p.brand) add('no brand', p.id);
  if (!p.primaryCategory || !p.categorySlug || !p.type) add('missing category fields', p.id);
  if (p.primaryCategory !== 'Accessories & Parts') {
    if (!p.widthMm) add('no width (non-accessory)', p.id);
    if (!p.capacityLitres) add('no capacity (non-accessory)', p.id);
  }
  if (p.widthMm && (p.widthMm < 150 || p.widthMm > 6000)) add('implausible width', p.id + ' ' + p.widthMm);
  if (/undefined|null|NaN/.test(JSON.stringify([p.name, p.shortDescription, p.fullDescription]))) add('undefined/null/NaN text', p.id);
  if (p.alternatives && p.alternatives.some((a) => !ids.has(a) && !P.some((q) => q.id === a))) add('dangling alternative id', p.id);
  if ((p.shortDescription || '').length < 15) add('very short description', p.id);
}
const sizes = {};
for (const p of P) for (const im of p.images || []) { try { const s = fs.statSync('public' + im).size; if (s > 250000) add('image > 250KB', im + ' ' + Math.round(s / 1024) + 'KB'); sizes[im] = s; } catch {} }

console.log('products', P.length);
const keys = Object.keys(issues);
if (!keys.length) console.log('No data issues found');
for (const k of keys) console.log(`\n[${k}] ${issues[k].length}\n  ` + issues[k].slice(0, 6).join('\n  '));
const total = Object.values(sizes).reduce((a, b) => a + b, 0);
console.log('\nimages:', Object.keys(sizes).length, 'total', (total / 1e6).toFixed(1), 'MB', 'avg', Math.round(total / Object.keys(sizes).length / 1024), 'KB');
fs.writeFileSync('data/_audit-data.json', JSON.stringify(issues, null, 1));
