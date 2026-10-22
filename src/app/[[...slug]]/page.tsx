import type { Metadata } from 'next';
import ClientApp from '../../App';
import { ProductLinkList as LinkList, BuyingChecklist } from '../../components/ProductLinkList';
import { CATEGORIES, BRANDS, VENUES, CITIES, PRODUCTS, POSTS, FAQS } from '../../config/site.js';
import { allPaths } from '../../lib/routes';
import { categoryProducts } from '../../lib/category-filter';
import { KEYWORD_META } from '../../config/seo-keywords';
import { BRAND_META } from '../../config/seo-brands';
import { CITY_META, VENUE_META } from '../../config/seo-pages';
import PRODUCT_KW from '../../config/product-keywords.json';
import FULL_PRODUCTS from '../../config/products.generated.json';

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths().map((p) => ({ slug: p.split('/').filter(Boolean) }));
}

const SITE_URL = 'https://barfreezer.com.au';

const STATIC_META: Record<string, [string, string]> = {
  trade: ['Trade Pricing & Quotes', 'Trade pricing, multi-unit quotes and delivery for Australian pubs, bars, restaurants and venues buying commercial refrigeration.'],
  quote: ['Request a Quote for Bar Fridges', 'Request a quote for bar freezers, bar fridges, kegerators and ice machines. Send your list and delivery postcode for a delivered price.'],
  finance: ['Equipment Finance Enquiries', 'Ask about finance for commercial bar fridges, freezers and hospitality equipment. Tell us when you request a quote; terms depend on the lender.'],
  'warranty-service': ['Service Dispatch & Warranty Claims', 'Request service dispatch or lodge a warranty claim for your commercial bar fridge, bar freezer or ice machine.'],
  warranty: ['Warranty Claims & Service', 'Lodge a warranty claim or request service for your commercial bar fridge, bar freezer or ice machine.'],
  deals: ['Ex-Display & Clearance Fridges', 'Ex-display and refurbished bar fridges and bar freezers. Compare condition, price and specifications, delivered Australia-wide.'],
  clearance: ['Clearance & Ex-Display Fridges', 'Ex-display and refurbished bar fridges and bar freezers. Compare condition, price and specifications, delivered Australia-wide.'],
  compare: ['Compare Bar Fridges & Freezers', 'Compare bar freezers and bar fridges side by side by size, capacity, doors and features before you buy.'],
  reviews: ['Customer Reviews', 'Read customer reviews of Bar Freezer Australia and the equipment we supply to bars, pubs and venues.'],
  about: ['About Bar Freezer Australia', 'About Bar Freezer Australia, an Australian supplier of commercial and home bar freezers, bar fridges and ice machines.'],
  contact: ['Contact Bar Freezer Australia', 'Contact Bar Freezer Australia about product specifications, availability, delivery or quotes for bar fridges and freezers.'],
  faq: ['Bar Fridge & Freezer FAQs', 'Answers to common questions about bar freezers, bar fridges, delivery and ordering from Bar Freezer Australia.'],
  returns: ['Returns & Australian Consumer Law', 'How returns and Australian Consumer Law consumer guarantees apply to bar fridges and freezers bought from us.'],
  'payment-methods': ['Payment Methods: Osko and Crypto (BTC, USDT, ETH)', 'Pay by Osko or cryptocurrency (BTC, USDT, ETH) and save 10% when you pay with crypto. Payment details are emailed after your order request.'],
  cart: ['Shopping Cart', 'Review the bar fridges, bar freezers and accessories in your cart before you request an order.'],
  checkout: ['Checkout & Order Request', 'Enter your delivery details and choose a payment method to send your bar fridge or freezer order request.'],
  search: ['Search Bar Fridges & Freezers', 'Search bar freezers, bar fridges, kegerators, ice machines and accessories by name, brand or model.'],
  delivery: ['Australia-Wide Delivery', 'Delivery of bar fridges, bar freezers and commercial refrigeration to Australian capital cities and regional areas.'],
  guides: ['Bar Fridge & Freezer Buying Guides', 'Buying guides for bar fridges, bar freezers and hospitality refrigeration: sizing, ventilation, doors and what to check.'],
};

