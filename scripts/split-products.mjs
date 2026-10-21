// Splits the full product data into three files.
//  - products.light.json  : array used by scripts and audits (full list fields, no server-only detail).
//  - products.client.json : compact column table shipped to the browser (no repeated keys, first photo only).
//  - detail fields are served per product page by the server (see src/app/[[...slug]]/page.tsx).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const full = JSON.parse(fs.readFileSync(path.join(root, 'src/config/products.generated.json'), 'utf8'));
export const DETAIL_KEYS = ['specs', 'fullDescription', 'dimensionGuide', 'sourceUrl', 'alternatives', 'frequentlyBoughtTogether'];
const light = full.map((p) => {
  const o = { ...p };
  for (const k of DETAIL_KEYS) delete o[k];
  return o;
});
fs.writeFileSync(path.join(root, 'src/config/products.light.json'), JSON.stringify(light));

// Client table: keep only what category grids, filters, search, cart and compare need.
const CLIENT_DROP = ['features', 'shortDescription', 'priceBasis', 'capacityNote'];
const slim = light.map((p) => {
  const o = { ...p };
  for (const k of CLIENT_DROP) delete o[k];
  if (Array.isArray(o.images)) o.images = o.images.slice(0, 1);
  return o;
});
const keys = [...new Set(slim.flatMap((p) => Object.keys(p)))];
const rows = slim.map((p) => keys.map((k) => (p[k] === undefined ? null : p[k])));
fs.writeFileSync(path.join(root, 'src/config/products.client.json'), JSON.stringify({ keys, rows }));

const sz = (f) => (fs.statSync(path.join(root, 'src/config', f)).size / 1e6).toFixed(2);
console.log(`split-products: ${full.length} products, full ${sz('products.generated.json')}MB, light ${sz('products.light.json')}MB, client ${sz('products.client.json')}MB`);
