// Fills the last empty subcategories -> data/products-misc.json
//  - Ex-Display, Clearance & Second Hand: second-grade listings of our brands at Australian retailers
//  - Glass Frosting Accessories: Frucosol GF-1000 (caterboss.ie) and Beverage Air RC-500 (burkett.com), converted to AUD
//  - Covers & Cleaning: condenser coil cleaners sold by Ricambi (Sydney), AUD
import fs from 'fs';
import path from 'path';
import { clean, slugify, makeProduct, downloadAll } from './lib.mjs';

const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (price research)' };
const fx = JSON.parse(fs.readFileSync('data/fx-aud.json', 'utf8')).rates;
const toAud = (amount, cur, taxIncluded, vat) => Math.round((taxIncluded ? amount / (1 + vat) : amount) / fx[cur] * 1.1);
async function get(url, json) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return json ? await r.json() : await r.text();
    } catch {}
    await new Promise((r) => setTimeout(r, 800));
  }
  return null;
}

const out = [];
const jobs = [];
const addImage = (url, dir, fname) => {
  jobs.push({ url, dest: path.join('public/images/products', dir, fname) });
  return `/images/products/${dir}/${fname}`;
};

// ---- Ex-display / second grade -------------------------------------------------------------
const OUR = { schmick: 'Schmick', fed: 'F.E.D.', 'fed-x': 'F.E.D.', 'fed s': 'F.E.D.', thermaster: 'Thermaster', exquisite: 'Exquisite', atosa: 'Atosa', polar: 'Polar', bromic: 'Bromic', skope: 'Skope', husky: 'Husky', hoshizaki: 'Hoshizaki', tefcold: 'Tefcold', liebherr: 'Liebherr', anvil: 'Anvil', foster: 'Foster', vestfrost: 'Vestfrost' };
const files = ['ozcoolers.com.au', 'bar-fridges-australia.com.au', 'cateringequipment.com.au'];
const L = files.flatMap((f) => JSON.parse(fs.readFileSync(`data/retail-${f}.json`, 'utf8')));
const seen = new Set();
const second = [];
for (const l of L) {
  if (!/^2nds?\b|scratch ?(and|&) ?dent|ex[- ]?display/i.test(l.title) && !/scratch ?(and|&) ?dent|2nds?:/i.test(l.title)) continue;
  const brand = OUR[String(l.vendor).toLowerCase()] || OUR[(Object.keys(OUR).find((k) => new RegExp('\\b' + k + '\\b', 'i').test(l.title)) || '')];
  if (!brand) continue;
  if (!/fridge|freezer|cooler|chiller|bar/i.test(l.title) || /vaccine|medical|lab/i.test(l.title)) continue;
  if (!l.images || !l.images[0]) continue;
  const price = Math.min(...l.variants.map((v) => parseFloat(v.price)).filter((x) => x > 0));
  if (!Number.isFinite(price) || price < 200) continue;
  const base = clean(l.title.replace(/^.*?(scratch ?(and|&) ?dent)\s*[-:]?\s*/i, '').replace(/^2nds?:\s*/i, '').replace(/ex[- ]?display\s*[-:]?\s*/i, ''));
  const key = slugify(brand + ' ' + base);
  if (seen.has(key)) continue;
  seen.add(key);
  second.push({ l, brand, base, price, kind: /2nds?:/i.test(l.title) || /ex[- ]?display/i.test(l.title) ? 'ex-display' : 'factory-second' });
}
second.sort((a, b) => (/freezer/i.test(b.base) ? 1 : 0) - (/freezer/i.test(a.base) ? 1 : 0));
for (const x of second.slice(0, 40)) {
  const freezer = /freezer/i.test(x.base);
  const model = ((x.base.match(/\b[A-Z0-9][A-Z0-9.\-]{3,}\b/g) || []).filter((t) => /[0-9]/.test(t)).slice(-1)[0]) || slugify(x.base).slice(0, 16).toUpperCase();
  const slug = slugify(`${x.kind} ${x.brand} ${x.base}`).slice(0, 110);
  const ext = (path.extname(new URL(x.l.images[0]).pathname) || '.jpg').toLowerCase();
  const img = addImage(x.l.images[0] + (x.l.images[0].includes('?') ? '&' : '?') + 'width=900', 'clearance', `${slug.slice(0, 60)}${ext}`);
  const p = makeProduct({
    id: `cl-${slugify(x.brand).slice(0, 4)}-${slugify(model).slice(0, 24)}-${out.length}`,
    sku: model,
    brand: x.brand,
    model,
    name: `${x.kind === 'ex-display' ? 'Ex-Display' : 'Scratch & Dent'} ${x.base}`.slice(0, 150),
    title: x.base,
    slug,
    primaryCategory: 'Bar Freezers',
    subCategory: 'Ex-Display, Clearance & Second Hand',
    categorySlug: 'clearance-ex-display',
    type: freezer && x.kind === 'ex-display' ? 'Ex-Display Freezers' : 'Clearance Overstock',
    doorCount: 1,
    doorType: /glass/i.test(x.base) ? 'glass' : 'solid',
    doorStyle: 'hinged',
    specs: { Model: model, Brand: x.brand, Condition: x.kind === 'ex-display' ? 'Ex-display / second grade' : 'Scratch and dent (cosmetic)' },
    images: [img],
    sourceUrl: x.l.url,
    shortDescription: `${x.kind === 'ex-display' ? 'Ex-display' : 'Scratch and dent'} unit: ${x.base}.`,
    fullDescription: `${x.kind === 'ex-display' ? 'Ex-display / second-grade' : 'Cosmetically marked (scratch and dent)'} ${x.base}. Stock is limited and unit-specific; contact us to confirm availability and delivery.`
  });
  p.condition = x.kind;
  p.price = Math.round(x.price);
  p.priceBasis = 'au-retail';
  out.push(p);
}

