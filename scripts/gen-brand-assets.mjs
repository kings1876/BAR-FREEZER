// One-off generator for favicon.ico (PNG-in-ICO) and the default Open Graph image. Re-run if the logo changes.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');

const mark = (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}"><rect width="64" height="64" rx="12" fill="#0f172a"/><g stroke="#38bdf8" stroke-width="4" stroke-linecap="round"><path d="M32 12v40M14 22l36 20M14 42l36-20"/></g></svg>`;

// favicon.ico with 32x32 and 48x48 PNG images
const sizes = [32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await sharp(Buffer.from(mark(s))).resize(s, s).png().toBuffer());
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const dir = [];
pngs.forEach((buf, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length; dir.push(e);
});
fs.writeFileSync(path.join(pub, 'favicon.ico'), Buffer.concat([header, ...dir, ...pngs]));

// 1200x630 Open Graph image
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#0f172a"/>
<rect x="0" y="560" width="1200" height="70" fill="#f59e0b"/>
<g transform="translate(80,120) scale(3.2)"><rect width="64" height="64" rx="12" fill="#1e293b"/><g stroke="#38bdf8" stroke-width="4" stroke-linecap="round"><path d="M32 12v40M14 22l36 20M14 42l36-20"/></g></g>
<text x="330" y="230" font-family="Arial, Helvetica, sans-serif" font-size="84" font-weight="700" fill="#ffffff">Bar Freezer</text>
<text x="330" y="305" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#38bdf8">Bar Fridges &amp; Bar Freezers Australia</text>
<text x="80" y="460" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#cbd5e1">Under bar, back bar, glass door and display freezers, kegerators,</text>
<text x="80" y="508" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#cbd5e1">wine fridges and ice machines. Delivered Australia-wide.</text>
<text x="80" y="606" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#0f172a">barfreezer.com.au</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(pub, 'og-image.png'));
console.log('favicon.ico', fs.statSync(path.join(pub, 'favicon.ico')).size, 'bytes; og-image.png', fs.statSync(path.join(pub, 'og-image.png')).size, 'bytes');
