// Home, brand, venue and clearance pages get the few products they display from the server instead of importing the whole catalogue.
const fs = require('fs');
process.chdir('C:/workload/Bar Freezer/site');
const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');
const edit = (file, pairs) => {
  let s = read(file);
  for (const [a, b, all] of pairs) {
    if (!s.includes(a)) { console.log('MISSING', file, a.slice(0, 80)); continue; }
    s = all ? s.split(a).join(b) : s.replace(a, b);
  }
  fs.writeFileSync(file, s);
};

// counts for the shell and for tiles
edit('scripts/split-products.mjs', [[
  "JSON.stringify({ total: slim.length, brands: new Set(slim.map((p) => p.brand)).size, byCategory: byCat })",
  "JSON.stringify({ total: slim.length, brands: new Set(slim.map((p) => p.brand)).size, byCategory: byCat, bySlug, byBrand })",
], [
  "for (const p of slim) byCat[p.primaryCategory] = (byCat[p.primaryCategory] || 0) + 1;",
  "const bySlug = {}, byBrand = {};\nfor (const p of slim) { byCat[p.primaryCategory] = (byCat[p.primaryCategory] || 0) + 1; bySlug[p.categorySlug] = (bySlug[p.categorySlug] || 0) + 1; byBrand[p.brand] = (byBrand[p.brand] || 0) + 1; }",
]]);

edit('src/context/ProductDetailContext.tsx', [["  id: string;\n", "  id: string;\n  data?: any;\n"]]);

// page.tsx: build the data per route
edit('src/app/[[...slug]]/page.tsx', [[
  "function belowContent(slug: string[], productDetail: any): React.ReactNode {",
  `// The few products a page shows, supplied by the server so the client does not need the whole catalogue.
function pageData(slug: string[]): any {
  const all = PRODUCTS as any[];
  const [a, b] = slug;
  if (!slug.length) {
    const pick = (cat: string, n: number) => all.filter((p) => p.categorySlug === cat && p.condition === 'new' && p.images && p.images.length && p.capacityLitres > 0).filter((_, i) => i % 7 === 0).slice(0, n);
    return {
      spotlight: all.find((p) => p.id === 'sk-rf7-ubf-2-sd') || all[0],
      featured: [...pick('under-bar-fridges', 1), ...pick('under-bar-freezers', 1), ...pick('wine-fridges', 1), ...pick('kegerators-dispensers', 1)],
    };
  }
  if (a === 'brands' && b) {
    const brand: any = (BRANDS as any[]).find((x) => x.slug === b);
    return brand ? { products: all.filter((p) => String(p.brand).toLowerCase() === brand.name.toLowerCase()).slice(0, 12) } : null;
  }
  if (a === 'venues' && b) {
    const venue: any = (VENUES as any[]).find((x) => x.slug === b);
    if (!venue) return null;
    const pools = (venue.relatedCategories as string[]).map((s) => all.filter((p) => p.categorySlug === s && p.condition === 'new' && p.images && p.images.length && p.price > 0));
    const out: any[] = [];
    for (let i = 0; out.length < 3 && pools.some((pl) => i < pl.length); i++) for (const pl of pools) if (pl[i] && out.length < 3) out.push(pl[i]);
    return { related: out };
  }
  if ((a === 'clearance' || a === 'deals') && !b) {
    const items = all.filter((p) => p.condition === 'ex-display' || p.condition === 'refurbished' || p.condition === 'factory-second' || p.categorySlug === 'clearance-ex-display');
    return { items: items.slice(0, 12), total: items.length };
  }
  return null;
}

function belowContent(slug: string[], productDetail: any): React.ReactNode {`,
], [
  "  return (\n    <>\n      {blocks.map((b, i) => (",
  "  const data = pageData(slug);\n  if (data) productDetail = { id: `data:${slug.join('/') || 'home'}`, data } as any;\n\n  return (\n    <>\n      {blocks.map((b, i) => (",
]]);

