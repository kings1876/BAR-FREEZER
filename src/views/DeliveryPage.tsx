import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle2, ChevronRight, Phone, AlertCircle } from 'lucide-react';
import { CITIES, SITE } from '../config/site.js';
import { PostcodeEstimator } from '../components/PostcodeEstimator';
import { useRouter, Link } from '../context/RouterContext';
import { CITY_META } from '../config/seo-pages';

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
            <span>SPECIALIZED HEAVY HOSPITALITY FREIGHT</span>
            <span>·</span>
            <span>DISPATCHED DAILY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {activeCity ? ((CITY_META as any)[activeCity.slug]?.h1 || `${activeCity.name} Bar Freezer & Fridge Delivery`) : 'Australia-Wide Commercial Refrigeration Delivery'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {activeCity
              ? `Fast, insured delivery to hospitality venues, restaurants, pubs, and private residences across ${activeCity.name} and surrounding ${activeCity.state} regions.`
              : 'Bar Freezer operates dedicated distribution hubs in Sydney, Melbourne, Brisbane, and Perth. We dispatch heavy commercial refrigeration daily to all Australian capital cities and regional towns with hydraulic tailgate lifters standard.'}
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

        {/* City-Specific Details If Viewed */}
        {activeCity ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                <Clock className="w-4 h-4 text-cyan-700" />
                <span>Transit & Dispatch Time</span>
              </div>
              <div className="text-base font-bold text-slate-900">{activeCity.deliveryTime}</div>
              <p className="text-xs text-slate-500">Orders placed before 2pm AEST are dispatched same-day from nearest depot.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Freight Rate ({activeCity.name})</span>
              </div>
              <div className="text-base font-bold text-slate-900">{activeCity.deliveryCost}</div>
              <p className="text-xs text-slate-500">Free delivery on commercial orders over $3,500 AUD.</p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Local Service Mechanics</span>
              </div>
              <div className="text-base font-bold text-slate-900">{activeCity.authorizedServiceAgents}</div>
              <p className="text-xs text-slate-500">On-site warranty repair technicians based locally in {activeCity.name}.</p>
            </div>

            <div className="md:col-span-3 p-6 bg-slate-900 text-white rounded-xl space-y-3">
              <h3 className="text-base font-bold">Regional Freight Notes for {activeCity.state}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeCity.regionalNotes}</p>
              <div className="pt-2 text-xs text-cyan-400 font-mono">
                Local Depot: {activeCity.localDepot}
              </div>
            </div>
          </div>
        ) : (
          /* General Delivery Overview Matrix */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
              <Truck className="w-6 h-6 text-cyan-700" />
              <h3 className="text-sm font-bold text-slate-900">Hydraulic Tailgate Standard</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our heavy rigid freight trucks are equipped with hydraulic tailgate lifters so 150kg+ units are lowered safely to curb level.
              </p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
              <MapPin className="w-6 h-6 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">4 Capital City Depots</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Stock is held physically in Sydney (Chullora), Melbourne (Truganina), Brisbane (Yatala), and Perth (Hazelmere).
              </p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
              <Clock className="w-6 h-6 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Same-Day Dispatch</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Orders received before 2:00pm AEST on business days leave our distribution centres on the same afternoon linehaul.
              </p>
            </div>

            <div className="p-5 bg-white rounded-lg border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Full Transit Insurance</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every shipment is 100% insured against transit damage. If a crate arrives with cosmetic transit damage, we replace it instantly.
              </p>
            </div>
          </div>
        )}

        {/* Live Postcode Calculator */}
        <div className="max-w-xl mx-auto">
          <PostcodeEstimator productPrice={2500} />
        </div>

        {/* All Australian Cities Grid */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">
            Select Your City for Local Transit Times & Freight Depots
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
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">{city.deliveryTime}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
