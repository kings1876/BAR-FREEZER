// Maps Hoshizaki Australia products (data/hoshizaki-raw.json) onto the site's schema -> data/products-hoshizaki.json
import fs from 'fs';
import path from 'path';
import { clean, decodeEntities, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const raw = JSON.parse(fs.readFileSync('data/hoshizaki-raw.json', 'utf8'));
const IMG_DIR = 'public/images/products/hoshizaki';
const jobs = [];
const products = [];

const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });

for (const p of raw) {
  const title = clean(decodeEntities(p.name));
  const sku = clean(decodeEntities(p.sku));
  const cats = p.categories.map((c) => decodeEntities(c.name)).join(' | ');
  const A = {};
  for (const a of p.attributes || []) A[clean(decodeEntities(a.name))] = clean(decodeEntities((a.terms || []).map((t) => t.name).join(', ')));
  const ptype = A['Product Type'] || '';
  const lname = title.toLowerCase();

  const width = firstNum(A['Outside Dimensions Width'] || A['Width']);
  const depth = firstNum(A['Outside Dimensions Depth'] || A['Depth']);
  const height = firstNum(A['Outside Dimensions Height'] || A['Height']);
  const volName = (title.match(/(\d[\d,]*)\s*L\b/i) || [])[1];
  const volume = volName ? firstNum(volName) : /^\d/.test(A['Net Usable Volume (LTR)'] || '') ? firstNum(A['Net Usable Volume (LTR)']) : 0;
  const doorsAttr = A['Doors/Drawers'] || (title.match(/(\d+)\s+(?:door|drawer)/i) || [])[0] || '';
  const doorCount = firstNum(doorsAttr);
  const isDrawer = /drawer/i.test(doorsAttr) || /drawer/i.test(title);
  const isGlass = /glass door/i.test(title);

  let cat = null;
  const isIce = /Ice Machine/i.test(cats) || /^IM CUBE/i.test(cats);
  if (/Castors/i.test(cats) || /Castors/i.test(ptype)) cat = R('Accessories & Parts', 'Castors, Legs & Stands', 'castors-legs-stands', 'Castors');
  else if (/Adjustable Leg/i.test(cats) || /Legs/i.test(ptype)) cat = R('Accessories & Parts', 'Castors, Legs & Stands', 'castors-legs-stands', 'Legs');
  else if (/Water Filter|Hose|Installation Kit/i.test(cats)) cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', /Filter/i.test(cats) ? 'Water Filtration' : 'Installation Accessories');
  else if (/Top Kit/i.test(cats)) cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', 'Top Kit');
  else if (isIce) {
    if (/Bins/i.test(ptype) || /STORAGE BIN/i.test(title)) cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', 'Insulated Ice Bins');
    else if (/dispenser|DCM|DB Series/i.test(cats + title)) cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', 'Ice Dispenser');
    else if (/self.contained/i.test(title + ' ' + (A['PRODUCTION CONFIGURATION'] || '')) && width && width <= 700 && height && height <= 950) cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', 'Underbar Ice Makers');
    else cat = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', 'Ice Maker');
  } else if (/Sushi/i.test(cats)) cat = null;
  else if (/^HRF/i.test(sku)) cat = R('Bar Fridges & Coolers', 'Combination Fridge-Freezers', 'combination-fridge-freezers', 'Split Dual Temperature');
  else if (/^(HF|FT|FTC|FTE|HFE)/i.test(sku)) {
    if (/underbench/i.test(ptype) || /^(FT|FTC|FTE)/i.test(sku)) {
      cat = isDrawer
        ? R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', 'Drawer Freezers (1-4 drawer)')
        : R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', doorCount <= 1 ? 'Single Door' : doorCount === 2 ? 'Double Door' : 'Triple Door');
    } else {
      cat = R('Bar Freezers', 'Upright Commercial Freezers', 'upright-commercial-freezers', doorCount <= 1 ? 'Upright 1 Door (Single)' : doorCount === 2 ? 'Upright 2 Door (Double)' : 'Upright 3 Door (Triple)');
    }
  } else if (/^(RT|RTC|RTE)/i.test(sku)) {
    cat = isDrawer
      ? R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', 'Drawer Underbench Fridge')
      : R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', doorCount <= 1 ? 'Single Door Under Bar' : doorCount === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
  } else if (/^HR/i.test(sku) && isGlass) cat = R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers');

  if (!cat) continue;

  const slug = slugify(`hoshizaki ${sku || title} ${title}`).slice(0, 110);
  const imgSrc = (() => {
    const im = (p.images || [])[0];
    if (!im) return null;
    const sets = (im.srcset || '').split(', ').map((s) => s.trim().split(' ')[0]).filter(Boolean);
    return sets.find((u) => /-1024x\d+\./.test(u)) || sets.find((u) => /-768x\d+\./.test(u)) || im.src;
  })();
  const imgs = [];
  if (imgSrc) {
    const ext = path.extname(new URL(imgSrc).pathname) || '.jpg';
    const fname = `${slugify(sku || title)}${ext}`;
    imgs.push(`/images/products/hoshizaki/${fname}`);
    jobs.push({ url: imgSrc, dest: path.join(IMG_DIR, fname) });
  }

  const specs = {};
  specs['Model'] = sku || title;
  specs['Manufacturer'] = 'Hoshizaki';
  for (const [k, v] of Object.entries(A)) if (v) specs[k] = v;

  const features = [];
  if (A['Refrigerant']) features.push(`${A['Refrigerant'].split(' ')[0]} refrigerant`);
  if (A['Refrigeration System']) features.push(A['Refrigeration System']);
  if (A['Temperature Control']) features.push('Electronic temperature control');

  products.push(
    makeProduct({
      id: `hz-${slugify(sku || title)}`,
      sku,
      brand: 'Hoshizaki',
      model: sku || title,
      name: /^[0-9]/.test(title) || !title.toLowerCase().includes(sku.toLowerCase()) ? `Hoshizaki ${title}${sku ? ` - ${sku}` : ''}` : `Hoshizaki ${title}`,
      title,
      slug,
      ...cat,
      doorCount: doorCount || (cat.primaryCategory === 'Accessories & Parts' ? 0 : 1),
      doorType: isDrawer ? 'drawer' : isGlass ? 'glass' : 'solid',
      doorStyle: isDrawer ? 'drawer' : 'hinged',
      widthMm: width,
      depthMm: depth,
      heightMm: height,
      capacityLitres: volume,
      finish: /stainless/i.test(A['Exterior'] || A['Interior'] || '') ? 'stainless' : '',
      tempRange: A['Temperture Range'] || A['Temperature Range'] || '',
      installation: /underbench|under bench/i.test(ptype + cats) ? 'under-bench' : 'freestanding',
      power: A['AC Supply Voltage'] || '',
      refrigerant: (A['Refrigerant'] || A['Refrigerant Charge'] || '').split(' ')[0],
      weightKg: firstNum(A['Weight Net']) || null,
      features,
      specs,
      images: imgs,
      sourceUrl: p.permalink
    })
  );
}

fs.writeFileSync('data/products-hoshizaki.json', JSON.stringify(products, null, 1));
const c = {};
products.forEach((x) => { const k = `${x.primaryCategory} > ${x.subCategory} > ${x.type}`; c[k] = (c[k] || 0) + 1; });
console.log('products:', products.length);
console.log(Object.entries(c).sort().map(([k, v]) => `${v}  ${k}`).join('\n'));
await downloadAll(jobs);
