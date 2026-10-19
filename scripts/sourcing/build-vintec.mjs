// Maps Vintec Australia wine cabinets (data/vintec-raw.json) onto the site's schema -> data/products-vintec.json
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const raw = JSON.parse(fs.readFileSync('data/vintec-raw.json', 'utf8'));
const IMG_DIR = 'public/images/products/vintec';
const jobs = [];
const products = [];

for (const p of raw) {
  const S = p.specs || {};
  const model = clean(p.model);
  const zones = clean(S['No of Zones']);
  const multi = /multi|2|dual/i.test(zones) || /dual|multi/i.test(p.title);
  const under = p.category === 'underbench-wine-cellars' || /under/i.test(S['Installation Type'] || '');
  const type = multi ? 'Dual Zone Wine Cabinets' : 'Single Zone Wine Cabinets';
  const finish = clean(S['Finish']).toLowerCase();
  const w = firstNum(S['Width (mm)']);
  const d = firstNum(S['Depth (mm)']);
  const h = firstNum(S['Height (mm)']);
  const warr = firstNum(S['Domestic warranty details (yrs)']);

  const slug = slugify(`vintec ${model} ${p.title}`).slice(0, 110);
  const imgs = [];
  if (p.image) {
    const fname = `${slugify(model)}.png`;
    imgs.push(`/images/products/vintec/${fname}`);
    jobs.push({ url: p.image, dest: path.join(IMG_DIR, fname) });
  }

  const specs = { Model: model, Manufacturer: 'Vintec', Type: type };
  for (const [k, v] of Object.entries(S)) if (v) specs[k] = v;

  const features = [];
  if (S['Refrigerant']) features.push(`${S['Refrigerant']} refrigerant`);
  if (/yes/i.test(S['Lock'] || '')) features.push('Lockable door');
  if (S['Lighting']) features.push(`${S['Lighting']} lighting`);
  if (S['Display Panel']) features.push(S['Display Panel']);
  if (S['Door Construction']) features.push(S['Door Construction']);

  products.push(
    makeProduct({
      id: `vt-${slugify(model)}`,
      sku: model,
      brand: 'Vintec',
      model,
      name: `Vintec ${model} - ${p.title}`,
      title: p.title,
      slug,
      primaryCategory: 'Bar Fridges & Coolers',
      subCategory: 'Wine Fridges (Single & Dual Zone)',
      categorySlug: 'wine-fridges',
      type,
      doorCount: 1,
      doorType: /glass/i.test(S['Door Type'] || '') ? 'glass' : 'solid',
      doorStyle: 'hinged',
      widthMm: w,
      depthMm: d,
      heightMm: h,
      capacityLitres: 0,
      finish: finish.includes('stainless') ? 'stainless' : finish.includes('black') ? 'black' : finish.includes('white') ? 'white' : '',
      tempRange: [S['Temperature Range Zone 1 (deg)'], S['Temperature Range Zone 2 (deg)']].filter(Boolean).join(' / '),
      installation: under ? 'under-bench' : 'freestanding',
      power: S['Power Supply'] || '',
      refrigerant: S['Refrigerant'] || '',
      weightKg: firstNum(S['Weight Unloaded']) || null,
      warrantyYears: warr,
      warrantyText: warr ? `${warr} years (domestic)` : '',
      features,
      shortDescription: `${p.title} (model ${model}).${S['Max Capacity (Bottles)'] ? ` Holds up to ${S['Max Capacity (Bottles)']} bottles.` : ''}${w ? ` ${w} x ${d} x ${h} mm.` : ''}`,
      fullDescription: `${p.description || p.title} Model ${model}. Specifications are supplied by Vintec; contact us for current pricing, availability and delivery to your postcode.`.replace(/\s+/g, ' '),
      specs,
      images: imgs,
      sourceUrl: p.url
    })
  );
}

fs.writeFileSync('data/products-vintec.json', JSON.stringify(products, null, 1));
console.log('products:', products.length, 'no image:', products.filter((x) => !x.images.length).length);
await downloadAll(jobs);
