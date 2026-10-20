// Fills specific empty types from Australian retailer listings -> data/products-types.json
//  kegerators (Polar), slush machines, lockable castor kits (F.E.D.), fan motors (AllFix), LED strip kits (TEDS),
//  R290 compressor (Ricambi), refurbished units (Restaurant Equipment Online)
import fs from 'fs';
import path from 'path';
import { clean, slugify, makeProduct, downloadAll } from './lib.mjs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (price research)' };
const load = (h) => JSON.parse(fs.readFileSync(`data/retail-${h}.json`, 'utf8'));
const OZ = load('ozcoolers.com.au');
const CE = load('cateringequipment.com.au');
const AF = load('allfixelectrical.com.au');
const TD = load('tedslightsandfans.net.au');
const RE = load('restaurantequipment.com.au');

const out = [];
const jobs = [];
const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });
const price = (l) => Math.min(...l.variants.map((v) => parseFloat(v.price)).filter((x) => x > 0));
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2; };
const modelOf = (t) => (clean(t).replace(/[()]/g, ' ').split(/\s+/).filter((x) => /[0-9]/.test(x) && /[A-Za-z]/.test(x) && x.length >= 4 && !/^\d+(l|ltr|mm|w|watt)$/i.test(x)).slice(-1)[0] || slugify(t).slice(0, 14).toUpperCase()).replace(/^[-–]+|[-–,]+$/g, '');

function add(l, brand, cat, opts = {}) {
  if (!l.images || !l.images[0]) return null;
  const p0 = price(l);
  if (!Number.isFinite(p0) || p0 < 5) return null;
  const title = clean(opts.title || l.title);
  const model = opts.model || modelOf(l.title);
  const slug = slugify(`${brand} ${title} ${model}`).slice(0, 110);
  if (out.some((o) => o.slug === slug)) return null;
  const ext = (path.extname(new URL(l.images[0]).pathname) || '.jpg').toLowerCase();
  const dir = opts.dir || 'accessories';
  const fname = `${slug.slice(0, 60)}${ext}`;
  jobs.push({ url: l.images[0] + (l.images[0].includes('?') ? '&' : '?') + 'width=900', dest: path.join('public/images/products', dir, fname) });
  const body = clean((l.body || '').replace(/\n/g, ' ')).slice(0, 300);
  const p = makeProduct({
    id: `ty-${slugify(brand).slice(0, 4)}-${slugify(model).slice(0, 24)}-${out.length}`,
    sku: model, brand, model, name: opts.name || (new RegExp('^' + brand.replace(/[.()]/g, ''), 'i').test(title) ? title : `${brand} ${title}`).slice(0, 150), title, slug, ...cat,
    doorCount: opts.doorCount ?? 0, doorType: 'solid', doorStyle: 'hinged', widthMm: opts.w || 0, depthMm: opts.d || 0, heightMm: opts.h || 0, capacityLitres: opts.litres || 0,
    specs: { Model: model, Brand: brand, ...(opts.specs || {}) }, images: [`/images/products/${dir}/${fname}`], sourceUrl: l.url,
    shortDescription: opts.short || `${title}.`,
    fullDescription: opts.full || `${title}. ${body ? body + ' ' : ''}Contact us to confirm specifications, availability and delivery to your postcode.`
  });
  p.price = Math.round(opts.price ?? p0);
  p.priceBasis = 'au-retail';
  if (opts.condition) p.condition = opts.condition;
  out.push(p);
  return p;
}

// ---- Kegerators (Polar direct-draw beer dispensers)
for (const l of OZ.filter((x) => /Direct Draw Beer Dispenser/i.test(x.title))) {
  const multi = /2 Keg|2 Tap|2 tap/i.test(l.title);
  add(l, 'Polar', R('Bar Fridges & Coolers', 'Kegerators & Beer Dispensers', 'kegerators-dispensers', multi ? 'Multi-Tap Commercial Dispensers' : 'Single Tap Kegerators'), { doorCount: 1, dir: 'polar' });
}

