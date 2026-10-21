// Counts DOM elements per h2 section (what Lighthouse "excessive DOM size" measures) from server HTML.
const [base, ...paths] = process.argv.slice(2);
const n = (s) => (s.match(/<[a-zA-Z][^>]*>/g) || []).length;
for (const path of paths) {
  const h = (await (await fetch(base + path)).text()).replace(/<script[\s\S]*?<\/script>/g, '');
  const body = (h.match(/<body[\s\S]*<\/body>/) || [h])[0];
  const parts = body.split(/(?=<h2\b|<footer\b|<main\b)/);
  console.log(path, 'total', n(body));
  console.log(parts.map((p) => [((p.match(/<h2[^>]*>([^<]*)/) || [])[1] || p.slice(1, 7)).slice(0, 28), n(p)].join(':')).join(' | '));
}
