// Deep audit of one category tree on the live site.
// Usage: node scripts/audit/category-audit.mjs https://barfreezer.com.au /bar-freezers/ batch=pages|products|images
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const BASE = (process.argv[2] || 'https://barfreezer.com.au').replace(/\/$/, '');
const ROOT = process.argv[3] || '/bar-freezers/';
const BATCH = (process.argv.find((a) => a.startsWith('batch=')) || 'batch=pages').slice(6);
const rootDir = process.cwd();

const light = JSON.parse(fs.readFileSync('src/config/products.light.json', 'utf8'));
const siteSrc = fs.readFileSync('src/config/site.js', 'utf8');
const catPaths = [...siteSrc.matchAll(/path:\s*"(\/[^"]+)"/g)].map((m) => m[1]).filter((p) => p.startsWith(ROOT));
const kwSrc = fs.readFileSync('src/config/seo-keywords.ts', 'utf8');
const kwPaths = [...kwSrc.matchAll(/['"](\/[a-z0-9/-]+\/)['"]\s*:/g)].map((m) => m[1]).filter((p) => p.startsWith(ROOT));
const isBrand = ROOT.startsWith('/brands/');
const isVenue = ROOT.startsWith('/venues/') || process.argv.includes('single');
const pages = (isBrand || isVenue) ? [ROOT] : [...new Set([...catPaths, ...kwPaths])];
const catSlug = (isBrand || (isVenue && ROOT.startsWith('/venues/'))) ? ROOT.split('/')[2] : ROOT.split('/')[1];
const brandNames = { anvil: 'Anvil', fed: 'F.E.D.' };
const products = isBrand ? light.filter((p) => String(p.brand).toLowerCase().replace(/[^a-z0-9]/g, '') === catSlug.replace(/[^a-z0-9]/g, '')) : light.filter((p) => p.primaryCategory === ({ 'bar-freezers': 'Bar Freezers', 'bar-fridges': 'Bar Fridges & Coolers', 'accessories-parts': 'Accessories & Parts' })[catSlug]);

const get = async (url, opt = {}) => {
  for (let t = 0; t < 3; t++) {
    try { const r = await fetch(url, { redirect: 'manual', ...opt }); return { r, body: opt.method === 'HEAD' ? '' : await r.text() }; } catch (e) { if (t === 2) return { err: e.message }; }
  }
};
const pool = async (items, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } })); return out; };

const sitemap = (await get(BASE + '/sitemap.xml')).body || '';
const inSitemap = (p) => sitemap.includes(`${BASE}${p}<`) || sitemap.includes(`>${BASE}${p}`);

