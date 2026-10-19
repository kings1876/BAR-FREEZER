// Shared helpers for brand catalogue builders.
import fs from 'fs';
import path from 'path';

export const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();
export const decodeEntities = (s) =>
  String(s ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;|&#8212;/g, '-')
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8243;|&#8221;|&#8220;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&nbsp;/g, ' ');
export const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// First number in a string, commas removed ("1,365L" -> 1365, "930mm (840mm without legs)" -> 930)
export const firstNum = (v) => {
  const m = String(v ?? '').match(/\d[\d,]*(?:\.\d+)?/);
  return m ? Math.round(Number(m[0].replace(/,/g, ''))) : 0;
};
export const widthRange = (w) => (!w ? '' : w < 600 ? '<600' : w <= 900 ? '600-900' : w <= 1200 ? '900-1200' : w <= 1500 ? '1200-1500' : w <= 1800 ? '1500-1800' : '1800+');
export const capRange = (l) => (!l ? '' : l < 100 ? '<100' : l < 200 ? '100-200' : l < 300 ? '200-300' : l < 400 ? '300-400' : l < 600 ? '400-600' : '600+');

export async function downloadAll(jobs, concurrency = 4) {
  const queue = jobs.filter((j) => !fs.existsSync(j.dest));
  let ok = 0, fail = 0;
  async function worker() {
    while (queue.length) {
      const j = queue.shift();
      fs.mkdirSync(path.dirname(j.dest), { recursive: true });
      let done = false;
      for (let t = 0; t < 3 && !done; t++) {
        try {
          const r = await fetch(j.url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; BarFreezerCatalogue/1.0 (product catalogue import))' } });
          if (r.ok) { fs.writeFileSync(j.dest, Buffer.from(await r.arrayBuffer())); ok++; done = true; }
        } catch {}
        if (!done) await new Promise((r) => setTimeout(r, 700 * (t + 1)));
      }
      if (!done) { fail++; console.log('IMG FAIL', j.url); }
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  console.log('images downloaded:', ok, 'failed:', fail, 'already present:', jobs.length - queue.length - ok - fail);
}

// Builds a Product object in the site's schema from normalised fields.
export function makeProduct(f) {
  const dims = f.widthMm && f.depthMm && f.heightMm ? `${f.widthMm} x ${f.depthMm} x ${f.heightMm} mm` : '';
  const short = f.shortDescription || `${f.title}${f.model ? ` (model ${f.model})` : ''}.${f.capacityLitres ? ` ${f.capacityLitres} L,` : ''}${dims ? ` ${dims}` : ''}${f.tempRange ? `, ${f.tempRange.split(' (')[0]}` : ''}.`;
  const full = f.fullDescription || `${f.title}, ${f.brand} model ${f.model}.${dims ? ` Overall dimensions are ${dims}.` : ''}${f.warrantyText ? ` Manufacturer warranty: ${f.warrantyText}.` : ''} Specifications are supplied by the manufacturer; contact us for current pricing, availability and delivery to your postcode.`;
  return {
    id: f.id,
    sku: f.sku || f.model,
    brand: f.brand,
    model: f.model,
    name: f.name,
    slug: f.slug,
    categorySlug: f.categorySlug,
    primaryCategory: f.primaryCategory,
    subCategory: f.subCategory,
    type: f.type,
    doorCount: f.doorCount || 0,
    doorType: f.doorType || 'solid',
    doorStyle: f.doorStyle || 'hinged',
    widthMm: f.widthMm || 0,
    depthMm: f.depthMm || 0,
    heightMm: f.heightMm || 0,
    widthRange: widthRange(f.widthMm),
    capacityLitres: f.capacityLitres || 0,
    capacityRange: capRange(f.capacityLitres),
    price: null,
    tradePrice: null,
    msrp: null,
    finish: f.finish || '',
    tempRange: f.tempRange || '',
    installation: f.installation || 'freestanding',
    use: 'commercial',
    power: f.power || '',
    refrigerant: f.refrigerant || '',
    weightKg: f.weightKg || null,
    condition: 'new',
    availability: 'Request a quote',
    shippingBadge: null,
    stockQty: null,
    warrantyYears: f.warrantyYears || 0,
    warrantyText: f.warrantyText || '',
    features: f.features || [],
    shortDescription: short,
    fullDescription: full,
    specs: f.specs || {},
    dimensionGuide: {
      requiredCutout: dims || 'Refer to the manufacturer specification sheet',
      ventilationClearance: "Refer to the manufacturer's installation instructions",
      doorSwingRadius: "Refer to the manufacturer's specification sheet"
    },
    frequentlyBoughtTogether: [],
    alternatives: [],
    images: f.images || [],
    sourceUrl: f.sourceUrl || ''
  };
}
