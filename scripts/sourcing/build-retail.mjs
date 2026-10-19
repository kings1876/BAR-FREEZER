// Builds product records for brands without an accessible official catalogue from Australian retailer
// listings (price, photo, title/description facts) -> data/products-retail-<brand>.json
// Usage: node scripts/sourcing/build-retail.mjs [maxPerBrand]
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const MAX = Number(process.argv[2] || 50);
const HOSTS = ['ozcoolers.com.au', 'kitchenlibrary.au', 'cateringequipment.com.au', 'thegoodguys.com.au', 'bar-fridges-australia.com.au'];
const L = HOSTS.flatMap((h) => JSON.parse(fs.readFileSync(`data/retail-${h}.json`, 'utf8')));

const BRANDS = {
  Bromic: /bromic/i,
  Polar: /^polar$|polar /i,
  Thermaster: /thermaster/i,
  Atosa: /atosa/i,
  'F.E.D.': /^fed(-x| s)?$|^fed /i,
  Anvil: /anvil/i,
  Exquisite: /exquisite/i,
  Husky: /husky/i,
  Haier: /haier/i,
  Hisense: /hisense/i,
  Westinghouse: /westinghouse/i,
  Electrolux: /electrolux/i,
  Liebherr: /liebherr/i,
  Schmick: /schmick/i
};
const COOL = /fridge|freezer|cooler|chiller|refrigerat|wine|keg|bar cabinet|merchandiser|froster|ice (maker|machine)/i;
const BAD = /spare|part\b|parts\b|gasket|cover\b|shelf\b|shelves|lock\b|thermostat|\bfan\b|compressor|kit\b|castor|caster|basket|tray|filter|hose|handle|hinge|light|led strip|door seal|warranty|installation|trolley|rack|stand\b|bundle/i;