// These URLs show the same page; point them at one canonical.
const CANONICAL_OVERRIDE: Record<string, string> = { '/warranty-service/': '/warranty/', '/trade/': '/quote/', '/deals/': '/clearance/' };

const SUFFIX = ' | Bar Freezer Australia';
const trim = (t: string, n: number) => (t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t);
const cap = (t: string) => t.replace(/\b\w/g, (c) => c.toUpperCase());
const DESC_PAD = ' Compare price and specifications, delivered Australia-wide.';
const padDesc = (d: string) => (d.length < 110 ? trim(d.replace(/\s+$/, '') + (/[.!?]$/.test(d) ? '' : '.') + DESC_PAD, 158) : trim(d, 158));

function findPath(nodes: any[], path: string): any {
  for (const n of nodes || []) {
    if (n.path === path) return n;
    const hit = findPath(n.subcategories, path) || findPath(n.types, path);
    if (hit) return hit;
  }
  return null;
}

// ---- Product titles: keyword-led, 60 characters or fewer, and unique across the site
function dedupeWords(str: string): string {
  let w = str.split(' ');
  for (let k = 3; k >= 1; k--) {
    for (let i = 0; i + 2 * k <= w.length; i++) {
      if (w.slice(i, i + k).join(' ').toLowerCase() === w.slice(i + k, i + 2 * k).join(' ').toLowerCase()) { w = [...w.slice(0, i), ...w.slice(i + k)]; i = -1; }
    }
  }
  return w.join(' ');
}
function wordTrim(t: string, n: number): string {
  if (t.length <= n) return t;
  const cut = t.slice(0, n);
  const i = cut.lastIndexOf(' ');
  return (i > 20 ? cut.slice(0, i) : cut).replace(/[\s,\-:(]+$/, '');
}
function baseProductTitle(p: any): string {
  const kw: any = (PRODUCT_KW as any)[p.id];
  const isAcc = p.primaryCategory === 'Accessories & Parts';
  if (kw && !isAcc) {
    // "+" is dropped by crawlers when comparing titles, so W1 and W1+ would collide; spell it out.
    const shortModel = p.model ? String(p.model).replace(/-QA\d+$/, '').replace(/\+$/, ' Plus') : '';
    const model = shortModel && !String(p.brand).toLowerCase().includes(shortModel.toLowerCase()) ? ' ' + shortModel : '';
    const t = `${p.brand}${model} ${cap(kw.term)} | Bar Freezer`;
    if (t.length <= 60) return t;
  }
  return `${wordTrim(dedupeWords(String(p.name)), 46)} | Bar Freezer`;
}
let TITLE_COUNT: Map<string, number> | null = null;
function titleCount(): Map<string, number> {
  if (TITLE_COUNT) return TITLE_COUNT;
  TITLE_COUNT = new Map();
  for (const p of PRODUCTS as any[]) TITLE_COUNT.set(baseProductTitle(p), (TITLE_COUNT.get(baseProductTitle(p)) || 0) + 1);
  return TITLE_COUNT;
}
function productMeta(p: any) {
  const kw: any = (PRODUCT_KW as any)[p.id];
  const isAcc = p.primaryCategory === 'Accessories & Parts';
  let title = baseProductTitle(p);
  let tag = '';
  if ((titleCount().get(title) || 0) > 1) {
    const group = (PRODUCTS as any[]).filter((q) => baseProductTitle(q) === title);
    const skuUnique = new Set(group.map((q) => String(q.sku))).size === group.length;
    const COND: any = { refurbished: 'Refurbished', 'ex-display': 'Ex-Display', 'factory-second': 'Factory Second' };
    const condUnique = new Set(group.map((q) => String(q.condition))).size === group.length;
    tag = condUnique && COND[p.condition] ? COND[p.condition] : skuUnique && p.sku ? String(p.sku) : condUnique ? String(p.condition === 'new' ? 'New' : p.condition) : String(p.slug).split('-').slice(-2).join('-').toUpperCase();
    const t = title.replace(' | Bar Freezer', '');
    if (Object.values(COND).includes(tag)) {
      const lead = `${tag} ${t}`;
      title = lead.length + 14 <= 60 ? `${lead} | Bar Freezer` : wordTrim(lead, 60);
    } else {
      title = `${wordTrim(t, 60 - 14 - tag.length - 1)} ${tag} | Bar Freezer`;
    }
  }
  let desc: string;
  if (kw && !isAcc) {
    const model = p.model && !String(p.brand).toLowerCase().includes(String(p.model).toLowerCase()) ? ' ' + p.model : '';
    const specs = [p.widthMm >= 300 ? `${p.widthMm}mm wide` : '', p.capacityLitres >= 20 ? `${p.capacityLitres}L` : '', p.tempRange ? String(p.tempRange).split(' (')[0] : ''].filter(Boolean).join(', ');
    desc = `Buy the ${p.brand}${model} ${kw.term}${specs ? ': ' + specs : ''}. Compare price and specifications, delivered Australia-wide.`;
  } else {
    const nm = dedupeWords(String(p.name));
    const named = p.brand && !nm.toLowerCase().includes(String(p.brand).toLowerCase()) ? `${p.brand} ${nm}` : nm;
    desc = `Buy the ${wordTrim(named, 80)}. Compare price and specifications, delivered Australia-wide.`;
  }
  if (tag && !desc.includes(tag)) desc = desc.replace(/\.$/, '') + ` (${tag}).`;
  return { title, description: padDesc(desc) };
}

// The page <title> differs from the on-page H1 (the H1 is the full post title).
function guideTitleTag(t: string): string {
  const before = t.includes(':') ? t.split(':')[0].trim() : '';
  const shorter = t.replace(/ (for|in) (Australia|Australian [A-Za-z ]+|Pubs and Bars|Venues).*$/i, '').trim();
  const cands = [`${t} | Bar Freezer`, before.length >= 20 ? `${before} | Bar Freezer` : '', before.length >= 20 ? before : '', shorter !== t ? `${shorter} | Bar Freezer` : '', shorter !== t ? shorter : '', `${t.replace(/ (Buying Guide|Guide|Explained)( for .*)?$/i, '')} | Bar Freezer`];
  for (const c of cands) if (c && c.length <= 60 && c.length >= 25 && c.toLowerCase() !== t.toLowerCase()) return c;
  return trim(t, 60);
}
function lookup(slug: string[]): { title: string; description: string; image?: string; noindex?: boolean; full?: boolean } | null {
  if (!slug.length) return null;
  const path = '/' + slug.join('/') + '/';
  const [a, b] = slug;
  if (a === 'product' && b) {
    const p: any = (PRODUCTS as any[]).find((x) => x.slug === b);
    if (!p) return null;
    const m = productMeta(p);
    return { title: m.title, description: m.description, image: p.images?.[0], full: true };
  }
  if (a === 'brands' && b && BRAND_META[path]) return { title: BRAND_META[path].title, description: BRAND_META[path].description, full: true };
  if (a === 'brands' && b) {
    const x: any = (BRANDS as any[]).find((y) => y.slug === b);
    return x ? { title: `${x.name} Commercial Refrigeration`, description: padDesc(x.description || `Shop ${x.name} bar freezers and fridges.`) } : null;
  }
  if (a === 'venues' && b && VENUE_META[b]) return { title: VENUE_META[b].title, description: VENUE_META[b].description, full: true };
  if (a === 'venues' && b) {
    const x: any = (VENUES as any[]).find((y) => y.slug === b);
    return x ? { title: `Refrigeration for ${x.name}`, description: padDesc(x.intro || x.name) } : null;
  }
  if (a === 'delivery' && b && CITY_META[b]) return { title: CITY_META[b].title, description: CITY_META[b].description, full: true };
  if (a === 'delivery' && b) {
    const x: any = (CITIES as any[]).find((y) => y.slug === b);
    return x ? { title: `Delivery to ${x.name}, ${x.state}`, description: padDesc(`Commercial refrigeration delivery to ${x.name}`) } : null;
  }
  if (a === 'guides' && b) {
    const x: any = (POSTS as any[]).find((y) => y.slug === b);
    return x ? { title: guideTitleTag(x.title), description: padDesc(x.excerpt || x.title), full: true } : null;
  }
  if (slug.length === 1 && STATIC_META[a]) {
    const [t, d] = STATIC_META[a];
    return { title: t, description: d, noindex: a === 'cart' || a === 'checkout' || a === 'search' };
  }
  const kw = KEYWORD_META[path];
  if (kw) return { title: kw.title, description: kw.description, full: true };
  const cat = findPath(CATEGORIES as any[], path);
  if (cat) return { title: trim(cat.name, 60 - SUFFIX.length), description: padDesc(cat.description || `Shop ${cat.name} in Australia.`) };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const m = lookup(slug);
  const own = '/' + slug.join('/') + (slug.length ? '/' : '');
  const canonical = CANONICAL_OVERRIDE[own] || own;
  if (!m) return { alternates: { canonical } };
  const fullTitle = m.full ? m.title : m.title + SUFFIX;
  return {
    title: fullTitle,
    description: m.description,
    alternates: { canonical },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description: m.description,
      url: canonical,
      type: slug[0] === 'product' ? 'website' : slug[0] === 'guides' && slug[1] ? 'article' : 'website',
      siteName: 'Bar Freezer Australia',
      locale: 'en_AU',
      images: [m.image ? { url: m.image, width: 1200, height: 900 } : { url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description: m.description, images: [m.image || '/og-image.png'] },
  };
}

// ---- JSON-LD
function crumbLabel(segs: string[]): string {
  const path = '/' + segs.join('/') + '/';
  const [a, b] = segs;
  if (segs.length === 1) {
    if (STATIC_META[a]) return STATIC_META[a][0];
    return findPath(CATEGORIES as any[], path)?.name || a;
  }
  if (a === 'product') return (PRODUCTS as any[]).find((x) => x.slug === b)?.name || b;
  if (a === 'brands') return (BRANDS as any[]).find((x) => x.slug === b)?.name || b;
  if (a === 'venues') return (VENUES as any[]).find((x) => x.slug === b)?.name || b;
  if (a === 'delivery') return (CITIES as any[]).find((x) => x.slug === b)?.name || b;
  if (a === 'guides') return (POSTS as any[]).find((x) => x.slug === b)?.title || b;
  return findPath(CATEGORIES as any[], path)?.name || segs[segs.length - 1];
}
function breadcrumb(slug: string[]) {
  if (!slug.length) return null;
  const items: any[] = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }];
  const parents: Record<string, [string, string]> = { product: ['/bar-fridges/', 'Shop'], brands: ['/brands/', 'Brands'], venues: ['/venues/', 'Venues'], delivery: ['/delivery/', 'Delivery'], guides: ['/guides/', 'Guides'] };
  let pos = 2;
  if (slug.length === 2 && slug[0] in parents && slug[0] !== 'product' && slug[0] !== 'brands' && slug[0] !== 'venues') {
    items.push({ '@type': 'ListItem', position: pos++, name: parents[slug[0]][1], item: SITE_URL + parents[slug[0]][0] });
  }
  if (slug.length === 2 && slug[0] === 'product') {
    const p: any = (PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    const root = (CATEGORIES as any[]).find((c) => c.slug === (p && (p.primaryCategory === 'Bar Fridges & Coolers' ? 'bar-fridges' : p.primaryCategory === 'Bar Freezers' ? 'bar-freezers' : 'accessories-parts')));
    if (root) items.push({ '@type': 'ListItem', position: pos++, name: root.name, item: SITE_URL + root.path });
  } else if (slug.length > 1 && !(slug[0] in parents)) {
    for (let i = 1; i < slug.length; i++) items.push({ '@type': 'ListItem', position: pos++, name: crumbLabel(slug.slice(0, i)), item: SITE_URL + '/' + slug.slice(0, i).join('/') + '/' });
  }
  items.push({ '@type': 'ListItem', position: pos, name: crumbLabel(slug), item: SITE_URL + '/' + slug.join('/') + '/' });
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

type LinkItem = { id: string; slug: string; name: string };
function ProductLinkList({ title, aria, items }: { title: string; aria: string; items: LinkItem[] }) {
  return <LinkList title={title} aria={aria} items={items.map((p) => [p.slug, p.name] as [string, string])} />;
}

// The few products a page shows, supplied by the server so the client does not need the whole catalogue.
function pageData(slug: string[]): any {
  const all = PRODUCTS as any[];
  const [a, b, c] = slug;
  if (['bar-freezers', 'bar-fridges', 'accessories-parts'].includes(a)) {
    const root: any = (CATEGORIES as any[]).find((x) => x.slug === a);
    if (!root) return null;
    const sub: any = b ? root.subcategories.find((s: any) => s.slug === b) : null;
    const type: any = c && sub ? (sub.types || []).find((t: any) => t.slug === c) : null;
    const list = categoryProducts(all, a, sub, type);
    const prices = list.map((x) => x.price).filter((n: any) => typeof n === 'number' && n > 0);
    return { preview: list.slice(0, 4), total: list.length, brands: Array.from(new Set(list.map((x) => x.brand))), minPrice: prices.length ? Math.min(...prices) : null };
  }
  if ((a === 'trade' || a === 'quote') && !b) {
    return { quick: all.filter((x) => x.primaryCategory !== 'Accessories & Parts' && x.condition === 'new' && x.capacityLitres > 0).filter((_, i) => i % 97 === 0).slice(0, 6) };
  }
  if (!slug.length) {
    const pick = (cat: string, n: number) => all.filter((p) => p.categorySlug === cat && p.condition === 'new' && p.images && p.images.length && p.capacityLitres > 0).filter((_, i) => i % 7 === 0).slice(0, n);
    return {
      featured: [...pick('under-bar-fridges', 1), ...pick('under-bar-freezers', 1), ...pick('wine-fridges', 1), ...pick('kegerators-dispensers', 1), ...pick('bottle-coolers', 1), ...pick('back-bar-fridges', 1), ...pick('glass-door-display-freezers', 1), ...pick('outdoor-alfresco-fridges', 1)],
    };
  }
  if (a === 'brands' && b) {
    const brand: any = (BRANDS as any[]).find((x) => x.slug === b);
    return brand ? { products: all.filter((p) => String(p.brand).toLowerCase() === brand.name.toLowerCase()).slice(0, 3) } : null;
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

// Links to the sub-categories a page relates to, with their full names as anchor text.
function CategoryLinks({ heading, slugs, summary }: { heading: string; slugs: string[]; summary?: string }) {
  const found: { name: string; path: string }[] = [];
  for (const root of CATEGORIES as any[]) for (const s of root.subcategories || []) if (slugs.includes(s.slug)) found.push({ name: s.name, path: `/${root.slug}/${s.slug}/` });
  if (!found.length) return null;
  return (
    <nav aria-label={heading} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 className="text-base font-bold text-slate-900">{heading}</h2>
      {summary && <p className="mt-1 text-xs text-slate-600 max-w-3xl">{summary}</p>}
      <p className="mt-1 text-xs text-slate-600 max-w-3xl">Choose a type to see every model in that range with its specification, dimensions and price in Australian dollars including GST, then use the compare tool to check two or three side by side before you decide.</p>
      <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
        {found.map((c) => (
          <li key={c.path}><a className="underline text-cyan-800" href={c.path}>{c.name}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// Facts counted from the catalogue: model count, number of types and the price range.
function brandSummary(name: string, items: any[]): string {
  const prices = items.map((x) => Number(x.price)).filter((n) => n > 0);
  const types = new Set(items.map((x) => x.categorySlug)).size;
  const range = prices.length ? ` Prices run from $${Math.min(...prices).toLocaleString('en-AU')} to $${Math.max(...prices).toLocaleString('en-AU')} including GST.` : '';
  const caps = items.map((x) => Number(x.capacityLitres)).filter((n) => n > 0);
  const widths = items.map((x) => Number(x.widthMm)).filter((n) => n > 0);
  const size = caps.length && widths.length ? ` Listed capacities range from ${Math.min(...caps)} to ${Math.max(...caps)} litres and widths from ${Math.min(...widths)} mm to ${Math.max(...widths)} mm, so check the space you have against the dimensions on each product page.` : '';
  return `We list ${items.length} ${name} model${items.length === 1 ? '' : 's'} across ${types} product type${types === 1 ? '' : 's'}.${range}${size}`;
}

function belowContent(slug: string[], productDetail: any): React.ReactNode {
  const all = PRODUCTS as any[];
  const [a, b, c] = slug;
  if (['bar-freezers', 'bar-fridges', 'accessories-parts'].includes(a)) {
    const root: any = (CATEGORIES as any[]).find((x) => x.slug === a);
    if (!root) return null;
    const sub: any = b ? root.subcategories.find((s: any) => s.slug === b) : null;
    const type: any = c && sub ? sub.types.find((t: any) => t.slug === c) : null;
    const rootName = a === 'bar-freezers' ? 'Bar Freezers' : a === 'bar-fridges' ? 'Bar Fridges & Coolers' : 'Accessories & Parts';
    const items = all.filter((p) => {
      if (p.primaryCategory !== rootName) return false;
      if (sub && p.categorySlug !== sub.slug) return false;
      if (type && p.type.toLowerCase() !== type.name.toLowerCase() && !p.name.toLowerCase().includes(type.name.toLowerCase())) return false;
      return true;
    });
    const label = (type || sub || root).name;
    // Every sub-category and type is linked straight from its top-level category, keeping them within two clicks of the home page.
    const typeNav = !b ? (
      <nav aria-label={`${root.name} types`} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-lg font-bold mb-3">Browse {root.name} by type</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm">
          {root.subcategories.flatMap((s: any) => [
            <li key={s.slug}><a className="font-semibold underline" href={`/${a}/${s.slug}/`}>{s.name}</a></li>,
            ...(s.types || []).map((t: any) => <li key={`${s.slug}/${t.slug}`}><a className="underline" href={`/${a}/${s.slug}/${t.slug}/`}>{s.name}: {t.name}</a></li>),
          ])}
        </ul>
      </nav>
    ) : null;
    return (
      <>
        {typeNav}
        {/* Top-level categories link to their sub-categories; the models themselves are listed on those pages and on the brand pages. */}
        {b ? <ProductLinkList title={`All ${label} models (${items.length})`} aria={`All ${label} models`} items={items} /> : <BuyingChecklist />}
      </>
    );
  }
  if (a === 'brands' && b) {
    const brand: any = (BRANDS as any[]).find((x) => x.slug === b);
    if (!brand) return null;
    const items = all.filter((p) => String(p.brand).toLowerCase() === brand.name.toLowerCase());
    const cats = [...new Set(items.map((x) => x.categorySlug))] as string[];
    return (
      <>
        <CategoryLinks heading={`${brand.name} models by type`} slugs={cats} summary={brandSummary(brand.name, items)} />
        <ProductLinkList title={`All ${brand.name} models`} aria={`All ${brand.name} models`} items={items} />
      </>
    );
  }
  if (!slug.length || (a === 'reviews' && !b)) return <BuyingChecklist />;
  if (a === 'venues' && b) {
    const venue: any = (VENUES as any[]).find((x) => x.slug === b);
    return (
      <>
        {venue && <CategoryLinks heading={`Fridges and freezers for ${String(venue.name).toLowerCase()}`} slugs={venue.relatedCategories || []} />}
        <BuyingChecklist />
      </>
    );
  }
  if ((a === 'clearance' || a === 'deals') && !b) {
    const items = all.filter((p) => p.condition === 'ex-display' || p.condition === 'refurbished' || p.condition === 'factory-second' || p.categorySlug === 'clearance-ex-display');
    return <ProductLinkList title={`All ex-display and clearance models (${items.length})`} aria="All ex-display and clearance models" items={items} />;
  }
  if (a === 'product' && productDetail && productDetail.related) {
    return <ProductLinkList title="More in this category" aria="More in this category" items={productDetail.related} />;
  }
  return null;
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const blocks: any[] = [];
  let productDetail: any = null;
  if (slug[0] === 'product' && slug[1]) {
    const full: any = (FULL_PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    const kwd: any = (PRODUCT_KW as any)[full && full.id];
    const meta = full ? productMeta(full) : null;
    const slimSelf: any = (PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    const altItems = full ? (full.alternatives || []).map((id: string) => (PRODUCTS as any[]).find((x) => x.id === id)).filter(Boolean) : [];
    const sameCat = full ? (PRODUCTS as any[]).filter((x) => x.categorySlug === full.categorySlug) : [];
    const selfIdx = sameCat.findIndex((x) => full && x.id === full.id);
    const relatedItems = selfIdx >= 0 && sameCat.length > 1 ? Array.from({ length: Math.min(8, sameCat.length - 1) }, (_, k) => sameCat[(selfIdx + k + 1) % sameCat.length]) : [];
    if (full) productDetail = { base: slimSelf, alts: altItems, related: relatedItems, h1: meta ? (meta.title.includes(' | Bar Freezer') ? meta.title.replace(' | Bar Freezer', '') : `${meta.title} for Sale`) : undefined, term: kwd ? kwd.term : undefined, intro: meta ? meta.description : undefined, id: full.id, images: full.images, features: full.features, shortDescription: full.shortDescription, specs: full.specs, fullDescription: full.fullDescription, dimensionGuide: full.dimensionGuide, sourceUrl: full.sourceUrl, alternatives: full.alternatives, frequentlyBoughtTogether: full.frequentlyBoughtTogether };
  }
  const bc = breadcrumb(slug);
  if (bc) blocks.push(bc);

  if (slug[0] === 'product' && slug[1]) {
    const p: any = (PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    if (p) {
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.sku,
        mpn: p.model || undefined,
        brand: { '@type': 'Brand', name: p.brand },
        description: productDetail && productDetail.fullDescription ? String(productDetail.fullDescription).split(/\n\n/).join(' ') : (productDetail && productDetail.shortDescription) || p.name,
        image: (productDetail && productDetail.images && productDetail.images.length ? productDetail.images : p.images || []).slice(0, 4).map((u: string) => SITE_URL + u),
        url: `${SITE_URL}/product/${p.slug}/`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'AUD',
          price: p.price,
          url: `${SITE_URL}/product/${p.slug}/`,
          itemCondition: p.condition === 'new' ? 'https://schema.org/NewCondition' : p.condition === 'refurbished' ? 'https://schema.org/RefurbishedCondition' : 'https://schema.org/UsedCondition',
          availability: p.condition === 'new' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
          priceValidUntil: '2027-06-30',
          seller: { '@type': 'Organization', name: 'Bar Freezer Australia' },
        },
      });
    }
  } else if (slug[0] === 'faq' && !slug[1]) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (FAQS as any[]).map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    });
  } else if (slug[0] === 'guides' && slug[1]) {
    const post: any = (POSTS as any[]).find((x) => x.slug === slug[1]);
    if (post) {
      productDetail = { id: `guide:${post.slug}`, guide: { slug: post.slug, content: post.content, faqs: post.faqs || [] } } as any;
      const d = new Date(post.publishedAt);
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10),
        author: { '@type': 'Organization', name: 'Bar Freezer Australia' },
        publisher: { '@type': 'Organization', name: 'Bar Freezer Australia', logo: { '@type': 'ImageObject', url: SITE_URL + '/og-image.png' } },
        image: SITE_URL + '/og-image.png',
        mainEntityOfPage: `${SITE_URL}/guides/${post.slug}/`,
        keywords: post.primaryKeyword ? [post.primaryKeyword, ...(post.supportingKeywords || [])].join(', ') : undefined,
        wordCount: post.content ? String(post.content).split(/\s+/).length : undefined,
        articleSection: post.category,
        inLanguage: 'en-AU',
      });
      if (post.faqs && post.faqs.length) {
        blocks.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f: any) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        });
      }
    }
  } else if (!slug.length) {
    blocks.push({ '@context': 'https://schema.org', '@type': 'Organization', name: 'Bar Freezer Australia', url: SITE_URL, logo: SITE_URL + '/og-image.png' });
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Bar Freezer Australia',
      url: SITE_URL,
      potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/search/?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
    });
  } else if (slug.length >= 1 && !['product', 'guides', 'cart', 'checkout', 'search'].includes(slug[0])) {
    const m = lookup(slug);
    if (m) blocks.push({ '@context': 'https://schema.org', '@type': slug.length === 1 && STATIC_META[slug[0]] ? 'WebPage' : 'CollectionPage', name: m.title, description: m.description, url: SITE_URL + '/' + slug.join('/') + '/' });
  }

  const data = pageData(slug);
  if (data) productDetail = { id: `data:${slug.join('/') || 'home'}`, data } as any;

  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, '\\u003c') }} />
      ))}
      <ClientApp productDetail={productDetail} below={belowContent(slug, productDetail)} />
    </>
  );
}
