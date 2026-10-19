// Price tooling.
//   node scripts/sourcing/prices.mjs template   -> writes docs/price-list-template.csv (one row per product)
//   node scripts/sourcing/prices.mjs apply      -> reads data/prices.csv and writes prices into src/config/products.generated.json
// CSV columns: id,brand,model,name,subcategory,price_inc_gst,trade_price,stock_qty  (only id + the last three are read on apply)
import fs from 'fs';

const FILE = 'src/config/products.generated.json';
const products = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const mode = process.argv[2] || 'template';

const csvEscape = (v) => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

function parseCsv(text) {
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cur); cur = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else cur += c;
  }
  row.push(cur);
  if (row.some((x) => x !== '')) rows.push(row);
  return rows;
}

if (mode === 'template') {
  const head = ['id', 'brand', 'model', 'name', 'subcategory', 'price_inc_gst', 'trade_price', 'stock_qty'];
  const lines = [head.join(',')];
  for (const p of products) {
    lines.push([p.id, p.brand, p.model, p.name, p.subCategory, p.price ?? '', p.tradePrice ?? '', p.stockQty ?? ''].map(csvEscape).join(','));
  }
  fs.mkdirSync('../docs', { recursive: true });
  fs.writeFileSync('../docs/price-list-template.csv', lines.join('\n'));
  console.log('wrote docs/price-list-template.csv with', products.length, 'rows');
} else if (mode === 'found') {
  // Apply market prices found at Australian retailers (median of listings, inc GST, rounded to the dollar).
  const found = JSON.parse(fs.readFileSync('data/prices-found.json', 'utf8'));
  const byId = new Map(products.map((p) => [p.id, p]));
  let n = 0;
  for (const [id, v] of Object.entries(found)) {
    const p = byId.get(id);
    if (!p) continue;
    const ps = v.prices.map((x) => x.price).sort((a, b) => a - b);
    const med = ps.length % 2 ? ps[(ps.length - 1) / 2] : (ps[ps.length / 2 - 1] + ps[ps.length / 2]) / 2;
    p.price = Math.round(med);
    p.tradePrice = null;
    p.msrp = null;
    n++;
  }
  fs.writeFileSync(FILE, JSON.stringify(products));
  console.log('market prices applied:', n, 'still without price:', products.filter((p) => p.price == null).length);
} else if (mode === 'apply') {
  const rows = parseCsv(fs.readFileSync('data/prices.csv', 'utf8'));
  const head = rows[0].map((h) => h.trim().toLowerCase());
  const ix = (n) => head.indexOf(n);
  const byId = new Map(products.map((p) => [p.id, p]));
  const num = (v) => { const n = parseFloat(String(v ?? '').replace(/[$,\s]/g, '')); return Number.isFinite(n) && n > 0 ? n : null; };
  let updated = 0, missing = 0;
  for (const r of rows.slice(1)) {
    const p = byId.get(r[ix('id')]?.trim());
    if (!p) { missing++; continue; }
    const price = num(r[ix('price_inc_gst')]);
    const trade = num(r[ix('trade_price')]);
    const stock = num(r[ix('stock_qty')]);
    if (price == null) continue;
    p.price = price;
    p.tradePrice = trade ?? Math.round(price * 0.92);
    p.stockQty = stock != null ? Math.round(stock) : null;
    p.availability = stock != null && stock > 0 ? 'in stock' : 'Request a quote';
    updated++;
  }
  fs.writeFileSync(FILE, JSON.stringify(products));
  console.log('prices applied:', updated, 'unknown ids:', missing, 'still without price:', products.filter((p) => p.price == null).length);
}
