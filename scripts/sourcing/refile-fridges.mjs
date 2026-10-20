// Moves refrigerators that were filed under "Bar Freezers" into "Bar Fridges & Coolers" (they are +2..+10 C cabinets, not freezers).
// Detection: tempRange minimum above -8 C, or a fridge/cooler/chiller name with no "freezer" in it.
// Also corrects door count/type from the product name and refreshes the per-product keyword term.
// Usage: node scripts/sourcing/refile-fridges.mjs [--dry]  then run describe.mjs and split-products.mjs
import fs from 'fs';

const DRY = process.argv.includes('--dry');
const FILE = 'src/config/products.generated.json';
const KWF = 'src/config/product-keywords.json';
const g = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(g) ? g : g.products;
const KW = JSON.parse(fs.readFileSync(KWF, 'utf8'));

const isFridge = (p) => {
  if (p.primaryCategory !== 'Bar Freezers' && !KW[p.slug]) return false; // KW[slug] = left over from an earlier run keyed wrongly
  const nums = String(p.tempRange || '').match(/-?\d+/g);
  if (nums && Math.min(...nums.map(Number)) > -8) return true;
  if (/freezer|freezing|sub[- ]?zero|ice cream|gelato/i.test(p.name)) return false;
  return /fridge|cooler|chiller|refrigerat/i.test(p.name);
};
const doors = (n) => {
  if (/\b(four|4)[- ]?(door|glass door|half)/i.test(n) || /\bfour\b/i.test(n)) return 4;
  if (/\b(three|triple|3)\b/i.test(n)) return 3;
  if (/\b(two|double|2|dual)\b/i.test(n)) return 2;
  return 1;
};

let moved = 0;
const report = {};
for (const p of arr) {
  if (!isFridge(p)) continue;
  const n = p.name;
  const glass = /glass/i.test(n);
  const under = /bench|under ?counter|undercounter|under ?bench|counter cooler|snack counter|prep|salad/i.test(n);
  const d = doors(n);
  p.primaryCategory = 'Bar Fridges & Coolers';
  p.doorCount = d;
  p.doorType = glass ? 'glass' : 'solid';
  let term;
  if (under) {
    p.categorySlug = 'under-bar-fridges';
    p.subCategory = 'Under Bar Fridges';
    p.type = d >= 3 ? 'Triple Door Under Bar' : d === 2 ? 'Double Door Under Bar' : glass ? 'Glass Door Under Bar' : 'Single Door Under Bar';
    term = glass ? 'glass door bar fridge' : 'under bench fridge';
  } else {
    p.categorySlug = 'beer-beverage-fridges';
    p.subCategory = 'Beer & Beverage Fridges';
    p.type = 'Beverage Merchandisers';
    term = glass ? 'glass door bar fridge' : 'beer fridge';
  }
  const brand = String(p.brand || '').toLowerCase();
  const model = String(p.model || '').toLowerCase();
  delete KW[p.slug];
  KW[p.id] = { primary: `${brand} ${model} ${term}`.replace(/\s+/g, ' ').trim(), term, supporting: [`${brand} ${term}`, term, model].filter((x, i, a) => x && a.indexOf(x) === i) };
  report[p.categorySlug + '|' + p.type] = (report[p.categorySlug + '|' + p.type] || 0) + 1;
  moved++;
}
console.log('moved', moved, report);
if (!DRY) {
  fs.writeFileSync(FILE, JSON.stringify(g));
  fs.writeFileSync(KWF, JSON.stringify(KW));
}
