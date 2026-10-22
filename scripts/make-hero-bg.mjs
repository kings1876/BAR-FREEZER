// Builds the home hero background from the site's own product photos: inverted so the white photo backgrounds
// become black, levels crushed so no photo edges show, screen-blended onto a navy base, softly blurred and dimmed.
// Usage: node scripts/make-hero-bg.mjs
import sharp from 'sharp';
const W = 1920, H = 900;
const files = [
  ['skope/rf7-ubf-2-sd.webp', 440],
  ['tefcold/tfw400-2s-34131.webp', 700],
  ['atosa/jcf80fsgr-atosa-double-door-gl.webp', 650],
  ['tefcold/ckc4-15875.webp', 540],
  ['atosa/bb-330sec-atosa-3-sliding-door.webp', 420],
];
const slot = W / files.length;
const layers = [];
for (let i = 0; i < files.length; i++) {
  const [file, h] = files[i];
  const img = sharp('public/images/products/' + file).resize({ height: h, width: Math.round(slot * 0.95), fit: 'inside' }).negate({ alpha: false }).grayscale().linear(1.8, -50).blur(1.6);
  const { data, info } = await img.png().toBuffer({ resolveWithObject: true });
  layers.push({ input: data, left: Math.round(i * slot + (slot - info.width) / 2), top: H - info.height - 50, blend: 'screen' });
}
const base = { create: { width: W, height: H, channels: 3, background: { r: 15, g: 23, b: 42 } } };
const art = await sharp(base).composite(layers).png().toBuffer();
const overlay = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="g" cx="50%" cy="42%" r="75%"><stop offset="0%" stop-color="#0f172a" stop-opacity="0.7"/><stop offset="100%" stop-color="#0f172a" stop-opacity="0.3"/></radialGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="60%" stop-color="#0f172a" stop-opacity="0"/><stop offset="100%" stop-color="#0f172a" stop-opacity="0.9"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#b)"/></svg>`);
await sharp(art).composite([{ input: overlay }]).webp({ quality: 62 }).toFile('public/images/hero-bg.webp');
console.log('done');
