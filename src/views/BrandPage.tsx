import React from 'react';
import { ShieldCheck, ChevronRight, ArrowRight, Award } from 'lucide-react';
import { BRANDS, PRODUCTS } from '../config/site.js';
import { ProductCard } from '../components/ProductCard';
import { useRouter, Link } from '../context/RouterContext';
import { BRAND_META } from '../config/seo-brands';

export const BrandPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const brandSlug = routeMatch.params.brand;
  const brand = BRANDS.find((b: any) => b.slug === brandSlug) || BRANDS[0];

  const brandProducts = PRODUCTS.filter((p: any) => p.brand.toLowerCase() === brand.name.toLowerCase());

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
                <span>{brand.country}</span>
                <span>·</span>
                <span>{brand.tag}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                {((BRAND_META as any)['/brands/' + brand.slug + '/']?.title || '').split(' | ')[0] || `${brand.name} Commercial Refrigeration Australia`}
              </h1>
            </div>
            
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/80 text-amber-900 flex items-center gap-2 self-start sm:self-center">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block">{brand.warrantyYears} Years On-Site Warranty</span>
                <span className="text-amber-700 text-[11px]">Authorized Australian Service Agents</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            {brand.description}
          </p>
        </div>

        {/* Products Grid for this Brand */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {brand.name} Equipment in Stock ({brandProducts.length} Models)
            </h2>
            <span className="text-xs text-slate-500 font-mono">Dispatched from Australian Depots</span>
          </div>

          {brandProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
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
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Explore Other Commercial Refrigeration Brands
          </h3>
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
                  {other.warrantyYears}yr Warranty
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
