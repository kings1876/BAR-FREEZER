// Tops up thin categories from Australian retailer listings -> data/products-topup.json
import fs from 'fs';
import path from 'path';
import { clean, slugify, makeProduct, downloadAll } from './lib.mjs';

const AU = ['ozcoolers.com.au', 'kitchenlibrary.au', 'cateringequipment.com.au', 'thegoodguys.com.au', 'bar-fridges-australia.com.au', 'restaurantequipment.com.au', 'allfixelectrical.com.au'];
const L = AU.flatMap((f) => JSON.parse(fs.readFileSync(`data/retail-${f}.json`, 'utf8')));
const existing = fs.readdirSync('data').filter((f) => /^products-.*[.]json$/.test(f) && f !== 'products-topup.json').flatMap((f) => JSON.parse(fs.readFileSync('data/' + f, 'utf8')));
const haveModel = new Set(existing.map((p) => String(p.model).toLowerCase().replace(/[^a-z0-9]/g, '')));
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
const price = (l) => Math.min(...l.variants.map((v) => parseFloat(v.price)).filter((x) => x > 0));
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });
const modelOf = (t) => (clean(t).replace(/[()]/g, ' ').split(/\s+/).filter((x) => /[0-9]/.test(x) && /[A-Za-z]/.test(x) && x.length >= 4 && !/^\d+(l|ltr|mm|w|watt|kg)$/i.test(x) && !/^\d+x\d+/i.test(x)).slice(-1)[0] || slugify(t).slice(0, 14).toUpperCase()).replace(/^[-–]+|[-–,]+$/g, '');
const doorsOf = (t) => { const m = t.match(/(\d)\s*(?:x\s*)?(?:glass\s*|solid\s*|sliding\s*|hinged\s*)*door/i) || []; if (m[1]) return Number(m[1]); const w = t.match(/\b(single|one|two|double|three|triple|four)\b/i); return w ? { single: 1, one: 1, two: 2, double: 2, three: 3, triple: 3, four: 4 }[w[1].toLowerCase()] : 1; };

const out = [];
const jobs = [];
function add(group, brand, cat, opts = {}) {
  const l = group[0];
  if (!l.images || !l.images[0]) return null;
  const title = clean(opts.title || l.title);
  const model = opts.model || modelOf(l.title);
  const key = norm(model);
  if (haveModel.has(key) || out.some((o) => norm(o.model) === key && o.brand === brand)) return null;
  const slug = slugify(`${brand} ${title} ${model}`).slice(0, 110);
  const ext = (path.extname(new URL(l.images[0]).pathname) || '.jpg').toLowerCase();
  const dir = opts.dir || slugify(brand);
  const fname = `${slug.slice(0, 60)}${ext}`;
  jobs.push({ url: l.images[0] + (l.images[0].includes('?') ? '&' : '?') + 'width=900', dest: path.join('public/images/products', dir, fname) });
  const nDoors = doorsOf(l.title);
  const glass = /glass/i.test(l.title);
  const p = makeProduct({
    id: `tu-${slugify(brand).slice(0, 4)}-${slugify(model).slice(0, 24)}-${out.length}`,
    sku: model, brand, model, name: opts.name || (new RegExp('^' + brand.replace(/[.()]/g, ''), 'i').test(title) ? title : `${brand} ${title}`).slice(0, 150), title, slug, ...cat,
    doorCount: opts.doorCount ?? (cat.primaryCategory === 'Accessories & Parts' ? 0 : nDoors), doorType: /drawer/i.test(l.title) ? 'drawer' : glass ? 'glass' : 'solid', doorStyle: /drawer/i.test(l.title) ? 'drawer' : 'hinged',
    specs: { Model: model, Brand: brand, ...(opts.specs || {}) }, images: [`/images/products/${dir}/${fname}`], sourceUrl: l.url,
    shortDescription: opts.short || `${title}.`,
    fullDescription: opts.full || `${title}. Specifications are based on the supplier's published details; contact us to confirm specifications, availability and delivery to your postcode.`
  });
  p.price = Math.round(median(group.map(price)));
  p.priceBasis = 'au-retail';
  out.push(p);
  return p;
}
// group listings by model key
const byModel = (arr) => { const m = new Map(); for (const l of arr) { const k = norm(modelOf(l.title)); if (!m.has(k)) m.set(k, []); m.get(k).push(l); } return [...m.values()]; };

// 1. Combination fridge-freezers (dual-temperature under-counter units)
{
  const arr = L.filter((l) => /dual[- ]?temp|fridge[ \/-]freezer|fridge & freezer|fridge\/freezer/i.test(l.title) && /under ?(counter|bench)|counter fridge|drawer/i.test(l.title) && !/oven|combi|supermarket|domestic|island|upright|thermometer|control|module|integrated|cabinet \||KURF18-3 N/i.test(l.title) && l.images && l.images[0] && price(l) > 500);
  for (const g of byModel(arr)) {
    const t = g[0].title; const brand = /turbo air/i.test(t + g[0].vendor) ? 'Turbo Air' : /skipio/i.test(g[0].vendor + t) ? 'Skipio' : /thermocool/i.test(g[0].vendor + t) ? 'Thermocool' : /polar/i.test(g[0].vendor + t) ? 'Polar' : clean(g[0].vendor);
    add(g, brand, R('Bar Fridges & Coolers', 'Combination Fridge-Freezers', 'combination-fridge-freezers', 'Split Dual Temperature'), { title: clean(t.replace(/\s*-\s*\d{5,7}$/, '')) });
  }
}