const numWord = { one: 1, single: 1, two: 2, double: 2, twin: 2, three: 3, triple: 3, four: 4, quad: 4 };
function doorsOf(t) {
  let m = t.match(/(\d)\s*(?:x\s*)?(?:full\s*)?(?:glass\s*|solid\s*|sliding\s*|hinged\s*|swing\s*)*(?:door|drawer)/i);
  if (m) return Number(m[1]);
  m = t.match(/\b(one|single|two|double|twin|three|triple|four|quad)\b[\s-]*(?:glass\s*|solid\s*|sliding\s*|hinged\s*)*(?:door|drawer)/i);
  return m ? numWord[m[1].toLowerCase()] : 0;
}
function modelOf(l) {
  const sku = clean((l.variants[0] && l.variants[0].sku) || '');
  const toks = l.title.replace(/[()]/g, ' ').split(/\s+/).filter((t) => /[0-9]/.test(t) && /[A-Za-z]/.test(t) && t.length >= 4 && !/^\d+(l|ltr|litre|mm|kg|w)$/i.test(t) && !/^\d+x\d+/i.test(t));
  const fromTitle = toks.length ? toks[toks.length - 1].replace(/^[-–]+|[-–,]+$/g, '') : '';
  return clean(fromTitle || sku || l.handle).slice(0, 40);
}
function dimsOf(text) {
  const m = text.match(/(\d{3,4})\s*(?:mm)?\s*[xX×]\s*(\d{3,4})\s*(?:mm)?\s*[xX×]\s*(\d{3,4})/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  const w = text.match(/width[^0-9]{0,15}(\d{3,4})/i), d = text.match(/depth[^0-9]{0,15}(\d{3,4})/i), h = text.match(/height[^0-9]{0,15}(\d{3,4})/i);
  return [w ? Number(w[1]) : 0, d ? Number(d[1]) : 0, h ? Number(h[1]) : 0];
}

const R = (primaryCategory, subCategory, categorySlug, type, rank) => ({ primaryCategory, subCategory, categorySlug, type, rank });
function classify(l, doors) {
  const t = (l.title + ' ' + (l.type || '')).toLowerCase();
  const n = Math.min(Math.max(doors, 1), 4);
  const isFreezer = /freezer|froster|-18|ice cream|gelato/.test(t) && !/fridge[- ]freezer|fridge\/freezer/.test(t);
  if (/ice (maker|machine|flaker)/.test(t)) return R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', /under|bar|compact|self.contained|undercounter/.test(t) ? 'Underbar Ice Makers' : 'Ice Maker', 9);
  if (/fridge[- ]freezer|fridge\/freezer|combination/.test(t)) return R('Bar Fridges & Coolers', 'Combination Fridge-Freezers', 'combination-fridge-freezers', 'Split Dual Temperature', 8);
  if (isFreezer) {
    if (/glass froster|frosted glass|froster/.test(t)) return R('Bar Freezers', 'Glass Frosters & Specialty', 'glass-frosters-specialty', 'Glass Frosters & Mug Chillers', 1);
    if (/ice cream|gelato|scoop|dipping/.test(t)) return R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', 'Ice Cream & Gelato Display', 6);
    if (/chest|bar chest|lid/.test(t)) return R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', /glass|curved|sliding/.test(t) ? 'Sliding Glass Lid Chest' : 'Bar Chest Freezers', 5);
    if (/bench ?top|counter ?top|table ?top|countertop/.test(t)) return R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', 'Bench-top Freezers', 5);
    if (/under ?(bench|counter|bar)|bar freezer|drawer|work ?bench|gastronorm|prep/.test(t)) return /drawer/.test(t) ? R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', 'Drawer Freezers (1-4 drawer)', 1) : R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', n === 1 ? 'Single Door' : n === 2 ? 'Double Door' : 'Triple Door', 1);
    if (/glass door|display/.test(t)) return R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', n === 1 ? 'Upright Single Glass Door' : 'Upright Double Glass Door', 4);
    if (/upright|solid door|door/.test(t)) return R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', n === 1 ? 'Upright 1 Door (Single)' : n === 2 ? 'Upright 2 Door (Double)' : 'Upright 3 Door (Triple)', 3);
    return null;
  }
  if (/wine/.test(t)) return R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', /dual|two zone|2 zone/.test(t) ? 'Dual Zone Wine Cabinets' : 'Single Zone Wine Cabinets', 7);
  if (/keg|beer dispenser|kegerator/.test(t)) return R('Bar Fridges & Coolers', 'Kegerators & Beer Dispensers', 'kegerators-dispensers', /multi|three tap|2 tap|two tap|double tap|twin tap/.test(t) ? 'Multi-Tap Commercial Dispensers' : 'Single Tap Kegerators', 7);
  if (/alfresco|outdoor/.test(t)) return R('Bar Fridges & Coolers', 'Outdoor / Alfresco Bar Fridges', 'outdoor-alfresco-fridges', n === 1 ? 'Single Door Alfresco' : n === 2 ? 'Double Door Alfresco' : 'Triple Door Alfresco', 2);
  if (/bottle cooler|back ?bar|bar cooler|bar chiller/.test(t)) return /sliding/.test(t) ? R('Bar Fridges & Coolers', 'Back Bar Fridges', 'back-bar-fridges', 'Sliding Glass Back Bar', 2) : R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', `${n} Door Bottle Cooler`, 2);
  if (/under ?(bench|counter|bar)|bar fridge|home ?bar|mini ?bar|drinks fridge|beverage fridge|beer fridge|bar refrigerator/.test(t)) {
    if (/beer|sub.?zero/.test(t) && /sub.?zero/.test(t)) return R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Sub-Zero Beer Fridges', 3);
    return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', /drawer/.test(t) ? 'Drawer Underbench Fridge' : /glass/.test(t) ? 'Glass Door Under Bar' : n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar', 2);
  }
  if (/display|merchandiser|chiller|upright|glass door|fridge/.test(t)) return R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers', 4);
  return null;
}

