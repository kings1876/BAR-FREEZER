// Live Lighthouse scores via the PageSpeed Insights API (mobile). Usage: node scripts/audit/psi.mjs [url ...]
const urls = process.argv.slice(2).length ? process.argv.slice(2) : [
  'https://barfreezer.com.au/',
  'https://barfreezer.com.au/bar-fridges/',
  'https://barfreezer.com.au/bar-fridges/under-bar-fridges/glass-door/',
  'https://barfreezer.com.au/guides/bar-fridge-freezer-buying-guide/',
];
for (const u of urls) {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(u)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;
  try {
    const r = await fetch(api);
    const j = await r.json();
    if (j.error) { console.log(u, 'ERR', j.error.message.slice(0, 100)); continue; }
    const c = j.lighthouseResult.categories, a = j.lighthouseResult.audits;
    console.log(u, Object.entries(c).map(([k, v]) => `${k}:${Math.round(v.score * 100)}`).join(' '), '| LCP', a['largest-contentful-paint'].displayValue, '| CLS', a['cumulative-layout-shift'].displayValue, '| TBT', a['total-blocking-time'].displayValue);
    const fails = Object.values(a).filter((x) => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'notApplicable').slice(0, 8).map((x) => x.id);
    if (fails.length) console.log('   weak audits:', fails.join(', '));
  } catch (e) { console.log(u, 'fetch failed', e.message); }
}