// ---- Glass frosters (overseas, converted) -----------------------------------------------------
{
  const bk = await get('https://www.burkett.com/products/beverage-air-rapid-chill-rc-500-glass-froster.json', true);
  if (bk && bk.product) {
    const j = bk.product;
    const price = toAud(parseFloat(j.variants[0].price), 'USD', false, 0);
    const p = makeProduct({
      id: 'gf-bevair-rc500', sku: 'RC-500', brand: 'Beverage Air', model: 'RC-500', name: 'Beverage Air RC-500 Rapid Chill CO2 Glass Froster (table mount)', title: 'Beverage Air RC-500 Rapid Chill Glass Froster',
      slug: 'beverage-air-rc-500-rapid-chill-co2-glass-froster', primaryCategory: 'Accessories & Parts', subCategory: 'Glass Frosting Accessories', categorySlug: 'glass-frosting-accessories', type: 'CO2 Rapid Glass Frosters',
      doorCount: 0, specs: { Model: 'RC-500', Brand: 'Beverage Air', Mounting: 'Table / bar counter', Power: 'CO2 cylinder with siphon tube (not included)', Lighting: 'LED (2 x AA, not included)' },
      images: [addImage(j.images[0].src, 'accessories', 'beverage-air-rc-500.png')], sourceUrl: 'https://www.burkett.com/products/beverage-air-rapid-chill-rc-500-glass-froster',
      shortDescription: 'Table-mount CO2 rapid chill glass froster that chills and sanitises glasses at the point of pour.',
      fullDescription: 'Table-mount CO2 rapid chill glass froster that chills and sanitises glasses at the point of pour. Requires a food-grade liquid CO2 cylinder with siphon tube (not included). Contact us to confirm Australian availability and delivery.'
    });
    p.price = price; p.priceBasis = 'overseas-estimate';
    out.push(p);
  }
  const fh = await get('https://www.caterboss.ie/product/frucosol-gf-1000-glass-froster');
  if (fh) {
    const m = fh.match(/application\/ld\+json[^>]*>(\{"brand"[\s\S]*?)<\/script>/);
    let j = null;
    for (const mm of fh.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) { try { const x = JSON.parse(mm[1]); if (x['@type'] === 'Product') j = x; } catch {} }
    if (j) {
      const eur = parseFloat((Array.isArray(j.offers) ? j.offers[0] : j.offers).price);
      const img = Array.isArray(j.image) ? j.image[0] : j.image;
      const p = makeProduct({
        id: 'gf-frucosol-gf1000', sku: 'GF1000', brand: 'Frucosol', model: 'GF-1000', name: 'Frucosol GF-1000 CO2 Glass Froster', title: 'Frucosol GF-1000 Glass Froster',
        slug: 'frucosol-gf-1000-co2-glass-froster', primaryCategory: 'Accessories & Parts', subCategory: 'Glass Frosting Accessories', categorySlug: 'glass-frosting-accessories', type: 'CO2 Rapid Glass Frosters',
        doorCount: 0, specs: { Model: 'GF-1000', Brand: 'Frucosol', Power: 'CO2 cylinder with probe (not included)', Lighting: 'LED (2 x AA, not included)' },
        images: [addImage(img, 'accessories', 'frucosol-gf-1000.webp')], sourceUrl: 'https://www.caterboss.ie/product/frucosol-gf-1000-glass-froster',
        shortDescription: 'CO2 glass froster that frosts and sterilises glasses at the bar.',
        fullDescription: 'CO2 glass froster that frosts and sterilises glasses at the bar without a dedicated chiller. Requires a fluid CO2 cylinder with probe (not included). Contact us to confirm Australian availability and delivery.'
      });
      p.price = toAud(eur, 'EUR', true, 0.23); p.priceBasis = 'overseas-estimate';
      out.push(p);
    }
  }
}

// ---- Coil cleaners (Ricambi, Sydney) ----------------------------------------------------------
for (const [slug, name, model] of [
  ['condenser-coil-cleaner-model-4291-08-3.8liter', 'Condenser Coil Cleaner 3.8 L (4291-08)', '4291-08'],
  ['r-fcc-1formula-foam-brite-condenser-cleaner', 'Foam-Brite Condenser Coil Cleaner (R-FCC/1)', 'R-FCC/1']
]) {
  const h = await get(`https://www.ricambi.com.au/${slug}`);
  if (!h) continue;
  const price = parseFloat((h.match(/itemprop="price"[^>]*content="([^"]+)/) || h.match(/content="([0-9.]+)"[^>]*itemprop="price"/) || [])[1]);
  const img = (h.match(/og:image"[^>]*content="([^"]+)/) || [])[1];
  if (!price || !img) continue;
  const ext = (path.extname(new URL(img).pathname) || '.png').toLowerCase();
  const p = makeProduct({
    id: `cc-${slugify(model)}`, sku: model, brand: 'Ricambi', model, name, title: name,
    slug: slugify(`coil cleaner ${model}`), primaryCategory: 'Accessories & Parts', subCategory: 'Covers & Cleaning', categorySlug: 'covers-cleaning', type: 'Refrigeration Coil Cleaners',
    doorCount: 0, specs: { Model: model, Use: 'Condenser and evaporator coil cleaning' },
    images: [addImage(img, 'accessories', `coil-cleaner-${slugify(model)}${ext}`)], sourceUrl: `https://www.ricambi.com.au/${slug}`,
    shortDescription: `${name} for cleaning refrigeration condenser coils.`,
    fullDescription: `${name} for cleaning refrigeration condenser coils. Check the product label for coil-material compatibility and safe use; contact us to confirm availability and delivery.`
  });
  p.price = Math.round(price); p.priceBasis = 'au-retail';
  out.push(p);
}

fs.writeFileSync('data/products-misc.json', JSON.stringify(out, null, 1));
const c = {};
out.forEach((p) => { const k = `${p.subCategory} > ${p.type}`; c[k] = (c[k] || 0) + 1; });
console.log('products:', out.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
