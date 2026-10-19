// Crawls Foster Refrigerator (fosterrefrigerator.com) undercounter, chest freezer and ice maker pages
// -> data/products-foster.json (specs and photos from the manufacturer; price filled later by merge.mjs).
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const BASE = 'https://www.fosterrefrigerator.com';
const UA = { 'user-agent': 'BarFreezerCatalogue/1.0 (product catalogue import)' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(url) {
  for (let t = 0; t < 3; t++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (r.ok) return await r.text();
    } catch {}
    await sleep(1000 * (t + 1));
  }
  return null;
}
const dec = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, '\n').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#?\w+;/g, ' ');

const CATS = [
  ['/en/storage-counters/undercounters', 'under'],
  ['/en/storage-counters/chest-freezers', 'chest'],
  ['/en/drinks-service/ice-makers', 'ice']
];
const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });
const out = [];
const jobs = [];
for (const [cat, kind] of CATS) {
  const h = await get(BASE + cat);
  if (!h) { console.log('FAIL', cat); continue; }
  const links = [...new Set([...h.matchAll(new RegExp('href="(' + cat.replace(/\//g, '\\/') + '\\/[^"#?]+)"', 'g'))].map((m) => m[1]))];
  console.log(cat, links.length);
  for (const link of links) {
    const ph = await get(BASE + link);
    await sleep(300);
    if (!ph) continue;
    const title = clean(dec((ph.match(/<title>([^<]*)/) || [])[1] || ''));
    const model = clean(title.split(':')[0]);
    const desc = clean(title.split(':').slice(1).join(':'));
    if (!model) continue;
    // spec pairs: "Label: \n Value"
    const lines = dec(ph.slice(ph.indexOf('Specifications'), ph.indexOf('Features and benefits') > 0 ? ph.indexOf('Features and benefits') : undefined)).split('\n').map((s) => clean(s)).filter(Boolean);
    const specs = {};
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].endsWith(':') && !lines[i + 1].endsWith(':')) specs[lines[i].slice(0, -1)] = lines[i + 1];
    }
    const features = [...dec(ph.slice(ph.indexOf('Features and benefits'), ph.indexOf('Why Choose Foster'))).split('\n').map((s) => clean(s)).filter((s) => s.length > 25 && s.length < 140)].slice(0, 6);
    const code = link.split('/').pop();
    const imgRel = (ph.match(/image=(%2fFiles%2fProduct\+assets%2fImages\+Automatic%2f[^&"']+_1\.png)/i) || [])[1];
    const imgs = [];
    if (imgRel) {
      const fname = `${slugify(model)}-${code}.webp`;
      imgs.push(`/images/products/foster/${fname}`);
      jobs.push({ url: `${BASE}/Admin/Public/GetImage.ashx?image=${imgRel}&width=800&format=webp`, dest: path.join('public/images/products/foster', fname) });
    }
    const isFreezer = /^-|freezer/i.test(specs['Temperature'] || '') || /freezer/i.test(desc);
    const sections = firstNum(specs['Number of sections']) || 1;
    const glass = /glass/i.test(desc);
    const drawer = /[/][0-9]D|drawer/i.test(model + " " + desc);
    let c;
    if (kind === 'chest') c = R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', /glass|sliding/i.test(desc) ? 'Sliding Glass Lid Chest' : 'Bar Chest Freezers');
    else if (kind === 'ice') c = R('Accessories & Parts', 'Ice Machines & Ice Storage', 'ice-machines-storage', /under|compact|self/i.test(desc) ? 'Underbar Ice Makers' : 'Ice Maker');
    else if (isFreezer) c = R('Bar Freezers', 'Under Bar / Undercounter Freezers', 'under-bar-freezers', drawer ? 'Drawer Freezers (1-4 drawer)' : sections <= 1 ? 'Single Door' : sections === 2 ? 'Double Door' : 'Triple Door');
    else c = R('Bar Fridges & Coolers', 'Under Bar Fridges', 'under-bar-fridges', drawer ? 'Drawer Underbench Fridge' : glass ? 'Glass Door Under Bar' : sections <= 1 ? 'Single Door Under Bar' : sections === 2 ? 'Double Door Under Bar' : 'Triple Door Under Bar');
    const w = firstNum(specs['Width (mm)']), d = firstNum(specs['Depth (mm)']), hh = firstNum(specs['Height (mm)']);
    const sp = { Model: model, Manufacturer: 'Foster Refrigerator' };
    for (const [k, v] of Object.entries(specs)) if (v && !/GWP|AEC/i.test(k)) sp[k] = v;
    out.push(
      makeProduct({
        id: `fo-${slugify(model)}-${slugify(code)}`,
        sku: model,
        brand: 'Foster',
        model,
        name: `Foster ${model} - ${desc}`,
        title: `${model} ${desc}`,
        slug: slugify(`foster ${model} ${desc}`).slice(0, 110),
        ...c,
        doorCount: sections,
        doorType: drawer ? 'drawer' : glass ? 'glass' : 'solid',
        doorStyle: drawer ? 'drawer' : 'hinged',
        widthMm: w, depthMm: d, heightMm: hh,
        capacityLitres: firstNum(specs['Gross volume (ltr)']),
        finish: /s\/s|stainless/i.test(specs['Finish ext/int'] || '') ? 'stainless' : '',
        tempRange: specs['Temperature'] || '',
        installation: kind === 'under' ? 'under-bench' : 'freestanding',
        power: specs['Electrical supply'] || '',
        refrigerant: specs['Refrigerant'] || '',
        weightKg: firstNum(specs['Net weight (kg)']) || null,
        features,
        specs: sp,
        images: imgs,
        sourceUrl: BASE + link
      })
    );
  }
}
fs.writeFileSync('data/products-foster.json', JSON.stringify(out, null, 1));
console.log('foster products:', out.length, 'with image:', out.filter((p) => p.images.length).length);
console.log(out.slice(0, 3).map((p) => `${p.name} | ${p.type} | ${p.widthMm}x${p.depthMm}x${p.heightMm} | ${p.capacityLitres}L | ${p.tempRange}`).join('\n'));
await downloadAll(jobs);
