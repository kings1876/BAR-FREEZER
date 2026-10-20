// Reads .volcache texts (supplier page text) and derives a stated volume per product.
// Order: explicit gross label > explicit net/capacity/volume label > a single unambiguous litre figure in the text.
// Fridge+freezer combos with two stated figures are flagged 'combo' with both values. Anything ambiguous is left for manual review.
import fs from 'fs';

const missing = JSON.parse(fs.readFileSync('.missing.json', 'utf8'));
const LABELLED = [
  ['gross', /gross\s*(?:storage\s*)?(?:volume|capacity)\s*(?:\(?\s*(?:l|ltr|litres?)\s*\)?)?\s*[:\-–]?\s*(\d{2,4}(?:\.\d)?)/i],
  ['stated', /(?:net|storage|internal|total|usable)\s*(?:volume|capacity)\s*(?:\(?\s*(?:l|ltr|litres?)\s*\)?)?\s*[:\-–]?\s*(\d{2,4}(?:\.\d)?)/i],
  ['stated', /(?:^|[^a-z])capacity\s*[:\-–]?\s*(\d{2,4}(?:\.\d)?)\s*(?:l\b|ltr|litres?|liters?)/i],
  ['stated', /volume\s*(?:\(?\s*(?:l|ltr|litres?)\s*\)?)?\s*[:\-–]?\s*(\d{2,4}(?:\.\d)?)\s*(?:l\b|ltr|litres?)?/i],
];
const UNIT = /(\d{2,4}(?:\.\d)?)\s*(?:l\b|ltr|litres?|liters?)(?![a-z])/gi;
const NOISE = /per\s|\/\s*h|bowl|kwh|water|\bpan|gas|min\b|kg|hour|ice|production|bottle|can\b/i;

const res = [];
for (const p of missing) {
  const f = '.volcache/' + p.id.replace(/[^a-z0-9_-]/gi, '_') + '.txt';
  const t = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
  let hit = null;
  for (const [kind, re] of LABELLED) {
    const m = t.match(re);
    if (m && Number(m[1]) >= 20 && Number(m[1]) <= 2000) { hit = { kind, value: Number(m[1]), ctx: t.slice(Math.max(0, m.index - 25), m.index + 70) }; break; }
  }
  if (!hit && t) {
    const all = [];
    let m;
    UNIT.lastIndex = 0;
    while ((m = UNIT.exec(t))) {
      const v = Number(m[1]);
      const ctx = t.slice(Math.max(0, m.index - 40), m.index + 45);
      if (v >= 20 && v <= 2000 && !NOISE.test(ctx.slice(25, 70))) all.push({ v, ctx });
    }
    const vals = [...new Set(all.map((a) => a.v))];
    if (vals.length === 1) hit = { kind: 'single', value: vals[0], ctx: all[0].ctx };
    else if (vals.length > 1) {
      const near = all.filter((a) => /capacity|volume|storage|refrigerat|freez/i.test(a.ctx));
      const nv = [...new Set(near.map((a) => a.v))];
      hit = { kind: 'multi', values: vals, nearValues: nv, ctx: all.map((a) => a.ctx).slice(0, 3) };
    }
  }
  res.push({ ...p, specs: undefined, hit, textLen: t.length });
}
fs.writeFileSync('.volumes-classified.json', JSON.stringify(res, null, 1));
const c = {};
res.forEach((r) => { const k = r.hit ? r.hit.kind : 'none'; c[k] = (c[k] || 0) + 1; });
console.log(c);
