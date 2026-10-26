// Writes a QR code SVG for each receiving wallet into public/qr/. Run after changing WALLETS in src/config/reply.ts.
import fs from 'fs';
import QRCode from 'qrcode';
const src = fs.readFileSync('src/config/reply.ts', 'utf8');
const wallets = [...src.matchAll(/coin: '([A-Z]+)'[^}]*?address: '([^']+)'/g)].map((m) => ({ coin: m[1], address: m[2] }));
if (!wallets.length) throw new Error('no wallets found');
fs.mkdirSync('public/qr', { recursive: true });
for (const w of wallets) {
  const svg = await QRCode.toString(w.address, { type: 'svg', errorCorrectionLevel: 'M', margin: 2, color: { dark: '#0f172a', light: '#ffffff' } });
  fs.writeFileSync(`public/qr/${w.coin.toLowerCase()}.svg`, svg);
  console.log(w.coin, w.address, svg.length);
}
