import type { Metadata } from 'next';
import ClientApp from '../../App';
import { CATEGORIES, BRANDS, VENUES, CITIES, PRODUCTS, POSTS } from '../../config/site.js';
import { allPaths } from '../../lib/routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths().map((p) => ({ slug: p.split('/').filter(Boolean) }));
}

const STATIC_META: Record<string, [string, string]> = {
  trade: ['Trade Pricing & Quotes', 'Trade pricing, multi-unit quotes and delivery for Australian pubs, bars, restaurants and venues.'],
  quote: ['Multi-Product Quote Builder', 'Build a multi-product quote for bar freezers, fridges and hospitality refrigeration.'],
  finance: ['Commercial Equipment Finance & Leasing', 'Finance and leasing options for commercial bar refrigeration.'],
  'warranty-service': ['Warranty Claims & Service', 'Lodge a warranty claim or request service for your commercial refrigeration.'],
  warranty: ['Warranty Claims & Service', 'Lodge a warranty claim or request service for your commercial refrigeration.'],
  deals: ['Deals', 'Current deals on bar freezers, bar fridges and accessories.'],
  clearance: ['Clearance', 'Clearance and ex-display bar refrigeration.'],
  compare: ['Compare Products', 'Compare bar freezers and fridges side by side.'],
  reviews: ['Customer Reviews', 'Read customer reviews of Bar Freezer Australia.'],
  about: ['About Us', 'About Bar Freezer Australia, supplier of commercial bar freezers and fridges.'],
  contact: ['Contact Us', 'Contact Bar Freezer Australia about specs, stock, delivery or quotes.'],
  faq: ['FAQs', 'Answers to common questions about bar freezers and fridges.'],
  returns: ['Returns & Australian Consumer Law', 'Returns and consumer guarantees.'],
  'payment-methods': ['Payment Methods', 'Pay by bank transfer, PayID, Osko or cryptocurrency (BTC, USDT, ETH).'],
  cart: ['Checkout', 'Checkout.'],
  checkout: ['Checkout', 'Checkout.'],
  search: ['Search', 'Search bar freezers, fridges and accessories.'],
  delivery: ['Australia-Wide Delivery', 'Delivery of commercial refrigeration across Australia.'],
  guides: ['Buying Guides', 'Buying guides for bar freezers, fridges and hospitality refrigeration.'],
};

const SUFFIX = ' | Bar Freezer Australia';
const trim = (t: string, n: number) => (t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t);

function findPath(nodes: any[], path: string): any {
  for (const n of nodes || []) {
    if (n.path === path) return n;
    const hit = findPath(n.subcategories, path) || findPath(n.types, path);
    if (hit) return hit;
  }
  return null;
}

function lookup(slug: string[]): { title: string; description: string; image?: string; noindex?: boolean } | null {
  if (!slug.length) return null;
  const path = '/' + slug.join('/') + '/';
  const [a, b] = slug;
  if (a === 'product' && b) {
    const p: any = (PRODUCTS as any[]).find((x) => x.slug === b);
    if (!p) return null;
    return { title: trim(p.name, 60 - SUFFIX.length), description: trim(p.shortDescription || p.name, 158), image: p.images?.[0] };
  }
  if (a === 'brands' && b) {
    const x: any = (BRANDS as any[]).find((y) => y.slug === b);
    return x ? { title: `${x.name} Commercial Refrigeration`, description: trim(x.description || `Shop ${x.name} bar freezers and fridges.`, 158) } : null;
  }
  if (a === 'venues' && b) {
    const x: any = (VENUES as any[]).find((y) => y.slug === b);
    return x ? { title: `Refrigeration for ${x.name}`, description: trim(x.intro || x.name, 158) } : null;
  }
  if (a === 'delivery' && b) {
    const x: any = (CITIES as any[]).find((y) => y.slug === b);
    return x ? { title: `Delivery to ${x.name}, ${x.state}`, description: `Commercial refrigeration delivery to ${x.name}: ${x.deliveryTime}.` } : null;
  }
  if (a === 'guides' && b) {
    const x: any = (POSTS as any[]).find((y) => y.slug === b);
    return x ? { title: trim(x.title, 60 - SUFFIX.length), description: trim(x.excerpt || x.title, 158) } : null;
  }
  if (slug.length === 1 && STATIC_META[a]) {
    const [t, d] = STATIC_META[a];
    return { title: t, description: d, noindex: a === 'cart' || a === 'checkout' || a === 'search' };
  }
  const cat = findPath(CATEGORIES as any[], path);
  if (cat) return { title: trim(cat.name, 60 - SUFFIX.length), description: trim(cat.description || `Shop ${cat.name} in Australia.`, 158) };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const m = lookup(slug);
  const canonical = '/' + slug.join('/') + (slug.length ? '/' : '');
  if (!m) return { alternates: { canonical } };
  return {
    title: m.title + SUFFIX,
    description: m.description,
    alternates: { canonical },
    robots: m.noindex ? { index: false, follow: true } : undefined,
    openGraph: { title: m.title + SUFFIX, description: m.description, url: canonical, images: m.image ? [m.image] : undefined },
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  let ld: any = null;
  if (slug[0] === 'product' && slug[1]) {
    const p: any = (PRODUCTS as any[]).find((x) => x.slug === slug[1]);
    if (p) {
      ld = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        sku: p.sku,
        brand: { '@type': 'Brand', name: p.brand },
        description: p.shortDescription,
        image: p.images?.[0] ? 'https://barfreezer.com.au' + p.images[0] : undefined,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'AUD',
          price: p.price,
          url: `https://barfreezer.com.au/product/${p.slug}/`,
          itemCondition: p.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
        },
      };
    }
  } else if (!slug.length) {
    ld = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Bar Freezer Australia', url: 'https://barfreezer.com.au' };
  }
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />}
      <ClientApp />
    </>
  );
}
