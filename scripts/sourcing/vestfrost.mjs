// Crawls Vestfrost Solutions food and wine products (vestfrostsolutions.com) -> data/products-vestfrost.json
// (specs and photos from the manufacturer; price filled later by merge.mjs). Biomedical and vaccine lines are skipped.
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

const BASE = 'https://www.vestfrostsolutions.com';
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
const lines = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&#176;/g, '°').replace(/&nbsp;/g, ' ').split('\n').map((x) => clean(x)).filter(Boolean);

const CATS = ['/food/display-coolers/', '/food/display-freezers/', '/food/storage-freezers/', '/food/storage-coolers/', '/wine/wine-cabinets/'];
const R = (primaryCategory, subCategory, categorySlug, type) => ({ primaryCategory, subCategory, categorySlug, type });
const out = [];
const jobs = [];
const LABELS = ['Dimension', 'Packaging dimensions', 'Weight', 'Volume', 'No. of baskets', 'Lid color/type', 'Cabinet color', 'Inside color/material', 'Lock', 'Refrigerant / amount', 'Temperature class', 'Energy consumption', 'Noise', 'Voltage', 'Frequenze', 'Temperature range', 'No. of shelves', 'Doors', 'Number of doors'];

for (const cat of CATS) {
  const h = await get(BASE + cat);
  if (!h) continue;
  const links = [...new Set([...h.matchAll(/href="(\/(?:food|wine)\/[^"#?]+\/[^"#?]+\/)"/g)].map((m) => m[1]))].filter((l) => l.startsWith(cat));
  console.log(cat, links.length);
  for (const link of links) {
    const ph = await get(BASE + link);
    await sleep(300);
    if (!ph) continue;
    const model = clean(((ph.match(/<title>([^<]*)/) || [])[1] || '').replace(/^Vestfrost\s*-\s*/i, ''));
    if (!model) continue;
    const L = lines(ph.slice(ph.indexOf('Specifications'), ph.indexOf('Biomedical', ph.indexOf('Specifications'))));
    const specs = {};
    for (let i = 0; i < L.length - 1; i++) if (LABELS.includes(L[i]) && !LABELS.includes(L[i + 1])) specs[L[i]] = L[i + 1];
    const dm = (specs['Dimension'] || '').match(/(\d{3,4})\s*x\s*(\d{3,4})\s*x\s*(\d{3,4})/i);
    const [hh, w, d] = dm ? [Number(dm[1]), Number(dm[2]), Number(dm[3])] : [0, 0, 0]; // HxWxD
    const vol = firstNum((specs['Volume'] || '').split('/')[0]);
    const gallery = [...ph.matchAll(/(\/media\/[a-z0-9]+\/[^"')\s?]+\.(?:png|jpg|jpeg))\?[^"')\s]*width=600&amp;height=516/gi)].map((m) => m[1]).filter((u) => !/&#/.test(u));
    const imgM = gallery.length ? [null, gallery.find((u) => /front/i.test(u)) || gallery[0]] : null;
    const imgs = [];
    if (imgM) {
      const fname = `${slugify(model)}.png`;
      imgs.push(`/images/products/vestfrost/${fname}`);
      jobs.push({ url: `${BASE}${imgM[1]}?width=900`, dest: path.join('public/images/products/vestfrost', fname) });
    }
    const doors = firstNum(specs['Doors'] || specs['Number of doors']) || 1;
    let c;
    if (cat.includes('display-coolers') || cat.includes('storage-coolers')) c = R('Bar Fridges & Coolers', 'Beer & Beverage Fridges', 'beer-beverage-fridges', 'Beverage Merchandisers');
    else if (cat.includes('display-freezers')) c = R('Bar Freezers', 'Glass Door Display Freezers', 'glass-door-display-freezers', doors >= 2 ? 'Upright Double Glass Door' : 'Upright Single Glass Door');
    else if (cat.includes('storage-freezers')) c = R('Bar Freezers', 'Chest & Bench Freezers', 'chest-bench-freezers', 'Bar Chest Freezers');
    else c = R('Bar Fridges & Coolers', 'Wine Fridges (Single & Dual Zone)', 'wine-fridges', 'Wine Cooler');
    const sp = { Model: model, Manufacturer: 'Vestfrost Solutions' };
    for (const [k, v] of Object.entries(specs)) sp[k] = v;
    out.push(
      makeProduct({
        id: `vf-${slugify(model)}`,
        sku: model,
        brand: 'Vestfrost',
        model,
        name: `Vestfrost ${model}`,
        title: `Vestfrost ${model} ${c.type}`,
        slug: slugify(`vestfrost ${model} ${c.type}`).slice(0, 110),
        ...c,
        doorCount: doors,
        doorType: cat.includes('storage-freezers') ? 'lid' : 'glass',
        doorStyle: 'hinged',
        widthMm: w, depthMm: d, heightMm: hh,
        capacityLitres: vol,
        finish: /white/i.test(specs['Cabinet color'] || '') ? 'white' : /black/i.test(specs['Cabinet color'] || '') ? 'black' : '',
        tempRange: specs['Temperature range'] || '',
        installation: 'freestanding',
        power: specs['Voltage'] ? `${specs['Voltage']} ${specs['Frequenze'] || ''}`.trim() : '',
        refrigerant: (specs['Refrigerant / amount'] || '').split('/')[0].trim(),
        weightKg: firstNum((specs['Weight'] || '').split('/')[0]) || null,
        features: [],
        specs: sp,
        images: imgs,
        sourceUrl: BASE + link
      })
    );
  }
}
fs.writeFileSync('data/products-vestfrost.json', JSON.stringify(out, null, 1));
console.log('vestfrost products:', out.length, 'with image:', out.filter((p) => p.images.length).length);
console.log(out.slice(0, 3).map((p) => `${p.name} | ${p.type} | ${p.widthMm}x${p.depthMm}x${p.heightMm} | ${p.capacityLitres}L | ${p.tempRange}`).join('\n'));
await downloadAll(jobs);
