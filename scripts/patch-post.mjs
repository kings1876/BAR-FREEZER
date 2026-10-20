// Dev helper: node scripts/patch-post.mjs <file> <patch.json>
// patch.json = [{ slug, before: "marker text that exists after the slug", insert: "text", replace: [[from,to],...] }]
import fs from 'fs';

const [file, patchFile] = process.argv.slice(2);
let src = fs.readFileSync(file, 'utf8');
const patches = JSON.parse(fs.readFileSync(patchFile, 'utf8'));
for (const p of patches) {
  const start = src.indexOf(`slug: "${p.slug}"`);
  if (start < 0) throw new Error('no slug ' + p.slug);
  const next = src.indexOf('\n  {\n    title:', start);
  const end = next < 0 ? src.length : next;
  let seg = src.slice(start, end);
  for (const [a, b] of p.replace || []) {
    if (!seg.includes(a)) throw new Error(`[${p.slug}] missing replace target: ${a.slice(0, 60)}`);
    seg = seg.replace(a, b);
  }
  if (p.insert) {
    const i = seg.indexOf(p.before);
    if (i < 0) throw new Error(`[${p.slug}] missing marker: ${p.before.slice(0, 60)}`);
    seg = seg.slice(0, i) + p.insert + seg.slice(i);
  }
  src = src.slice(0, start) + seg + src.slice(end);
}
fs.writeFileSync(file, src);
console.log('patched', patches.length);
