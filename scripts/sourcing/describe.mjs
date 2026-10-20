// Generates a unique, specification-based "About" description for every product (facts only, from the product's own data).
// Output: replaces product.fullDescription in src/config/products.generated.json. Usage: node scripts/sourcing/describe.mjs [--dry]
import fs from 'fs';
import crypto from 'crypto';

const DRY = process.argv.includes('--dry');
const FILE = 'src/config/products.generated.json';
const P = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const KW = JSON.parse(fs.readFileSync('src/config/product-keywords.json', 'utf8'));

const h = (s) => parseInt(crypto.createHash('md5').update(String(s)).digest('hex').slice(0, 8), 16);
const pick = (arr, seed) => arr[h(seed) % arr.length];
const clean = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

const TERMS = {
  'under bench fridge': ['under bench fridge', 'for bars, cafes and restaurants that need chilled stock close to the point of service'],
  'glass door bar fridge': ['glass door bar fridge', 'to keep drinks cold while showing them to customers or staff'],
  'glass door display freezer': ['glass door display freezer', 'for storing and displaying frozen product'],
  'under bar freezer': ['under bar freezer', 'to keep ice, frozen garnishes and frozen stock beneath the counter'],
  'bottle cooler': ['bottle cooler', 'to keep bottles and cans cold behind the bar'],
  'commercial ice maker': ['commercial ice maker', 'to supply ice for drinks service, food display and storage'],
  'upright commercial freezer': ['upright commercial freezer', 'for kitchens, bars and venues that need frozen storage without using much floor space'],
  'bar freezer': ['bar freezer', 'for bars, venues and home bars that need frozen storage on hand'],
  'chest freezer': ['chest freezer', 'for deep frozen storage in bars, cafes and venues'],
  'wine fridge': ['wine fridge', 'to hold bottles at a steady, cellar-style temperature'],
  'beer fridge': ['beer fridge', 'to keep beer and other drinks at serving temperature'],
  'back bar fridge': ['back bar fridge', 'to hold chilled stock behind the bar within easy reach of staff'],
  'kegerator': ['kegerator', 'to chill and dispense draught beer'],
  'bar fridge freezer': ['bar fridge and freezer', 'where one cabinet needs to hold both chilled and frozen stock'],
  'back bar freezer': ['back bar freezer', 'to hold frozen stock behind the bar'],
  'outdoor bar fridge': ['outdoor bar fridge', 'for patios, BBQ areas and outdoor bars'],
  'glass froster': ['glass froster', 'to chill glassware so drinks are served in a frosted glass'],
  'fridge spare parts': ['replacement part', 'for commercial and bar refrigeration equipment'],
  'fridge castors': ['castor and leg set', 'to make a refrigeration cabinet easier to move or to adjust its height'],
  'fridge shelf': ['shelf or basket', 'to organise stock inside a refrigeration cabinet'],
  'fridge door seal': ['door seal or lock', 'to keep a cabinet sealed and secure'],
  'coil cleaner': ['cleaning product', 'to keep condenser coils clean so a cabinet can ventilate properly'],
};

