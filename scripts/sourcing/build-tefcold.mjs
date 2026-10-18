// Maps crawled Tefcold products (data/tefcold-raw.json) onto the site's schema -> data/products-tefcold.json
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const raw = JSON.parse(fs.readFileSync('data/tefcold-raw.json', 'utf8'));
const IMG_DIR = 'public/images/products/tefcold';
const jobs = [];
const products = [];
const seen = new Set();

const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });

function dims(s) {
  const m = String(s || '').match(/(\d[\d,.]*)\s*x\s*(\d[\d,.]*)\s*x\s*(\d[\d,.]*)/i);
  return m ? m.map((v, i) => (i ? firstNum(v) : 0)).slice(1) : [0, 0, 0];
}

for (const p of raw) {
  const S = p.specs || {};
  const crumb = (p.crumbs || []).slice(1, -1).join(' > ');
  const type = clean(p.type);
  const model = clean(p.model);
  if (!model || !crumb) continue;
  const [w, d, h] = dims(S['External Dimension (WxDxH)']);
  const doorsSpec = S['Door No & Type'] || '';
  const doors = firstNum(doorsSpec) || 1;
  const isSliding = /slid/i.test(doorsSpec);
  const isGlass = /glass/i.test(doorsSpec);
  const isLid = /lid/i.test(doorsSpec) || /lid/i.test(type);
  const isDrawer = /drawer/i.test(doorsSpec);
  const temp = clean(S['Temperature Range']);
  const isFreezer = /^[-−]/.test(temp) || /^\s*-/.test(temp) || /freezer/i.test(type);
  const n = Math.min(doors, 4);

  let cat = null;
  if (/^Display Coolers > Backbars$/.test(crumb)) {
    cat = isSliding ? R('Bar Fridges & Coolers', 'Back Bar Fridges', 'back-bar-fridges', 'Sliding Glass Back Bar') : R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', `${n} Door Bottle Cooler`);
  } else if (/^Display Coolers > KEG Coolers$/.test(crumb)) {
    cat = R('Bar Fridges & Coolers', 'Kegerators & Beer Dispensers', 'kegerators-dispensers', 'Keg Cooler');
  } else if (/^Display Coolers > Wine Coolers$/.test(crumb)) {
    cat = R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', 'Wine Cooler');
  } else if (/^Display Coolers > (Display Coolers - 1 door|Display Coolers - 2-3 doors|Can Coolers|Tabletop Coolers)$/.test(crumb)) {
    if (h && h <= 950 && /bottle|under|counter|backbar/i.test(type + ' ' + crumb + ' ' + model) && !/Can Coolers/.test(crumb)) {
      cat = isGlass ? R('Bar Fridges & Coolers', 'Bottle Coolers (1-4 door)', 'bottle-coolers', `${n} Door Bottle Cooler`) : R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
    } else cat = R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers');
  } else if (/^Freezers > Upright Storage Freezers$/.test(crumb)) {
    cat = R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', n === 1 ? 'Upright 1 Door (Single)' : n === 2 ? 'Upright 2 Door (Double)' : 'Upright 3 Door (Triple)');
  } else if (/^Freezers > Upright Display Freezers$/.test(crumb)) {
    cat = R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', n === 1 ? 'Upright Single Glass Door' : 'Upright Double Glass Door');
  } else if (/^Freezers > Horizontal Freezers$/.test(crumb)) {
    cat = /slid|glass/i.test(doorsSpec + type) ? R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', 'Sliding Glass Lid Chest') : R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', 'Bar Chest Freezers');
  } else if (/^Freezers > Tabletop Freezers$/.test(crumb)) {
    cat = R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', 'Bench-top Freezers');
  } else if (/^Ice Cream Freezers > /.test(crumb)) {
    cat = R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', 'Ice Cream & Gelato Display');
  } else if (/^Gastro > (Counters|Undercounters)$/.test(crumb) && /Counter (Cooler|Freezer)|Under Counter/i.test(type)) {
    cat = isFreezer
      ? isDrawer ? R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', 'Drawer Freezers (1-4 drawer)') : R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', n === 1 ? 'Single Door' : n === 2 ? 'Double Door' : 'Triple Door')
      : isDrawer ? R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Drawer Underbench Fridge') : R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', isGlass ? 'Glass Door Under Bar' : n === 1 ? 'Single Door Under Bar' : n === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
  }
  if (!cat) continue;

  const slug = slugify(`tefcold ${model} ${type}`).slice(0, 110);
  if (seen.has(slug)) continue;
  seen.add(slug);

  const imgs = [];
  if (p.image) {
    const fname = `${slugify(model)}-${p.id}.webp`;
    imgs.push(`/images/products/tefcold/${fname}`);
    jobs.push({ url: p.image, dest: path.join(IMG_DIR, fname) });
  }

  const specs = { Model: model, Manufacturer: 'Tefcold', Type: type };
  for (const [k, v] of Object.entries(S)) {
    if (!v || /GTIN|EAN|Container Load|Packed Dimension|EPREL/i.test(k)) continue;
    specs[k] = v;
  }

  const features = [];
  if (S['Refrigerant']) features.push(`${S['Refrigerant']} refrigerant`);
  if (/LED/i.test(S['Interior Light'] || '')) features.push('LED interior lighting');
  if (S['Type of Cooling']) features.push(`${S['Type of Cooling']} cooling`);
  if (S['Type of Defrost']) features.push(`${S['Type of Defrost']} defrost`);
  if (S['Energy Class']) features.push(`Energy class ${S['Energy Class']}`);

  const ext = clean(S['Exterior Finish']).toLowerCase();
  products.push(
    makeProduct({
      id: `tc-${slugify(model)}-${p.id}`,
      sku: model,
      brand: 'Tefcold',
      model,
      name: `Tefcold ${model} - ${type}`,
      title: `${type} ${model}`,
      slug,
      ...cat,
      doorCount: doors,
      doorType: isDrawer ? 'drawer' : isSliding ? 'sliding' : isLid ? 'lid' : isGlass ? 'glass' : 'solid',
      doorStyle: isDrawer ? 'drawer' : isSliding ? 'sliding' : 'hinged',
      widthMm: w,
      depthMm: d,
      heightMm: h,
      capacityLitres: firstNum(S['Gross / Net Volume']),
      finish: /stainless|steel|ss/i.test(ext) ? 'stainless' : ext.startsWith('black') ? 'black' : ext.startsWith('white') ? 'white' : '',
      tempRange: temp,
      installation: h && h <= 950 ? 'under-bench' : 'freestanding',
      power: S['Voltage / Frequency'] || '',
      refrigerant: S['Refrigerant'] || '',
      weightKg: firstNum(S['Gross / Net Weight']) || null,
      features,
      specs,
      images: imgs,
      sourceUrl: p.url
    })
  );
}

fs.writeFileSync('data/products-tefcold.json', JSON.stringify(products, null, 1));
const c = {};
products.forEach((x) => { const k = `${x.primaryCategory} > ${x.subCategory} > ${x.type}`; c[k] = (c[k] || 0) + 1; });
console.log('raw:', raw.length, 'products:', products.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
