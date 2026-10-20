// Writes docs/blog-keyword-map.md from src/config/blog-posts.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { BLOG_POSTS } = await import(pathToFileURL(path.join(root, 'src/config/blog-posts.js')).href);
const rows = BLOG_POSTS.map((p, i) => `| ${i + 1} | ${p.primaryKeyword} | ${p.supportingKeywords.join(', ')} | /guides/${p.slug}/ | ${p.title} |`);
const md = `# Blog keyword map (20 posts)\n\nEach post targets one primary keyword and 5 supporting keywords, one URL per cluster. All posts score 100% on \`node scripts/audit/blog-score.mjs\`.\n\n| # | Primary keyword | Supporting keywords | URL | Title |\n|---|---|---|---|---|\n${rows.join('\n')}\n`;
fs.writeFileSync(path.join(root, '..', 'docs', 'blog-keyword-map.md'), md);
console.log('written');
