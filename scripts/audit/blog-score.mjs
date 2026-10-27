// Scores every post in src/config/blog-posts.js against an on-page SEO rubric (100 points).
// Run: node scripts/audit/blog-score.mjs   (exit code 1 if any post is below 100)
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const { BLOG_POSTS } = await import(pathToFileURL(path.join(root, 'src/config/blog-posts.js')).href);
const { EXTRA_POSTS } = await import(pathToFileURL(path.join(root, 'src/config/guides-extra.js')).href);

const siteSrc = fs.readFileSync(path.join(root, 'src/config/site.js'), 'utf8');
const valid = new Set(['/']);
for (const m of siteSrc.matchAll(/path:\s*"(\/[^"]+)"/g)) valid.add(m[1]);
for (const m of siteSrc.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) {
  valid.add('/guides/' + m[1] + '/'); valid.add('/brands/' + m[1] + '/'); valid.add('/venues/' + m[1] + '/'); valid.add('/delivery/' + m[1] + '/');
}
for (const s of ['trade', 'quote', 'finance', 'warranty', 'deals', 'clearance', 'compare', 'reviews', 'about', 'contact', 'faq', 'returns', 'payment-methods', 'delivery', 'guides']) valid.add(`/${s}/`);
const kwSrc = fs.readFileSync(path.join(root, 'src/config/seo-keywords.ts'), 'utf8');
for (const m of kwSrc.matchAll(/['"](\/[a-z0-9/-]+\/)['"]\s*:/g)) valid.add(m[1]);
// Product pages and category pages are valid link targets too: check them against the catalogue and the built sitemap.
const productSlugs = new Set(JSON.parse(fs.readFileSync(path.join(root, 'src/config/products.light.json'), 'utf8')).map((p) => p.slug));
try {
  const sm = await (await fetch((process.env.SITEMAP_BASE || 'https://barfreezer.com.au') + '/sitemap.xml')).text();
  for (const m of sm.matchAll(/<loc>https?:\/\/[^/]+(\/(?:bar-fridges|bar-freezers|accessories-parts)\/[^<]*)<\/loc>/g)) valid.add(m[1]);
} catch {}
for (const s of productSlugs) valid.add(`/product/${s}/`);
const all = [...EXTRA_POSTS];
for (const p of all) valid.add(`/guides/${p.slug}/`);

const TRANSACTIONAL = /\b(buy|for sale|price|prices|cheap|online|sale|quote|deals?)\b/i;
const COMMERCIAL = /\b(best|compare|comparison|choose|checklist|vs|versus|review|guide)\b/i;
const BANNED = /(licensed mechanics?|same[- ]day|guaranteed|save \$|save up to|\d+% (off|cheaper)|rated \d|depot|near me)/i;
const CATEGORY_LINKS = /^\/(bar-fridges|bar-freezers|accessories-parts)\//;

const words = (t) => (t.match(/[A-Za-z0-9'’%.-]+/g) || []).length;
const count = (hay, needle) => (hay.toLowerCase().match(new RegExp(needle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;

let failed = 0;
const titles = new Set();
const slugs = new Set();
const results = [];

for (const p of BLOG_POSTS) {
  const c = p.content;
  const plain = c.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/^## /gm, '').replace(/^- /gm, '');
  const blocks = c.split('\n\n');
  const h2s = blocks.filter((b) => b.startsWith('## ')).map((b) => b.slice(3));
  const firstPara = blocks.find((b) => !b.startsWith('## ')) || '';
  const links = [...c.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
  const primary = p.primaryKeyword.toLowerCase();
  const wc = words(plain) + words((p.faqs || []).map((f) => f.q + ' ' + f.a).join(' '));
  const paraLens = blocks.filter((b) => !b.startsWith('## ') && !b.startsWith('- ')).map(words);
  const sentences = plain.split(/(?<=[.!?])\s+|\n/).filter(Boolean);
  const avgSentence = words(plain) / Math.max(1, sentences.length);
  const density = count(plain, primary) / Math.max(1, words(plain)) * 100;
  const supportingHits = p.supportingKeywords.filter((k) => count(plain + ' ' + (p.faqs || []).map((f) => f.q + ' ' + f.a).join(' '), k) > 0);
  const supportingInH2 = p.supportingKeywords.filter((k) => h2s.some((h) => h.toLowerCase().includes(k.toLowerCase()))).length;
  const checks = [
    ['title <=60 chars', p.title.length <= 60, 5],
    ['title contains primary keyword', p.title.toLowerCase().includes(primary), 8],
    ['title starts with or has keyword in first half', p.title.toLowerCase().indexOf(primary) <= 30, 2],
    ['slug contains primary keyword', p.slug.includes(primary.replace(/ /g, '-')), 5],
    ['meta description 110-158 chars', p.excerpt.length >= 110 && p.excerpt.length <= 158, 5],
    ['meta description contains primary', p.excerpt.toLowerCase().includes(primary), 5],
    ['primary keyword in first paragraph', firstPara.toLowerCase().includes(primary), 8],
    ['primary keyword in an H2', h2s.some((h) => h.toLowerCase().includes(primary)), 4],
    ['3+ supporting keywords used as H2s or part of H2s', supportingInH2 >= 2, 4],
    ['all supporting keywords in body', supportingHits.length === p.supportingKeywords.length, 8],
    ['primary keyword used 3+ times, density <= 2.5%', count(plain, primary) >= 3 && density <= 2.5, 6],
    ['word count >= 900 (body + FAQ)', wc >= 900, 8],
    ['5+ H2 sections', h2s.length >= 5, 4],
    ['5+ internal links', links.length >= 5, 4],
    ['2+ distinct category links', new Set(links.filter((l) => CATEGORY_LINKS.test(l))).size >= 2, 3],
    ['links to /quote/', links.includes('/quote/'), 3],
    ['2+ links to other guides', links.filter((l) => l.startsWith('/guides/')).length >= 2, 3],
    ['all internal links resolve', links.every((l) => valid.has(l)), 6],
    ['transactional wording present', TRANSACTIONAL.test(plain), 3],
    ['commercial wording present', COMMERCIAL.test(plain + ' ' + p.title), 2],
    ['4+ FAQs (schema + visible)', (p.faqs || []).length >= 4, 4],
    ['FAQ answers 15-70 words', (p.faqs || []).every((f) => words(f.a) >= 15 && words(f.a) <= 70), 2],
    ['no paragraph over 110 words', paraLens.every((n) => n <= 110), 2],
    ['avg sentence <= 22 words', avgSentence <= 22, 2],
    ['no unverifiable claims', !BANNED.test(plain), 4],
    ['unique title & slug', !titles.has(p.title) && !slugs.has(p.slug), 3],
  ];
  titles.add(p.title); slugs.add(p.slug);
  const total = checks.reduce((s, c2) => s + c2[2], 0);
  const score = checks.reduce((s, c2) => s + (c2[1] ? c2[2] : 0), 0);
  const pct = Math.round((score / total) * 100);
  results.push({ slug: p.slug, pct, wc, density: density.toFixed(2), links: links.length });
  if (pct < 100) {
    failed++;
    console.log(`\n${p.slug}: ${pct}% (${wc} words, density ${density.toFixed(2)}%, ${links.length} links, title ${p.title.length}, meta ${p.excerpt.length})`);
    checks.filter((c2) => !c2[1]).forEach((c2) => console.log('   FAIL ' + c2[0]));
    const bad = links.filter((l) => !valid.has(l));
    if (bad.length) console.log('   bad links: ' + bad.join(', '));
  }
}
console.log(`\n${results.length} posts scored; ${results.length - failed} at 100%.`);
console.table(results);
process.exit(failed ? 1 : 0);
