import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Phone, AlertCircle } from 'lucide-react';
import { CITIES, SITE } from '../config/site.js';
import { PostcodeEstimator } from '../components/PostcodeEstimator';
import { useRouter, Link } from '../context/RouterContext';
import { CITY_META } from '../config/seo-pages';
import { RelatedSearches } from '../components/RelatedSearches';

export const DeliveryPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const citySlug = routeMatch.params.city;
  const activeCity = citySlug ? CITIES.find((c: any) => c.slug === citySlug) : null;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/delivery/" className="hover:text-slate-900">Delivery</Link>
          {activeCity && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 font-semibold">{activeCity.name} ({activeCity.state})</span>
            </>
          )}
        </nav>

        {/* Header Banner */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>AUSTRALIA-WIDE DELIVERY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeCity ? ((CITY_META as any)[activeCity.slug]?.h1 || `${activeCity.name} Bar Freezer & Fridge Delivery`) : 'Australia-Wide Delivery of Bar Fridges and Freezers'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {activeCity
              ? `We deliver bar fridges and commercial refrigeration to venues, restaurants, pubs and homes across ${activeCity.name} and surrounding ${activeCity.state} areas. Freight and delivery time are confirmed with your order.`
              : 'We deliver bar fridges, bar freezers, kegerators and commercial refrigeration to capital cities and regional areas across Australia. Delivery time and freight depend on the product, its weight and your postcode, and are confirmed with your order or quote.'
            }
          </p>
        </div>

        {activeCity && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs space-y-2">
            <h2 className="text-base font-bold text-slate-900">Bar fridges and commercial refrigeration for {activeCity.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Shop <Link href="/bar-fridges/" className="text-cyan-700 font-semibold">bar fridges</Link>, <Link href="/bar-fridges/under-bar-fridges/" className="text-cyan-700 font-semibold">under bar fridges</Link>, <Link href="/bar-freezers/" className="text-cyan-700 font-semibold">bar freezers</Link>, <Link href="/bar-fridges/kegerators-dispensers/" className="text-cyan-700 font-semibold">kegerators</Link>, <Link href="/bar-fridges/wine-fridges/" className="text-cyan-700 font-semibold">wine fridges</Link> and <Link href="/accessories-parts/ice-machines-storage/" className="text-cyan-700 font-semibold">ice machines</Link> delivered to {activeCity.name} and the wider {activeCity.state} area. Use the postcode estimator below for a freight estimate, or <Link href="/quote/" className="text-cyan-700 font-semibold">request a quote</Link> for a multi-unit order.
            </p>
          </div>
        )}

        {/* Delivery notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
            <Truck className="w-6 h-6 text-cyan-700" />
            <h2 className="text-sm font-bold text-slate-900">Freight quoted to your postcode</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Heavy refrigeration is sent by freight. Use the estimator below for a guide, and we confirm the final freight with your order.
            </p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
            <MapPin className="w-6 h-6 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">Check access before delivery</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Measure doorways, stairs and the path to the final spot. Tell us about any access limits when you order.
            </p>
          </div>
          <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-sm font-bold text-slate-900">Inspect on arrival</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Check the unit for damage when it arrives and tell us straight away with photos. See our <Link href="/returns/" className="text-cyan-700 font-semibold">returns page</Link> for your rights.
            </p>
          </div>
        </div>

        {/* Live Postcode Calculator */}
        <div className="max-w-xl mx-auto">
          <PostcodeEstimator productPrice={2500} />
        </div>

        {/* All Australian Cities Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
            Delivery to Australian cities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {CITIES.map((city: any) => (
              <Link
                key={city.slug}
                href={`/delivery/${city.slug}/`}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-cyan-600 transition-all block group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 group-hover:text-cyan-700">{city.name}</span>
                  <span className="text-[11px] font-mono text-slate-500">{city.state}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {activeCity && <RelatedSearches path={`/delivery/${activeCity.slug}/`} noun={`fridges and freezers in ${activeCity.name}`} />}
      </div>
    </div>
  );
};
