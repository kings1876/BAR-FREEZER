// Crawls Dometic Australia hospitality minibars (dometic.com/en-au) -> data/products-dometic.json
import fs from 'fs';
import path from 'path';
import { clean, slugify, firstNum, makeProduct, downloadAll } from './lib.mjs';

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
const lines = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '\n').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').split('\n').map((x) => clean(x)).filter(Boolean);

const sm = await get('https://www.dometic.com/sitemap/en-au.xml');
const urls = [...new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))].filter((u) => /\/en-au\/(professional\/)?product\/dometic-(dm50|hipro)/.test(u));
console.log('minibar pages:', urls.length);

const out = [];
const jobs = [];
const seen = new Set();
for (const url of urls) {
  const h = await get(url);
  await sleep(300);
  if (!h) continue;
  let ld = null;
  for (const m of h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    try { const j = JSON.parse(m[1]); if (j['@type'] === 'Product') ld = j; } catch {}
  }
  if (!ld) continue;
  const sku = clean(ld.sku || '');
  if (seen.has(sku)) continue;
  seen.add(sku);
  const name = clean(ld.name || '');
  const model = name.replace(/^Dometic\s+/i, '');
  const L = lines(h.slice(h.indexOf('Specifications'), h.indexOf('Logistics') > 0 ? h.indexOf('Logistics') : undefined));
  const specs = {};
  for (let i = 0; i < L.length - 1; i++) {
    if (/dimensions product|net weight|total volume|input voltage|input frequency|refrigerant|climate class|noise|thermostat|interior light|cooling|door|certificates|insulation|energy/i.test(L[i]) && !/specifications$/i.test(L[i]) && L[i + 1].length < 60) specs[L[i].replace(/,\s*\[[^\]]*\]/, '')] = L[i + 1];
  }
  const w = firstNum(specs['Dimensions product width']), d = firstNum(specs['Dimensions product depth']), hh = firstNum(specs['Dimensions product height']);
  const imgs = [];
  const img = Array.isArray(ld.image) ? ld.image[0] : ld.image;
  if (img) {
    const fname = `${slugify(model)}-${sku}.png`;
    imgs.push(`/images/products/dometic/${fname}`);
    jobs.push({ url: img, dest: path.join('public/images/products/dometic', fname) });
  }
  const sp = { Model: model, Manufacturer: 'Dometic', SKU: sku };
  for (const [k, v] of Object.entries(specs)) sp[k] = v;
  out.push(
    makeProduct({
      id: `dm-${sku}`,
      sku,
      brand: 'Dometic',
      model,
      name: `Dometic ${model} Minibar`,
      title: `${model} minibar`,
      slug: slugify(`dometic ${model} ${sku}`).slice(0, 110),
      primaryCategory: 'Bar Fridges & Coolers',
      subCategory: 'Under Bar Fridges',
      categorySlug: 'under-bar-fridges',
      type: 'Minibar',
      doorCount: 1,
      doorType: /drawer|DM50/i.test(name) ? 'drawer' : /\bg\b|glass/i.test(model) ? 'glass' : 'solid',
      doorStyle: /DM50/i.test(name) ? 'drawer' : 'hinged',
      widthMm: w, depthMm: d, heightMm: hh,
      capacityLitres: firstNum(specs['Total volume (IEC 62552-3)']),
      finish: '',
      tempRange: '',
      installation: 'under-bench',
      power: specs['Input voltage (AC)'] ? `${specs['Input voltage (AC)']} V` : '',
      refrigerant: specs['Refrigerant'] || specs['Refrigerant, type'] || '',
      weightKg: firstNum(specs['Net weight']) || null,
      features: [],
      specs: sp,
      images: imgs,
      sourceUrl: url,
      shortDescription: clean(ld.description || ''),
      fullDescription: clean(ld.description || '') + ' Specifications are supplied by Dometic; contact us for current pricing, availability and delivery to your postcode.'
    })
  );
}
fs.writeFileSync('data/products-dometic.json', JSON.stringify(out, null, 1));
console.log('dometic products:', out.length, 'with image:', out.filter((p) => p.images.length).length);
console.log(out.slice(0, 4).map((p) => `${p.name} | ${p.widthMm}x${p.depthMm}x${p.heightMm} | ${p.capacityLitres}L | ${p.refrigerant}`).join('\n'));
await downloadAll(jobs);