// 2. Back bar freezers: bar-sized freezers sold for back bar / under-bar use
{
  const arr = L.filter((l) => /bar freezer|glass door freezer|underbench (storage )?freezers?|undercounter glass|mini glass door freezer/i.test(l.title) && /freezer/i.test(l.title) && !/fridge|glasswasher|clearance|340l|555l|^2nds|scratch|ex[- ]?display|upright|supermarket|multideck|chest|ice cream|nova/i.test(l.title) && !/^i\.c\.e$/i.test(l.vendor) && l.images && l.images[0] && price(l) > 400 && price(l) < 3600);
  for (const g of byModel(arr)) {
    const t = g[0].title; const brand = /fed-x|fed/i.test(g[0].vendor) ? 'F.E.D.' : /exquisite/i.test(g[0].vendor + t) ? 'Exquisite' : /thermaster/i.test(g[0].vendor + t) ? 'Thermaster' : /dellware|dellcool/i.test(g[0].vendor + t) ? 'Dellware' : clean(g[0].vendor).replace(/ - Bar Fridges/, '');
    add(g, brand, R('Bar Freezers', 'Back Bar Freezers', 'back-bar-freezers', /glass/i.test(t) ? 'Glass Door Back Bar' : 'Solid Door Back Bar'), { title: t.replace(/\s*-\s*\d{5,7}$/, '') });
  }
}

// 3. Anvil bar and display units
{
  const arr = L.filter((l) => /anvil/i.test(l.title + l.vendor) && /back ?bar|gelato|ice-?cream|drawer display|under ?bar|undercounter/i.test(l.title) && !/pizza|ingredient|hot|cake|proving|sandwich|cold food|glasswasher/i.test(l.title) && l.images && l.images[0] && price(l) > 400);
  for (const g of byModel(arr)) {
    const t = g[0].title; const n = doorsOf(t);
    let cat;
    if (/gelato|ice-?cream/i.test(t)) cat = R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', 'Ice Cream & Gelato Display');
    else if (/drawer display/i.test(t)) cat = R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Drawer Underbench Fridge');
    else if (/freezer/i.test(t)) cat = R('Bar Freezers', 'Back Bar Freezers', 'back-bar-freezers', 'Glass Door Back Bar');
    else if (/fridge undercounter glass/i.test(t)) cat = R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Glass Door Under Bar');
    else if (/BBZ/i.test(t)) cat = R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', Math.min(n, 4) + ' Door Bottle Cooler');
    else if (/glass door/i.test(t)) cat = R('Bar Fridges & Coolers', 'Back Bar Fridges', 'back-bar-fridges', 'Hinged Glass Back Bar');
    else cat = R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Solid Door Under Bar');
    add(g, 'Anvil', cat, { title: clean(t.replace(/\s*-\s*\d{5,7}$/, '')) });
  }
}

// 4. Alfresco / outdoor bar fridges
{
  const arr = L.filter((l) => /alfresco|outdoor/i.test(l.title) && /fridge|chiller|cooler/i.test(l.title) && !/cover|freezer|bbq|barbecue|kitchen|oven|cabinet|table|chair|heater/i.test(l.title) && !/scratch|2nds|ex[- ]?display/i.test(l.title) && l.images && l.images[0] && price(l) > 400);
  for (const g of byModel(arr).slice(0, 14)) {
    const t = g[0].title; const n = doorsOf(t);
    const brand = /husky/i.test(g[0].vendor + t) ? 'Husky' : /schmick/i.test(g[0].vendor + t) ? 'Schmick' : /rhino/i.test(g[0].vendor + t) ? 'Rhino' : /beefeater/i.test(g[0].vendor + t) ? 'BeefEater' : clean(g[0].vendor).replace(/ - Bar Fridges/, '');
    add(g, brand, R('Bar Fridges & Coolers', 'Outdoor / Alfresco Bar Fridges', 'outdoor-alfresco-fridges', n === 1 ? 'Single Door Alfresco' : n === 2 ? 'Double Door Alfresco' : 'Triple Door Alfresco'), { title: t });
  }
}

