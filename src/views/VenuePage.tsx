import React from 'react';
import { ChevronRight, ArrowRight, ShieldCheck, CheckCircle2, Phone, FileText } from 'lucide-react';
import { VENUES, CATEGORIES, PRODUCTS, SITE } from '../config/site.js';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

export const VenuePage: React.FC = () => {
  const { routeMatch } = useRouter();
  const { setIsQuoteModalOpen } = useCart();
  const venueSlug = routeMatch.params.venue;
  const venue = VENUES.find((v: any) => v.slug === venueSlug) || VENUES[0];

  // Related products based on venue's related categories
  const relatedProducts = PRODUCTS.filter((p: any) => 
    venue.relatedCategories.includes(p.categorySlug) || 
    p.use === 'commercial'
  ).slice(0, 4);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Venues</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{venue.name}</span>
        </nav>

        {/* Venue Header Banner */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
            <span>HOSPITALITY FIT-OUT SOLUTIONS</span>
            <span>·</span>
            <span>{venue.heroStat}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {venue.name} Commercial Bar Refrigeration
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            {venue.intro}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
            >
              Get a Customized {venue.name} Fit-Out Quote
            </button>
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-md transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Talk to Commercial Sales ({SITE.phoneDisplay})</span>
            </a>
          </div>
        </div>

        {/* 3 Recommended Setups (Small / Medium / Large) */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
              SCALABLE ARCHITECTURE
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Recommended Equipment Blueprints for {venue.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(venue.setups).map(([tierKey, setup]: [string, any]) => (
              <div 
                key={tierKey}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span className="uppercase font-bold text-amber-700">{tierKey} Venue Setup</span>
                    <span>{setup.capacity}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{setup.name}</h3>
                  <div className="text-sm font-mono font-bold text-cyan-800 mt-1">
                    {setup.budget}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {setup.summary}
                  </p>

                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Core Refrigeration Package:
                    </span>
                    {setup.equipment.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    Request Quote for this Blueprint
                  </button>
                  <span className="block text-center text-[10px] text-slate-400 font-mono">
                    SilverChef Financing & Tax Invoices Available
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Equipment in Stock */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Popular Equipment for {venue.name} in Stock
            </h2>
            <Link href="/bar-freezers/" className="text-xs font-semibold text-cyan-700 hover:text-cyan-800">
              Browse All Equipment &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Other Venues Switcher */}
        <div className="pt-8 border-t border-slate-200 space-y-4">
          <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Explore Refrigeration for Other Australian Venues
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {VENUES.filter((v: any) => v.slug !== venue.slug).map((other: any) => (
              <Link
                key={other.slug}
                href={other.path}
                className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded text-center transition-all group"
              >
                <span className="font-semibold text-xs text-slate-900 group-hover:text-cyan-700 block">
                  {other.name}
                </span>
                <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5 block">
                  {other.heroStat}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
