// Maps raw Skope models (data/skope-raw.json) onto the site's Product schema and downloads product photos.
import fs from 'fs';
import path from 'path';

const raw = JSON.parse(fs.readFileSync('data/skope-raw.json', 'utf8'));
const OUT_IMG = 'public/images/products/skope';
fs.mkdirSync(OUT_IMG, { recursive: true });

const fam = (p) => p.link.split('/au/')[1].split('/product-view')[0];
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const int = (v) => { const n = parseInt(String(v ?? '').replace(/[^0-9]/g, ''), 10); return Number.isFinite(n) ? n : 0; };
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

const EXCLUDE = /preparation|chefbase|grabgo/;
const rows = raw.filter((p) => !EXCLUDE.test(fam(p)) && !/^fridges\/storage\/upright/.test(fam(p)) && int(p.width) > 0);

function widthRange(w) { return w < 600 ? '<600' : w <= 900 ? '600-900' : w <= 1200 ? '900-1200' : w <= 1500 ? '1200-1500' : w <= 1800 ? '1500-1800' : '1800+'; }
function capRange(l) { return !l ? '' : l < 100 ? '<100' : l < 200 ? '100-200' : l < 300 ? '200-300' : l < 400 ? '300-400' : l < 600 ? '400-600' : '600+'; }

function doorInfo(p) {
  const t = clean(p.doorType).toLowerCase();
  const title = clean(p.title).toLowerCase();
  let doorType = 'solid';
  let doorStyle = 'hinged';
  if (/drawer/.test(t) || /drawer/.test(title)) { doorType = 'drawer'; doorStyle = 'drawer'; }
  else if (/sliding/.test(t) || /sliding/.test(title)) { doorType = 'sliding'; doorStyle = 'sliding'; }
  else if (/glass/.test(t)) doorType = 'glass';
  return { doorType, doorStyle };
}

function categorise(p) {
  const f = fam(p);
  const doors = int(p.doors) || int((p.title.match(/\b(\d)\s+(?:Glass|Solid|Door|Drawer)/i) || [])[1]);
  const { doorType } = doorInfo(p);
  const n = Math.min(doors || 1, 4);
  const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });
  if (f.startsWith('freezers/storage/underbench')) {
    if (doorType === 'drawer') return R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', 'Drawer Freezers (1-4 drawer)');
    return R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', n === 1 ? 'Single Door' : n === 2 ? 'Double Door' : 'Triple Door');
  }
  if (f.startsWith('freezers/storage/freezer-station')) return R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', 'Drawer Freezers (1-4 drawer)');
  if (f.startsWith('freezers/display/upright')) return R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', n === 1 ? 'Upright Single Glass Door' : 'Upright Double Glass Door');
  if (f.startsWith('freezers/ice/display')) return R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', 'Ice Cream & Gelato Display');
  if (f.startsWith('freezers/storage/upright')) return R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', n === 1 ? 'Upright 1 Door (Single)' : n === 2 ? 'Upright 2 Door (Double)' : 'Upright 3 Door (Triple)');
  if (f.startsWith('fridges/display/underbench')) {
    if (doorType === 'sliding') return R('Bar Fridges & Coolers', 'Back Bar Fridges', 'back-bar-fridges', 'Sliding Glass Back Bar');
    if (doorType === 'solid') return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Solid Door Under Bar');
    if (/^HB85/.test(p.model)) return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Glass Door Under Bar');
    return R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', `${n} Door Bottle Cooler`);
  }
  if (f.startsWith('fridges/storage/underbench')) {
    if (doorType === 'drawer') return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Drawer Underbench Fridge');
    if (doorType === 'glass') return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Glass Door Under Bar');
    return R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
  }
  if (f.startsWith('fridges/display/upright')) return R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers');
  return null;
}

function installation(p) {
  const f = fam(p);
  if (/underbench\/backbar/.test(f)) return 'back-bar';
  if (/underbench/.test(f) || /freezer-station/.test(f)) return 'under-bench';
  return 'freestanding';
}

function finish(p) {
  const c = clean(p.color).toLowerCase();
  if (c.startsWith('stainless')) return 'stainless';
  if (c.startsWith('black')) return 'black';
  if (c.startsWith('white')) return 'white';
  return clean(p.material).toLowerCase().includes('stainless') ? 'stainless' : '';
}

const products = [];
const imageJobs = [];
const used = new Set();

