// Splits the full product data into a light list (shipped to every visitor) and detail fields that only product pages need.
// Reads src/config/products.generated.json (full, server-only) and writes src/config/products.light.json.
// Product pages receive their detail fields from the server render (see src/app/[[...slug]]/page.tsx).
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
const a = fs.statSync(path.join(root, 'src/config/products.generated.json')).size;
const b = fs.statSync(path.join(root, 'src/config/products.light.json')).size;
console.log(`split-products: ${full.length} products, full ${(a / 1e6).toFixed(2)}MB -> light ${(b / 1e6).toFixed(2)}MB`);
