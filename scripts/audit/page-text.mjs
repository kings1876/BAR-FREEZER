// Prints the main visible text of a live page (header/footer trimmed) and its headings. Usage: node page-text.mjs /path/
const url = 'https://barfreezer.com.au' + process.argv[2];
const h = await (await fetch(url)).text();
const main = (h.match(/<main[\s\S]*?<\/main>/) || [h])[0];
const heads = [...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => 'h' + m[1] + ' ' + m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim().slice(0, 80));
const t = main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/\s+/g, ' ');
console.log('HEADINGS:\n' + heads.join('\n'));
console.log('\nTEXT (' + t.length + ' chars):\n' + t.slice(0, Number(process.argv[3] || 3500)));
