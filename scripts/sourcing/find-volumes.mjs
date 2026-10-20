// For products with no capacityLitres, fetch the supplier page (sourceUrl) and look for a stated volume in litres.
// Output: .volumes.json  [{id, slug, brand, model, found:[{value,label,snippet}], status}]
import fs from 'fs';

const missing = JSON.parse(fs.readFileSync('.missing.json', 'utf8'));
const strip = (h) => String(h).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

async function textFor(p) {
  const u = p.sourceUrl;
  if (!u) return { text: '', status: 'nosource' };
  const tryUrls = [];
  if (/\/products\//.test(u) && !/thegoodguys|skope\.com|tefcold\.com|hoshizaki/.test(u)) tryUrls.push(u.replace(/[?#].*$/, '') + '.json');
  tryUrls.push(u);
  for (const url of tryUrls) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; BarFreezerSpecCheck/1.0)' }, redirect: 'follow' });
      if (!r.ok) continue;
      const body = await r.text();
      if (url.endsWith('.json')) { const j = JSON.parse(body); const pr = j.product || {}; return { text: strip((pr.title || '') + ' . ' + (pr.body_html || '')), status: 'json' }; }
      return { text: strip(body), status: 'html' };
    } catch (e) { /* next */ }
  }
  return { text: '', status: 'fetchfail' };
}

const PATS = [
  /(?:net|gross|total|storage|internal|usable|fridge|freezer)?\s*(?:volume|capacity)\s*(?:\(?\s*(?:l|ltr|litres?)\s*\)?)?\s*[:\-–]?\s*(?:approx\.?\s*)?(\d{2,4}(?:\.\d)?)\s*(?:l\b|ltr|litres?)?/gi,
  /(\d{2,4}(?:\.\d)?)\s*(?:l\b|ltr\b|litres?\b)/gi,
];
const out = [];
fs.mkdirSync('.volcache', { recursive: true });
let i = 0;
async function worker() {
  while (i < missing.length) {
    const p = missing[i++];
    const cf = '.volcache/' + p.id.replace(/[^a-z0-9_-]/gi, '_') + '.txt';
    let text = '', status = 'cached';
    if (fs.existsSync(cf) && fs.readFileSync(cf, 'utf8').length > 100) text = fs.readFileSync(cf, 'utf8');
    else { for (let t = 0; t < 4 && !text; t++) { ({ text, status } = await textFor(p)); if (!text) await new Promise((r) => setTimeout(r, 1500 * (t + 1))); } }
    const found = [];
    fs.writeFileSync('.volcache/' + p.id.replace(/[^a-z0-9_-]/gi, '_') + '.txt', text);
    if (text) {
      for (const re of PATS) {
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(text)) && found.length < 6) {
          const v = Number(m[1]);
          if (v >= 20 && v <= 2000) found.push({ value: v, snippet: text.slice(Math.max(0, m.index - 30), m.index + 60) });
        }
        if (found.length) break;
      }
    }
    out.push({ id: p.id, slug: p.slug, brand: p.brand, model: p.model, name: p.name.slice(0, 70), status, found });
  }
}
await Promise.all(Array.from({ length: 3 }, worker));
fs.writeFileSync('.volumes.json', JSON.stringify(out, null, 1));
const c = {};
out.forEach((o) => { const k = o.status + (o.found.length ? '+found' : '+none'); c[k] = (c[k] || 0) + 1; });
console.log(c);