for (const p of rows) {
  const cat = categorise(p);
  if (!cat) continue;
  const model = clean(p.model);
  const title = clean(p.title).replace(/\s+,/g, ',');
  const slug = slugify(`skope ${model} ${title}`).slice(0, 110);
  if (used.has(slug)) continue;
  used.add(slug);
  const w = int(p.width), d = int(p.depth), h = int(p.height);
  const vol = int(p.grossVolume);
  const { doorType, doorStyle } = doorInfo(p);
  const warrantyText = clean(p.warranty);
  const warrantyYears = int((warrantyText.match(/(\d+)/) || [])[1]) || 0;
  const temp = clean(p.temperatureRange);
  const features = [];
  if (clean(p.refrigerant)) features.push(`${clean(p.refrigerant)} refrigerant`);
  if (p.iconGEMSCompliant) features.push('GEMS compliant');
  if (p.iconSKOPEConnect) features.push('SKOPE Connect monitoring');
  if (clean(p.interiorLighting) && !/^none$/i.test(clean(p.interiorLighting))) features.push('Interior LED lighting');
  if (clean(p.controller)) features.push(`${clean(p.controller)} controller`);

  const specs = {};
  const put = (k, v) => { v = clean(v); if (v && v !== '0' && !/^tbc$/i.test(v)) specs[k] = v; };
  put('Model', model);
  put('Manufacturer', 'SKOPE');
  put('Type', cat.type);
  put('Doors / drawers', p.doors);
  put('Door type', p.doorType);
  put('Colour (exterior / interior)', p.color);
  put('Dimensions (W x D x H)', `${w} x ${d} x ${h} mm`);
  put('Gross volume', vol ? `${vol} L` : '');
  put('Weight', p.weight ? `${p.weight} kg` : '');
  put('Floor area', p.floorArea ? `${p.floorArea} m2` : '');
  put('Temperature range', temp);
  put('Refrigeration', p.refrigerationUnit);
  put('Refrigerant', p.refrigerant);
  put('Voltage', p.voltage ? `${p.voltage} V` : '');
  put('Construction', p.material);
  put('Interior lighting', p.interiorLighting);
  put('Shelving', p.shelves);
  put('Controller', p.controller);
  put('Connectivity', p.connectivityInterface);
  put('Energy consumption', p.gemsEnergyConsumption ? `${p.gemsEnergyConsumption} kWh/day` : '');
  put('Climate class', p.gemsClimateClass);
  put('Warranty', warrantyText);

  const imgs = (p.images?.nodes || []).filter((i) => i.absoluteLink && !i.svg).slice(0, 3);
  const files = [];
  imgs.forEach((im, idx) => {
    const fname = `${slugify(model)}${idx ? '-' + (idx + 1) : ''}.webp`;
    files.push(`/images/products/skope/${fname}`);
    imageJobs.push({ url: im.absoluteLink.replace('/upload/', '/upload/c_fit,w_1200,h_900,f_webp,q_80/'), dest: path.join(OUT_IMG, fname) });
  });

  const dims = `${w} x ${d} x ${h} mm`;
  const short = `${title} (model ${model}). ${vol ? vol + ' L gross volume, ' : ''}${dims}${temp ? ', ' + temp.split(' (')[0] : ''}.`;
  const full = `${title}, SKOPE model ${model}. Overall dimensions are ${dims}${vol ? ` with a gross volume of ${vol} litres` : ''}${clean(p.refrigerant) ? `, using ${clean(p.refrigerant)} refrigerant` : ''}. ${warrantyText ? `Manufacturer warranty: ${warrantyText}. ` : ''}Specifications are supplied by the manufacturer; contact us for current pricing, availability and delivery to your postcode.`;

  products.push({
    id: `sk-${slugify(model)}`,
    sku: model,
    brand: 'Skope',
    model,
    name: `Skope ${title} - ${model}`,
    slug,
    categorySlug: cat.categorySlug,
    primaryCategory: cat.primaryCategory,
    subCategory: cat.subCategory,
    type: cat.type,
    doorCount: int(p.doors) || 1,
    doorType,
    doorStyle,
    widthMm: w, depthMm: d, heightMm: h,
    widthRange: widthRange(w),
    capacityLitres: vol,
    capacityRange: capRange(vol),
    price: null, tradePrice: null, msrp: null,
    finish: finish(p),
    tempRange: temp || '',
    installation: installation(p),
    use: 'commercial',
    power: p.voltage ? `${p.voltage}V` : '',
    refrigerant: clean(p.refrigerant),
    weightKg: int(p.weight) || null,
    condition: 'new',
    availability: 'Request a quote',
    shippingBadge: null,
    stockQty: null,
    warrantyYears,
    warrantyText,
    features,
    shortDescription: short,
    fullDescription: full,
    specs,
    dimensionGuide: {
      requiredCutout: dims,
      ventilationClearance: "Refer to the manufacturer's installation instructions",
      doorSwingRadius: "Refer to the manufacturer's specification sheet"
    },
    frequentlyBoughtTogether: [],
    alternatives: [],
    images: files,
    sourceUrl: p.link
  });
}

// Alternatives: closest widths within the same subcategory
for (const p of products) {
  p.alternatives = products
    .filter((q) => q.id !== p.id && q.subCategory === p.subCategory)
    .sort((a, b) => Math.abs(a.widthMm - p.widthMm) - Math.abs(b.widthMm - p.widthMm))
    .slice(0, 3)
    .map((q) => q.id);
}

fs.writeFileSync('src/config/products.generated.json', JSON.stringify(products, null, 1));
console.log('products:', products.length, 'images queued:', imageJobs.length);

// Download images (skip existing)
let ok = 0, fail = 0;
const queue = imageJobs.filter((j) => !fs.existsSync(j.dest));
async function worker() {
  while (queue.length) {
    const j = queue.shift();
    let done = false;
    for (let t = 0; t < 3 && !done; t++) {
      try {
        const r = await fetch(j.url);
        if (r.ok) { fs.writeFileSync(j.dest, Buffer.from(await r.arrayBuffer())); ok++; done = true; }
      } catch {}
      if (!done) await new Promise((r) => setTimeout(r, 700 * (t + 1)));
    }
    if (!done) { fail++; console.log('IMG FAIL', j.url); }
  }
}
await Promise.all([worker(), worker(), worker(), worker()]);
console.log('images downloaded:', ok, 'failed:', fail);
