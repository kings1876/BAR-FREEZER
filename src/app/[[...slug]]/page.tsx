import type { Metadata } from 'next';
import ClientApp from '../../App';
import { CATEGORIES, BRANDS, VENUES, CITIES, PRODUCTS, POSTS } from '../../config/site.js';
import { allPaths } from '../../lib/routes';
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
  quote: ['Multi-Product Quote Builder', 'Build a multi-product quote for bar freezers, bar fridges, kegerators and ice machines, and send it to our sales team.'],
  finance: ['Equipment Finance & Leasing', 'Finance and leasing options for commercial bar refrigeration and hospitality equipment. Ask about your fit-out.'],
  'warranty-service': ['Service Dispatch & Warranty Claims', 'Request service dispatch or lodge a warranty claim for your commercial bar fridge, bar freezer or ice machine.'],
  warranty: ['Warranty Claims & Service', 'Lodge a warranty claim or request service for your commercial bar fridge, bar freezer or ice machine.'],
  deals: ['Deals on Bar Fridges & Freezers', 'Current deals on bar freezers, bar fridges and accessories. Compare prices and models, delivered Australia-wide.'],
  clearance: ['Clearance & Ex-Display Fridges', 'Clearance and ex-display bar fridges and bar freezers. Compare condition, price and specifications.'],
  compare: ['Compare Bar Fridges & Freezers', 'Compare bar freezers and bar fridges side by side by size, capacity, doors and features before you buy.'],
  reviews: ['Customer Reviews', 'Read customer reviews of Bar Freezer Australia and the equipment we supply to bars, pubs and venues.'],
  about: ['About Bar Freezer Australia', 'About Bar Freezer Australia, an Australian supplier of commercial and home bar freezers, bar fridges and ice machines.'],
  contact: ['Contact Us', 'Contact Bar Freezer Australia about product specifications, stock, delivery or quotes for bar fridges and freezers.'],
  faq: ['FAQs', 'Answers to common questions about bar freezers, bar fridges, delivery and ordering from Bar Freezer Australia.'],
  returns: ['Returns & Australian Consumer Law', 'How returns and Australian Consumer Law consumer guarantees apply to bar fridges and freezers bought from us.'],
  'payment-methods': ['Payment Methods', 'Pay by bank transfer, PayID, Osko or cryptocurrency (BTC, USDT, ETH). Payment details are emailed after your order request.'],
  cart: ['Shopping Cart', 'Review the bar fridges, bar freezers and accessories in your cart before you request an order.'],
  checkout: ['Checkout & Order Request', 'Enter your delivery details and choose a payment method to send your bar fridge or freezer order request.'],
  search: ['Search Bar Fridges & Freezers', 'Search bar freezers, bar fridges, kegerators, ice machines and accessories by name, brand or model.'],
  delivery: ['Australia-Wide Delivery', 'Delivery of bar fridges, bar freezers and commercial refrigeration to Australian capital cities and regional areas.'],
  guides: ['Bar Fridge & Freezer Buying Guides', 'Buying guides for bar fridges, bar freezers and hospitality refrigeration: sizing, ventilation, doors and what to check.'],
};

// These URLs show the same page; point them at one canonical.
const CANONICAL_OVERRIDE: Record<string, string> = { '/warranty-service/': '/warranty/' };

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
    const model = p.model && !String(p.brand).toLowerCase().includes(String(p.model).toLowerCase()) ? ' ' + p.model : '';
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
    tag = skuUnique && p.sku ? String(p.sku) : String(p.slug).split('-').slice(-2).join('-').toUpperCase();
    const t = title.replace(' | Bar Freezer', '');
    title = `${trim(t, 60 - 14 - tag.length - 1)} ${tag} | Bar Freezer`;
  }
  let desc: string;
  if (kw && !isAcc) {
    const model = p.model && !String(p.brand).toLowerCase().includes(String(p.model).toLowerCase()) ? ' ' + p.model : '';
    const specs = [p.widthMm >= 300 ? `${p.widthMm}mm wide` : '', p.capacityLitres >= 20 ? `${p.capacityLitres}L` : '', p.tempRange ? String(p.tempRange).split(' (')[0] : ''].filter(Boolean).join(', ');
    desc = `Buy the ${p.brand}${model} ${kw.term}${specs ? ': ' + specs : ''}. Compare price and specifications, delivered Australia-wide.`;
  } else {
    desc = 'Buy ' + dedupeWords(String(p.shortDescription || p.name));
  }
  if (tag && !desc.includes(tag)) desc = desc.replace(/\.$/, '') + ` (${tag}).`;
  return { title, description: padDesc(desc) };
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
    return x ? { title: x.title.length <= 60 ? x.title : (x.title.includes(':') && x.title.split(':')[0].length >= 20 ? x.title.split(':')[0] : trim(x.title, 60)), description: padDesc(x.excerpt || x.title), full: true } : null;
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

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const blocks: any[] = [];
  let productDetail: any = null;
  if (slug[0] === 'product' && slug[1]) {
    const full: any = (FULL_PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    if (full) productDetail = { id: full.id, specs: full.specs, fullDescription: full.fullDescription, dimensionGuide: full.dimensionGuide, sourceUrl: full.sourceUrl, alternatives: full.alternatives, frequentlyBoughtTogether: full.frequentlyBoughtTogether };
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
        description: p.shortDescription,
        image: p.images?.length ? p.images.slice(0, 4).map((u: string) => SITE_URL + u) : undefined,
        url: `${SITE_URL}/product/${p.slug}/`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'AUD',
          price: p.price,
          url: `${SITE_URL}/product/${p.slug}/`,
          itemCondition: p.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
        },
      });
    }
  } else if (slug[0] === 'guides' && slug[1]) {
    const post: any = (POSTS as any[]).find((x) => x.slug === slug[1]);
    if (post) {
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
      });
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

  return (
    <>
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(b).replace(/</g, '\\u003c') }} />
      ))}
      <ClientApp productDetail={productDetail} />
    </>
  );
}
