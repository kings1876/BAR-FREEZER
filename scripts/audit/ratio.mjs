// Text-to-HTML ratio for a few live URLs, with and without script/style text counted.
// Usage: node scripts/audit/ratio.mjs /path/ /other/
const base = 'https://barfreezer.com.au';
for (const u of process.argv.slice(2)) {
  const h = await (await fetch(base + u)).text();
  const strip = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const visible = strip(h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' '));
  const all = strip(h);
  console.log(u, 'html', h.length, 'visible', (visible.length / h.length * 100).toFixed(1) + '%', 'incl-script', (all.length / h.length * 100).toFixed(1) + '%');
}