// HomePage
edit('src/views/HomePage.tsx', [
  ["import { PRODUCTS } from '../config/products-data.js';", "import { PRODUCT_COUNTS } from '../config/products-counts.js';\nimport { useProductDetail } from '../context/ProductDetailContext';"],
  ["PRODUCTS.length.toLocaleString('en-AU')", "PRODUCT_COUNTS.total.toLocaleString('en-AU')", true],
  ["new Set(PRODUCTS.map((p: any) => p.brand)).size", "PRODUCT_COUNTS.brands", true],
  ["({PRODUCTS.length} Models)", "({PRODUCT_COUNTS.total} Models)"],
  ["`${PRODUCTS.filter((p: any) => p.categorySlug === cat.slug).length} products`", "`${(PRODUCT_COUNTS.bySlug as any)[cat.slug] || 0} products`"],
  ["{PRODUCTS.filter((p: any) => p.brand === b.name).length} products", "{(PRODUCT_COUNTS.byBrand as any)[b.name] || 0} products"],
]);
{
  let h = read('src/views/HomePage.tsx');
  const i = h.indexOf('  const bestSellers = (() => {');
  const j = h.indexOf('  })();', i) + '  })();'.length;
  if (i < 0) throw new Error('bestSellers');
  h = h.slice(0, i) + "  const pageDetail = useProductDetail();\n  const homeData: any = (pageDetail && pageDetail.data) || { featured: [] };\n  const bestSellers: any[] = homeData.featured || [];" + h.slice(j);
  h = h.replace("const spotlight: any = PRODUCTS.find((p: any) => p.id === 'sk-rf7-ubf-2-sd') || PRODUCTS[0];", "const spotlight: any = homeData.spotlight || {};");
  fs.writeFileSync('src/views/HomePage.tsx', h);
}

// BrandPage
edit('src/views/BrandPage.tsx', [
  ["import { PRODUCTS } from '../config/products-data.js';", "import { PRODUCT_COUNTS } from '../config/products-counts.js';\nimport { useProductDetail } from '../context/ProductDetailContext';"],
  ["  const brandProducts = PRODUCTS.filter((p: any) => p.brand.toLowerCase() === brand.name.toLowerCase());", "  const pageDetail = useProductDetail();\n  const brandProducts: any[] = (pageDetail && pageDetail.data && pageDetail.data.products) || [];\n  const brandTotal: number = (PRODUCT_COUNTS.byBrand as any)[brand.name] || brandProducts.length;"],
  ["{PRODUCTS.filter((p: any) => p.brand === other.name).length} products", "{(PRODUCT_COUNTS.byBrand as any)[other.name] || 0} products"],
  ["({brandProducts.length} Models)", "({brandTotal} Models)"],
  ["Browse ${brandProducts.length} ${brand.name} products", "Browse ${brandTotal} ${brand.name} products"],
]);

// VenuePage
edit('src/views/VenuePage.tsx', [["import { PRODUCTS } from '../config/products-data.js';", "import { useProductDetail } from '../context/ProductDetailContext';"]]);
{
  let v = read('src/views/VenuePage.tsx');
  const i = v.indexOf('  // Products from the venue');
  const j = v.indexOf('  })();', i) + '  })();'.length;
  if (i < 0) throw new Error('venue related');
  v = v.slice(0, i) + "  const pageDetail = useProductDetail();\n  const relatedProducts: any[] = (pageDetail && pageDetail.data && pageDetail.data.related) || [];" + v.slice(j);
  fs.writeFileSync('src/views/VenuePage.tsx', v);
}

// Deals page: own module without the catalogue
{
  let st = read('src/views/StaticPages.tsx');
  const a = st.indexOf('/**\n * Clearance, Ex-Display & Deals Page');
  const b = st.indexOf('export const SearchPage');
  const sIdx = st.lastIndexOf('/**', b);
  const dealsBlock = st.slice(a, sIdx);
  const header = st.slice(0, a);
  const dealsFile = header.replace("import { PRODUCTS } from '../config/products-data.js';\n", "import { useProductDetail } from '../context/ProductDetailContext';\n")
    + dealsBlock
      .replace(/  \/\/ Ex-display, refurbished[\s\S]*?\n  \);\n/, "  // The server supplies the first products and the total; the full list is linked below the grid.\n  const pageDetail = useProductDetail();\n  const clearanceItems: any[] = (pageDetail && pageDetail.data && pageDetail.data.items) || [];\n  const clearanceTotal: number = (pageDetail && pageDetail.data && pageDetail.data.total) || clearanceItems.length;\n")
      .replace("pageSize={8}", "pageSize={4}");
  fs.writeFileSync('src/views/DealsPage.tsx', dealsFile);
  st = header + st.slice(sIdx);
  fs.writeFileSync('src/views/StaticPages.tsx', st);
  let app = read('src/App.tsx');
  app = app.replace("const DealsPage = dynamic(() => import('./views/StaticPages').then((m) => m.DealsPage));", "const DealsPage = dynamic(() => import('./views/DealsPage').then((m) => m.DealsPage));");
  fs.writeFileSync('src/App.tsx', app);
}
console.log('done');
