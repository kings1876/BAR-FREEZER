// Maps Williams Refrigeration Australia listings (data/williams-raw.json) onto the site's schema -> data/products-williams.json
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const raw = JSON.parse(fs.readFileSync('data/williams-raw.json', 'utf8'));
const IMG_DIR = 'public/images/products/williams';
const jobs = [];
const products = [];
const seen = new Set();

const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });

for (const p of raw) {
  const name = clean(p.name);
  const model = name.split(' ').pop();
  const propText = Object.keys(p.props).concat(Object.values(p.props)).join(' ');
  const T = p.tech || {};
  const w = firstNum(T['Width']);
  const d = firstNum(T['Depth']);
  const h = firstNum(T['Height']);
  const litres = firstNum(T['Capacity']);
  const lname = name.toLowerCase();
  const doorMatch = model.match(/^[A-Za-z-]*?(\d)/);
  const doors = doorMatch ? Number(doorMatch[1]) : 1;
  const n = Math.min(Math.max(doors, 1), 4);
  const isRemote = /remote/i.test(p.range) || /remote/i.test(name);
  const tempMatch = propText.match(/[+-]\d+\/[+-]\d+\s*°?C/);
  const temp = tempMatch ? tempMatch[0].replace(/\s+/g, '') : '';
  const freezerByText = /freezer|-1[89]\/-2\d/i.test(propText) && !/refrigerator/i.test(propText.replace(/freezer.*refrigerator/i, 'x'));
  const isFreezer = /Freezer/.test(propText) ? !/^Refrigerator/.test(Object.values(p.props)[0] || '') || /Freezer/.test(Object.values(p.props)[0] || '') : /^L/.test(model) || /\bT[U]?\d/.test(model) || /^TU|^T\d/.test(model);

  let cat = null;
  const c = p.category;
  if (c === 'back-bar-general') {
    if (/Bottle Cooler BC\d/i.test(name)) cat = R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', `${n} Door Bottle Cooler`);
    else if (/wine/i.test(name)) cat = R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', 'Wine Cooler');
    else if (/Glass Chiller/i.test(name)) cat = R('Bar Fridges & Coolers', 'Back Bar Fridges', 'back-bar-fridges', 'Hinged Glass Back Bar');
        else cat = R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
  } else if (c === 'uprights') {
    if (/Freezer/.test(Object.values(p.props)[0] || '') || /Freezer/.test(propText.slice(0, 40))) {
      cat = R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', n === 1 ? 'Upright 1 Door (Single)' : n === 2 ? 'Upright 2 Door (Double)' : 'Upright 3 Door (Triple)');
    }
  } else if (c === 'front-of-house') {
    if (/Beverage Cooler/i.test(name)) cat = R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers');
    else if (/Ice-?cream/i.test(name)) cat = R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', 'Ice Cream & Gelato Display');
    else if (/Wine/i.test(name)) cat = R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', 'Wine Cooler');
    else if (/FOH Counter/i.test(name)) {
      cat = /Freezer/.test(propText) ? R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', n === 1 ? 'Single Door' : n === 2 ? 'Double Door' : 'Triple Door') : R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
    }
  } else if (c === 'topaz-cafe-range') {
    if (/Topaz Undercounter|Topaz Compact/i.test(name)) {
      const freezer = /Freezer/.test(propText) || /^L/.test(model.replace(/^[^A-Z]*/, '')) || /^(TU|LT)/.test(model);
      cat = freezer
        ? R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', n === 1 ? 'Single Door' : n === 2 ? 'Double Door' : 'Triple Door')
        : R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
    } else if (/Topaz Upright/i.test(name) && /Freezer/.test(propText)) {
      cat = R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', n === 1 ? 'Upright 1 Door (Single)' : 'Upright 2 Door (Double)');
    }
  }
  if (!cat) continue;

  const slug = slugify(`williams ${name}`).slice(0, 110);
  if (seen.has(slug)) continue;
  seen.add(slug);

  const imgs = [];
  if (p.image) {
    const ext = path.extname(new URL(p.image).pathname) || '.png';
    const fname = `${slugify(model)}${ext}`;
    imgs.push(`/images/products/williams/${fname}`);
    jobs.push({ url: p.image, dest: path.join(IMG_DIR, fname) });
  }

  const specs = { Model: model, Manufacturer: 'Williams Refrigeration', Range: clean(p.range.replace(/-/g, ' ')).replace(/\b\w/g, (m) => m.toUpperCase()) };
  for (const [k, v] of Object.entries(p.props)) specs[k.length === 1 ? 'Temperature class' : k] = v;
  for (const [k, v] of Object.entries(T)) specs[k] = v;

  const features = [];
  if (isRemote) features.push('Remote refrigeration (requires remote condensing unit)');
  if (T['Shelves']) features.push(`Shelves: ${T['Shelves']}`);
  if (/HC$/i.test(model) || /hydrocarbon/i.test(name)) features.push('Hydrocarbon refrigerant (HC model)');

  products.push(
    makeProduct({
      id: `wl-${slugify(model)}`,
      sku: model,
      brand: 'Williams',
      model,
      name: `Williams ${name}`,
      title: name,
      slug,
      ...cat,
      doorCount: doors,
      doorType: /Glass Chiller|Beverage Cooler|Bottle Cooler/i.test(name) ? 'glass' : 'unknown',
      doorStyle: 'hinged',
      widthMm: w,
      depthMm: d,
      heightMm: h,
      capacityLitres: litres,
      finish: '',
      tempRange: temp,
      installation: cat.categorySlug.startsWith('under-bar') || cat.categorySlug === 'bottle-coolers' || cat.categorySlug === 'back-bar-fridges' ? 'back-bar' : 'freestanding',
      features,
      specs,
      images: imgs,
      sourceUrl: p.link
    })
  );
}

fs.writeFileSync('data/products-williams.json', JSON.stringify(products, null, 1));
const cc = {};
products.forEach((x) => { const k = `${x.primaryCategory} > ${x.subCategory} > ${x.type}`; cc[k] = (cc[k] || 0) + 1; });
console.log('raw:', raw.length, 'products:', products.length);
console.log(Object.entries(cc).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
