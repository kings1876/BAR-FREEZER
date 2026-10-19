// Builds genuine refrigeration accessory / spare part products from Australian retailer listings
// (OzCoolers, Bar Fridges Australia) -> data/products-accessories.json. Only listings with a photo are kept.
import fs from 'fs';
import path from 'path';
import { clean, slugify, makeProduct, downloadAll } from './lib.mjs';

const L = ['ozcoolers.com.au', 'bar-fridges-australia.com.au'].flatMap((h) => JSON.parse(fs.readFileSync(`data/retail-${h}.json`, 'utf8')));
const R = (subCategory, categorySlug, type) => ({ primaryCategory: 'Accessories & Parts', subCategory, categorySlug, type });

const RULES = [
  [/ice (storage )?bin/i, R('Ice Machines & Ice Storage', 'ice-machines-storage', 'Insulated Ice Bins')],
  [/wine shelf|wine shelves|saddle/i, R('Shelving, Baskets & Trays', 'shelving-baskets-trays', 'Wine Cradles')],
  [/roller shelf|slide out|shelf support|shelf divider|extra shelves|\bshelf\b|\bshelves\b/i, R('Shelving, Baskets & Trays', 'shelving-baskets-trays', 'Wire Shelves & Clips')],
  [/guide set/i, R('Shelving, Baskets & Trays', 'shelving-baskets-trays', 'Guide Sets')],
  [/lock replacement|door lock|\block\b/i, R('Door Locks & Gaskets', 'door-locks-gaskets', 'Key Lock Assemblies')],
  [/hinge|handle/i, R('Door Locks & Gaskets', 'door-locks-gaskets', 'Hinges & Handles')],
  [/thermometer|data logger|logger|probe|thermostat|controller/i, R('Spare Parts (Compressors, Fans, Thermostats)', 'spare-parts', 'Digital Thermostats & Probes')],
  [/voltage stabili[sz]er/i, R('Spare Parts (Compressors, Fans, Thermostats)', 'spare-parts', 'Power Protection')],
  [/water filter/i, R('Ice Machines & Ice Storage', 'ice-machines-storage', 'Water Filtration')]
];
const EXCLUDE = /wallshelf|workbench|overshelf|over shelves|waste tube|transmitter|decal|vaccine|sn-edp/i;

const out = [];
const jobs = [];
const seen = new Set();
for (const l of L) {
  if (!/Parts|Accessor|Stainless Steel Shelves/i.test(l.type || '') && !/^Parts$/.test(l.type || '') && !/ice (storage )?bin/i.test(l.title)) continue;
  if (EXCLUDE.test(l.title) || /^hoshizaki$/i.test(l.vendor)) continue;
  const rule = RULES.find(([re]) => re.test(l.title));
  if (!rule) continue;
  if (!l.images || !l.images[0]) continue;
  const price = Math.min(...l.variants.map((v) => parseFloat(v.price)).filter((x) => x > 0));
  if (!Number.isFinite(price) || price < 5) continue;
  const brand = /simco|polar|schmick|ics pacific|logtag|euro chill|mixrite|ice-o-matic/i.test(l.vendor) ? clean(l.vendor) : /bar fridges/i.test(l.vendor) ? 'Schmick' : clean(l.vendor);
  const title = clean(l.title);
  const model = (title.match(/\b[A-Z0-9][A-Z0-9-]{3,}\b/g) || []).filter((t) => /[0-9]/.test(t)).slice(-1)[0] || slugify(title).slice(0, 18).toUpperCase();
  const slug = slugify(`${brand} ${title}`).slice(0, 110);
  if (seen.has(slug)) continue;
  seen.add(slug);
  const ext = (path.extname(new URL(l.images[0]).pathname) || '.jpg').toLowerCase();
  const fname = `${slug.slice(0, 60)}${ext}`;
  jobs.push({ url: l.images[0] + (l.images[0].includes('?') ? '&' : '?') + 'width=900', dest: path.join('public/images/products/accessories', fname) });
  const p = makeProduct({
    id: `acc-${slugify(brand).slice(0, 4)}-${slugify(model).slice(0, 24)}-${out.length}`,
    sku: model,
    brand,
    model,
    name: /^(simco|polar|schmick|ics|logtag|euro|mixrite|ice-o)/i.test(title) ? title : `${brand} ${title}`,
    title,
    slug,
    ...rule[1],
    doorCount: 0,
    doorType: 'solid',
    doorStyle: 'hinged',
    finish: '',
    specs: { Model: model, Brand: brand, Type: rule[1].type },
    images: [`/images/products/accessories/${fname}`],
    sourceUrl: l.url,
    shortDescription: `${title}.`,
    fullDescription: `${title}. Genuine accessory for commercial and bar refrigeration. Check compatibility with your model before ordering; contact us to confirm availability and delivery to your postcode.`
  });
  p.price = Math.round(price * 100) / 100;
  p.priceBasis = 'au-retail';
  out.push(p);
}
fs.writeFileSync('data/products-accessories.json', JSON.stringify(out, null, 1));
const c = {};
out.forEach((p) => { const k = `${p.subCategory} > ${p.type}`; c[k] = (c[k] || 0) + 1; });
console.log('accessories:', out.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