const lc = (t) => (t.length > 1 && /[a-z]/.test(t[1]) ? t[0].toLowerCase() + t.slice(1) : t);
const dd = (str) => { let w = str.split(' '); for (let k = 3; k >= 1; k--) for (let i = 0; i + 2 * k <= w.length; i++) if (w.slice(i, i + k).join(' ').toLowerCase() === w.slice(i + k, i + 2 * k).join(' ').toLowerCase()) { w = [...w.slice(0, i), ...w.slice(i + k)]; i = -1; } return w.join(' '); };
const isIceMachine = (p) => /ice (maker|machine|dispenser)|flak(e|er)|nugget|cuber|ice-maker/i.test(p.name) || Object.keys(p.specs || {}).some((k) => /production capacity/i.test(k));
const an = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
// Scraped feature strings are sometimes cut off mid-sentence or written in the maker's voice; skip those.
const goodFeature = (f) => { const t = clean(f); return t.length > 3 && !/(our|we|your)/i.test(t) && !/(a|an|the|and|or|with|for|to|of|in|on|at|by|that|is|are|this|digital|makes|from|as|which)$/i.test(t); };
const short = (v, n = 64) => { v = clean(v); if (v.length <= n) return v; const cut = v.slice(0, n); const i = cut.lastIndexOf(' '); let r = (i > 20 ? cut.slice(0, i) : cut).replace(/[,;:( -]+$/, ''); for (let k = 0; k < 4; k++) r = r.replace(/\s+(a|an|the|and|or|with|for|to|of|in|on|at|by|that|is|are|this|digital|makes|from|as|which|model|suitable|system)$/i, '').replace(/[,;:( -]+$/, ''); return r; };
const ACC = {
  'Shelving, Baskets & Trays': 'shelf, basket or tray',
  'Door Locks & Gaskets': 'door seal, lock or hinge part',
  'Castors, Legs & Stands': 'castor, leg or stand',
  'Ice Machines & Ice Storage': 'ice machine accessory or ice storage product',
  'Covers & Cleaning': 'cleaning or protection product',
  'Glass Frosting Accessories': 'glass frosting product',
  'Spare Parts (Compressors, Fans, Thermostats)': 'replacement part',
};
const spec = (p, ...re) => {
  const s = p.specs || {};
  for (const k of Object.keys(s)) if (re.some((r) => r.test(k)) && clean(s[k]) && !/^(n\/?a|-|none)$/i.test(clean(s[k]))) return clean(s[k]);
  return '';
};

function describeAccessory(p) {
  const seed = p.id;
  const noun = ACC[p.subCategory] || 'part or accessory';
  const name = dd(clean(String(p.name).split(' - ')[0]));
  const model = clean(p.model);
  const out = [];
  let p1 = `${name}${model && !name.toLowerCase().includes(model.toLowerCase()) ? ` (${model})` : ''} is ${an(noun)} ${noun} from ${p.brand} for commercial and bar refrigeration equipment.`;
  const sd = clean(p.shortDescription).replace(/^buy\s+/i, '');
  const sentences = sd.split(/(?<=[.!?])\s+/).filter((x) => x.length > 20 && !/contact us|specifications are supplied/i.test(x)).slice(0, 2).join(' ');
  if (sentences && !name.toLowerCase().includes(sentences.toLowerCase().slice(0, 30))) p1 += ' ' + sentences;
  out.push(p1);
  const f = [];
  if (p.widthMm >= 10 && p.depthMm >= 10 && p.heightMm >= 10) f.push(`dimensions of ${p.widthMm} x ${p.depthMm} x ${p.heightMm} mm`);
  if (p.weightKg) f.push(`a weight of ${p.weightKg} kg`);
  const power = clean(p.power); if (power && power !== '10A') f.push(`a ${power} supply`);
  (p.features || []).filter(goodFeature).slice(0, 3).forEach((x) => f.push(String(x)));
  if (f.length >= 2) out.push(`Listed details include ${f.slice(0, -1).join(', ')} and ${f[f.length - 1]}.`);
  else if (f.length === 1) out.push(`Listed details include ${f[0]}.`);
  out.push(pick([
    'Check the part number and the model of the equipment it will be used with before you order. If you are not sure it fits, contact us with the cabinet model and serial number.',
    'Compatibility depends on the model of your equipment, so confirm the part number first. Our team can help if you send the model and serial number from the data plate.',
  ], seed + 'c'));
  out.push(`Order the ${model || name} online for delivery Australia-wide. Product code: ${p.sku}.`);
  return out.join('\n\n');
}

function describe(p) {
  if (p.primaryCategory === 'Accessories & Parts' && !isIceMachine(p)) return describeAccessory(p);
  const kw = KW[p.id] || {};
  const termKey = kw.term || 'bar fridge';
  const [noun, use] = TERMS[termKey] || [termKey, 'for bars and hospitality venues'];
  const brand = p.brand, model = p.model && !String(brand).toLowerCase().includes(String(p.model).toLowerCase()) ? p.model : '';
  const label = clean(`${brand} ${model}`);
  const isAcc = false;
  const cond = p.condition && p.condition !== 'new' ? p.condition : '';
  const seed = p.id;

  // ---- facts
  const dims = p.widthMm && p.depthMm && p.heightMm ? `${p.widthMm} x ${p.depthMm} x ${p.heightMm} mm (W x D x H)` : '';
  const cap = p.capacityLitres && p.capacityLitres >= 20 ? `${p.capacityLitres} litres` : '';
  const doors = p.doorCount > 0 && p.doorCount <= 6 ? `${p.doorCount === 1 ? 'a single' : p.doorCount} ${p.doorType && p.doorType !== 'unknown' ? p.doorType : ''} door${p.doorCount > 1 ? 's' : ''}`.replace(/\s+/g, ' ') : '';
  const finish = clean(p.finish) && !/^(unknown|n\/a)$/i.test(p.finish) ? p.finish : '';
  const temp = clean(p.tempRange);
  const ref = clean(p.refrigerant);
  const power = clean(p.power);
  const weight = p.weightKg ? `${p.weightKg} kg` : '';
  const shelves = spec(p, /^shel/i);
  const light = spec(p, /light/i);
  const controller = spec(p, /controller|control$/i);
  const defrost = spec(p, /defrost/i);
  const cooling = spec(p, /type of cooling|^cooling/i);
  const bottles = spec(p, /bottles.*330|bottles/i);
  const cans = spec(p, /cans.*330|cans/i);
  const iceType = spec(p, /type of ice/i);
  const iceOut = spec(p, /production capacity \(kg/i);
  const climate = spec(p, /climate class/i);
  const opConds = spec(p, /operating conditions/i);
  const cool = spec(p, /^cooling$/i);
  const storage = spec(p, /storage|bin capacity/i);
  const warranty = clean(p.warrantyText);

  const out = [];

  // ---- paragraph 1: overview
  const openers = [
    `The ${label} is ${an(noun)} ${noun} designed ${use}.`,
    `${label} is ${an(noun)} ${noun} made ${use}.`.replace('made for', 'built for'),
    `Choose the ${label} ${noun} ${use.startsWith('to ') ? use : use}.`,
  ];
  let p1 = pick(openers, seed + 'o');
  const body = [];
  if (dims) body.push(`It measures ${dims}`);
  if (cap) body.push(`${dims ? 'with' : 'It has'} a gross capacity of ${cap}`);
  if (iceOut) body.push(`${body.length ? 'and produces ' : 'It produces '}${iceOut} kg per 24 hours${iceType ? ` of ${iceType.toLowerCase()} ice` : ' of ice'}`);
  if (body.length) p1 += ' ' + body.join(' ') + '.';
  if (doors && !isAcc && !/ice maker/.test(termKey)) p1 += ` The cabinet has ${doors}${finish ? ` and a ${finish.toLowerCase()} finish` : ''}.`;
  else if (finish && !isAcc) p1 += ` The finish is ${finish.toLowerCase()}.`;
  out.push(p1);

  // ---- paragraph 2: key specifications (varied selection and order)
  const facts = [];
  if (temp) facts.push(`an operating temperature of ${temp}`);
  if (ref) facts.push(`${ref} refrigerant`);
  if (power) facts.push(`a ${short(power.replace(/1 PHASE /i, 'single-phase ').replace(/\/\s*10 AMP Plug/i, ', 10 amp plug'), 60)} electrical supply`);
  if (weight) facts.push(`a weight of ${weight}`);
  if (shelves) { const sv = short(shelves.replace(/^shelves:?\s*/i, '').split(/ (?=Wire shelf|Shelf:|Shelf )/i)[0], 60); facts.push(/shel|basket|rack|tray/i.test(sv) ? sv.toLowerCase() : `shelving listed as ${sv.toLowerCase()}`); }
  if (light) facts.push(`${lc(short(light.replace(/^1 x /, ''), 50))} interior lighting`);
  if (controller) facts.push(`${lc(short(controller, 40))} temperature control`);
  if (defrost) facts.push(`${defrost.toLowerCase()} defrost`);
  if (cooling) facts.push(`${cooling.toLowerCase()} cooling`);
  if (climate) facts.push(`climate class ${climate}`);
  if (storage && /ice maker/.test(termKey)) facts.push(`storage of ${short(storage, 40)}`);
  if (bottles) facts.push(`room for ${bottles} 330 ml bottles`);
  if (cans) facts.push(`room for ${cans} 330 ml cans`);
  (p.features || []).filter(goodFeature).slice(0, 4).forEach((f) => { if (/^shelves?:/i.test(String(f)) && shelves) return; const t = lc(short(String(f).replace(/^shelves?:\s*/i, 'shelves: '), 50)); if (!facts.some((x) => x.toLowerCase().includes(t.toLowerCase().slice(0, 8)))) facts.push(t); });
  const start = facts.length ? h(seed + 's') % facts.length : 0;
  const rot = facts.slice(start).concat(facts.slice(0, start)).slice(0, 7);
  if (rot.length >= 2) {
    const lead = pick(['Key specifications include', 'Specifications listed for this model include', 'The manufacturer lists', 'On paper, it offers'], seed + 'k');
    out.push(`${lead} ${rot.slice(0, -1).join(', ')} and ${rot[rot.length - 1]}.${warranty ? ` Manufacturer warranty: ${warranty}.` : ''}`);
  } else if (rot.length === 1) {
    out.push(`The manufacturer lists ${rot[0]}.${warranty ? ` Manufacturer warranty: ${warranty}.` : ''}`);
  }

  // ---- paragraph 3: installation and placement
  if (!isAcc) {
    if (/ice maker/.test(termKey)) {
      out.push(pick([
        'Ice makers need a water supply, drainage and power. Have the connections completed by a licensed tradesperson and follow the manufacturer\'s installation instructions.',
        'Before you order, check the water supply, drain and electrical connections at the site. Installation should be completed by a qualified tradesperson in line with the manufacturer\'s instructions.',
      ], seed + 'i'));
    } else if (p.installation === 'under-bench' || /under bench|under bar|back bar/.test(termKey)) {
      out.push(pick([
        'This model is designed to sit under a bench or counter. Measure the opening and compare it with the dimensions above, allow the ventilation clearance set out in the manufacturer\'s instructions, and check which way the door opens.',
        'It is intended for under-counter use. Check the width, depth and height against your opening, leave room for airflow as the manufacturer specifies, and allow space to open the door fully.',
        'Fitting it beneath a bench takes planning: confirm the opening size, keep the ventilation clear as the manufacturer instructs, and make sure the door has room to swing or slide.',
      ], seed + 'b'));
    } else {
      out.push(pick([
        'Measure the space and compare it with the dimensions above before you order. Allow clearance around the cabinet for airflow as the manufacturer instructs, and keep it away from direct heat and sunlight.',
        'Plan the position before delivery: check the dimensions against your space and doorways, leave room for ventilation as set out in the manufacturer\'s instructions, and allow space to open the doors.',
        'Check the dimensions against your space, access route and doorways. The manufacturer\'s instructions set out the ventilation clearance the cabinet needs.',
      ], seed + 'f'));
    }
  }

  // ---- condition note
  if (cond) out.push(`This ${cond} unit is limited and specific to the stock listed. Contact us to confirm availability, condition and warranty before ordering.`);

  // ---- buying line
  out.push(pick([
    `Buy the ${label} ${noun} with delivery Australia-wide. Use the specification table on this page, compare it with similar models, or request a quote if you are ordering more than one unit.`,
    `You can order the ${label} online and have it delivered Australia-wide. Compare the full specifications below, look at the alternatives, or ask for a quote for multi-unit orders.`,
    `Order the ${label} ${noun} for delivery across Australia. The full specification table is below, and our team can quote on multiple units.`,
  ], seed + 'q'));

  out[out.length - 1] += ` Product code: ${p.sku}.`;
  return out.join('\n\n');
}

const result = {};
for (const p of P) result[p.id] = describe(p);

// ---- quality gates
const wc = (s) => s.split(/\s+/).filter(Boolean).length;
const words = Object.values(result).map(wc).sort((a, b) => a - b);
console.log('words: min', words[0], 'p10', words[Math.floor(words.length * 0.1)], 'median', words[Math.floor(words.length / 2)], 'max', words[words.length - 1]);
console.log('under 80 words:', words.filter((w) => w < 80).length, '| under 120:', words.filter((w) => w < 120).length, '| 120+:', words.filter((w) => w >= 120).length);
const grams = (s) => { const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean); const g = new Set(); for (let i = 0; i + 5 <= w.length; i++) g.add(w.slice(i, i + 5).join(' ')); return g; };
let worst = 0, worstPair = null, checked = 0;
const byBrand = {};
for (const p of P) (byBrand[p.brand] = byBrand[p.brand] || []).push(p);
for (const list of Object.values(byBrand)) {
  const sample = list.slice(0, 60);
  const G = sample.map((p) => grams(result[p.id]));
  for (let i = 0; i < sample.length; i++) for (let j = i + 1; j < sample.length; j++) {
    let inter = 0; for (const x of G[i]) if (G[j].has(x)) inter++;
    const sim = inter / (G[i].size + G[j].size - inter || 1);
    checked++;
    if (sim > worst) { worst = sim; worstPair = [sample[i].id, sample[j].id]; }
  }
}
console.log('max 5-gram similarity between two products of the same brand:', worst.toFixed(2), worstPair, 'pairs checked', checked);
const dup = new Map(); Object.entries(result).forEach(([id, t]) => { (dup.get(t) || dup.set(t, []).get(t)).push(id); });
console.log('identical descriptions:', [...dup.values()].filter((a) => a.length > 1).length);

for (const id of ['tc-ba30s-3-15844', 'hz-fm-480ake-hc-sb', 'sk-skft650n-a', 'wl-b1u', 'acc-lass-lb-500s-2']) { if (result[id]) console.log('\n=== ' + id + ' (' + wc(result[id]) + ' words)\n' + result[id]); }

if (!DRY) {
  for (const p of P) p.fullDescription = result[p.id];
  fs.writeFileSync(FILE, JSON.stringify(P));
  console.log('\nwritten to', FILE);
}