const imgJobs = [];
const summary = {};
for (const [brand, re] of Object.entries(BRANDS)) {
  const seen = new Map();
  for (const l of L) {
    if (!(re.test(l.vendor) || (brand !== 'Polar' && brand !== 'F.E.D.' && re.test(l.title)))) continue;
    if (/^2nds?|^second|ex[- ]?display|biomedical|laborator|vaccine|medical|pharmac|^b grade|b-grade/i.test(l.title)) continue;
    if (!COOL.test(l.title + ' ' + (l.type || '')) || BAD.test(l.title)) continue;
    const price = Math.min(...l.variants.map((v) => parseFloat(v.price)).filter((x) => x > 0));
    if (!Number.isFinite(price) || price < 200) continue;
    const doors = doorsOf(l.title) || doorsOf(l.body || '');
    const cat = classify(l, doors);
    if (!cat) continue;
    const model = modelOf(l);
    const key = slugify(brand + ' ' + model);
    if (seen.has(key)) { seen.get(key).prices.push(price); continue; }
    seen.set(key, { l, doors, cat, model, prices: [price] });
  }
  // Prefer bar-specific categories first, then spread across types
  const list = [...seen.values()].sort((a, b) => a.cat.rank - b.cat.rank);
  const picked = [];
  const perType = {};
  for (const x of list) {
    const k = x.cat.type;
    perType[k] = (perType[k] || 0) + 1;
    if (perType[k] > 12) continue; // keep variety
    picked.push(x);
    if (picked.length >= MAX) break;
  }
  const products = [];
  for (const x of picked) {
    const { l, doors, cat, model } = x;
    const text = l.title + '\n' + (l.body || '');
    const [w, d, h] = dimsOf(text);
    const litres = firstNum((l.title.match(/(\d{2,4})\s*(?:l\b|ltr|litre)/i) || [])[1]);
    const glass = /glass/i.test(l.title);
    const sliding = /sliding/i.test(l.title);
    const drawer = /drawer/i.test(l.title);
    const slug = slugify(`${brand} ${model} ${l.title}`).slice(0, 110);
    const imgs = [];
    if (l.images && l.images[0]) {
      const ext = (path.extname(new URL(l.images[0]).pathname) || '.jpg').toLowerCase();
      const fname = `${slugify(model)}-${slugify(l.handle).slice(0, 20)}${ext}`;
      const dir = slugify(brand);
      imgs.push(`/images/products/${dir}/${fname}`);
      imgJobs.push({ url: l.images[0] + (l.images[0].includes('?') ? '&' : '?') + 'width=1000', dest: path.join('public/images/products', dir, fname) });
    }
    const specs = { Model: model, Manufacturer: brand };
    const bodyLines = (l.body || '').split('\n').map((s) => s.trim()).filter(Boolean);
    for (const line of bodyLines) {
      const m = line.match(/^([A-Za-z][A-Za-z /&()-]{2,28}):\s*(.{1,80})$/);
      if (m && Object.keys(specs).length < 18) specs[clean(m[1])] = clean(m[2]);
    }
    if (w) specs['Dimensions (W x D x H)'] = `${w} x ${d} x ${h} mm`;
    if (litres) specs['Capacity'] = `${litres} L`;
    const price = x.prices.sort((a, b) => a - b)[Math.floor(x.prices.length / 2)];
    const p = makeProduct({
      id: `${slugify(brand).slice(0, 3)}-${slugify(model)}`,
      sku: model,
      brand,
      model,
      name: clean(l.title).replace(new RegExp('^' + brand.replace('.', '\\.') + '\\s*', 'i'), `${brand} `).slice(0, 140),
      title: clean(l.title),
      slug,
      primaryCategory: cat.primaryCategory,
      subCategory: cat.subCategory,
      categorySlug: cat.categorySlug,
      type: cat.type,
      doorCount: doors || 1,
      doorType: drawer ? 'drawer' : sliding ? 'sliding' : glass ? 'glass' : 'solid',
      doorStyle: drawer ? 'drawer' : sliding ? 'sliding' : 'hinged',
      widthMm: w >= 300 && w <= 3600 ? w : 0,
      depthMm: w >= 300 && w <= 3600 ? d : 0,
      heightMm: w >= 300 && w <= 3600 ? h : 0,
      capacityLitres: litres,
      finish: /stainless/i.test(l.title) ? 'stainless' : /black/i.test(l.title) ? 'black' : /white/i.test(l.title) ? 'white' : '',
      installation: /under|bench|counter/i.test(l.title) ? 'under-bench' : 'freestanding',
      features: [],
      specs,
      images: imgs,
      sourceUrl: l.url,
      shortDescription: `${clean(l.title)}.`,
      fullDescription: `${clean(l.title)}. Specifications are based on the supplier's published details; contact us to confirm current specifications, availability and delivery to your postcode.`
    });
    p.price = Math.round(price);
    p.priceBasis = 'au-retail';
    products.push(p);
  }
  fs.writeFileSync(`data/products-retail-${slugify(brand)}.json`, JSON.stringify(products, null, 1));
  summary[brand] = products.length;
}
console.log(summary);
await downloadAll(imgJobs);