// 5. Fridge door hardware (AllFix, OzCoolers)
{
  const arr = L.filter((l) => /allfix|ozcoolers/.test(l.host) && /(door handle|handle base|handle cover|hinge (pin|plate|bearing|left|right|interlock)|door reversing kit|door hinge)/i.test(l.title) && /fridge|freezer/i.test(l.title) && !/secondhand|used|shopsoiled|dryer|washing|dishwasher/i.test(l.title) && l.images && l.images[0] && price(l) > 5);
  for (const l of arr.slice(0, 10)) {
    const brand = clean(String(l.vendor).split(',')[0]);
    add([l], brand, R('Accessories & Parts', 'Door Locks & Gaskets', 'door-locks-gaskets', 'Hinges & Handles'), { dir: 'accessories', model: (l.title.match(/Part\s*(?:No\.?|#)\s*:?\s*([A-Z0-9-]+)/i) || [])[1] || modelOf(l.title), title: clean(l.title.replace(/\s*-\s*Part\s*(No\.?|#).*$/i, '')) });
  }
}

// 6. Castors and legs
{
  const arr = L.filter((l) => /(castor|caster|legs? with|adjustable leg|s\/s legs with double centre brace)/i.test(l.title) && !/deli|display|oven|freezer|fridge|workbench|trolley|sink|laundry|furniture|table|blum|revego|plinth leg|block for|clip for|bench|bin on|on castors|pass through|saladette|service cart|caddy|spinner|slim rectangle|deck 1|top suspended|dolly|waste|dishwasher|urn|brace|bracing|pump|wash tower|baking|rack/i.test(l.title) || /s\/s legs with double centre brace/i.test(l.title) && price(l) >= 12 && price(l) < 700 && l.images && l.images[0]);
  const seen = new Set();
  for (const l of arr) {
    const k = norm(l.title).slice(0, 40); if (seen.has(k)) continue; seen.add(k);
    const brand = /schmick/i.test(l.vendor) ? 'Schmick' : /mixrite/i.test(l.vendor) ? 'Mixrite' : /modular/i.test(l.vendor + l.title) ? 'Modular Systems' : /f\.?e\.?d/i.test(l.vendor + l.title) ? 'F.E.D.' : clean(l.vendor);
    add([l], brand, R('Accessories & Parts', 'Castors, Legs & Stands', 'castors-legs-stands', /leg/i.test(l.title) && !/castor|caster/i.test(l.title) ? 'Adjustable Stainless Legs' : 'Lockable Swivel Castors'), { dir: 'accessories', title: clean(l.title) });
  }
}

// 7. Cleaning products for stainless steel, glass and coils
{
  const arr = L.filter((l) => /(glass.*stainless|stainless.*(cleaner|polish|protector)|steelkleen|glass cleaner|glass spray|glasskleen)/i.test(l.title) && /clean|polish|protector|wipes|spray/i.test(l.title) && !/dispenser|nespresso|karcher|window vac|cooktop|ceramic|steam|piano|hinge|wine|bowl|bucket|nickel/i.test(l.title) && price(l) > 3 && price(l) < 120 && l.images && l.images[0]);
  for (const g of byModel(arr)) {
    const l = g[0];
    add(g, clean(l.vendor), R('Accessories & Parts', 'Covers & Cleaning', 'covers-cleaning', 'Stainless & Glass Cleaners'), { dir: 'accessories', title: clean(l.title) });
  }
}

// 8. Domestic freezers (Westinghouse, Haier), Electrolux wine and refrigerated bases, slush machines
{
  const HB = R('Bar Freezers', 'Home Bar & Outdoor Freezers', 'home-bar-outdoor-freezers', 'Man Cave & Home Bar');
  for (const l of L.filter((x) => /westinghouse/i.test(x.vendor) && /(chest|vertical) freezer/i.test(x.title) && x.images && x.images[0] && price(x) > 150)) add([l], 'Westinghouse', HB, { title: clean(l.title), dir: 'westinghouse' });
  for (const l of L.filter((x) => /haier/i.test(x.vendor) && /vertical hybrid freezer|chest freezer/i.test(x.title) && x.images && x.images[0] && price(x) > 150)) add([l], 'Haier', HB, { title: clean(l.title), dir: 'haier' });
  for (const l of L.filter((x) => /electrolux/i.test(x.vendor) && /wine refrigerator/i.test(x.title) && x.images && x.images[0])) add([l], 'Electrolux', R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', 'Single Zone Wine Cabinets'), { title: clean(l.title), dir: 'electrolux' });
  for (const l of L.filter((x) => /electrolux/i.test(x.vendor) && /refrigerated base/i.test(x.title) && /(2|3) doors|drawers/i.test(x.title) && x.images && x.images[0]).slice(0, 6)) add([l], 'Electrolux', R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', /drawer/i.test(l.title) ? 'Drawer Underbench Fridge' : 'Double Door Under Bar'), { title: clean(l.title.replace(/s*-s*[A-Z0-9]{8,}$/, '')), dir: 'electrolux' });
  for (const l of L.filter((x) => /ninja/i.test(x.vendor) && /slushi/i.test(x.title) && x.images && x.images[0]).slice(0, 4)) add([l], 'Ninja', R('Bar Freezers', 'Glass Frosters & Specialty', 'glass-frosters-specialty', 'Slush & Frozen Drink Freezers'), { title: clean(l.title), dir: 'ninja' });
}

for (let i = out.length - 1; i >= 0; i--) if (out[i].price < 5) out.splice(i, 1);
fs.writeFileSync('data/products-topup.json', JSON.stringify(out, null, 1));
const c = {};
out.forEach((p) => { const k = `${p.subCategory} > ${p.type}`; c[k] = (c[k] || 0) + 1; });
console.log('products:', out.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
