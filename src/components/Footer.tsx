import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Star, 
  Send, 
  CheckCircle2, 
  CreditCard,
  Building
} from 'lucide-react';
import { SITE, CATEGORIES, BRANDS, CITIES } from '../config/site.js';
import { Link } from '../context/RouterContext';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Nationwide Logistics & Trust Matrix Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Australia-Wide Direct Delivery</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                Stock dispatched from Sydney, Melbourne, Brisbane & Perth. Hydraulic tailgate delivery included.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-amber-950/60 border border-amber-800/40 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Up to 5 Years On-Site Warranty</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                140+ licensed commercial refrigeration mechanics across metro & regional Australia.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">43°C Tropical Ambient Rated</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                Engineered specifically for brutal Australian summer heat, high humidity, and open alfresco venues.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hospitality Trade Pricing</h4>
              <p className="mt-1 text-slate-400 leading-relaxed">
                SilverChef Rent-Try-Buy partner, Zip Business, and tiered multi-unit commercial discounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Company & Contact */}
        <div className="lg:col-span-2 space-y-4 pr-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-cyan-600 flex items-center justify-center text-white font-black text-sm">
              BF
            </div>
            <span className="text-lg font-bold text-white tracking-tight">BAR FREEZER AUSTRALIA</span>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Australia's premier commercial and home bar refrigeration specialist. Supplying pubs, hotels, cocktail bars, craft breweries, and luxury alfresco outdoor kitchens nationwide from our own stock.
          </p>

          {/* Trustpilot Review Badge */}
          <Link href="/reviews/" className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9 / 5.0</span>
            <span className="text-slate-500">· 3,140+ Trustpilot Reviews</span>
          </Link>

          <div className="space-y-1.5 text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-white font-semibold">{SITE.phoneDisplay}</span>
              <span className="text-[11px] text-slate-500">(Toll-free Trade line)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-mono text-slate-300">{SITE.email}</span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{SITE.headOffice} (National Dispatch Coordination)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{SITE.tradingHours}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Equipment Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Refrigeration</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/bar-freezers/under-bar-freezers/" className="hover:text-white transition-colors">Underbar Freezers</Link></li>
            <li><Link href="/bar-freezers/back-bar-freezers/" className="hover:text-white transition-colors">Back Bar Freezers</Link></li>
            <li><Link href="/bar-freezers/glass-door-display-freezers/" className="hover:text-white transition-colors">Glass Display Freezers</Link></li>
            <li><Link href="/bar-freezers/glass-frosters-specialty/" className="hover:text-white transition-colors">Glass & Beer Mug Frosters</Link></li>
            <li><Link href="/bar-freezers/chest-bench-freezers/" className="hover:text-white transition-colors">Chest & Bench Freezers</Link></li>
            <li><Link href="/bar-freezers/upright-commercial-freezers/" className="hover:text-white transition-colors">Upright Kitchen Freezers</Link></li>
            <li><Link href="/bar-freezers/home-bar-outdoor-freezers/" className="hover:text-white transition-colors">Alfresco & Outdoor (IPX4)</Link></li>
            <li><Link href="/bar-fridges/bottle-coolers/" className="hover:text-white transition-colors">Speed Rail Bottle Coolers</Link></li>
            <li><Link href="/bar-fridges/kegerators-dispensers/" className="hover:text-white transition-colors">Commercial Kegerators</Link></li>
            <li><Link href="/bar-fridges/wine-fridges/" className="hover:text-white transition-colors">Dual-Zone Wine Cabinets</Link></li>
            <li><Link href="/deals/" className="text-rose-400 hover:text-rose-300 font-medium">Clearance & Ex-Display Deals</Link></li>
          </ul>
        </div>

        {/* Column 3: Australian Delivery Hubs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Delivery Australia-Wide</h4>
          <ul className="space-y-1.5 text-slate-400 grid grid-cols-2 gap-x-2">
            {CITIES.map((c: any) => (
              <li key={c.slug}>
                <Link href={`/delivery/${c.slug}/`} className="hover:text-cyan-400 transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link href="/delivery/" className="text-cyan-400 hover:text-cyan-300 font-semibold block">
              Freight Rates & Regional Notes &rarr;
            </Link>
          </div>
        </div>

        {/* Column 4: Trade & Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trade & Operations</h4>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/trade/" className="text-amber-400 hover:text-amber-300 font-semibold">Trade Account & Pricing</Link></li>
            <li><Link href="/quote/" className="hover:text-white transition-colors">Multi-Product Quote Builder</Link></li>
            <li><Link href="/warranty-service/" className="hover:text-white transition-colors">Warranty & Service Dispatch</Link></li>
            <li><Link href="/finance/" className="hover:text-white transition-colors">SilverChef Commercial Leasing</Link></li>
            <li><Link href="/compare/" className="hover:text-white transition-colors">Side-by-Side Spec Compare</Link></li>
            <li><Link href="/guides/" className="hover:text-white transition-colors">Refrigeration Buying Guides</Link></li>
            <li><Link href="/reviews/" className="hover:text-white transition-colors">Trustpilot Customer Reviews</Link></li>
            <li><Link href="/returns/" className="hover:text-white transition-colors">Returns & Australian Consumer Law</Link></li>
            <li><Link href="/faq/" className="hover:text-white transition-colors">Equipment FAQs</Link></li>
            <li><Link href="/about/" className="hover:text-white transition-colors">About Bar Freezer Australia</Link></li>
            <li><Link href="/contact/" className="hover:text-white transition-colors">Contact Our Engineers</Link></li>
          </ul>
        </div>
      </div>

      {/* Trade Newsletter & Disclaimer Strip */}
      <div className="border-t border-slate-800 bg-slate-900/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h5 className="text-sm font-bold text-white">Australian Hospitality Trade Updates</h5>
            <p className="text-slate-400 text-xs mt-1">
              Receive monthly notices on container arrivals, ex-display clearances, and tax deduction guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email (e.g. venue@bar.com.au)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs px-3 py-2 rounded-md focus:outline-none focus:border-amber-500 flex-1 md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-md transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        {subscribed && (
          <p className="max-w-7xl mx-auto text-emerald-400 text-xs mt-2 text-center md:text-right">
            ✓ Subscribed to Bar Freezer trade updates.
          </p>
        )}
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {SITE.legalName}. ABN {SITE.abn}. All prices in AUD include 10% Australian GST.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/delivery/" className="hover:text-white">Shipping Policy</Link>
            <span>·</span>
            <Link href="/returns/" className="hover:text-white">Returns & Guarantees</Link>
            <span>·</span>
            <Link href="/warranty-service/" className="hover:text-white">Commercial Warranty</Link>
            <span>·</span>
            <span>RCM Certified</span>
            <span>·</span>
            <span>MEPS Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