function auditHtml(p, h, kind) {
  const issues = [];
  const dec = (x) => String(x).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
  const title = dec((h.match(/<title[^>]*>([^<]*)/) || [])[1] || '');
  const desc = dec((h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const canon = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const robots = (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
  const heads = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  const ogT = (h.match(/<meta property="og:title" content="([^"]*)"/) || [])[1] || '';
  const ogI = (h.match(/<meta property="og:image" content="([^"]*)"/) || [])[1] || '';
  const lds = [...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return { '@type': 'INVALID' }; } });
  const types = lds.map((l) => l['@type']);
  if (!title) issues.push('no title'); else { if (title.length > 60) issues.push(`title ${title.length}>60`); if (title.length < 25) issues.push(`title short ${title.length}`); }
  if (!desc) issues.push('no meta description'); else { if (desc.length > 160) issues.push(`desc ${desc.length}>160`); if (desc.length < 90) issues.push(`desc short ${desc.length}`); }
  if (canon !== BASE + p) issues.push(`canonical ${canon || 'missing'}`);
  if (/noindex/.test(robots)) issues.push('noindex');
  if (h1s.length !== 1) issues.push(`h1 count ${h1s.length}`);
  for (let i = 1; i < heads.length; i++) if (heads[i] - heads[i - 1] > 1) { issues.push(`heading jump h${heads[i - 1]}->h${heads[i]}`); break; }
  if (!ogT || !ogI) issues.push('og tags incomplete');
  if (types.includes('INVALID')) issues.push('INVALID JSON-LD');
  if (!types.includes('BreadcrumbList')) issues.push('no BreadcrumbList');
  if (kind === 'product') {
    const prod = lds.find((l) => l['@type'] === 'Product');
    if (!prod) issues.push('no Product schema');
    else {
      if (!prod.sku) issues.push('Product no sku');
      if (!prod.brand) issues.push('Product no brand');
      if (!prod.image || !prod.image.length) issues.push('Product no image');
      if (!prod.offers || !prod.offers.price || Number(prod.offers.price) <= 0) issues.push('Product bad price');
      if (!prod.offers || !prod.offers.availability) issues.push('Offer no availability');
      if (!prod.description || String(prod.description).length < 80) issues.push('Product desc short');
    }
  } else if (!types.includes('CollectionPage') && !types.includes('WebPage') && !types.includes('ItemList')) issues.push('no page-level schema');
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map((x) => x[0]);
  const noAlt = imgs.filter((x) => !/\balt="[^"]/.test(x)).length;
  if (noAlt) issues.push(`${noAlt} img without alt`);
  const noDims = imgs.filter((x) => !/\bwidth=/.test(x) || !/\bheight=/.test(x)).length;
  if (noDims) issues.push(`${noDims} img without width/height`);
  const text = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ');
  const wc = (text.match(/\S+/g) || []).length;
  if (kind === 'product' && wc < 250) issues.push(`thin visible text ${wc}w`);
  const links = [...h.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((m) => m[1]);
  const nonSlash = links.filter((l) => l.startsWith('/') && !l.startsWith('/_next') && !l.includes('.') && !l.includes('?') && !l.includes('#') && !l.endsWith('/'));
  if (nonSlash.length) issues.push(`${nonSlash.length} internal links w/o trailing slash`);
  if (!inSitemap(p)) issues.push('not in sitemap');
  return { p, title, desc, h1: h1s[0] || '', canon, types, wc, imgs: imgs.length, links, issues };
}

const dup = (rows, key, label) => {
  const m = new Map();
  rows.forEach((r) => { if (r[key]) { if (!m.has(r[key])) m.set(r[key], []); m.get(r[key]).push(r.p); } });
  return [...m.entries()].filter(([, v]) => v.length > 1).map(([k, v]) => `${label} dup x${v.length}: "${k.slice(0, 70)}" -> ${v.slice(0, 3).join(', ')}`);
};

const known = new Set(['/', ...pages]);
const outFile = path.join(rootDir, `.audit-${catSlug}-${BATCH}.json`);

if (BATCH === 'pages') {
  console.log('category pages:', pages.length);
  const rows = await pool(pages, 6, async (p) => {
    const res = await get(BASE + p);
    if (!res.r || res.r.status !== 200) return { p, issues: [`status ${res.r && res.r.status}`] };
    const a = auditHtml(p, res.body, 'page');
    // slash/redirect behaviour
    const ns = await get(BASE + p.slice(0, -1));
    a.noSlashStatus = ns.r && ns.r.status;
    if (![301, 308, 200].includes(a.noSlashStatus)) a.issues.push(`no-slash status ${a.noSlashStatus}`);
    a.productLinks = a.links.filter((l) => l.startsWith('/product/')).length;
    if (a.productLinks === 0) a.issues.push('no product links in HTML (pagination/hydration)');
    return a;
  });
  rows.forEach((r) => console.log(`\n${r.p}  [${r.title ? r.title.length : 0}c title, ${r.wc}w, h1="${(r.h1 || '').slice(0, 60)}", schema=${(r.types || []).join('/')}, productLinks=${r.productLinks}]\n   ` + (r.issues.length ? r.issues.join('\n   ') : 'OK')));
  [...dup(rows, 'title', 'title'), ...dup(rows, 'desc', 'desc'), ...dup(rows, 'h1', 'h1')].forEach((x) => console.log('DUP', x));
  fs.writeFileSync(outFile, JSON.stringify(rows.map(({ links, ...r }) => r)));
} else if (BATCH === 'products') {
  const start = Number((process.argv.find((a) => a.startsWith('from=')) || 'from=0').slice(5));
  const count = Number((process.argv.find((a) => a.startsWith('n=')) || 'n=9999').slice(2));
  const list = products.slice(start, start + count);
  console.log('products:', list.length, 'of', products.length);
  const rows = await pool(list, 8, async (pr) => {
    const p = `/product/${pr.slug}/`;
    const res = await get(BASE + p);
    if (!res.r || res.r.status !== 200) return { p, issues: [`status ${res.r && res.r.status}`] };
    const a = auditHtml(p, res.body, 'product');
    const lightP = pr;
    if (!lightP.images || !lightP.images.length) a.issues.push('catalogue: no images');
    if (!(lightP.price > 0)) a.issues.push('catalogue: no price');
    if (!lightP.capacityLitres && !lightP.capacityLabel && lightP.primaryCategory !== 'Accessories & Parts') a.issues.push('catalogue: no capacity');
    const mentions = (a.title + a.h1).toLowerCase();
    const bn = String(lightP.brand || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (bn && !mentions.replace(/[^a-z0-9]/g, '').includes(bn) && !(bn === 'fed' && /fed|thermaster/.test(mentions))) a.issues.push('brand missing from title/H1');
    return a;
  });
  const counts = new Map();
  rows.forEach((r) => (r.issues || []).forEach((i) => { const k = i.replace(/\d+/g, 'N'); counts.set(k, (counts.get(k) || 0) + 1); }));
  console.log('\nissue summary (type -> products):');
  [...counts.entries()].sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${v}\t${k}`));
  [...dup(rows, 'title', 'title'), ...dup(rows, 'desc', 'desc'), ...dup(rows, 'h1', 'h1')].slice(0, 30).forEach((x) => console.log('DUP', x));
  const withIssues = rows.filter((r) => r.issues && r.issues.length);
  console.log(`\n${rows.length - withIssues.length}/${rows.length} products clean`);
  withIssues.slice(0, 12).forEach((r) => console.log(' ', r.p, '=>', r.issues.join('; ')));
  fs.writeFileSync(outFile, JSON.stringify(rows.map(({ links, ...r }) => r)));
} else if (BATCH === 'images') {
  const urls = new Map();
  products.forEach((pr) => (pr.images || []).forEach((u) => { if (!urls.has(u)) urls.set(u, pr.slug); }));
  const list = [...urls.keys()];
  console.log('unique image urls:', list.length);
  const bad = [];
  await pool(list, 12, async (u) => {
    const res = await get(u.startsWith('http') ? u : BASE + u, { method: 'HEAD' });
    const st = res.r && res.r.status;
    const ct = res.r && res.r.headers.get('content-type');
    const len = res.r && Number(res.r.headers.get('content-length') || 0);
    if (st !== 200 || !/image/.test(ct || '')) bad.push(`${st} ${u}`);
    else if (len && len > 400000) bad.push(`large ${Math.round(len / 1024)}KB ${u}`);
  });
  console.log('image problems:', bad.length);
  bad.slice(0, 40).forEach((b) => console.log(' ', b));
}
