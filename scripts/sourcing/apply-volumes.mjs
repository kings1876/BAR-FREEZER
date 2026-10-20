// Writes supplier-stated volumes (from classify-volumes.mjs + manual review) into products.generated.json.
// capacityKind: gross | stated | combined. Combined = fridge + freezer compartments (details in capacityNote).
import fs from 'fs';

const FILE = 'src/config/products.generated.json';
const g = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const arr = Array.isArray(g) ? g : g.products;
const cl = fs.existsSync('.volumes-classified.json') ? JSON.parse(fs.readFileSync('.volumes-classified.json', 'utf8')) : [];
const byId = new Map(arr.map((p) => [p.id, p]));

// model -> manual decision after reading the supplier text
const MANUAL = {
  'HRF-77': { fridge: 285, freezer: 257 },
  'HRF-127': { fridge: 463, freezer: 463 },
  'GCv 4060': { fridge: 254, freezer: 107 },
  'SURF12-2': { fridge: 127, freezer: 135 },
  'FKDv4213': { gross: 403 },
  'GKv 6460': { gross: 664 },
  'GKv 5790': { gross: 586 },
  'GKPv 6570': { gross: 597 },
  'GGPv 1470': { gross: 1361 },
  'TS1800TN-3D': { stated: 318 },
  'SUCG500B': { stated: 500 },
  'WC50BK1Z': { skip: true },
  'WBC2-240': { skip: true },
};
const EXTRA = JSON.parse(fs.existsSync('scripts/sourcing/volumes-extra.json') ? fs.readFileSync('scripts/sourcing/volumes-extra.json', 'utf8') : '{}');
Object.assign(MANUAL, EXTRA);

let n = 0;
const skipped = [];
for (const r of cl) {
  const p = byId.get(r.id);
  if (!p || p.capacityLitres) continue;
  const man = MANUAL[r.model];
  let set = null;
  if (man) {
    if (man.skip) { skipped.push(r.model); continue; }
    if (man.fridge) set = { capacityLitres: man.fridge + man.freezer, capacityKind: 'combined', capacityNote: `fridge ${man.fridge} litres, freezer ${man.freezer} litres` };
    else if (man.gross) set = { capacityLitres: man.gross, capacityKind: 'gross' };
    else if (man.stated) set = { capacityLitres: man.stated, capacityKind: 'stated' };
  } else if (r.hit && (r.hit.kind === 'gross' || r.hit.kind === 'stated' || r.hit.kind === 'single')) {
    set = { capacityLitres: r.hit.value, capacityKind: r.hit.kind === 'gross' ? 'gross' : 'stated' };
  }
  if (!set) continue;
  Object.assign(p, set);
  n++;
}
// manual entries apply even without the classified cache
for (const p of arr) {
  if (p.capacityLitres) continue;
  const man = MANUAL[p.model];
  if (!man || man.skip) continue;
  if (man.fridge) Object.assign(p, { capacityLitres: man.fridge + man.freezer, capacityKind: 'combined', capacityNote: `fridge ${man.fridge} litres, freezer ${man.freezer} litres` });
  else if (man.gross) Object.assign(p, { capacityLitres: man.gross, capacityKind: 'gross' });
  else if (man.stated) Object.assign(p, { capacityLitres: man.stated, capacityKind: 'stated' });
  n++;
}
const LABELS = JSON.parse(fs.readFileSync('scripts/sourcing/volumes-labels.json', 'utf8'));
let nl = 0;
for (const p of arr) { if (!p.capacityLitres && LABELS[p.model]) { p.capacityLabel = LABELS[p.model]; nl++; } }
console.log('labels applied:', nl);
fs.writeFileSync(FILE, JSON.stringify(g));
console.log('volumes applied:', n, 'skipped:', skipped.join(','));