// ---- Slush / granita machines
for (const l of [...OZ, ...CE].filter((x) => /slush|granita/i.test(x.title) && !/cup|syrup|spare|part|kit/i.test(x.title))) {
  const brand = /polar/i.test(l.vendor + l.title) ? 'Polar' : /thermaster/i.test(l.vendor + l.title) ? 'Thermaster' : /benchstar|fabigani/i.test(l.vendor + l.title) ? 'Benchstar' : clean(l.vendor);
  const litres = Number((l.title.match(/(\d+)\s*(?:x\s*)?(?:12\s*)?l(?:t|tr|itre)?\b/i) || [])[1]) || 0;
  add(l, brand, R('Bar Freezers', 'Glass Frosters & Specialty', 'glass-frosters-specialty', 'Slush & Frozen Drink Freezers'), { dir: slugify(brand), litres: 0 });
}

// ---- Lockable castors (F.E.D. stainless bench castor and leg kits)
for (const l of [...OZ, ...CE].filter((x) => /Castor & Leg Kit/i.test(x.title))) {
  const code = (l.title.match(/LC-0\d\/A/i) || [])[0];
  const slugExists = out.some((o) => o.model === code);
  if (slugExists) { const o = out.find((q) => q.model === code); continue; }
  const prices = [...OZ, ...CE].filter((x) => new RegExp(code.replace('/', '\\/'), 'i').test(x.title)).map(price);
  add(l, 'F.E.D.', R('Accessories & Parts', 'Castors, Legs & Stands', 'castors-legs-stands', 'Lockable Swivel Castors'), {
    model: code, title: `Castor & Leg Kit ${code} (lockable castors, ${/LC-02/i.test(code) ? 'set of 6' : 'set of 4'})`, dir: 'accessories', price: median(prices),
    specs: { Includes: /LC-02/i.test(code) ? '3 castors with brake + 3 without' : '2 castors with brake + 2 without', 'Suits': 'F.E.D. all stainless steel benches', 'Height': '850 mm' }
  });
}

