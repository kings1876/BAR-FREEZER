import React from 'react';
import { ShieldCheck, ChevronRight, ArrowRight, Award } from 'lucide-react';
import { BRANDS, PRODUCTS } from '../config/site.js';
import { ProductCard } from '../components/ProductCard';
import { useRouter, Link } from '../context/RouterContext';
import { PagedGrid } from '../components/PagedGrid';
import { RelatedSearches } from '../components/RelatedSearches';
import { BRAND_META } from '../config/seo-brands';

// Only countries of origin that could be confirmed; other brands show a neutral label.
const VERIFIED_ORIGIN: Record<string, string> = { skope: 'New Zealand', tefcold: 'Denmark', vestfrost: 'Denmark', liebherr: 'Germany', electrolux: 'Sweden', hoshizaki: 'Japan', dometic: 'Sweden', foster: 'United Kingdom', polar: 'United Kingdom', williams: 'United Kingdom', bromic: 'Australia', fed: 'Australia', schmick: 'Australia', anvil: 'South Africa' };

export const BrandPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const brandSlug = routeMatch.params.brand;
  const brand = BRANDS.find((b: any) => b.slug === brandSlug) || BRANDS[0];

  const brandProducts = PRODUCTS.filter((p: any) => p.brand.toLowerCase() === brand.name.toLowerCase());
  const kinds = Array.from(new Set(brandProducts.map((p: any) => String(p.subCategory || '').replace(/s*(.*)s*$/, '').toLowerCase()).filter(Boolean))).slice(0, 5);
  const brandIntro = brandProducts.length
    ? `Browse ${brandProducts.length} ${brand.name} products${kinds.length ? ' including ' + kinds.join(', ') : ''}. Compare sizes, specifications and prices, or request a quote for multiple units.`
    : brand.description;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="hover:text-slate-900">Brands</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{brand.name}</span>
        </nav>

        {/* Brand Banner */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
                <span>{VERIFIED_ORIGIN[brand.slug] || 'Commercial refrigeration'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {((BRAND_META as any)['/brands/' + brand.slug + '/']?.title || '').split(' | ')[0] || `${brand.name} Commercial Refrigeration Australia`}
              </h1>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-900 flex items-center gap-2 self-start sm:self-center">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block">Warranty on every product</span>
                <Link href="/warranty/" className="text-amber-700 text-[11px] underline">Read our warranty information</Link>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {brandIntro}
          </p>
        </div>

        {/* Products Grid for this Brand */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {brand.name} Fridges & Freezers ({brandProducts.length} Models)
            </h2>
            <span className="text-xs text-slate-500 font-mono">Delivery Australia-wide</span>
          </div>

          {brandProducts.length > 0 ? (
            <PagedGrid items={brandProducts} pageSize={6} render={(p: any) => <ProductCard key={p.id} product={p} />} />
          ) : null}
          {brandProducts.length > 0 ? (
            <nav aria-label={`All ${brand.name} models`} className="pt-6">
              <h2 className="text-base font-bold text-slate-900">All {brand.name} models</h2>
              <ul className="mt-3 columns-1 sm:columns-2 lg:columns-3 gap-6 text-xs text-slate-700 space-y-1">
                {brandProducts.map((p: any) => (
                  <li key={p.id} className="break-inside-avoid">
                    <Link href={`/product/${p.slug}/`} className="hover:text-cyan-700 hover:underline">{p.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
              <p className="text-sm text-slate-600">
                Additional {brand.name} models can be special-ordered through our trade desk.
              </p>
              <Link
                href="/quote/"
                className="inline-block px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-md"
              >
                Request Custom {brand.name} Quote
              </Link>
            </div>
          )}
        </div>

        {/* Other Brands Grid */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Explore Other Commercial Refrigeration Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {BRANDS.filter((b: any) => b.slug !== brand.slug).slice(0, 12).map((other: any) => (
              <Link
                key={other.slug}
                href={`/brands/${other.slug}/`}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded text-center transition-all group"
              >
                <span className="font-bold text-sm text-slate-900 group-hover:text-cyan-700 block">
                  {other.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">
                  {PRODUCTS.filter((p: any) => p.brand === other.name).length} products
                </span>
              </Link>
            ))}
          </div>
        </div>

        <RelatedSearches
          path={`/brands/${brand.slug}/`}
          noun={`${brand.name} fridges and freezers`}
          minPrice={(() => { const ps = brandProducts.map((p: any) => p.price).filter((n: any) => typeof n === 'number' && n > 0); return ps.length ? Math.min(...ps) : null; })()}
        />
      </div>
    </div>
  );
};