// ---- Fan motors (AllFix Electrical)
{
  const fans = AF.filter((l) => /fan motor/i.test(l.title) && /condens|evaporator|universal|commercial|fridge|freezer/i.test(l.title) && !/dryer|used|shopsoiled|microphone|oven|dishwasher|washing|range ?hood|air ?con|secondhand|ceiling/i.test(l.title) && /fasco|universal|sei|ebm|asp|wws/i.test(l.title + ' ' + l.vendor) && price(l) > 10)
    .sort((a, b) => (/fasco|commercial/i.test(b.title) ? 1 : 0) - (/fasco|commercial/i.test(a.title) ? 1 : 0));
  for (const l of fans.slice(0, 12)) {
    const evap = /evaporator/i.test(l.title);
    const brand = /fasco/i.test(l.title) ? 'Fasco' : clean(String(l.vendor).split(',')[0]);
    add(l, brand, R('Accessories & Parts', 'Spare Parts (Compressors, Fans, Thermostats)', 'spare-parts', 'Evaporator & Condenser Fans'), { title: clean(l.title.replace(/\s*-\s*Part\s*#.*$/i, '')), model: (l.title.match(/Part\s*#\s*([A-Z0-9-]+)/i) || [])[1] || modelOf(l.title), specs: { Type: evap ? 'Evaporator fan motor' : 'Condenser fan motor' } });
  }
}

// ---- LED strip kits and drivers (TEDS Lights & Fans)
{
  const led = TD.filter((l) => /(strip kit|led driver|transformer)/i.test(l.title) && !/profile|corner|diffuser|connector/i.test(l.title) && price(l) > 20).slice(0, 8);
  for (const l of led) add(l, 'TEDS', R('Accessories & Parts', 'Spare Parts (Compressors, Fans, Thermostats)', 'spare-parts', 'LED Strips & Transformers'), { model: modelOf(l.title) });
}

// ---- Refurbished refrigeration (Restaurant Equipment Online)
{
  const OURB = { polar: 'Polar', hoshizaki: 'Hoshizaki', skope: 'Skope', bromic: 'Bromic', 'bromic refrigeration': 'Bromic', exquisite: 'Exquisite', thermaster: 'Thermaster', fed: 'F.E.D.', 'fed-x': 'F.E.D.', 'f.e.d': 'F.E.D.', 'f.e.d.': 'F.E.D.', atosa: 'Atosa', williams: 'Williams', foster: 'Foster', tefcold: 'Tefcold', liebherr: 'Liebherr', husky: 'Husky', schmick: 'Schmick' };
  const ref = RE.filter((l) => /Condition_Refurbished/i.test(JSON.stringify(l.tags)) && OURB[String(l.vendor).toLowerCase()] && /fridge|freezer|cooler|chiller/i.test(l.title) && !/saladette|deli|display counter|blast|coffee|ice cream machine|gelato/i.test(l.title));
  for (const l of ref.slice(0, 24)) {
    const brand = OURB[String(l.vendor).toLowerCase()];
    const clean0 = clean(l.title.replace(/\s*-\s*\d{5,7}$/, ''));
    add(l, brand, R('Bar Freezers', 'Ex-Display & Clearance', 'clearance-ex-display', 'Refurbished'), { title: clean0, name: `Refurbished ${clean0}`, condition: 'refurbished', dir: 'clearance', short: `Refurbished unit: ${clean0}.`, full: `Refurbished ${clean0}. Refurbished stock is limited and unit-specific; contact us to confirm availability, warranty and delivery.` });
  }
}

// ---- R290 compressor (Ricambi)
{
  const url = 'https://www.ricambi.com.au/comp-herm-secop-secop-sc10mnx-compressor-hst-r290';
  let h = null;
  try { const r = await fetch(url, { headers: UA }); if (r.ok) h = await r.text(); } catch {}
  if (h) {
    const pr = parseFloat((h.match(/itemprop="price"[^>]*content="([^"]+)/) || [])[1]);
    const img = (h.match(/og:image"[^>]*content="([^"]+)/) || [])[1];
    if (pr && img) {
      const ext = (path.extname(new URL(img).pathname) || '.jpg').toLowerCase();
      jobs.push({ url: img, dest: path.join('public/images/products/accessories', `secop-sc10mnx${ext}`) });
      const p = makeProduct({
        id: 'ty-secop-sc10mnx', sku: '195B3077', brand: 'Secop', model: 'SC10MNX', name: 'Secop SC10MNX R290 Hermetic Compressor (MBP, 240V)', title: 'Secop SC10MNX hermetic compressor R290 MBP 240V',
        slug: 'secop-sc10mnx-r290-hermetic-compressor', primaryCategory: 'Accessories & Parts', subCategory: 'Spare Parts (Compressors, Fans, Thermostats)', categorySlug: 'spare-parts', type: 'Commercial Compressors (R290)',
        doorCount: 0, refrigerant: 'R290', power: '220-240 V', specs: { Model: 'SC10MNX', 'Part no.': '195B3077', Refrigerant: 'R290', Application: 'MBP', Voltage: '220-240 V', Displacement: '10.29 cm3', Oil: 'POE' },
        images: [`/images/products/accessories/secop-sc10mnx${ext}`], sourceUrl: url,
        shortDescription: 'Secop SC10MNX R290 hermetic compressor, medium back pressure, 240V, fan cooled.',
        fullDescription: 'Secop SC10MNX R290 hermetic compressor, medium back pressure, 220-240V, 10.29 cc displacement, POE oil, fan cooled. Hydrocarbon refrigerant: installation must be carried out by a licensed refrigeration technician. Contact us to confirm availability and delivery.'
      });
      p.price = Math.round(pr); p.priceBasis = 'au-retail';
      out.push(p);
    }
  }
}

fs.writeFileSync('data/products-types.json', JSON.stringify(out, null, 1));
const c = {};
out.forEach((p) => { const k = `${p.subCategory} > ${p.type}`; c[k] = (c[k] || 0) + 1; });
console.log('products:', out.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
